from __future__ import annotations

import io
import json
import os
import tempfile
import unittest
import urllib.error
from contextlib import redirect_stdout
from pathlib import Path
from unittest.mock import patch

from . import gemini, run


class Response:
    def __init__(self, text: str = "OK"):
        self.payload = json.dumps({"candidates": [{"content": {"parts": [{"text": text}]}}]}).encode()

    def __enter__(self): return self
    def __exit__(self, *args): return False
    def read(self): return self.payload


def http_error(code: int, reason: str = "", retry_after: str | None = None, message: str = "Temporary failure"):
    body = {"error": {"code": code, "status": "RESOURCE_EXHAUSTED" if code == 429 else "UNAVAILABLE",
                      "message": message, "details": [{"reason": reason}] if reason else []}}
    headers = {"Retry-After": retry_after} if retry_after else {}
    return urllib.error.HTTPError("https://example.test", code, "test", headers, io.BytesIO(json.dumps(body).encode()))


class Clock:
    def __init__(self):
        self.now = 0.0
        self.delays = []

    def monotonic(self): return self.now

    def sleep(self, seconds):
        self.delays.append(seconds)
        self.now += seconds


class GeminiRetryTests(unittest.TestCase):
    def setUp(self):
        gemini.reset_state()
        self.clock = Clock()
        self.env = patch.dict(os.environ, {"GEMINI_API_KEY": "test-only", "MAX_GEMINI_HTTP_REQUESTS_PER_RUN": "6"})
        self.time = patch("scripts.blog_automation.gemini.time.monotonic", side_effect=self.clock.monotonic)
        self.sleep = patch("scripts.blog_automation.gemini.time.sleep", side_effect=self.clock.sleep)
        self.jitter = patch("scripts.blog_automation.gemini.random.uniform", return_value=1.0)
        for context in (self.env, self.time, self.sleep, self.jitter):
            context.start()
            self.addCleanup(context.stop)
        self.addCleanup(gemini.reset_state)

    def test_a_success_first_request(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", return_value=Response()) as send:
            self.assertEqual(gemini.call("test", purpose="Selector")[0], "OK")
        send.assert_called_once()
        self.assertEqual(gemini.request_count(), 1)
        self.assertEqual(gemini.LOGICAL_CALLS["Selector"], 1)
        self.assertEqual(self.clock.delays, [])

    def test_b_503_then_success(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[http_error(503), Response()]):
            self.assertEqual(gemini.call("test")[0], "OK")
        self.assertEqual(gemini.request_count(), 2)
        self.assertEqual(self.clock.delays, [30])
        self.assertEqual(gemini.LOGICAL_CALLS["Article generation"], 1)

    def test_c_two_503_then_success(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[http_error(503), http_error(503), Response()]):
            self.assertEqual(gemini.call("test")[0], "OK")
        self.assertEqual(self.clock.delays, [30, 90])
        self.assertEqual(gemini.request_count(), 3)

    def test_d_503_stops_after_three_requests(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[http_error(503) for _ in range(3)]) as send:
            with self.assertRaises(gemini.GeminiOperationalError):
                gemini.call("test")
        self.assertEqual(send.call_count, 3)
        self.assertEqual(gemini.CIRCUIT_BREAKER, "SERVICE_UNAVAILABLE")

    def test_network_failure_uses_service_cooldown(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[urllib.error.URLError("offline"), Response()]):
            self.assertEqual(gemini.call("test")[0], "OK")
        self.assertEqual(self.clock.delays, [30])
        self.assertEqual(gemini.HTTP_RESULTS["Other errors"], 1)

    def test_e_rate_limit_uses_retry_after(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[http_error(429, "RATE_LIMIT_EXCEEDED", "75"), Response()]):
            gemini.call("test")
        self.assertEqual(self.clock.delays, [75])
        self.assertEqual(gemini.HTTP_RESULTS["429"], 1)

    def test_f_rate_limit_without_retry_after_uses_60_then_180(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[http_error(429), http_error(429), Response()]):
            gemini.call("test")
        self.assertEqual(self.clock.delays, [60, 180])

    def test_g_too_many_requests_has_same_cooldown(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[http_error(429, "TOO_MANY_REQUESTS"), Response()]):
            gemini.call("test")
        self.assertEqual(self.clock.delays, [60])

    def test_h_daily_quota_never_retries_and_i_breaker_blocks_later_calls(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=http_error(429, "QUOTA_EXCEEDED")) as send:
            with self.assertRaises(gemini.GeminiOperationalError):
                gemini.call("selector", purpose="Selector")
            with self.assertRaises(gemini.GeminiOperationalError):
                gemini.call("article", purpose="Article generation")
        send.assert_called_once()
        self.assertEqual(gemini.CIRCUIT_BREAKER, "DAILY_QUOTA")
        self.assertEqual(gemini.LOGICAL_CALLS["Article generation"], 0)

    def test_j_six_request_budget_includes_retries(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", return_value=Response()) as send:
            for _ in range(6):
                gemini.call("test")
            with self.assertRaises(gemini.GeminiOperationalError):
                gemini.call("test")
        self.assertEqual(send.call_count, 6)
        self.assertEqual(gemini.CIRCUIT_BREAKER, "REQUEST_BUDGET")

    def test_k_minimum_interval_between_logical_calls(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", return_value=Response()):
            gemini.call("selector", purpose="Selector")
            gemini.call("article", purpose="Article generation")
        self.assertEqual(self.clock.delays, [15])
        self.assertEqual(gemini.LOGICAL_CALLS["Selector"], 1)
        self.assertEqual(gemini.LOGICAL_CALLS["Article generation"], 1)

    def test_cooldown_cap_stops_before_hours_long_retry_after(self):
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=http_error(429, "RATE_LIMIT_EXCEEDED", "3600")) as send:
            with self.assertRaises(gemini.GeminiOperationalError):
                gemini.call("test")
        send.assert_called_once()
        self.assertEqual(self.clock.delays, [])
        self.assertEqual(gemini.CIRCUIT_BREAKER, "RATE_LIMIT")

    def test_nontransient_error_is_immediate_and_log_is_sanitized(self):
        log = io.StringIO()
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=http_error(
            400, "INVALID_ARGUMENT", message="Invalid key=test-only for private prompt at https://example.test/private")) as send, redirect_stdout(log):
            with self.assertRaises(RuntimeError):
                gemini.call("private prompt")
        send.assert_called_once()
        self.assertNotIn("test-only", log.getvalue())
        self.assertNotIn("private prompt", log.getvalue())

    def test_empty_model_response_retries_as_service_failure(self):
        empty = Response("")
        with patch("scripts.blog_automation.gemini.urllib.request.urlopen", side_effect=[empty, Response()]):
            self.assertEqual(gemini.call("test")[0], "OK")
        self.assertEqual(self.clock.delays, [30])

    def test_m_n_generation_quota_exits_without_partial_publication(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "scripts/blog_automation").mkdir(parents=True)
            (root / "scripts/blog_automation/sources.json").write_text('{"topics":[]}', encoding="utf-8")
            used = root / "scripts/blog_automation/used_stories.json"
            used.write_text('{"stories":[]}', encoding="utf-8")
            (root / "blog").mkdir()
            (root / "images/og/blog").mkdir(parents=True)
            protected = [used, root / "blog/posts.json", root / "blog/index.html", root / "feed.xml", root / "sitemap.xml"]
            for path in protected[1:]:
                path.write_text("unchanged", encoding="utf-8")
            story = {"event_key": "new-event", "candidate": {"url": "https://google.com/new"}, "sources": ["https://google.com/new"]}
            def selector(*args):
                return [story]
            def generation(*args):
                from . import llm_provider
                llm_provider.call_llm("article", purpose="Article generation")
            with patch("sys.argv", ["run", "--root", str(root)]), \
                 patch("scripts.blog_automation.run.collect", return_value=([story], [])), \
                 patch("scripts.blog_automation.run.filter_today", return_value=[story]), \
                 patch("scripts.blog_automation.run.filter_duplicate_candidates", return_value=[story]), \
                 patch("scripts.blog_automation.run.published_today", return_value=[]), \
                 patch("scripts.blog_automation.run.select", side_effect=selector), \
                 patch("scripts.blog_automation.run.choose_ranked", return_value=story), \
                 patch("scripts.blog_automation.run.generate", side_effect=generation), \
                 patch.dict(os.environ, {"GEMINI_API_KEY": "mock", "OPENROUTER_API_KEY": "", "CLOUDFLARE_API_TOKEN": "", "CLOUDFLARE_ACCOUNT_ID": ""}), \
                 patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=gemini.GeminiOperationalError("DAILY_QUOTA", "quota exhausted")), \
                 patch("scripts.blog_automation.run.publish") as publish, \
                 redirect_stdout(io.StringIO()) as log:
                run.main()
            publish.assert_not_called()
            self.assertEqual(used.read_text(encoding="utf-8"), '{"stories":[]}')
            self.assertTrue(all(path.read_text(encoding="utf-8") == ('{"stories":[]}' if path == used else "unchanged") for path in protected))
            self.assertEqual({path.name for path in (root / "blog").iterdir()}, {"posts.json", "index.html"})
            self.assertEqual(list((root / "images/og/blog").iterdir()), [])
            self.assertIn("NO_POST_ALL_LLM_PROVIDERS_UNAVAILABLE", log.getvalue())


if __name__ == "__main__":
    unittest.main()
