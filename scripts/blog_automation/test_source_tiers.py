from __future__ import annotations
import json
import urllib.error
import unittest
from unittest.mock import MagicMock, patch

from .select_story import _company_official, verify_evidence


DAY = "2026-09-24"
PRIMARY = "https://developers.googleblog.com/2026/09/orion-android-model.html"
STORY = {
    "title": "Google Announces Orion Model for Android Developers",
    "confirmed_event_date": DAY,
    "event_key": "google_orion_android_model",
    "score": 9,
    "company": "Google",
    "factual_summary": "Google announced the Orion model and its Android developer features.",
    "candidate": {"id": 1, "url": PRIMARY, "title": "Google announces Orion model for Android developers",
                  "published_date": DAY, "primary": True, "company": "Google", "publisher": "Google Developers"},
}


def response(url: str, title: str, body: str, date: str = DAY):
    value = MagicMock()
    value.__enter__.return_value.status = 200
    value.__enter__.return_value.geturl.return_value = url
    value.__enter__.return_value.headers.get.return_value = "text/html"
    value.__enter__.return_value.read.return_value = (
        f'<html><head><title>{title}</title><meta property="article:published_time" content="{date}T10:00:00-03:00">'
        f'<link rel="canonical" href="{url}"></head><body><h1>{title}</h1><p>{body}</p></body></html>'
    ).encode()
    return value


class TieredEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.official = response(PRIMARY, "Google Announces Orion Model for Android Developers",
                                 "Google announced the Orion model for Android developers.")

    def _pages(self, pages):
        def open_url(request, timeout=15):
            url = request.full_url
            if url in pages:
                return pages[url]
            raise AssertionError(f"Unexpected URL fetched: {url}")
        return patch("scripts.blog_automation.select_story.urllib.request.urlopen", side_effect=open_url)

    def test_a_primary_only_is_sufficient_when_no_secondary_is_found(self):
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [], "_grounded": []}
        with self._pages({PRIMARY: self.official}), patch(
            "scripts.blog_automation.select_story.call", return_value=(json.dumps({"sources": []}), [])
        ) as call:
            result = verify_evidence(story, DAY, [], allow_enrichment=True)
        self.assertEqual(result["evidence_status"], "PRIMARY_ONLY")
        self.assertEqual(result["sources"], [PRIMARY])
        call.assert_called_once()

    def test_b_official_plus_official_documentation(self):
        docs = "https://developer.android.com/studio/orion"
        pages = {PRIMARY: self.official, docs: response(docs, "Orion Model Android Studio Developer Features",
                                                        "Google Orion model Android Studio developer integration.")}
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [docs],
                 "source_details": [{"url": docs, "why_same_event": "Android Studio documents the same Google Orion model developer feature."}], "_grounded": []}
        with self._pages(pages):
            result = verify_evidence(story, DAY, [], allow_enrichment=False)
        self.assertEqual(result["evidence_status"], "MULTI_SOURCE")
        self.assertEqual(result["sources"], [PRIMARY, docs])

    def test_c_official_plus_reuters_is_valid(self):
        url = "https://www.reuters.com/technology/google-orion-model-android-developers-2026-09-24/"
        pages = {PRIMARY: self.official, url: response(url, "Google Orion Model Targets Android Developers",
                                                       "Google said the Orion model will support Android developers.")}
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [url],
                 "source_details": [{"url": url, "why_same_event": "Reuters independently reports Google's Orion model announcement for Android developers."}], "_grounded": []}
        with self._pages(pages):
            result = verify_evidence(story, DAY, [], allow_enrichment=False)
        self.assertEqual(result["evidence_status"], "MULTI_SOURCE")
        self.assertEqual(result["evidence"][1]["tier"], "B")
        self.assertEqual(result["evidence"][1]["publisher"], "Reuters")

    def test_d_official_plus_ars_technica_is_valid(self):
        url = "https://arstechnica.com/tech-policy/2026/09/google-orion-model-android-developers/"
        pages = {PRIMARY: self.official, url: response(url, "Google Orion Model for Android Developers",
                                                       "Google's Orion model adds capabilities for Android developers.")}
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [url],
                 "source_details": [{"url": url, "why_same_event": "Ars Technica analyzes Google's Orion model for Android developers."}], "_grounded": []}
        with self._pages(pages):
            result = verify_evidence(story, DAY, [], allow_enrichment=False)
        self.assertEqual(result["evidence_status"], "MULTI_SOURCE")
        self.assertEqual(result["evidence"][1]["publisher"], "Ars Technica")

    def test_e_unknown_publisher_is_not_used_as_evidence(self):
        unknown = "https://unknown-seo.example/google-orion-android"
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [unknown], "_grounded": []}
        with self._pages({PRIMARY: self.official}):
            result = verify_evidence(story, DAY, [], allow_enrichment=False)
        self.assertEqual(result["evidence_status"], "PRIMARY_ONLY")
        self.assertEqual(result["sources"], [PRIMARY])

    def test_f_two_independent_tier_b_publishers_require_company_attribution(self):
        reuters = "https://reuters.com/technology/google-orion-android/"
        ap = "https://apnews.com/article/google-orion-android-developers"
        inaccessible = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [reuters, ap],
                        "source_details": [
                            {"url": reuters, "why_same_event": "Reuters reports the same Google Orion announcement.", "attributed_confirmation": True},
                            {"url": ap, "why_same_event": "AP reports the same Google Orion announcement.", "attributed_confirmation": False}],
                        "_grounded": []}
        pages = {reuters: response(reuters, "Google Orion Model for Android Developers",
                                   "Google confirmed its Orion model for Android developers."),
                 ap: response(ap, "Google Orion Android Model Announced",
                              "Google's Orion model will support Android developers.")}
        def open_url(request, timeout=15):
            if request.full_url == PRIMARY:
                raise urllib.error.HTTPError(PRIMARY, 503, "unavailable", {}, None)
            return pages[request.full_url]
        with patch("scripts.blog_automation.select_story.urllib.request.urlopen", side_effect=open_url):
            result = verify_evidence(inaccessible, DAY, [], allow_enrichment=False)
        self.assertEqual(result["evidence_status"], "TRUSTED_SECONDARY")
        self.assertEqual(len(result["sources"]), 2)

    def test_g_one_nonofficial_story_does_not_qualify(self):
        wired = "https://wired.com/story/google-orion-android-developers/"
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": [wired], "_grounded": []}
        pages = {wired: response(wired, "Google Orion Model for Android Developers", "Google announced the Orion model.")}
        def open_url(request, timeout=15):
            if request.full_url == PRIMARY:
                raise urllib.error.HTTPError(PRIMARY, 503, "unavailable", {}, None)
            return pages[request.full_url]
        with patch("scripts.blog_automation.select_story.urllib.request.urlopen", side_effect=open_url):
            result = verify_evidence(story, DAY, [], allow_enrichment=False)
        self.assertIsNone(result)

    def test_h_rumor_sites_without_attribution_do_not_qualify(self):
        urls = ["https://reuters.com/rumor/google-orion", "https://apnews.com/rumor/google-orion",
                "https://arstechnica.com/rumor/google-orion"]
        story = {**STORY, "candidate": dict(STORY["candidate"]), "source_urls": urls, "_grounded": [],
                 "source_details": [{"url": url, "why_same_event": "Unconfirmed rumor about a possible Google Orion model.",
                                     "attributed_confirmation": False} for url in urls]}
        pages = {url: response(url, "Rumor: Google Orion Android Developers",
                               "Unconfirmed rumor says Google may release an Orion Android model.") for url in urls}
        def open_url(request, timeout=15):
            if request.full_url == PRIMARY:
                raise urllib.error.HTTPError(PRIMARY, 503, "unavailable", {}, None)
            return pages[request.full_url]
        with patch("scripts.blog_automation.select_story.urllib.request.urlopen", side_effect=open_url):
            result = verify_evidence(story, DAY, [], allow_enrichment=False)
        self.assertIsNone(result)

    def test_i_developer_android_is_configured_google_tier_a(self):
        from .select_story import _config
        config = _config()
        self.assertTrue(_company_official("developer.android.com", "Google", config))
        self.assertTrue(_company_official("api.developer.android.com", "Google", config))


if __name__ == "__main__":
    unittest.main()
