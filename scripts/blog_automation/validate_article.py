from __future__ import annotations

import datetime as dt
import html.parser
import json
import re
import io
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
    body_text = article_body.group(1) if article_body else ""
    source_match = re.search(r'<section><h2>Sources</h2>[\s\S]*?</section>', body_text)
    substantive_text = body_text.replace(source_match.group(0), "") if source_match else body_text
    substantive_words = len(re.findall(r"\b[\w'-]+\b", re.sub(r"<[^>]+>", " ", substantive_text)))
    if not 1300 <= substantive_words <= 1800: errors.append(f"article has {substantive_words} content words; required range is 1,300-1,800")
    sections = re.findall(r'<section data-editorial-kind="(fact|analysis|neutral)"><h2>(.*?)</h2>([\s\S]*?)</section>', substantive_text)
    if len(sections) < 7: errors.append(f"article has {len(sections)} substantive sections; minimum is 7")
    if len(sections) >= 2 and (sections[0][0] != "fact" or sections[0][1] != "Confirmed facts" or sections[1][0] != "analysis" or sections[1][1] != "Technical analysis"):
        errors.append("first two sections must separate Confirmed facts from Technical analysis")
    for _, heading, content in sections:
        section_words = len(re.findall(r"\b[\w'-]+\b", re.sub(r"<[^>]+>", " ", content)))
        if section_words < 80: errors.append(f"section '{heading}' is not substantive ({section_words} words; minimum 80)")
    if PLACEHOLDERS.search(html): errors.append("placeholder or AI meta commentary detected")
    source_section = re.search(r'<section><h2>Sources</h2>([\s\S]*?)</section>', html)
    cited_urls = re.findall(r'<a\s+href="(https://[^" ]+)"', source_section.group(1) if source_section else "")
    if not source_section or len(cited_urls) < 2: errors.append("at least two verified source URLs are required")
    if len(cited_urls) > 5: errors.append("more than five cited sources")
    if len(set(cited_urls)) != len(cited_urls): errors.append("duplicate cited source URL")
    if story.get("candidate", {}).get("url") not in cited_urls: errors.append("official primary source must be cited")
    if any(url not in story.get("sources", []) for url in cited_urls): errors.append("article cites a URL not verified for this story")
    social_image = re.search(r'<meta property="og:image" content="([^"]+)"', html)
    twitter_image = re.search(r'<meta name="twitter:image" content="([^"]+)"', html)
    image_alt = re.search(r'<meta property="og:image:alt" content="([^"]+)"', html)
    if not social_image or not twitter_image or social_image.group(1) != twitter_image.group(1): errors.append("Open Graph and Twitter social images must match")
    if not image_alt or story.get("title", "").lower() not in image_alt.group(1).lower(): errors.append("social image alt text must describe this article")
    expected_card = story.get("social_card_path", "")
    card_asset = root / expected_card.lstrip("/") if expected_card else None
    if expected_card and (not social_image or expected_card not in social_image.group(1) or (not card_asset.exists() and not story.get("social_card_content"))):
        errors.append("generated article social card is missing or not referenced")
    try:
        from PIL import Image
        image_bytes = card_asset.read_bytes() if card_asset and card_asset.exists() else story["social_card_content"]
        with Image.open(io.BytesIO(image_bytes)) as card:
            if card.format != "PNG" or card.size != (1200, 630): errors.append("social card must be a 1200x630 PNG")
    except (ImportError, KeyError, OSError) as exc:
        errors.append(f"social card image could not be validated: {type(exc).__name__}")
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
