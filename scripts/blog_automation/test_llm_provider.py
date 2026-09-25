from __future__ import annotations

import json
import os
import unittest
import urllib.error
from unittest.mock import MagicMock, patch

from . import gemini, llm_provider as llm


class HttpResponse:
    def __init__(self, data): self.data = json.dumps(data).encode()
    def __enter__(self): return self
    def __exit__(self, *args): return False
    def read(self): return self.data


def completion(text, model="test-model"):
    return {"model": model, "choices": [{"message": {"content": text}}], "usage": {"total_tokens": 7}}


def cf_completion(text, model="@cf/test"):
    return {"success": True, "result": {"response": text}, "model": model, "usage": {"total_tokens": 8}}


class ProviderFallbackTests(unittest.TestCase):
    def setUp(self):
        gemini.reset_state()
        llm.reset_state()
        self.env = patch.dict(os.environ, {"GEMINI_API_KEY": "mock-gemini", "OPENROUTER_API_KEY": "mock-router",
                                          "CLOUDFLARE_API_TOKEN": "mock-cf", "CLOUDFLARE_ACCOUNT_ID": "account",
                                          "MAX_OPENROUTER_HTTP_REQUESTS_PER_RUN": "3",
                                          "MAX_CLOUDFLARE_AI_HTTP_REQUESTS_PER_RUN": "3"}, clear=True)
        self.env.start()
        self.addCleanup(self.env.stop)
        self.sleep = patch("scripts.blog_automation.llm_provider.time.sleep")
        self.sleep.start()
        self.addCleanup(self.sleep.stop)

    def _gemini(self, text="OK", search_sources=None):
        return patch("scripts.blog_automation.llm_provider.gemini.call", return_value=(text, search_sources or []))

    def _operational(self, circuit="SERVICE_UNAVAILABLE"):
        return gemini.GeminiOperationalError(circuit, "mock outage")

    def test_a_gemini_success_never_calls_fallbacks(self):
        with self._gemini("{\"sections\":[]}") as primary, \
             patch("scripts.blog_automation.llm_provider.urllib.request.urlopen") as request:
            response = llm.call_llm("prompt", "Article generation", require_json=True)
        self.assertEqual(response.provider, "Gemini")
        primary.assert_called_once()
        request.assert_not_called()

    def test_b_gemini_503_falls_back_to_openrouter(self):
        with patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=self._operational()), \
             patch("scripts.blog_automation.llm_provider.urllib.request.urlopen", return_value=HttpResponse(completion("OK"))) as request:
            response = llm.call_llm("prompt", "Selector")
        self.assertEqual(response.provider, "OpenRouter")
        request.assert_called_once()

    def test_c_gemini_quota_falls_back_to_openrouter(self):
        with patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=self._operational("DAILY_QUOTA")), \
             patch("scripts.blog_automation.llm_provider.urllib.request.urlopen", return_value=HttpResponse(completion("OK"))):
            self.assertEqual(llm.call_llm("prompt", "Selector").provider, "OpenRouter")

    def test_d_openrouter_429_budget_exhaustion_falls_to_cloudflare(self):
        outage = self._operational()
        def route(request, timeout=120):
            if "openrouter" in request.full_url:
                raise urllib.error.HTTPError(request.full_url, 429, "rate limited", {}, None)
            return HttpResponse(cf_completion("OK"))
        with patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=outage), \
             patch("scripts.blog_automation.llm_provider.urllib.request.urlopen", side_effect=route) as request:
            response = llm.call_llm("prompt", "Selector")
        self.assertEqual(response.provider, "Cloudflare Workers AI")
        self.assertEqual(request.call_count, 4)
        self.assertEqual(llm.OPENROUTER_REQUESTS, 3)

    def test_e_missing_openrouter_secret_skips_to_cloudflare(self):
        os.environ["OPENROUTER_API_KEY"] = ""
        with patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=self._operational()), \
             patch("scripts.blog_automation.llm_provider.urllib.request.urlopen", return_value=HttpResponse(cf_completion("OK"))) as request:
            response = llm.call_llm("prompt", "Selector")
        self.assertEqual(response.provider, "Cloudflare Workers AI")
        self.assertTrue("cloudflare" in request.call_args.args[0].full_url)

    def test_f_all_providers_fail_without_publication_path(self):
        os.environ["OPENROUTER_API_KEY"] = ""
        os.environ["CLOUDFLARE_API_TOKEN"] = ""
        with patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=self._operational()):
            with self.assertRaises(llm.LLMProvidersUnavailable):
                llm.call_llm("prompt", "Article generation")

    def test_g_invalid_openrouter_json_falls_to_cloudflare(self):
        os.environ["GEMINI_API_KEY"] = ""
        def route(request, timeout=120):
            if "openrouter" in request.full_url:
                return HttpResponse(completion("not JSON"))
            return HttpResponse(cf_completion('{"sections":[]}'))
        with patch("scripts.blog_automation.llm_provider.urllib.request.urlopen", side_effect=route):
            response = llm.call_llm("prompt", "Article generation", require_json=True)
        self.assertEqual(response.provider, "Cloudflare Workers AI")

    def test_h_cloudflare_json_response_is_accepted_by_common_contract(self):
        os.environ["GEMINI_API_KEY"] = ""
        os.environ["OPENROUTER_API_KEY"] = ""
        with patch("scripts.blog_automation.llm_provider.urllib.request.urlopen", return_value=HttpResponse(cf_completion('{"sections":[]}'))):
            response = llm.call_llm("prompt", "Article generation", require_json=True)
        self.assertEqual(response.model, "@cf/test")
        self.assertEqual(response.usage["total_tokens"], 8)

    def test_i_article_generation_prompt_does_not_enable_search_and_sources_are_whitelisted(self):
        from .generate_article import generate
        primary, external = "https://vendor.example/news", "https://unapproved.example/fake"
        story = {"title": "Vendor Announces a Substantial Developer Platform Improvement", "sources": [primary],
                 "candidate": {"url": primary, "publisher": "Vendor", "title": "Official announcement"}}
        payload = json.dumps({"sections": [], "sources": [{"label": "Primary", "url": primary},
                                                              {"label": "invented", "url": external}]})
        response = llm.LLMResponse("OpenRouter", "test", payload, [external])
        with patch("scripts.blog_automation.generate_article.call_llm", return_value=response) as call:
            article = generate(story, "2026-09-25")
        self.assertFalse(call.call_args.kwargs["search"])
        self.assertEqual([s["url"] for s in article["sources"]], [primary])

    def test_j_failed_provider_is_not_called_again_in_same_run(self):
        os.environ["OPENROUTER_API_KEY"] = ""
        os.environ["CLOUDFLARE_API_TOKEN"] = ""
        with patch("scripts.blog_automation.llm_provider.gemini.call", side_effect=self._operational()) as primary:
            for _ in range(2):
                with self.assertRaises(llm.LLMProvidersUnavailable):
                    llm.call_llm("prompt", "Selector")
        primary.assert_called_once()


if __name__ == "__main__":
    unittest.main()
