from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
from pathlib import Path
from zoneinfo import ZoneInfo

from . import gemini
from .collect_sources import collect
from .filter_candidates import filter_today
from .generate_article import generate, render
from .publish_article import check_duplicate, filter_duplicate_candidates, matches_published_event, publish, published_today
from .select_story import select, verify_evidence
from .validate_article import validate


def choose_ranked(root: Path, ranked: list[dict], day: str, topics: list[str], already_published: list[dict]) -> dict | None:
    for index, proposed in enumerate(ranked, 1):
        if matches_published_event(proposed, already_published):
            print(f"Rank {index} skipped: event key, title or URL already published today.")
            continue
        try:
            check_duplicate(root, proposed)
        except ValueError as exc:
            print(f"Rank {index} skipped by final duplicate barrier: {exc}")
            continue
        verified = verify_evidence(proposed, day, topics, allow_enrichment=True)
        if verified is None:
            print(f"Rank {index} rejected by evidence validation; evaluating next ranked event without rerunning selector.")
            continue
        try:
            check_duplicate(root, verified)
        except ValueError as exc:
            print(f"Rank {index} rejected by final source/event duplicate barrier: {exc}")
            continue
        print(f"Selected first unpublished eligible event: {verified.get('event_key')} (rank {index}).")
        return verified
    return None


def fixture(day: str) -> tuple[dict, dict]:
    story = {"title": "Illustrative Source Validation Fixture for the Engineering Blog", "slug": "illustrative-validation-fixture",
             "description": "This offline fixture exercises the article template and safety checks without creating a blog post.",
             "category": "Developer Tools", "tags": ["Engineering", "Validation", "Automation"],
             "confirmed_event_date": day, "sources": ["https://developers.googleblog.com/", "https://developers.googleblog.com/en/"],
             "candidate": {"url": "https://developers.googleblog.com/", "title": "fixture", "primary": True}, "selection_reason": "Offline template and validation fixture; it is not a news candidate."}
    paragraphs = ["This offline validation paragraph checks that the production template can render substantive technical discussion while keeping evidence, interpretation, limitations, and source attribution in separate sections. It contains no reporting about a real event. The live workflow instead requires an official source published today, corroborates the original event date through grounded search, and constrains references to URLs returned by the source feed or Google Search grounding. Engineers should be able to inspect the announcement, identify what is explicitly documented, compare the documented change with the previous behavior, and distinguish practical implications from confirmed product facts. The article builder inserts this material into the established blog shell, preserving its responsive stylesheet, navigation, breadcrumb, metadata, JSON-LD, sidebar, footer, and deploy-time ad integration. This fixture exercises structural checks only and is never recorded as a story or copied into the repository. It also verifies meaningful SEO metadata and article-specific social imagery. Each generated section must provide enough evidence or engineering analysis to be useful independently, not merely repeat a heading. The fixture remains synthetic so validation cannot accidentally represent or publish a false announcement as genuine news. These constraints are enforced against the rendered result rather than treated as model instructions alone, and a failure stops the workflow before any repository files are changed."]
    sections = [{"heading": heading, "kind": "fact" if i == 0 else "analysis", "paragraphs": paragraphs, "bullets": []} for i, heading in enumerate(["Confirmed facts", "Technical analysis", "System context", "How the workflow behaves", "Engineering implications", "What changed", "Limitations and open questions", "Practical considerations"])]
    article = {"sections": sections, "sources": [{"label": "Official developer publication (validation fixture)", "url": story["sources"][0]}, {"label": "Official developers publication (validation fixture)", "url": story["sources"][1]}]}
    return story, article


def _main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--offline-fixture", action="store_true", help="validate the pipeline offline using non-news fixture data")
    parser.add_argument("--dry-run", action="store_true", help="generate and validate without changing repository files")
    args = parser.parse_args()
    root = args.root.resolve()
    day = dt.datetime.now(ZoneInfo("America/Sao_Paulo")).date().isoformat()
    dry_run = args.dry_run or os.environ.get("DRY_RUN", "false").lower() == "true"
    print(f"Data editorial (America/Sao_Paulo): {day}; modelo Gemini: {os.getenv('GEMINI_MODEL', 'gemini-2.5-flash')}")
    if args.offline_fixture:
        story, article = fixture(day)
    else:
        collected, source_stats = collect(root, day)
        candidates = filter_today(collected, day)
        todays_before_dedup = len(candidates)
        totals = {}
        for stat in source_stats:
            totals[stat["company"]] = totals.get(stat["company"], 0) + stat["today"]
        print("Today's candidates by source: " + (", ".join(f"{stat['name']} ({stat['company']}): {stat['today']}" for stat in source_stats) if source_stats else "none"))
        print("Today's candidates by company: " + (", ".join(f"{company}: {count}" for company, count in sorted(totals.items())) if totals else "none"))
        candidates = filter_duplicate_candidates(root, candidates)
        print(f"Today's candidates after duplicate filter: {len(candidates)}")
        print(f"Remaining eligible events: {len(candidates)}")
        if not candidates:
            if todays_before_dedup:
                print("All candidates dated today were duplicates; no new post will be generated.")
            else:
                print("No usable source entries dated today; no new post will be generated.")
            return
        source_config = json.loads((root / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
        already_published = published_today(root, day)
        print(f"Already published today: {len(already_published)}")
        ranked = select(candidates, day, source_config.get("topics", []), already_published)
        story = choose_ranked(root, ranked, day, source_config.get("topics", []), already_published)
        if story is None:
            print("No unpublished ranked event passed duplicate and evidence-quality checks; no article generated.")
            return
        article = generate(story, day)
    slug, document = render(root, story, article, day)
    validate(root, document, story, day, check_remote=not args.offline_fixture)
    body = re.search(r'<article class="blog-article">([\s\S]*?)</article>', document)
    word_count = len(re.findall(r"\b[\w'-]+\b", re.sub(r"<[^>]+>", " ", body.group(1) if body else "")))
    print(f"Resultado da geração: OK; {word_count} palavras; slug {slug}")
    preview = publish(root, story, document, day, dry_run or args.offline_fixture)
    print("Commit: dispensado (dry-run/fixture)." if dry_run or args.offline_fixture else "Publicação preparada para commit pelo workflow.")


def main() -> None:
    try:
        _main()
    except gemini.GeminiOperationalError as exc:
        reason = {
            "DAILY_QUOTA": "NO_POST_GEMINI_QUOTA_EXHAUSTED",
            "RATE_LIMIT": "NO_POST_GEMINI_TEMPORARILY_UNAVAILABLE",
            "SERVICE_UNAVAILABLE": "NO_POST_GEMINI_TEMPORARILY_UNAVAILABLE",
            "REQUEST_BUDGET": "NO_POST_GEMINI_REQUEST_BUDGET",
        }.get(exc.circuit, "NO_POST_GEMINI_TEMPORARILY_UNAVAILABLE")
        print(f"{reason}: {exc}. Article not published.")
    finally:
        gemini.report_usage()


if __name__ == "__main__":
    main()
