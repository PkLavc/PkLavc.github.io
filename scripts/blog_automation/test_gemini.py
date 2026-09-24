from __future__ import annotations

import json
import os
import unittest
import urllib.error
from unittest.mock import patch

from .gemini import call


class Response:
    def __init__(self, payload: dict):
        self.payload = json.dumps(payload).encode()
    def __enter__(self): return self
    def __exit__(self, *args): return False
    def read(self): return self.payload


class GeminiRetryTests(unittest.TestCase):
    def test_retries_transient_http_failure(self):
        valid = Response({"candidates": [{"content": {"parts": [{"text": "OK"}]}}]})
        failure = urllib.error.HTTPError("https://example.test", 503, "Unavailable", {}, None)
        with patch.dict(os.environ, {"GEMINI_API_KEY": "test-only"}), \
             patch("urllib.request.urlopen", side_effect=[failure, valid]), \
             patch("scripts.blog_automation.gemini.time.sleep"):
            text, _ = call("test")
        self.assertEqual(text, "OK")

    def test_retries_empty_model_response(self):
        empty = Response({"candidates": [{"finishReason": "STOP", "content": {"parts": []}}]})
        valid = Response({"candidates": [{"content": {"parts": [{"text": "OK"}]}}]})
        with patch.dict(os.environ, {"GEMINI_API_KEY": "test-only"}), \
             patch("urllib.request.urlopen", side_effect=[empty, valid]), \
             patch("scripts.blog_automation.gemini.time.sleep"):
            text, _ = call("test")
        self.assertEqual(text, "OK")


if __name__ == "__main__":
    unittest.main()
