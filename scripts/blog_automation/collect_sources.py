from __future__ import annotations

import datetime as dt
import json
import html.parser
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path
from zoneinfo import ZoneInfo

UA = "PkLavcDailyBlog/1.0 (+https://pklavc.com/editorial-policy/)"
ATOM = "{http://www.w3.org/2005/Atom}"
LOCAL_ZONE = ZoneInfo("America/Sao_Paulo")


def safe_log(value: str) -> str:
    return "".join(ch if ch >= " " and ch != "\x7f" else " " for ch in str(value)).replace("::", "- -")[:500]


def _text(element: ET.Element | None) -> str:
    return "".join(element.itertext()).strip() if element is not None else ""


def _entry_date(entry: ET.Element) -> dt.date | None:
    raw = next((_text(entry.find(name)) for name in ("pubDate", "published", "updated", ATOM + "published", ATOM + "updated") if _text(entry.find(name))), "")
    if not raw:
        return None
    try:
        stamp = parsedate_to_datetime(raw) if "," in raw else dt.datetime.fromisoformat(raw.replace("Z", "+00:00"))
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


def _jsonld_items(body: bytes) -> list[dict]:
    parser = _JsonLdParser()
    parser.feed(body.decode("utf-8", "replace"))
    items: list[dict] = []
    def walk(value):
        if isinstance(value, list):
            for child in value: walk(child)
        elif isinstance(value, dict):
            kind = value.get("@type", [])
            kinds = {kind} if isinstance(kind, str) else set(kind)
            if kinds.intersection({"NewsArticle", "BlogPosting", "Article"}):
                items.append(value)
            walk(value.get("@graph", []))
            walk(value.get("mainEntity", []))
    for raw in parser.documents:
        try: walk(json.loads(raw))
        except (ValueError, TypeError): continue
    return items


def collect(root: Path, day: str | None = None) -> tuple[list[dict], list[dict]]:
    config = json.loads((root / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
    candidates: list[dict] = []
    stats: list[dict] = []
    day = day or dt.datetime.now(LOCAL_ZONE).date().isoformat()
    for feed in config["feeds"]:
        stat = {"name": feed["name"], "company": feed.get("company", feed["name"]), "ok": False,
                "type": "unknown", "parsed": 0, "today": 0, "error": ""}
        started = time.monotonic()
        try:
            accepted = "text/html, application/ld+json" if feed.get("format") == "jsonld" else "application/atom+xml, application/rss+xml, application/xml, text/xml"
            request = urllib.request.Request(feed["url"], headers={"User-Agent": UA, "Accept": accepted})
            with urllib.request.urlopen(request, timeout=18) as response:
                body = response.read(2_000_000)
            if feed.get("format") == "jsonld":
                entries = _jsonld_items(body)
                stat["type"] = "HTML (JSON-LD Article)"
                if not entries:
                    raise ValueError("official page returned no valid JSON-LD Article entries")
                stat.update(ok=True, parsed=len(entries))
                for entry in entries:
                    raw = entry.get("datePublished") or entry.get("dateCreated")
                    published = None
                    if raw:
                        try:
                            raw_date = str(raw)
                            if len(raw_date) == 10:
                                published = dt.date.fromisoformat(raw_date)
                            else:
                                stamp = dt.datetime.fromisoformat(raw_date.replace("Z", "+00:00"))
                                if stamp.tzinfo is None: stamp = stamp.replace(tzinfo=dt.timezone.utc)
                                published = stamp.astimezone(LOCAL_ZONE).date()
                        except (ValueError, TypeError, OverflowError): pass
                    if published is None:
                        stat["error"] = "some JSON-LD entries have missing or invalid publication dates"
                        continue
                    if published.isoformat() == day:
                        stat["today"] += 1
                        title = entry.get("headline") or entry.get("name") or ""
                        link = entry.get("url") or entry.get("mainEntityOfPage") or ""
                        if isinstance(link, dict): link = link.get("@id", "")
                        if title and isinstance(link, str) and link.startswith("https://"):
                            candidates.append({"id": len(candidates) + 1, "publisher": feed["name"],
                                               "company": stat["company"], "primary": True, "title": str(title)[:400],
                                               "url": link, "published_date": published.isoformat(),
                                               "summary": str(entry.get("description", ""))[:3000]})
                entries = []
            else:
                root_xml = ET.fromstring(body)
                rss_entries = root_xml.findall(".//item")
                atom_entries = root_xml.findall(".//" + ATOM + "entry")
                entries = rss_entries + atom_entries
                stat["type"] = "RSS" if rss_entries else "Atom" if atom_entries else "XML (no entries)"
                if not entries:
                    raise ET.ParseError("No RSS items or Atom entries found")
                stat.update(ok=True, parsed=len(entries))
            for entry in entries:
                title = _text(entry.find("title")) or _text(entry.find(ATOM + "title"))
                link = _text(entry.find("link"))
                if not link:
                    links = entry.findall(ATOM + "link")
                    link_node = next((node for node in links if node.attrib.get("rel", "alternate") == "alternate"), links[0] if links else None)
                    link = link_node.attrib.get("href", "") if link_node is not None else ""
                summary = (_text(entry.find("description")) or _text(entry.find("summary")) or
                           _text(entry.find(ATOM + "summary")) or _text(entry.find(ATOM + "content")))
                published = _entry_date(entry)
                if published is None:
                    stat["error"] = "some entries have missing or invalid publication dates"
                    continue
                if published.isoformat() == day:
                    stat["today"] += 1
                    if title and link.startswith("https://"):
                        candidates.append({"id": len(candidates) + 1, "publisher": feed["name"],
                                           "company": stat["company"], "primary": feed.get("primary", True),
                                           "title": title[:400], "url": link, "published_date": published.isoformat(),
                                           "summary": summary[:3000]})
        except (OSError, urllib.error.URLError, ET.ParseError, TimeoutError, ValueError) as exc:
            stat["error"] = f"{type(exc).__name__}: {safe_log(str(exc))}"
        stat["seconds"] = round(time.monotonic() - started, 2)
        stats.append(stat)
        detail = f"HTTP/feed: {'OK' if stat['ok'] else 'ERROR'}; type: {stat['type']}; entries parsed: {stat['parsed']}; entries today ({day}): {stat['today']}"
        if stat["error"]:
            detail += f"; detail: {safe_log(stat['error'])}"
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
