from __future__ import annotations

import datetime as dt
import html.parser
import json
import re
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlsplit

PLACEHOLDERS = re.compile(r"\{\{[A-Z_]+\}\}|TODO|lorem ipsum|as an AI|I cannot access|according to the information provided|como uma IA|não tenho acesso|según la información proporcionada", re.I)
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Structure(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.error = [], None
    def handle_starttag(self, tag, attrs):
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack or self.stack[-1] != tag:
            self.error = f"unexpected closing tag {tag}"
        else: self.stack.pop()


def validate(root: Path, html: str, story: dict, day: str, *, check_remote: bool = True) -> None:
    errors = []
    if not story.get("title") or len(story["title"]) < 20: errors.append("title missing or too short")
    slug = story.get("slug", "")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug): errors.append("invalid slug")
    if dt.date.fromisoformat(day).isoformat() != day: errors.append("invalid date")
    if story.get("confirmed_event_date") != day: errors.append("event date differs from run date")
    if "Confirmed facts" not in html or "Technical analysis" not in html: errors.append("confirmed facts and analysis must be clearly separated")
    if len(story.get("description", "")) < 60: errors.append("description too short")
    if len(story.get("tags", [])) < 3: errors.append("at least three tags required")
    article_body = re.search(r'<article class="blog-article">([\s\S]*?)</article>', html)
    body_words = len(re.findall(r"\b[\w'-]+\b", re.sub(r"<[^>]+>", " ", article_body.group(1) if article_body else "")))
    if body_words < 800: errors.append(f"article has only {body_words} content words; minimum is 800")
    if PLACEHOLDERS.search(html): errors.append("placeholder or AI meta commentary detected")
    source_section = re.search(r'<section><h2>Sources</h2>([\s\S]*?)</section>', html)
    cited_urls = re.findall(r'<a\s+href="(https://[^" ]+)"', source_section.group(1) if source_section else "")
    if not source_section or not cited_urls: errors.append("sources section missing")
    if len(cited_urls) > 5: errors.append("more than five cited sources")
    if len(set(cited_urls)) != len(cited_urls): errors.append("duplicate cited source URL")
    if story.get("candidate", {}).get("url") not in cited_urls: errors.append("official primary source must be cited")
    if any(url not in story.get("sources", []) for url in cited_urls): errors.append("article cites a URL not verified for this story")
    for marker in ('<link rel="canonical"', '<meta name="description"', '<meta name="keywords"',
                   'property="og:title"', 'property="og:description"', 'name="twitter:card"',
                   '"@type":"BlogPosting"', '"@type":"BreadcrumbList"'):
        if marker not in html: errors.append(f"SEO metadata missing: {marker}")
    parser = Structure()
    try:
        parser.feed(html); parser.close()
        if parser.error or parser.stack: errors.append(parser.error or f"unclosed tags: {parser.stack[-5:]}")
    except Exception as exc: errors.append(f"HTML parsing failed: {exc}")
    jsonld = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', html)
    try:
        if not jsonld: raise ValueError("JSON-LD not found")
        json.loads(jsonld.group(1))
    except (ValueError, json.JSONDecodeError) as exc:
        errors.append(f"invalid JSON-LD: {exc}")
    for url in story.get("sources", []):
        parsed = urlsplit(url) if isinstance(url, str) else None
        if not parsed or parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password or any(c.isspace() for c in url):
            errors.append(f"invalid source URL: {url}"); continue
        if check_remote:
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "PkLavcDailyBlog/1.0", "Range": "bytes=0-1023"})
                with urllib.request.urlopen(req, timeout=12) as response:
                    if response.status >= 400: errors.append(f"source URL returned {response.status}: {url}")
            except (OSError, urllib.error.URLError, TimeoutError) as exc:
                errors.append(f"source URL unavailable: {url} ({type(exc).__name__})")
    for raw in re.findall(r'\b(?:href|src)="(/[^"#?]+)', html):
        local = root / raw.lstrip("/")
        if not local.exists(): errors.append(f"missing local asset: {raw}")
    if errors: raise ValueError("; ".join(errors))
    print("Validação HTML, metadata, conteúdo, fontes e caminhos relativos: OK")
