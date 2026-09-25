from __future__ import annotations

import unittest
from unittest.mock import patch

from .url_evidence import equivalent_url, normalize_url


class UrlEvidenceTests(unittest.TestCase):
    def test_trailing_slash_tracking_and_fragment_are_equivalent(self):
        self.assertEqual(normalize_url("https://EXAMPLE.com/article/#section?x"), "https://example.com/article")
        self.assertEqual(normalize_url("https://example.com/article/?utm_source=x&utm_campaign=y"), "https://example.com/article")

    def test_distinct_pages_and_required_query_parameters_are_preserved(self):
        self.assertNotEqual(normalize_url("https://example.com/article?id=1"), normalize_url("https://example.com/article?id=2"))
        self.assertNotEqual(normalize_url("https://example.com/article"), normalize_url("https://example.com/another-article"))
        self.assertEqual(normalize_url("https://example.com/article?id=1&utm_source=x"), "https://example.com/article?id=1")

    def test_duplicate_source_after_normalization(self):
        urls = ["https://example.com/a?utm_source=x", "https://EXAMPLE.com/a/"]
        self.assertEqual(len({normalize_url(url) for url in urls}), 1)

    def test_redirect_equivalence(self):
        def resolver(url):
            return ("https://example.com/new/path" if url.endswith("/old") else url, "")
        self.assertTrue(equivalent_url("https://example.com/old", "https://example.com/new/path", resolver))

    def test_canonical_equivalence(self):
        def resolver(url):
            return url, "https://example.com/canonical/article" if url.endswith("/amp") else ""
        self.assertTrue(equivalent_url("https://example.com/amp", "https://example.com/canonical/article", resolver))

    def test_real_path_difference_is_not_collapsed_by_domain(self):
        self.assertFalse(equivalent_url("https://example.com/a", "https://example.com/b", lambda url: (url, "")))


if __name__ == "__main__":
    unittest.main()
