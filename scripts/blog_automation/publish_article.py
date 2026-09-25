from __future__ import annotations

import hashlib
import html
import json
import re
import subprocess
from pathlib import Path
from .url_evidence import normalize_url

STATE = Path("scripts/blog_automation/used_stories.json")


def fingerprint(story: dict) -> str:
    return hashlib.sha256(re.sub(r"[^a-z0-9]", "", story["title"].lower()).encode()).hexdigest()


def filter_duplicate_candidates(root: Path, candidates: list[dict]) -> list[dict]:
    state = json.loads((root / STATE).read_text(encoding="utf-8")) if (root / STATE).exists() else {"stories": []}
    used_urls = {normalize_url(url) for item in state["stories"] for url in item.get("source_urls", [])}
    used_titles = {re.sub(r"[^a-z0-9]", "", item.get("title", "").lower()) for item in state["stories"]}
    existing_posts = []
    for file in (root / "blog").glob("*/index.html"):
        page = file.read_text(encoding="utf-8", errors="ignore")
        title = re.search(r'<h1[^>]*>(.*?)</h1>', page, re.I | re.S)
        existing_posts.append((page, re.sub(r"[^a-z0-9]", "", re.sub(r"<[^>]+>", "", title.group(1)).lower()) if title else ""))
    unseen = []
    for candidate in candidates:
        normalized_title = re.sub(r"[^a-z0-9]", "", candidate.get("title", "").lower())
        duplicate = (normalize_url(candidate.get("url", "")) in used_urls or normalized_title in used_titles or
                     any(candidate.get("url") in page or normalized_title == title for page, title in existing_posts))
        if duplicate:
            print(f"Candidato duplicado ignorado antes da seleção: {candidate.get('title', '')[:140]}")
        else:
            unseen.append(candidate)
    return unseen


def published_today(root: Path, day: str) -> list[dict]:
    state = json.loads((root / STATE).read_text(encoding="utf-8")) if (root / STATE).exists() else {"stories": []}
    return [{
        "event_key": item.get("event_key", ""),
        "title": item.get("title", ""),
        "company": item.get("company", ""),
        "source_urls": item.get("source_urls", []),
    } for item in state.get("stories", []) if item.get("event_date") == day]


def matches_published_event(story: dict, used_today: list[dict]) -> bool:
    title = re.sub(r"[^a-z0-9]", "", story.get("title", "").lower())
    urls = {normalize_url(url) for url in [story.get("candidate", {}).get("url", ""), *story.get("source_urls", []), *story.get("sources", [])] if url}
    for item in used_today:
        if (story.get("event_key") and str(story["event_key"]).casefold() == str(item.get("event_key", "")).casefold()
                or title and title == re.sub(r"[^a-z0-9]", "", item.get("title", "").lower())
                or urls.intersection(normalize_url(url) for url in item.get("source_urls", []))):
            return True
    return False


def check_duplicate(root: Path, story: dict) -> None:
    state = json.loads((root / STATE).read_text(encoding="utf-8")) if (root / STATE).exists() else {"stories": []}
    urls = {normalize_url(url) for item in state["stories"] for url in item.get("source_urls", [])}
    event_keys = {str(item.get("event_key", "")).casefold() for item in state["stories"]}
    titles = {re.sub(r"[^a-z0-9]", "", item.get("title", "").lower()) for item in state["stories"]}
    candidate_urls = [story["candidate"]["url"], *story.get("sources", [])]
    normalized_title = re.sub(r"[^a-z0-9]", "", story["title"].lower())
    if any(normalize_url(url) in urls for url in candidate_urls) or normalized_title in titles or fingerprint(story) in {item.get("fingerprint") for item in state["stories"]} or str(story.get("event_key", "")).casefold() in event_keys:
        raise ValueError("Duplicate source URL, title, or event already used.")
    for file in (root / "blog").glob("*/index.html"):
        text = file.read_text(encoding="utf-8", errors="ignore")
        if any(url in text for url in candidate_urls): raise ValueError("Source URL already cited by an existing blog post.")
        match = re.search(r"<title>(.*?)</title>", text, re.I | re.S)
        if match and re.sub(r"[^a-z0-9]", "", match.group(1).lower()) == normalized_title:
            raise ValueError("An existing post has the same title.")


def update_index(root: Path, story: dict, day: str) -> None:
    path = root / "blog/index.html"
    page = path.read_text(encoding="utf-8")
    marker = '<div class="blog-grid">'
    card = f'''<article class="blog-card" role="article" data-auto-post="true">
<div class="blog-card-meta"><span>{html.escape(story['category'])}</span><span>10 min read</span></div>
<h3><a href="/blog/{html.escape(story['slug'])}/">{html.escape(story['title'])}</a></h3><p>{html.escape(story['description'])}</p>
<div class="blog-tag-row">{''.join(f'<span>{html.escape(tag)}</span>' for tag in story['tags'][:4])}</div><a class="blog-link" href="/blog/{html.escape(story['slug'])}/">Read article</a></article>'''
    if marker not in page: raise ValueError("Could not locate the existing blog-card listing.")
    route = f'/blog/{story["slug"]}/'
    if route in page: raise ValueError("Blog index already contains this article.")
    page = page.replace(marker, marker + "\n" + card, 1)
    path.write_text(page, encoding="utf-8")


def publish(root: Path, story: dict, html: str, day: str, dry_run: bool) -> Path:
    destination = root / "blog" / story["slug"] / "index.html"
    if destination.exists(): raise ValueError("Target post already exists.")
    card_destination = root / story["social_card_path"].lstrip("/")
    if card_destination.exists(): raise ValueError("Social card path already exists.")
    if dry_run:
        import tempfile
        folder = Path(tempfile.mkdtemp(prefix="pklavc-blog-preview-"))
        preview = folder / "index.html"
        preview.write_text(html, encoding="utf-8")
        (folder / "social-card.png").write_bytes(story["social_card_content"])
        print(f"DRY_RUN: arquivo que seria publicado: {preview}")
        print(f"DRY_RUN: social card que seria publicado: {folder / 'social-card.png'} -> {story['social_card_path']}")
        return preview
    destination.parent.mkdir(parents=True)
    destination.write_text(html, encoding="utf-8")
    card_destination.parent.mkdir(parents=True, exist_ok=True)
    card_destination.write_bytes(story["social_card_content"])
    update_index(root, story, day)
    state_path = root / STATE
    state = json.loads(state_path.read_text(encoding="utf-8")) if state_path.exists() else {"stories": []}
    state["stories"].append({"event_date": day, "event_key": story["event_key"], "title": story["title"], "company": story.get("candidate", {}).get("company", ""), "evidence_status": story.get("evidence_status", "PRIMARY_ONLY"), "fingerprint": fingerprint(story), "source_urls": story["sources"], "slug": story["slug"]})
    state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for script in ("scripts/generate-sitemaps.mjs", "scripts/generate-rss.mjs"):
        subprocess.run(["node", script], cwd=root, check=True)
    print(f"Arquivo criado: {destination}")
    return destination
