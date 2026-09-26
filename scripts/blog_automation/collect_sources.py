from __future__ import annotations

import datetime as dt
import html.parser
import json
import re
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import ClassVar
from urllib.parse import urljoin, urlsplit
from zoneinfo import ZoneInfo

UA = "PkLavcDailyBlog/1.0 (+https://pklavc.com/editorial-policy/)"
ATOM = "{http://www.w3.org/2005/Atom}"
LOCAL_ZONE = ZoneInfo("America/Sao_Paulo")


def safe_log(value: str) -> str:
    return "".join(ch if ch >= " " and ch != "\x7f" else " " for ch in str(value)).replace("::", "- -")[:500]


def _text(element: ET.Element | None) -> str:
    return "".join(element.itertext()).strip() if element is not None else ""


def _entry_date(entry: ET.Element) -> dt.date | None:
    # Publishers use different namespace prefixes (dc:date, dcterms:issued,
    # Atom published, etc.). Match by local name so prefixes do not silently
    # turn a healthy feed into zero dated records.
    preferred = {"pubdate": 0, "published": 1, "datepublished": 2, "issued": 3,
                 "date": 4, "updated": 5, "modified": 6}
    date_nodes = sorted(
        (node for node in entry.iter() if node is not entry and node.tag.rsplit("}", 1)[-1].lower() in preferred),
        key=lambda node: preferred[node.tag.rsplit("}", 1)[-1].lower()],
    )
    raw = next((_text(node) for node in date_nodes if _text(node)), "")
    if not raw:
        return None
    try:
        try:
            stamp = parsedate_to_datetime(raw)
        except (TypeError, ValueError, OverflowError):
            stamp = dt.datetime.fromisoformat(raw.replace("Z", "+00:00"))
        if stamp.tzinfo is None:
            stamp = stamp.replace(tzinfo=dt.timezone.utc)
        return stamp.astimezone(LOCAL_ZONE).date()
    except (ValueError, TypeError, OverflowError):
        return None


class _JsonLdParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.capture = False
        self.parts: list[str] = []
        self.documents: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "script" and dict(attrs).get("type", "").lower() == "application/ld+json":
            self.capture = True
            self.parts = []

    def handle_data(self, data):
        if self.capture:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "script" and self.capture:
            self.documents.append("".join(self.parts))
            self.capture = False


class _HtmlNode:
    def __init__(self, tag: str, attrs: dict[str, str], parent: _HtmlNode | None = None):
        self.tag, self.attrs, self.parent = tag, attrs, parent
        self.children: list[_HtmlNode | str] = []

    def text(self) -> str:
        parts: list[str] = []
        pending: list[_HtmlNode | str] = list(reversed(self.children))
        while pending:
            child = pending.pop()
            if isinstance(child, str):
                parts.append(child)
            else:
                pending.extend(reversed(child.children))
        return " ".join(parts).strip()


class _ListingParser(html.parser.HTMLParser):
    VOID: ClassVar[set[str]] = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = _HtmlNode("document", {})
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = _HtmlNode(tag.lower(), {key.lower(): value or "" for key, value in attrs}, self.stack[-1])
        self.stack[-1].children.append(node)
        if tag.lower() not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag.lower() not in self.VOID and len(self.stack) > 1:
            self.stack.pop()

    def handle_endtag(self, tag):
        tag = tag.lower()
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        if data.strip():
            self.stack[-1].children.append(data)


_DATE_PATTERNS = (
    re.compile(r"\b(20\d{2}-\d{2}-\d{2})(?:[T ][0-9:.+-]+Z?)?\b"),
    re.compile(r"\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+20\d{2}\b", re.IGNORECASE),
    re.compile(r"\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+20\d{2}\b", re.IGNORECASE),
    re.compile(r"\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\b", re.IGNORECASE),
)


def _published_date(raw: str) -> dt.date | None:
    raw = (raw or "").strip()
    if not raw:
        return None
    try:
        if len(raw) == 10:
            return dt.date.fromisoformat(raw)
        stamp = dt.datetime.fromisoformat(raw.replace("Z", "+00:00"))
        if stamp.tzinfo is None:
            stamp = stamp.replace(tzinfo=dt.timezone.utc)
        return stamp.astimezone(LOCAL_ZONE).date()
    except (ValueError, TypeError, OverflowError):
        pass
    for pattern in _DATE_PATTERNS:
        match = pattern.search(raw)
        if match:
            value = match.group(1) if pattern is _DATE_PATTERNS[0] else match.group(0)
            for fmt in ("%Y-%m-%d", "%B %d, %Y", "%B %d %Y", "%b %d, %Y", "%b %d %Y", "%B %d, %Y", "%d %B %Y"):
                try:
                    date_text = value.replace("Sept ", "Sep ").replace("Sept. ", "Sep ")
                    return dt.datetime.strptime(date_text + " +0000", fmt + " %z").date()  # noqa: DTZ007 - feed dates without time are calendar dates
                except ValueError:
                    continue
    return None


def _html_parts(body: bytes, base_url: str, allowed_hosts: set[str]) -> tuple[list[dict], list[str], list[dict]]:
    parser = _ListingParser()
    parser.feed(body.decode("utf-8", "replace"))
    links: list[str] = []
    anchors: list[_HtmlNode] = []

    pending_nodes = [parser.root]
    while pending_nodes:
        node = pending_nodes.pop()
        link_type = node.attrs.get("type", "").lower()
        if node.tag == "link" and node.attrs.get("rel", "").lower() in {"alternate", "feed"} and ("rss" in link_type or "atom" in link_type or "xml" in link_type):
            href = urljoin(base_url, node.attrs.get("href", ""))
            if _same_official_hosts(href, allowed_hosts):
                links.append(href)
        if node.tag == "a" and (re.search(r"(?:rss|atom|feed)(?:\.xml)?(?:/|$|\?)", node.attrs.get("href", ""), re.IGNORECASE) or re.search(r"\b(?:RSS|Atom)\b", node.text(), re.IGNORECASE)):
            href = urljoin(base_url, node.attrs.get("href", ""))
            if _same_official_hosts(href, allowed_hosts):
                links.append(href)
        if node.tag == "a":
            anchors.append(node)
        pending_nodes.extend(child for child in reversed(node.children) if isinstance(child, _HtmlNode))
    rows: list[dict] = []
    undated: list[dict] = []
    seen: set[str] = set()
    for anchor in anchors:
        href = urljoin(base_url, anchor.attrs.get("href", ""))
        if not _same_official_hosts(href, allowed_hosts):
            continue
        title = re.sub(r"\s+", " ", anchor.text()).strip()
        if len(title) < 12 or title.lower() in {"read more", "learn more", "more", "view all", "details"}:
            continue
        # Find publication time/date in the closest article/card container only.
        current = anchor
        found_date = None
        for _ in range(6):
            if current is None:
                break
            if current.tag in {"body", "html", "document"}:
                break
            values: list[str] = []
            descendants = [current]
            while descendants:
                item = descendants.pop()
                for key in ("datetime", "data-date", "data-published", "content"):
                    if item.attrs.get(key):
                        values.append(item.attrs[key])
                if item.tag == "time":
                    values.append(item.text())
                descendants.extend(child for child in item.children if isinstance(child, _HtmlNode))
            values.append(current.text())
            for value in values:
                found_date = _published_date(value)
                if found_date:
                    break
            if found_date:
                break
            current = current.parent
        if href in seen:
            continue
        if not found_date:
            parsed_href = urlsplit(href)
            base_path = urlsplit(base_url).path.rstrip("/")
            base_parts = [part for part in base_path.split("/") if part]
            path_parts = [part for part in parsed_href.path.split("/") if part]
            # Do not spend article-page requests on header/footer links,
            # pagination, filters, or the listing page itself.
            if (parsed_href.query or parsed_href.fragment or parsed_href.path.rstrip("/") == base_path
                    or len(path_parts) <= len(base_parts) or len(path_parts[-1]) < 6):
                continue
        seen.add(href)
        row = {"title": title[:400], "url": href, "published": found_date, "summary": ""}
        (rows if found_date else undated).append(row)
    return rows, list(dict.fromkeys(links)), undated


def _xml_entries(body: bytes) -> tuple[list[ET.Element], str]:
    root = ET.fromstring(body)
    rss_entries = root.findall(".//item")
    atom_entries = root.findall(".//" + ATOM + "entry")
    entries = rss_entries + atom_entries
    if not entries:
        raise ET.ParseError("No RSS items or Atom entries found")
    return entries, "RSS" if rss_entries else "Atom"


def _same_official_hosts(url: str, allowed_hosts: set[str]) -> bool:
    host = (urlsplit(url).hostname or "").lower()
    return urlsplit(url).scheme == "https" and any(host == allowed or host.endswith("." + allowed) for allowed in allowed_hosts)


def _fetch(url: str, allowed_hosts: set[str], *, html_preferred: bool = False) -> tuple[bytes, str]:
    accept = "text/html, application/xhtml+xml, application/xml;q=0.8, */*;q=0.5" if html_preferred else "application/atom+xml, application/rss+xml, application/xml, text/xml, text/html, application/xhtml+xml, */*;q=0.8"
    request = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": accept})
    with urllib.request.urlopen(request, timeout=18) as response:
        body, final_url = response.read(2_000_000), response.geturl()
    if not _same_official_hosts(final_url, allowed_hosts):
        raise ValueError("redirect left the configured company domains")
    return body, final_url


def _jsonld_items(body: bytes) -> list[dict]:
    parser = _JsonLdParser()
    parser.feed(body.decode("utf-8", "replace"))
    items: list[dict] = []
    for raw in parser.documents:
        try:
            pending = [json.loads(raw)]
            while pending:
                value = pending.pop()
                if isinstance(value, list):
                    pending.extend(value)
                elif isinstance(value, dict):
                    kind = value.get("@type", [])
                    kinds = {kind} if isinstance(kind, str) else set(kind)
                    if kinds.intersection({"NewsArticle", "BlogPosting", "Article"}):
                        items.append(value)
                    pending.extend((value.get("@graph", []), value.get("mainEntity", [])))
        except (ValueError, TypeError): continue
    return items


def _article_published_date(body: bytes) -> dt.date | None:
    for item in _jsonld_items(body):
        value = item.get("datePublished") or item.get("dateCreated")
        if value and (date := _published_date(str(value))):
            return date
    parser = _ListingParser()
    parser.feed(body.decode("utf-8", "replace"))
    values: list[str] = []
    pending_nodes = [parser.root]
    while pending_nodes:
        node = pending_nodes.pop()
        if node.tag == "meta":
            attrs = node.attrs
            key = (attrs.get("property") or attrs.get("name") or attrs.get("itemprop") or "").lower()
            if key in {"article:published_time", "datepublished", "datecreated", "date", "dc.date", "dcterms.issued"}:
                values.append(attrs.get("content", ""))
        if node.tag == "time" and node.attrs.get("datetime"):
            values.append(node.attrs["datetime"])
        pending_nodes.extend(child for child in reversed(node.children) if isinstance(child, _HtmlNode))
    return next((date for value in values if (date := _published_date(value))), None)


def collect(root: Path, day: str | None = None) -> tuple[list[dict], list[dict]]:
    config = json.loads((root / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
    candidates: list[dict] = []
    stats: list[dict] = []
    day = day or dt.datetime.now(LOCAL_ZONE).date().isoformat()

    def add_rows(rows: list[dict], source: dict, stat: dict):
        stat["parsed"] = len(rows)
        stat["ok"] = bool(rows)
        for row in rows:
            published = row["published"]
            if published.isoformat() != day:
                continue
            stat["today"] += 1
            candidates.append({"id": len(candidates) + 1, "publisher": source["name"],
                               "company": stat["company"], "primary": source.get("primary", True),
                               "title": row["title"][:400], "url": row["url"],
                               "published_date": published.isoformat(), "summary": row.get("summary", "")[:3000]})

    def rows_from_xml(body: bytes, allowed_hosts: set[str], source: dict, feed_url: str) -> tuple[list[dict], str]:
        entries, fmt = _xml_entries(body)
        rows = []
        missing_date = 0
        date_fetches = 0
        for entry in entries:
            title = _text(entry.find("title")) or _text(entry.find(ATOM + "title"))
            link = _text(entry.find("link"))
            if not link:
                atom_links = entry.findall(ATOM + "link")
                link_node = next((node for node in atom_links if node.attrib.get("rel", "alternate") == "alternate"), atom_links[0] if atom_links else None)
                link = link_node.attrib.get("href", "") if link_node is not None else ""
            link = urljoin(feed_url, link)
            summary = (_text(entry.find("description")) or _text(entry.find("summary")) or
                       _text(entry.find(ATOM + "summary")) or _text(entry.find(ATOM + "content")))
            published = _entry_date(entry)
            if title and _same_official_hosts(link, allowed_hosts):
                if published is None and date_fetches < 15:
                    date_fetches += 1
                    try:
                        article_body, _ = _fetch(link, allowed_hosts)
                        published = _article_published_date(article_body)
                    except (OSError, urllib.error.URLError, TimeoutError, ValueError):
                        published = None
                if published is None:
                    missing_date += 1
                    continue
                rows.append({"title": title, "url": link, "published": published, "summary": summary})
        if not rows and missing_date:
            raise ValueError(f"{missing_date} feed entries had no trustworthy publication date")
        return rows, fmt

    for feed in config["feeds"]:
        html_url = feed.get("html_url", feed["url"])
        hosts = {host.lower() for host in feed.get("allowed_hosts", [])}
        hosts.update(filter(None, ((urlsplit(feed["url"]).hostname or "").lower(), (urlsplit(html_url).hostname or "").lower())))
        stat = {"name": feed["name"], "company": feed.get("company", feed["name"]), "ok": False,
                "type": "unknown", "parsed": 0, "today": 0, "error": ""}
        started = time.monotonic()
        errors: list[str] = []
        bodies: list[tuple[bytes, str]] = []
        try:
            body, final_url = _fetch(feed["url"], hosts)
            bodies.append((body, final_url))
            try:
                rows, fmt = rows_from_xml(body, hosts, feed, final_url)
                stat["type"] = fmt
                add_rows(rows, feed, stat)
            except (ET.ParseError, ValueError) as exc:
                errors.append(f"feed: {type(exc).__name__}: {safe_log(str(exc))}")
        except (OSError, urllib.error.URLError, TimeoutError, ValueError) as exc:
            errors.append(f"feed: {type(exc).__name__}: {safe_log(str(exc))}")

        existing_html = any(
            final.lower().startswith(html_url.lower()) and
            (b"<html" in body[:2048].lower() or b"<!doctype html" in body[:2048].lower())
            for body, final in bodies
        )
        if not stat["ok"] and (html_url not in {url for _, url in bodies} or not existing_html):
            try:
                body, final_url = _fetch(html_url, hosts, html_preferred=True)
                bodies.append((body, final_url))
            except (OSError, urllib.error.URLError, TimeoutError, ValueError) as exc:
                errors.append(f"HTML fallback: {type(exc).__name__}: {safe_log(str(exc))}")

        if not stat["ok"] and bodies:
            # HTML pages may publish their own first-party RSS/Atom alternate link.
            html_body, base_url = next(((body, final) for body, final in reversed(bodies)
                                        if b"<html" in body[:2048].lower() or b"<!doctype html" in body[:2048].lower()), bodies[-1])
            html_rows, discovered_feeds, undated_html_rows = _html_parts(html_body, base_url, hosts)
            feed_ok = False
            for discovered in discovered_feeds:
                if discovered == feed["url"]:
                    continue
                try:
                    feed_body, discovered_url = _fetch(discovered, hosts)
                    rows, fmt = rows_from_xml(feed_body, hosts, feed, discovered_url)
                    if rows:
                        stat["type"] = fmt
                        add_rows(rows, feed, stat)
                        feed_ok = True
                        break
                except (OSError, urllib.error.URLError, ET.ParseError, TimeoutError, ValueError) as exc:
                    errors.append(f"discovered feed: {type(exc).__name__}: {safe_log(str(exc))}")
            if not feed_ok and len(undated_html_rows) > 0:
                # Some first-party listings omit dates on the card but provide
                # datePublished on the linked article. Verify a small bounded
                # set directly instead of guessing from crawl/update dates.
                for row in undated_html_rows[:15]:
                    try:
                        article_body, _ = _fetch(row["url"], hosts)
                        row["published"] = _article_published_date(article_body)
                        if row["published"]:
                            html_rows.append(row)
                    except (OSError, urllib.error.URLError, TimeoutError, ValueError) as exc:
                        errors.append(f"article date fallback: {type(exc).__name__}: {safe_log(str(exc))}")
            if not feed_ok and html_rows:
                stat["type"] = "HTML listing"
                add_rows(html_rows, feed, stat)
            if not stat["ok"]:
                jsonld_rows = []
                for entry in _jsonld_items(html_body):
                    published = _published_date(str(entry.get("datePublished", "")))
                    link = entry.get("url") or entry.get("mainEntityOfPage") or ""
                    if isinstance(link, dict):
                        link = link.get("@id", "")
                    link = urljoin(base_url, link) if isinstance(link, str) else ""
                    title = entry.get("headline") or entry.get("name") or ""
                    if published and title and _same_official_hosts(link, hosts):
                        jsonld_rows.append({"title": str(title), "url": link, "published": published,
                                            "summary": str(entry.get("description", ""))})
                if jsonld_rows:
                    stat["type"] = "HTML + JSON-LD"
                    add_rows(jsonld_rows, feed, stat)
            if not stat["ok"]:
                errors.append("HTML fallback: no official article cards with a reliable publication date")

        stat["error"] = "; ".join(errors)
        stat["seconds"] = round(time.monotonic() - started, 2)
        stats.append(stat)
        detail = f"HTTP/feed: {'OK' if stat['ok'] else 'ERROR'}; type: {stat['type']}; entries parsed: {stat['parsed']}; entries today ({day}): {stat['today']}"
        if stat["error"]:
            detail += f"; fallback details: {safe_log(stat['error'])}"
        print(f"{safe_log(stat['name'])}: {detail}")
    successes = sum(stat["ok"] for stat in stats)
    print(f"Sources configured: {len(stats)}")
    print(f"Sources successfully checked: {successes}")
    print(f"Sources failed: {len(stats) - successes}")
    expected = config.get("expected_companies", [])
    successful_companies = {stat["company"] for stat in stats if stat["ok"]}
    companies_covered = {company for company in expected if company in successful_companies}
    missing = [company for company in expected if company not in companies_covered]
    print(f"Companies expected: {len(expected)}")
    print(f"Companies covered: {len(companies_covered)}")
    print(f"Companies without validated structured source: {len(missing)}")
    if missing: print("Companies without validated structured source: " + ", ".join(missing))
    print(f"Today's candidates before duplicate filter: {len(candidates)}")
    return candidates, stats
