from __future__ import annotations

import json
import unittest
from unittest.mock import patch

from .select_story import select


class StorySourceSelectionTests(unittest.TestCase):
    def setUp(self):
        self.candidates = [{"id": 1, "url": "https://vendor.example/news", "title": "A major confirmed developer platform launch", "primary": True, "publisher": "Vendor", "summary": "Official launch with technical details."}]
        self.story = {"candidate_id": 1, "confirmed_event_date": "2026-09-24", "score": 9,
                      "event_key": "vendor-platform-launch", "title": "Vendor Launches a New Developer Platform Feature",
                      "slug": "vendor-new-developer-platform-feature",
                      "description": "A detailed official developer platform launch with practical integration changes for engineering teams.",
                      "category": "Developer Tools", "tags": ["Developer Tools", "APIs", "Cloud"],
                      "source_urls": ["https://vendor.example/news", "https://docs.vendor.example/new-api"]}

    def test_keeps_verified_official_documentation_alongside_primary_source(self):
        answer = json.dumps(self.story)
        with patch("scripts.blog_automation.select_story.call", return_value=(answer, ["https://vendor.example/news", "https://docs.vendor.example/new-api"])):
            result = select(self.candidates, "2026-09-24", [])
        self.assertEqual(result["sources"], ["https://vendor.example/news", "https://docs.vendor.example/new-api"])

    def test_primary_only_gets_exactly_one_enrichment_attempt_then_rejects(self):
        with patch("scripts.blog_automation.select_story.call", side_effect=[
            (json.dumps(self.story), ["https://vendor.example/news"]),
            (json.dumps({"sources": []}), []),
        ]) as mocked:
            result = select(self.candidates, "2026-09-24", [])
        self.assertIsNone(result)
        self.assertEqual(mocked.call_count, 2)

    def test_normalized_tracking_and_trailing_slash_source_match(self):
        story = {**self.story, "source_urls": ["https://VENDOR.example/news/?utm_source=search", "https://docs.vendor.example/new-api#overview"]}
        with patch("scripts.blog_automation.select_story.call", return_value=(json.dumps(story), ["https://vendor.example/news", "https://docs.vendor.example/new-api/"])):
            result = select(self.candidates, "2026-09-24", [])
        self.assertEqual(result["sources"], ["https://vendor.example/news", "https://docs.vendor.example/new-api/"])

    def test_enrichment_adds_only_grounded_official_same_event_source(self):
        enrichment = {"sources": [{"url": "https://docs.vendor.example/releases/feature", "why_same_event": "Official release notes describe this same platform launch and rollout details.", "official": True}]}
        with patch("scripts.blog_automation.select_story.call", side_effect=[
            (json.dumps(self.story), ["https://vendor.example/news"]),
            (json.dumps(enrichment), ["https://docs.vendor.example/releases/feature"]),
        ]):
            result = select(self.candidates, "2026-09-24", [])
        self.assertEqual(result["sources"], ["https://vendor.example/news", "https://docs.vendor.example/releases/feature"])


if __name__ == "__main__":
    unittest.main()
