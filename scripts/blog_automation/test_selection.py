from __future__ import annotations
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from .generate_article import generate
from .run import choose_ranked
from .select_story import select, verify_evidence
from .llm_provider import LLMResponse


def llm(answer):
    return LLMResponse("Gemini", "test-model", answer, [])


class RankedSelectionTests(unittest.TestCase):
    def setUp(self):
        self.candidates = [{"id": 1, "url": "https://developers.googleblog.com/2026/09/orion.html",
                            "title": "Google Announces Orion Model For Android Developers", "published_date": "2026-09-24",
                            "primary": True, "company": "Google", "publisher": "Google Developers"}]
        self.story = {"candidate_id": 1, "confirmed_event_date": "2026-09-24", "score": 9,
                      "event_key": "google_orion_android_model_launch",
                      "title": "Google Announces the Orion Model for Android Developers",
                      "slug": "google-orion-model-android-developers",
                      "description": "Google announced the Orion model and new Android developer capabilities with practical engineering implications.",
                      "category": "AI", "tags": ["AI", "Android", "Developer Tools"],
                      "source_urls": [], "factual_summary": "Google announced Orion for Android developers."}

    def test_one_selector_call_returns_three_distinct_high_score_events(self):
        candidates = [{"id": i, "url": f"https://google.com/{i}", "primary": True, "company": "Google"} for i in range(1, 4)]
        entries = [{"candidate_id": i, "confirmed_event_date": "2026-09-24", "score": 11-i,
                    "event_key": f"event-{i}", "title": f"Google Event {i}"} for i in (1, 2, 3)]
        with patch("scripts.blog_automation.select_story.call_llm", return_value=llm(json.dumps({"ranked_candidates": entries}))) as call:
            result = select(candidates, "2026-09-24", ["AI"], [{"event_key": "old", "title": "Old event", "company": "Google", "source_urls": []}])
        self.assertEqual([item["candidate"]["id"] for item in result], [1, 2, 3])
        call.assert_called_once()

    def test_cross_company_duplicate_event_key_and_score_below_8_are_dropped(self):
        candidates = [{"id": 1, "url": "https://google.com/1", "primary": True, "company": "Google"},
                      {"id": 2, "url": "https://github.com/2", "primary": True, "company": "GitHub"},
                      {"id": 3, "url": "https://meta.com/3", "primary": True, "company": "Meta"}]
        entries = [{"candidate_id": 1, "confirmed_event_date": "2026-09-24", "score": 9, "event_key": "same_event", "title": "Event A"},
                   {"candidate_id": 2, "confirmed_event_date": "2026-09-24", "score": 8, "event_key": "same_event", "title": "Different headline"},
                   {"candidate_id": 3, "confirmed_event_date": "2026-09-24", "score": 7, "event_key": "weak", "title": "Event C"}]
        with patch("scripts.blog_automation.select_story.call_llm", return_value=llm(json.dumps({"ranked_candidates": entries}))):
            result = select(candidates, "2026-09-24", [])
        self.assertEqual([item["candidate"]["id"] for item in result], [1])

    def test_rank_1_failure_evaluates_rank_2_without_rerunning_selector(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); (root / "blog").mkdir()
            ranked = [{"event_key": "one", "title": "First event", "candidate": {"url": "https://google.com/1"}},
                      {"event_key": "two", "title": "Second event", "candidate": {"url": "https://google.com/2"}}]
            good = {**ranked[1], "sources": ["https://google.com/2"], "evidence_status": "PRIMARY_ONLY"}
            with patch("scripts.blog_automation.run.check_duplicate"), patch("scripts.blog_automation.run.verify_evidence", side_effect=[None, good]) as verify:
                result = choose_ranked(root, ranked, "2026-09-24", [], [])
        self.assertEqual(result["event_key"], "two")
        self.assertEqual(verify.call_count, 2)

    def test_rank_1_already_published_uses_rank_2(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); (root / "blog").mkdir()
            ranked = [{"event_key": "event-a", "title": "Headline changed", "candidate": {"url": "https://google.com/alternate"}},
                      {"event_key": "event-b", "title": "Second event", "candidate": {"url": "https://google.com/b"}}]
            used = [{"event_key": "event-a", "title": "Previously published A", "company": "Google",
                     "source_urls": ["https://google.com/original"]}]
            good = {**ranked[1], "sources": ["https://google.com/b"], "evidence_status": "PRIMARY_ONLY"}
            with patch("scripts.blog_automation.run.check_duplicate"), patch("scripts.blog_automation.run.verify_evidence", return_value=good) as verify:
                result = choose_ranked(root, ranked, "2026-09-24", [], used)
        self.assertEqual(result["event_key"], "event-b")
        verify.assert_called_once()

    def test_fewer_than_score_8_has_no_ranked_result(self):
        candidate = [{"id": 1, "url": "https://google.com/a", "primary": True, "company": "Google"}]
        item = {"candidate_id": 1, "confirmed_event_date": "2026-09-24", "score": 7, "event_key": "low", "title": "Low"}
        with patch("scripts.blog_automation.select_story.call_llm", return_value=llm(json.dumps({"ranked_candidates": [item]}))):
            self.assertEqual(select(candidate, "2026-09-24", []), [])


class PrimaryOnlyGenerationTests(unittest.TestCase):
    def test_insufficient_primary_only_content_is_a_specific_rejection(self):
        story = {"title": "Google Announces a Very Significant Engineering Feature", "sources": ["https://google.com/official"],
                 "candidate": {"url": "https://google.com/official"}}
        answer = json.dumps({"rejection": "INSUFFICIENT_CONTENT_DEPTH", "reason": "The announcement contains too little technical detail."})
        with patch("scripts.blog_automation.generate_article.call_llm", return_value=llm(answer)):
            with self.assertRaisesRegex(ValueError, "INSUFFICIENT_CONTENT_DEPTH"):
                generate(story, "2026-09-24")


if __name__ == "__main__":
    unittest.main()
