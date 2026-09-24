from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
from pathlib import Path

from .collect_sources import collect
from .filter_candidates import filter_today
from .generate_article import generate, render
from .publish_article import check_duplicate, publish
from .select_story import select
from .validate_article import validate


def fixture(day: str) -> tuple[dict, dict]:
    story = {"title": "Illustrative Source Validation Fixture for the Engineering Blog", "slug": "illustrative-validation-fixture",
             "description": "This offline fixture exercises the article template and safety checks without creating a blog post.",
             "category": "Developer Tools", "tags": ["Engineering", "Validation", "Automation"],
             "confirmed_event_date": day, "sources": ["https://developers.googleblog.com/"],
             "candidate": {"url": "https://developers.googleblog.com/", "title": "fixture", "primary": True}, "selection_reason": "Offline template and validation fixture; it is not a news candidate."}
    paragraphs = ["This offline validation paragraph checks that the production template can render substantive technical discussion while keeping evidence, interpretation, limitations, and source attribution in separate sections. It contains no reporting about a real event. The live workflow instead requires an official source published today, corroborates the original event date through grounded search, and constrains references to URLs returned by the source feed or Google Search grounding. Engineers should be able to inspect the announcement, identify what is explicitly documented, compare the documented change with the previous behavior, and distinguish practical implications from confirmed product facts. The article builder inserts this material into the established blog shell, preserving its responsive stylesheet, navigation, breadcrumb, metadata, JSON-LD, sidebar, footer, and deploy-time ad integration. This fixture exercises structural checks only and is never recorded as a story or copied into the repository."]
    sections = [{"heading": heading, "kind": "fact" if i == 0 else "analysis", "paragraphs": paragraphs, "bullets": []} for i, heading in enumerate(["Confirmed facts", "Technical analysis", "System context", "How the workflow behaves", "Engineering implications", "What changed", "Limitations and open questions", "Practical considerations"])]
    article = {"sections": sections, "sources": [{"label": "Official developer publication (validation fixture)", "url": story["sources"][0]}]}
    return story, article


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--offline-fixture", action="store_true", help="validate the pipeline offline using non-news fixture data")
    parser.add_argument("--dry-run", action="store_true", help="generate and validate without changing repository files")
    args = parser.parse_args()
    root = args.root.resolve()
    day = dt.datetime.now(dt.timezone(dt.timedelta(hours=-3))).date().isoformat()
    dry_run = args.dry_run or os.environ.get("DRY_RUN", "false").lower() == "true"
    print(f"Data editorial (America/Sao_Paulo): {day}; modelo Gemini: {os.getenv('GEMINI_MODEL', 'gemini-2.5-flash')}")
    if args.offline_fixture:
        story, article = fixture(day)
    else:
        collected, _ = collect(root)
        candidates = filter_today(collected, day)
        source_config = json.loads((root / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
        story = select(candidates, day, source_config.get("topics", []))
        if story is None:
            print("Nenhum assunto confirmado e relevante; nada será publicado.")
            return
        check_duplicate(root, story)
        article = generate(story, day)
    if not args.offline_fixture:
        check_duplicate(root, story)
    slug, document = render(root, story, article, day)
    validate(root, document, story, day, check_remote=not args.offline_fixture)
    body = re.search(r'<article class="blog-article">([\s\S]*?)</article>', document)
    word_count = len(re.findall(r"\b[\w'-]+\b", re.sub(r"<[^>]+>", " ", body.group(1) if body else "")))
    print(f"Resultado da geração: OK; {word_count} palavras; slug {slug}")
    preview = publish(root, story, document, day, dry_run or args.offline_fixture)
    print("Commit: dispensado (dry-run/fixture)." if dry_run or args.offline_fixture else "Publicação preparada para commit pelo workflow.")


if __name__ == "__main__":
    main()
