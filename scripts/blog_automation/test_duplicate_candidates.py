from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from .publish_article import filter_duplicate_candidates, matches_published_event, published_today


class DuplicateCandidateFilterTests(unittest.TestCase):
    def test_removes_used_story_and_keeps_distinct_candidates(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            state = root / "scripts/blog_automation/used_stories.json"
            state.parent.mkdir(parents=True)
            state.write_text(json.dumps({"stories": [{"title": "Previously Published Launch", "source_urls": ["https://vendor.example/old"]}]}), encoding="utf-8")
            (root / "blog").mkdir()
            candidates = [
                {"title": "Previously Published Launch", "url": "https://vendor.example/old"},
                {"title": "A Different Confirmed Developer Release", "url": "https://vendor.example/new"},
            ]
            filtered = filter_duplicate_candidates(root, candidates)
            self.assertEqual([item["url"] for item in filtered], ["https://vendor.example/new"])

    def test_same_url_and_title_are_removed(self):
        used=[{"event_date":"2026-09-24","event_key":"event-a","title":"First Launch","source_urls":["https://vendor.example/a"]}]
        candidates=[{"event_key":"other","title":"Other","candidate":{"url":"https://vendor.example/a"}},
                    {"event_key":"other","title":"First Launch","candidate":{"url":"https://vendor.example/b"}}]
        self.assertTrue(matches_published_event(candidates[0],used))
        self.assertTrue(matches_published_event(candidates[1],used))

    def test_same_event_key_with_new_url_or_company_is_removed(self):
        used=[{"event_date":"2026-09-24","event_key":"cross-company-release","title":"Meta and Vendor announce launch","company":"Meta","source_urls":["https://meta.com/a"]}]
        story={"event_key":"cross-company-release","title":"Vendor launches feature","candidate":{"company":"Vendor","url":"https://vendor.example/b"},"sources":["https://vendor.example/docs"]}
        self.assertTrue(matches_published_event(story,used))

    def test_different_event_uses_next_ranked_candidate_after_published_one(self):
        used=[{"event_key":"event-1","title":"Already published","source_urls":["https://meta.com/1"]}]
        ranked=[{"event_key":"event-1","title":"Rephrased headline","candidate":{"url":"https://meta.com/alternate"}},
                {"event_key":"event-2","title":"New event","candidate":{"url":"https://meta.com/2"}}]
        chosen=next(item for item in ranked if not matches_published_event(item,used))
        self.assertEqual(chosen["event_key"],"event-2")

    def test_rank_one_and_two_used_then_rank_three_selected(self):
        used=[{"event_key":f"event-{i}","title":f"Event {i}","source_urls":[f"https://meta.com/{i}"]} for i in (1,2)]
        ranked=[{"event_key":f"event-{i}","title":f"Event {i}","candidate":{"url":f"https://meta.com/{i}"}} for i in (1,2,3)]
        chosen=next(item for item in ranked if not matches_published_event(item,used))
        self.assertEqual(chosen["event_key"],"event-3")

    def test_no_candidate_meets_score_threshold(self):
        ranked=[{"score":7,"event_key":"low","title":"Low"}]
        eligible=[item for item in ranked if item.get("score",0)>=8]
        self.assertEqual(eligible,[])


if __name__ == "__main__":
    unittest.main()
