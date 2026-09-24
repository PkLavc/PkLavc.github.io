from __future__ import annotations

import hashlib
import html
import json
import re
import subprocess
from pathlib import Path

STATE = Path("scripts/blog_automation/used_stories.json")


def fingerprint(story: dict) -> str:
    return hashlib.sha256(re.sub(r"[^a-z0-9]", "", story["title"].lower()).encode()).hexdigest()


def check_duplicate(root: Path, story: dict) -> None:
    state = json.loads((root / STATE).read_text(encoding="utf-8")) if (root / STATE).exists() else {"stories": []}
    urls = {url for item in state["stories"] for url in item.get("source_urls", [])}
    event_keys = {item.get("event_key", "") for item in state["stories"]}
    titles = {re.sub(r"[^a-z0-9]", "", item.get("title", "").lower()) for item in state["stories"]}
    candidate_url = story["candidate"]["url"]
    normalized_title = re.sub(r"[^a-z0-9]", "", story["title"].lower())
    if candidate_url in urls or normalized_title in titles or fingerprint(story) in {item.get("fingerprint") for item in state["stories"]} or story.get("event_key") in event_keys:
        raise ValueError("Duplicate source URL, title, or event already used.")
    for file in (root / "blog").glob("*/index.html"):
        text = file.read_text(encoding="utf-8", errors="ignore")
        if candidate_url in text: raise ValueError("Source URL already cited by an existing blog post.")
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
    if dry_run:
        import tempfile
        folder = Path(tempfile.mkdtemp(prefix="pklavc-blog-preview-"))
        preview = folder / "index.html"
        preview.write_text(html, encoding="utf-8")
        print(f"DRY_RUN: arquivo que seria publicado: {preview}")
        return preview
    destination.parent.mkdir(parents=True)
    destination.write_text(html, encoding="utf-8")
    update_index(root, story, day)
    state_path = root / STATE
    state = json.loads(state_path.read_text(encoding="utf-8")) if state_path.exists() else {"stories": []}
    state["stories"].append({"event_date": day, "event_key": story["event_key"], "title": story["title"], "fingerprint": fingerprint(story), "source_urls": story["sources"], "slug": story["slug"]})
    state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for script in ("scripts/generate-sitemaps.mjs", "scripts/generate-rss.mjs"):
        subprocess.run(["node", script], cwd=root, check=True)
    print(f"Arquivo criado: {destination}")
    return destination
