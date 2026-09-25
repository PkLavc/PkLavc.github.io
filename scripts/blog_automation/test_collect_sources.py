from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from .collect_sources import collect


class Response:
    def __init__(self, body: bytes): self.body = body
    def __enter__(self): return self
    def __exit__(self, *args): return False
    def read(self, _limit): return self.body


class CollectSourcesTests(unittest.TestCase):
    def run_feeds(self, feeds, responses):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        root = Path(temp.name)
        config = root / "scripts/blog_automation"
        config.mkdir(parents=True)
        (config / "sources.json").write_text(json.dumps({"feeds": feeds}), encoding="utf-8")
        def open_url(request, timeout):
            body = responses[request.full_url]
            if isinstance(body, Exception): raise body
            return Response(body)
        with patch("scripts.blog_automation.collect_sources.urllib.request.urlopen", side_effect=open_url):
            return collect(root, "2026-09-24")

    def test_rss_timezone_date_and_unavailable_feed(self):
        feeds = [
            {"name": "RSS source", "company": "A", "url": "https://example.test/rss", "primary": True},
            {"name": "Down source", "company": "B", "url": "https://example.test/down", "primary": True},
        ]
        rss = b'<rss version="2.0"><channel><item><title>Local date rollover</title><link>https://example.test/story</link><pubDate>Fri, 25 Sep 2026 01:30:00 +0000</pubDate></item></channel></rss>'
        candidates, stats = self.run_feeds(feeds, {feeds[0]["url"]: rss, feeds[1]["url"]: OSError("offline")})
        self.assertEqual(candidates[0]["published_date"], "2026-09-24")
        self.assertEqual(stats[0]["type"], "RSS")
        self.assertEqual(stats[0]["today"], 1)
        self.assertFalse(stats[1]["ok"])
        self.assertIn("OSError", stats[1]["error"])

    def test_atom_entry_and_published_date_precedes_update(self):
        feed = {"name": "Atom source", "company": "C", "url": "https://example.test/atom", "primary": True}
        atom = b'''<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Atom story</title><link rel="self" href="https://example.test/feed"/><link rel="alternate" href="https://example.test/atom-story"/><published>2026-09-25T01:30:00Z</published><updated>2026-09-26T02:00:00Z</updated></entry></feed>'''
        candidates, stats = self.run_feeds([feed], {feed["url"]: atom})
        self.assertEqual(candidates[0]["url"], "https://example.test/atom-story")
        self.assertEqual(candidates[0]["published_date"], "2026-09-24")
        self.assertEqual(stats[0]["type"], "Atom")

    def test_official_jsonld_article_is_structured_and_date_filtered(self):
        feed = {"name": "Official page", "company": "A", "url": "https://example.test/news", "primary": True, "format": "jsonld"}
        page = b'''<html><script type="application/ld+json">{"@context":"https://schema.org","@type":"NewsArticle","headline":"Confirmed release","url":"https://example.test/news/release","datePublished":"2026-09-24T10:00:00-04:00","description":"Release details"}</script></html>'''
        candidates, stats = self.run_feeds([feed], {feed["url"]: page})
        self.assertEqual(stats[0]["type"], "HTML (JSON-LD Article)")
        self.assertEqual(stats[0]["parsed"], 1)
        self.assertEqual(stats[0]["today"], 1)
        self.assertEqual(candidates[0]["url"], "https://example.test/news/release")

    def test_jsonld_page_without_article_schema_is_not_counted_as_covered(self):
        feed = {"name": "Unstructured official page", "company": "A", "url": "https://example.test/news", "format": "jsonld"}
        candidates, stats = self.run_feeds([feed], {feed["url"]: b"<html><h1>News</h1></html>"})
        self.assertFalse(stats[0]["ok"])
        self.assertIn("no valid JSON-LD Article", stats[0]["error"])
        self.assertEqual(candidates, [])


if __name__ == "__main__":
    unittest.main()
