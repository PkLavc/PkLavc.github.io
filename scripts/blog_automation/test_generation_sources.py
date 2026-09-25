from __future__ import annotations

import json
import unittest
from unittest.mock import patch

from .generate_article import generate
from .llm_provider import LLMResponse


def llm(answer, provider="Gemini", sources=None):
    return LLMResponse(provider, "test-model", answer, sources or [])


class ArticleSourceFilteringTests(unittest.TestCase):
    def test_primary_only_article_may_cite_one_verified_official_source(self):
        primary = "https://vendor.example/news"
        story = {"title": "Vendor Ships an Important Developer Platform Feature",
                 "evidence_status": "PRIMARY_ONLY", "sources": [primary],
                 "candidate": {"url": primary, "publisher": "Vendor", "title": "Official launch"}}
        answer = json.dumps({"sections": [], "limitations": [], "sources": [
            {"label": "Official launch", "url": primary},
        ]})
        with patch("scripts.blog_automation.generate_article.call_llm", return_value=llm(answer)):
            article = generate(story, "2026-09-24")
        self.assertEqual([source["url"] for source in article["sources"]], [primary])

    def test_unselected_grounding_results_are_not_added_as_citations(self):
        primary = "https://vendor.example/news"
        docs = "https://docs.vendor.example/api"
        unrelated = "https://unrelated.example/story"
        story = {"title": "Vendor Ships an Important Developer Platform Feature",
                 "sources": [primary, docs],
                 "candidate": {"url": primary, "publisher": "Vendor", "title": "Official launch"}}
        answer = json.dumps({"sections": [], "limitations": [], "sources": [
            {"label": "Official launch", "url": primary},
            {"label": "API documentation", "url": docs},
            {"label": "Unrelated search result", "url": unrelated},
        ]})
        with patch("scripts.blog_automation.generate_article.call_llm", return_value=llm(answer, "OpenRouter", [unrelated])):
            article = generate(story, "2026-09-24")
        self.assertEqual([source["url"] for source in article["sources"]], [primary, docs])
        self.assertEqual(story["sources"], [primary, docs])


if __name__ == "__main__":
    unittest.main()
