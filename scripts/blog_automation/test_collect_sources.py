from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.parse import urlsplit

from .collect_sources import collect


class Response:
    def __init__(self, body: bytes, url: str): self.body, self.url = body, url
    def __enter__(self): return self
    def __exit__(self, *args): return False
    def read(self, _limit): return self.body
    def geturl(self): return self.url


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
            return Response(body, request.full_url)
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

    def test_namespaced_publication_dates_are_read_from_rss_and_atom(self):
        feeds = [
            {"name": "Namespaced RSS", "company": "A", "url": "https://example.test/rss"},
            {"name": "Namespaced Atom", "company": "B", "url": "https://example.test/atom"},
        ]
        rss = b'''<rss xmlns:dc="http://purl.org/dc/elements/1.1/" version="2.0"><channel><item><title>Google-style dated release</title><link>https://example.test/release</link><dc:date>2026-09-24T14:00:00Z</dc:date></item></channel></rss>'''
        atom = b'''<feed xmlns="http://www.w3.org/2005/Atom" xmlns:dcterms="http://purl.org/dc/terms/"><entry><title>Namespaced Atom release</title><link href="https://example.test/atom-release"/><dcterms:issued>2026-09-24T14:00:00Z</dcterms:issued></entry></feed>'''
        candidates, stats = self.run_feeds(feeds, {feeds[0]["url"]: rss, feeds[1]["url"]: atom})
        self.assertEqual([c["title"] for c in candidates], ["Google-style dated release", "Namespaced Atom release"])
        self.assertTrue(all(stat["ok"] for stat in stats))

    def test_official_jsonld_article_is_structured_and_date_filtered(self):
        feed = {"name": "Official page", "company": "A", "url": "https://example.test/news", "primary": True}
        page = b'''<html><script type="application/ld+json">{"@context":"https://schema.org","@type":"NewsArticle","headline":"Confirmed release","url":"https://example.test/news/release","datePublished":"2026-09-24T10:00:00-04:00","description":"Release details"}</script></html>'''
        candidates, stats = self.run_feeds([feed], {feed["url"]: page})
        self.assertEqual(stats[0]["type"], "HTML + JSON-LD")
        self.assertEqual(stats[0]["parsed"], 1)
        self.assertEqual(stats[0]["today"], 1)
        self.assertEqual(candidates[0]["url"], "https://example.test/news/release")

    def test_html_listing_works_without_jsonld_when_card_has_official_date(self):
        feed = {"name": "Official newsroom", "company": "A", "url": "https://example.test/news", "primary": True}
        page = b'''<html><article><time datetime="2026-09-24T10:00:00-04:00">September 24, 2026</time><a href="https://www.example.test/news/release">Official release title with enough detail</a></article></html>'''
        candidates, stats = self.run_feeds([feed], {feed["url"]: page})
        self.assertTrue(stats[0]["ok"])
        self.assertEqual(stats[0]["type"], "HTML listing")
        self.assertEqual(stats[0]["today"], 1)
        self.assertEqual(candidates[0]["url"], "https://www.example.test/news/release")

    def test_broken_feed_falls_back_to_html_listing(self):
        feed = {"name": "Company RSS and HTML", "company": "A", "url": "https://example.test/feed.xml", "html_url": "https://example.test/news", "primary": True}
        page = b'''<html><article><time datetime="2026-09-24">September 24, 2026</time><a href="/news/release">A reliable official release headline</a></article></html>'''
        candidates, stats = self.run_feeds([feed], {feed["url"]: OSError("feed broken"), feed["html_url"]: page})
        self.assertTrue(stats[0]["ok"])
        self.assertIn("feed: OSError", stats[0]["error"])
        self.assertEqual(candidates[0]["published_date"], "2026-09-24")

    def test_discovered_first_party_rss_is_preferred_to_html_cards(self):
        feed = {"name": "Official page", "company": "A", "url": "https://example.test/news", "primary": True}
        page = b'''<html><head><link rel="alternate" type="application/rss+xml" href="/feed.xml"></head><article><time datetime="2026-09-24">September 24, 2026</time><a href="/news/html">HTML list story title</a></article></html>'''
        rss = b'<rss version="2.0"><channel><item><title>RSS story title</title><link>https://example.test/news/rss</link><pubDate>Thu, 24 Sep 2026 16:00:00 +0000</pubDate></item></channel></rss>'
        candidates, stats = self.run_feeds([feed], {feed["url"]: page, "https://example.test/feed.xml": rss})
        self.assertEqual(stats[0]["type"], "RSS")
        self.assertEqual(candidates[0]["url"], "https://example.test/news/rss")

    def test_html_fallback_never_accepts_non_official_hosts_or_undated_cards(self):
        feed = {"name": "Official page", "company": "A", "url": "https://example.test/news", "primary": True}
        page = b'''<html><article><time datetime="2026-09-24">September 24, 2026</time><a href="https://thirdparty.test/news/story">A plausible third party report title</a></article><article><a href="/news/no-date">An undated official story headline</a></article></html>'''
        candidates, stats = self.run_feeds([feed], {feed["url"]: page})
        self.assertFalse(stats[0]["ok"])
        self.assertEqual(candidates, [])

    def test_all_eleven_formerly_broken_sources_have_an_official_html_fallback(self):
        config = json.loads((Path.cwd() / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
        names = {"Anthropic Newsroom", "Google DeepMind", "Google Cloud Blog", "Meta AI Blog",
                 "IBM Newsroom Announcements", "Oracle Blogs", "Adobe Newsroom", "Qualcomm Releases",
                 "xAI News", "Tesla Blog", "Rockstar Newswire"}
        feeds = [feed for feed in config["feeds"] if feed["name"] in names]
        self.assertEqual({feed["name"] for feed in feeds}, names)
        for feed in feeds:
            self.assertTrue(feed.get("html_url"), feed["name"])
            host = urlsplit(feed["html_url"]).hostname
            self.assertTrue(any(host == allowed or host.endswith("." + allowed) for allowed in feed["allowed_hosts"]))

    def test_google_developers_and_microsoft_source_have_official_html_fallbacks(self):
        config = json.loads((Path.cwd() / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
        feeds = {feed["name"]: feed for feed in config["feeds"]}
        self.assertEqual(feeds["Google Developers"]["html_url"], "https://developers.googleblog.com/")
        self.assertEqual(feeds["Microsoft Source"]["allowed_hosts"], ["microsoft.com"])
        self.assertEqual(feeds["Microsoft Source"]["html_url"], "https://news.microsoft.com/source/")

    def test_html_listing_is_parsed_for_each_repaired_official_host(self):
        config = json.loads((Path.cwd() / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
        names = {"Anthropic Newsroom", "Google DeepMind", "Google Cloud Blog", "Meta AI Blog",
                 "IBM Newsroom Announcements", "Oracle Blogs", "Adobe Newsroom", "Qualcomm Releases",
                 "xAI News", "Tesla Blog", "Rockstar Newswire"}
        for source in (feed for feed in config["feeds"] if feed["name"] in names):
            feed = {**source, "url": source["html_url"]}
            host = source["allowed_hosts"][0]
            page = f'<html><article><time datetime="2026-09-24">Sep 24, 2026</time><a href="https://{host}/news/validated-test-story">{source["name"]} officially announces a substantive new technology</a></article></html>'.encode()
            candidates, stats = self.run_feeds([feed], {feed["url"]: page})
            self.assertTrue(stats[0]["ok"], source["name"] + ": " + stats[0]["error"])
            self.assertEqual(candidates[0]["company"], source["company"])

    def test_jsonld_page_without_article_schema_is_not_counted_as_covered(self):
        feed = {"name": "Unstructured official page", "company": "A", "url": "https://example.test/news"}
        candidates, stats = self.run_feeds([feed], {feed["url"]: b"<html><h1>News</h1></html>"})
        self.assertFalse(stats[0]["ok"])
        self.assertIn("no official article cards", stats[0]["error"])
        self.assertEqual(candidates, [])


if __name__ == "__main__":
    unittest.main()
