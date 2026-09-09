#!/usr/bin/env python3
"""Audit the actual static Pages artifact without third-party dependencies.

Run: python scripts/audit-seo.py --root .pages-dist --compare-source .
This checks files and metadata, not live indexing, rankings, or rendered pixels.
Missing ordinary local links are warnings unless --strict-links is supplied.
"""

from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass, field
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import parse_qsl, unquote, urlencode, urljoin, urlsplit, urlunsplit
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET


VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
ROBOTS = ("Googlebot", "bingbot", "OAI-SearchBot", "ChatGPT-User", "Amzn-SearchBot", "Amzn-User")
# Verified live HTTP 200 on 2026-09-08: this GitHub Pages project is served
# independently of the portfolio artifact. Only this exact project route and
# its descendants bypass the artifact-file check; unknown local paths do not.
SEPARATELY_HOSTED_PROJECTS = ("/codepulse-monorepo/",)
# Remove only the legacy keyword paragraph at the end of a document. Accessible
# labels, carousel descriptions, hidden controls, and all other text are retained.
TAIL_KEYWORDS = re.compile(r'<div\s+class=[\"\']visually-hidden[\"\']\s*>\s*<p>[^<]*</p>\s*</div>\s*(?=</body>)', re.I)
REFRESH_NOSCRIPT = re.compile(r'<noscript>\s*<meta\b(?=[^>]*http-equiv=[\"\']refresh[\"\'])[^>]*>\s*</noscript>', re.I)


def compact(value: str) -> str:
    return " ".join(value.split())


def unversion(value: str) -> str:
    """Ignore only the build's cache version, keeping all other URL parameters."""
    parts = urlsplit(value)
    if not parts.query:
        return value
    query = [(key, val) for key, val in parse_qsl(parts.query, keep_blank_values=True) if key != "v"]
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query), parts.fragment))


def unversion_text(value: str) -> str:
    return re.sub(r'\?v=[A-Za-z0-9._-]+', '', value)


@dataclass
class Page:
    path: Path
    url: str
    lang: str = ""
    titles: list[str] = field(default_factory=list)
    meta: dict[str, list[str]] = field(default_factory=dict)
    canonicals: list[str] = field(default_factory=list)
    alternates: list[tuple[str, str]] = field(default_factory=list)
    references: list[tuple[str, str]] = field(default_factory=list)
    json_blocks: list[str] = field(default_factory=list)
    refresh: bool = False

    @property
    def noindex(self) -> bool:
        rules = ",".join(self.meta.get("robots", []) + self.meta.get("googlebot", [])).lower()
        return bool({"noindex", "none"} & set(re.split(r"[\s,]+", rules)))

    @property
    def canonical(self) -> str:
        return self.canonicals[0] if len(self.canonicals) == 1 else ""


class PageParser(HTMLParser):
    def __init__(self, page: Page):
        super().__init__(convert_charrefs=True)
        self.page = page
        self.in_head = False
        self.title: list[str] | None = None
        self.json_block: list[str] | None = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "head":
            self.in_head = True
        elif tag == "html":
            self.page.lang = attrs.get("lang", "") or ""
        elif tag == "title" and self.in_head:
            self.title = []
        elif tag == "meta":
            key = (attrs.get("name") or attrs.get("property") or "").lower()
            if key:
                self.page.meta.setdefault(key, []).append(attrs.get("content", "") or "")
            if (attrs.get("http-equiv") or "").lower() == "refresh":
                self.page.refresh = True
        elif tag == "link":
            rel = (attrs.get("rel") or "").lower().split()
            href = attrs.get("href", "") or ""
            if "canonical" in rel:
                self.page.canonicals.append(href)
            if "alternate" in rel and attrs.get("hreflang"):
                self.page.alternates.append((attrs["hreflang"], href))
            if "stylesheet" in rel:
                self.page.references.append(("stylesheet", href))
        elif tag == "script" and (attrs.get("type") or "").lower() == "application/ld+json":
            self.json_block = []
        if tag == "a" and attrs.get("href"):
            self.page.references.append(("link", attrs["href"]))
        if tag in {"img", "script", "source", "video", "audio", "iframe"} and attrs.get("src"):
            self.page.references.append((tag, attrs["src"]))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data):
        if self.title is not None:
            self.title.append(data)
        if self.json_block is not None:
            self.json_block.append(data)

    def handle_endtag(self, tag):
        if tag == "head":
            self.in_head = False
        if tag == "title" and self.title is not None:
            self.page.titles.append(compact("".join(self.title)))
            self.title = None
        if tag == "script" and self.json_block is not None:
            self.page.json_blocks.append("".join(self.json_block))
            self.json_block = None


class VisualSnapshot(HTMLParser):
    """Structural regression contract; a browser screenshot remains complementary."""
    def __init__(self, text: str, page_url: str = "", allow_adsense_injection: bool = False):
        super().__init__(convert_charrefs=True)
        self.tokens = []
        self.body = False
        self.special = None
        self.json_script = False
        self.in_head = False
        self.allow_adsense_injection = allow_adsense_injection
        self.head_script = None
        self.adsense_ignored = 0
        def drop_self_refresh(match):
            target = re.search(r'\bcontent=[\"\'][^\"\']*?\burl=([^\"\']+)', match.group(), re.I)
            return "" if target and urljoin(page_url, unescape(target[1]).strip()) == page_url else match.group()
        self.feed(REFRESH_NOSCRIPT.sub(drop_self_refresh, TAIL_KEYWORDS.sub("", text)))
        self.close()

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "head":
            self.in_head = True
        if tag == "body":
            self.body = True
        if tag == "script" and (values.get("type") or "").lower() == "application/ld+json":
            self.json_script = True
            return
        if self.json_script:
            return
        if tag == "script" and self.in_head and self.allow_adsense_injection:
            self.head_script = (len(self.tokens), attrs, [])
        if tag in {"style", "script"}:
            self.special = tag
        stylesheet = tag == "link" and "stylesheet" in (values.get("rel") or "").split()
        if self.body or self.special or stylesheet:
            if tag in {"meta", "title"} or (tag == "link" and not stylesheet):
                return
            filtered = []
            for key, value in attrs:
                if key in {"itemscope", "itemtype", "itemid", "itemprop", "itemref"}:
                    continue
                if value and key in {"href", "src", "poster"}:
                    value = unversion(value)
                filtered.append((key, value))
            self.tokens.append(("start", tag, tuple(sorted(filtered))))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_data(self, data):
        if self.json_script:
            return
        if self.head_script is not None:
            self.head_script[2].append(data)
        if self.body or self.special:
            value = unversion_text(data) if self.special else compact(data)
            if value.strip():
                self.tokens.append(("text", value))

    def handle_endtag(self, tag):
        if self.json_script:
            if tag == "script":
                self.json_script = False
            return
        if (self.body or self.special) and tag not in VOID_TAGS and tag not in {"meta", "title"}:
            self.tokens.append(("end", tag))
        if tag == "script" and self.head_script is not None:
            start, attrs, chunks = self.head_script
            if self.allowed_adsense_script(attrs, "".join(chunks)):
                del self.tokens[start:]
                self.adsense_ignored += 1
            self.head_script = None
        if tag == self.special:
            self.special = None
        if tag == "body":
            self.body = False
        if tag == "head":
            self.in_head = False

    @staticmethod
    def allowed_adsense_script(attrs, script):
        """Permit only the two exact head scripts emitted by the existing build."""
        values = dict(attrs)
        if len(attrs) == 2 and set(values) == {"src", "defer"}:
            return (values["defer"] is None
                    and bool(re.fullmatch(r"/js/blog-ads\.js(?:\?v=[A-Za-z0-9._-]+)?", values["src"] or ""))
                    and not script.strip())
        if attrs:
            return False
        match = re.fullmatch(r"window\.PKLAVC_ADSENSE_CONFIG=(\{.*\});", script.strip(), re.S)
        if not match:
            return False
        def unique_object(pairs):
            value = dict(pairs)
            if len(value) != len(pairs):
                raise ValueError("Duplicate config key")
            return value
        try:
            config = json.loads(match[1], object_pairs_hook=unique_object)
        except (ValueError, TypeError):
            return False
        return (isinstance(config, dict) and set(config) == {"clientId", "blogSlotId"}
                and isinstance(config["clientId"], str)
                and bool(re.fullmatch(r"ca-pub-[0-9]+", config["clientId"]))
                and isinstance(config["blogSlotId"], str)
                and bool(re.fullmatch(r"[0-9]*", config["blogSlotId"])))


class Audit:
    def __init__(self, args):
        self.args = args
        self.root = args.root.resolve()
        self.site = args.site.rstrip("/")
        self.errors = []
        self.warnings = []
        self.counts = Counter()
        self.pages: dict[Path, Page] = {}
        self.sitemap_urls = set()
        self.visited_maps = set()

    def report(self, code, message, warning=False):
        (self.warnings if warning else self.errors).append((code, message))

    def local_path(self, url):
        parts = urlsplit(url)
        if parts.scheme not in {"http", "https"} or parts.netloc != urlsplit(self.site).netloc:
            return None
        candidate = (self.root / unquote(parts.path).lstrip("/")).resolve()
        if not candidate.is_relative_to(self.root):
            return None
        if candidate.is_dir() or parts.path.endswith("/"):
            candidate /= "index.html"
        return candidate

    def page_url(self, path):
        relative = path.relative_to(self.root).as_posix()
        if relative == "index.html":
            return self.site + "/"
        if relative.endswith("/index.html"):
            relative = relative[:-10]
        return self.site + "/" + relative

    def read_pages(self):
        for path in sorted(self.root.rglob("*.html")):
            page = Page(path, self.page_url(path))
            try:
                text = path.read_text(encoding="utf-8-sig")
                parser = PageParser(page)
                parser.feed(text)
                parser.close()
            except (OSError, UnicodeError) as error:
                self.report("html-read", f"{path}: {error}")
                continue
            self.pages[path] = page
            self.counts["html_pages"] += 1
            if TAIL_KEYWORDS.search(text):
                self.report("hidden-keywords", f"{page.url}: trailing hidden keyword paragraph")

    def schema(self, page):
        def walk(value):
            if isinstance(value, list):
                for item in value:
                    walk(item)
            elif isinstance(value, dict):
                name = compact(unescape(str(value.get("name", "")))).lower()
                types = value.get("@type", [])
                if isinstance(types, str):
                    types = [types]
                if "Person" in types and name in {"patrick araujo", "patrick araújo", "pklavc"}:
                    self.counts["patrick_entities"] += 1
                    if not page.noindex and not page.refresh and value.get("@id") != self.site + "/#person":
                        self.report("person-id", f"{page.url}: Patrick Person must reference {self.site}/#person")
                repo = value.get("codeRepository")
                if repo:
                    parts = urlsplit(str(repo))
                    segments = parts.path.strip("/").split("/")
                    if parts.scheme not in {"http", "https"} or not parts.netloc:
                        self.report("repository-url", f"{page.url}: invalid codeRepository {repo}")
                    elif parts.netloc.lower() == "github.com" and (len(segments) != 2 or segments[0].lower() in {"sponsors", "orgs", "topics", "collections", "settings"}):
                        self.report("repository-url", f"{page.url}: codeRepository is not a repository: {repo}")
                for item in value.values():
                    walk(item)
        for index, block in enumerate(page.json_blocks, 1):
            self.counts["json_ld_blocks"] += 1
            try:
                value = json.loads(block)
                if not isinstance(value, (dict, list)):
                    raise ValueError("JSON-LD root must be an object or array")
                walk(value)
            except (ValueError, TypeError) as error:
                self.report("json-ld", f"{page.url} block {index}: {error}")

    def metadata(self, page):
        if not page.noindex and not page.refresh:
            self.counts["indexable_pages"] += 1
            if len(page.titles) != 1 or not page.titles[0]:
                self.report("title", f"{page.url}: needs one nonempty title")
            descriptions = page.meta.get("description", [])
            if len(descriptions) != 1 or not compact(descriptions[0]):
                self.report("description", f"{page.url}: needs one nonempty description")
            if not page.canonical:
                self.report("canonical", f"{page.url}: needs exactly one canonical")
            elif page.canonical != page.url:
                self.report("noncanonical-page", f"{page.url}: canonical is {page.canonical}", warning=True)
            if not re.fullmatch(r"[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*", page.lang):
                self.report("html-lang", f"{page.url}: invalid or missing html lang {page.lang!r}")
        self.schema(page)

    def hreflang(self, page):
        if page.noindex or page.refresh:
            return
        seen = set()
        alternate_urls = {url for _, url in page.alternates}
        for language, url in page.alternates:
            self.counts["hreflang_links"] += 1
            if language in seen:
                self.report("hreflang-duplicate", f"{page.url}: duplicate {language}")
            seen.add(language)
            if language != "x-default" and not re.fullmatch(r"[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*", language):
                self.report("hreflang-language", f"{page.url}: invalid language {language}")
            target_path = self.local_path(url)
            target = self.pages.get(target_path)
            if not target or not url.startswith(self.site + "/"):
                self.report("hreflang-target", f"{page.url}: absent or external alternate {url}")
                continue
            if target.noindex or target.refresh or target.canonical != url:
                self.report("hreflang-indexability", f"{page.url}: alternate is not canonical/indexable: {url}")
            if page.canonical not in {value for _, value in target.alternates}:
                self.report("hreflang-reciprocal", f"{page.url}: {url} has no return link")
            if language != "x-default" and target.lang.lower().split("-")[0] != language.lower().split("-")[0]:
                self.report("hreflang-language", f"{page.url}: {language} points to html lang={target.lang}: {url}")
        if page.alternates and page.canonical not in alternate_urls:
            self.report("hreflang-self", f"{page.url}: missing self alternate")

    def sitemap(self, path):
        if path in self.visited_maps:
            return
        self.visited_maps.add(path)
        try:
            tree = ET.parse(path).getroot()
        except (OSError, ET.ParseError) as error:
            self.report("sitemap-xml", f"{path}: {error}")
            return
        self.counts["sitemap_files"] += 1
        kind = tree.tag.rsplit("}", 1)[-1]
        if kind not in {"sitemapindex", "urlset"}:
            self.report("sitemap-root", f"{path}: unexpected root {kind}")
            return
        for node in tree:
            loc = next((child.text or "" for child in node if child.tag.rsplit("}", 1)[-1] == "loc"), "").strip()
            target_path = self.local_path(loc)
            if not target_path or not target_path.is_file() or not loc.startswith(self.site + "/"):
                self.report("sitemap-target", f"{path.name}: URL does not resolve in artifact: {loc}")
                continue
            if kind == "sitemapindex":
                self.sitemap(target_path)
                continue
            if loc in self.sitemap_urls:
                self.report("sitemap-duplicate", f"{path.name}: duplicate {loc}")
            self.sitemap_urls.add(loc)
            page = self.pages.get(target_path)
            if not page:
                self.report("sitemap-page", f"{loc}: expected an HTML page")
                continue
            if page.noindex or page.refresh or page.canonical != loc or page.url != loc:
                self.report("sitemap-indexability", f"{loc}: noindex, redirect, or noncanonical sitemap entry")
            xml_alternates = {(child.attrib.get("hreflang", ""), child.attrib.get("href", "")) for child in node if child.tag.rsplit("}", 1)[-1] == "link"}
            if xml_alternates != set(page.alternates):
                self.report("sitemap-hreflang", f"{loc}: sitemap/HTML alternates differ")

    def links(self, page):
        for kind, reference in set(page.references):
            if reference.startswith(("#", "mailto:", "tel:", "javascript:", "data:", "blob:")):
                continue
            absolute = urljoin(page.url, reference)
            path = self.local_path(absolute)
            if path is None:
                continue
            if any(urlsplit(absolute).path.startswith(prefix) for prefix in SEPARATELY_HOSTED_PROJECTS):
                self.counts["external_project_references"] += 1
                continue
            self.counts["local_references"] += 1
            if not path.is_file():
                self.report("local-reference", f"{page.url}: missing {kind} {reference}", warning=not self.args.strict_links)

    def robots(self):
        path = self.root / "robots.txt"
        try:
            text = path.read_text(encoding="utf-8-sig")
        except (OSError, UnicodeError) as error:
            self.report("robots", str(error))
            return
        parser = RobotFileParser()
        parser.parse(text.splitlines())
        samples = sorted(self.sitemap_urls) or [self.site + "/"]
        for agent in ROBOTS:
            blocked = [url for url in samples if not parser.can_fetch(agent, url)]
            if blocked:
                self.report("robots-block", f"{agent}: {len(blocked)} indexed routes blocked; first {blocked[0]}")
        self.counts["crawler_agents_checked"] = len(ROBOTS)
        maps = parser.site_maps() or []
        if not maps:
            self.report("robots-sitemap", "robots.txt has no Sitemap directive")
        for url in maps:
            target = self.local_path(url)
            if not target or not target.is_file():
                self.report("robots-sitemap", f"robots.txt sitemap missing: {url}")

    def compare_source(self):
        source = self.args.compare_source.resolve()
        for path in self.pages:
            relative = path.relative_to(self.root)
            original = source / relative
            if not original.is_file():
                self.report("visual-source", f"{relative}: missing source comparison file")
                continue
            source_snapshot = VisualSnapshot(original.read_text(encoding="utf-8-sig"), self.page_url(path), self.args.allow_adsense_injection)
            artifact_snapshot = VisualSnapshot(path.read_text(encoding="utf-8-sig"), self.page_url(path), self.args.allow_adsense_injection)
            before, after = source_snapshot.tokens, artifact_snapshot.tokens
            self.counts["adsense_head_scripts_allowed"] += artifact_snapshot.adsense_ignored
            self.counts["visual_html_compared"] += 1
            if before != after:
                first = next((i for i, pair in enumerate(zip(before, after)) if pair[0] != pair[1]), min(len(before), len(after)))
                self.report("visual-contract", f"{relative}: visible DOM/assets changed at token {first}; source={str(before[first:first+1])[:170]}; artifact={str(after[first:first+1])[:170]}")
        for path in sorted(self.root.rglob("*.css")):
            relative = path.relative_to(self.root)
            original = source / relative
            self.counts["visual_css_compared"] += 1
            if not original.is_file() or unversion_text(original.read_text(encoding="utf-8-sig")) != unversion_text(path.read_text(encoding="utf-8-sig")):
                self.report("visual-css", f"{relative}: CSS differs beyond asset cache versions")

    def run(self):
        if not self.root.is_dir():
            self.report("artifact-root", f"Missing artifact directory {self.root}; build it first")
            return
        self.read_pages()
        if not self.pages:
            self.report("artifact-empty", "No HTML pages found")
        for page in self.pages.values():
            self.metadata(page)
            self.hreflang(page)
            self.links(page)
        self.sitemap(self.root / "sitemap.xml")
        # The compatibility sitemap-index.xml may mirror sitemap.xml; parse it
        # independently but avoid counting the same child urlsets twice.
        if (self.root / "sitemap-index.xml").is_file():
            self.sitemap(self.root / "sitemap-index.xml")
        self.counts["sitemap_urls"] = len(self.sitemap_urls)
        for page in self.pages.values():
            if not page.noindex and not page.refresh and page.canonical == page.url and page.url not in self.sitemap_urls:
                self.report("sitemap-missing-page", f"{page.url}: canonical indexable page absent from sitemap")
        self.robots()
        if self.args.compare_source:
            self.compare_source()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(".pages-dist"))
    parser.add_argument("--site", default="https://pklavc.com")
    parser.add_argument("--compare-source", type=Path, help="Check visible HTML and CSS against this source root")
    parser.add_argument("--allow-adsense-injection", action="store_true", help="Permit only the existing build's validated AdSense config and blog-ads.js head scripts in the visual comparison")
    parser.add_argument("--strict-links", action="store_true", help="Treat unresolved local references as errors")
    parser.add_argument("--max-details", type=int, default=25)
    parser.add_argument("--json", action="store_true", help="Print the complete machine-readable report")
    args = parser.parse_args()
    audit = Audit(args)
    audit.run()
    if args.json:
        print(json.dumps({"root": str(audit.root), "counts": audit.counts, "errors": audit.errors, "warnings": audit.warnings}, indent=2, ensure_ascii=True))
    else:
        print(f"SEO artifact audit: {audit.root}")
        print(", ".join(f"{key}={value}" for key, value in sorted(audit.counts.items())))
        for label, issues in (("ERROR", audit.errors), ("WARNING", audit.warnings)):
            if issues:
                print(f"{label} totals: " + ", ".join(f"{code}={count}" for code, count in sorted(Counter(code for code, _ in issues).items())))
            for code, message in issues[:max(0, args.max_details)]:
                print(f"{label} [{code}] {message}")
            if len(issues) > args.max_details:
                print(f"... {len(issues) - args.max_details} more {label.lower()}s; use --json for all details")
        print(f"Result: {len(audit.errors)} errors, {len(audit.warnings)} warnings")
    return 1 if audit.errors else 0


if __name__ == "__main__":
    sys.exit(main())
