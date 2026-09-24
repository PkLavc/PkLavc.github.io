from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from .publish_article import filter_duplicate_candidates


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


if __name__ == "__main__":
    unittest.main()
