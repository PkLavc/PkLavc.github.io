from __future__ import annotations

import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from unittest.mock import patch

from . import llm_provider
from .run import generate_first_quality_valid_story, generate_render_validate
from .validate_article import ArticleQualityError


class ArticleProviderQualityFallbackTests(unittest.TestCase):
    def setUp(self):
        llm_provider.reset_state()

    def test_quality_failure_uses_next_provider_without_weakening_validation(self):
        with tempfile.TemporaryDirectory() as temp:
            providers = iter(["Gemini", "OpenRouter"])

            def generated(*args):
                llm_provider.PROVIDER_BY_PURPOSE["Article generation"] = next(providers)
                return {"sections": []}

            def validate(*args, **kwargs):
                if validate.call_count == 0:
                    validate.call_count += 1
                    raise ArticleQualityError("article has 1158 content words; minimum is 1,300")
                validate.call_count += 1
            validate.call_count = 0

            with patch("scripts.blog_automation.run.generate", side_effect=generated) as generate, \
                 patch("scripts.blog_automation.run.render", return_value=("new-story", "<html></html>")), \
                 patch("scripts.blog_automation.run.validate", side_effect=validate) as check:
                slug, document, article = generate_render_validate(Path(temp), {}, "2026-09-26", check_remote=True)

        self.assertEqual(slug, "new-story")
        self.assertEqual(document, "<html></html>")
        self.assertEqual(generate.call_count, 2)
        self.assertEqual(check.call_count, 2)
        self.assertEqual(llm_provider.STATES["Gemini"]["circuit"], "QUALITY_VALIDATION_FAILED")
        self.assertEqual(llm_provider.PROVIDER_BY_PURPOSE["Article generation"], "OpenRouter")

    def test_all_three_quality_failures_stop_without_returning_article(self):
        with tempfile.TemporaryDirectory() as temp:
            providers = iter(llm_provider.PROVIDERS)

            def generated(*args):
                llm_provider.PROVIDER_BY_PURPOSE["Article generation"] = next(providers)
                return {"sections": []}

            with patch("scripts.blog_automation.run.generate", side_effect=generated), \
                 patch("scripts.blog_automation.run.render", return_value=("bad", "<html></html>")), \
                 patch("scripts.blog_automation.run.validate", side_effect=ArticleQualityError("section is not substantive")) as check:
                with self.assertRaises(llm_provider.LLMProvidersUnavailable):
                    generate_render_validate(Path(temp), {}, "2026-09-26", check_remote=True)

        self.assertEqual(check.call_count, 3)
        self.assertTrue(all(llm_provider.STATES[p]["circuit"] == "QUALITY_VALIDATION_FAILED" for p in llm_provider.PROVIDERS))

    def test_all_providers_fail_first_candidate_then_second_candidate_succeeds(self):
        first = {"title": "First confirmed story with substantial technical impact", "candidate": {"url": "https://a.example/news"}}
        second = {"title": "Second confirmed story with substantial technical impact", "candidate": {"url": "https://b.example/news"}}
        exhausted = llm_provider.ArticleQualityProvidersExhausted("empty section", list(llm_provider.PROVIDERS))
        with tempfile.TemporaryDirectory() as temp, StringIO() as output, redirect_stdout(output), \
             patch("scripts.blog_automation.run.generate_render_validate", side_effect=[exhausted, ("second", "<html>second</html>", {"sections": []})]) as generate:
            result = generate_first_quality_valid_story(Path(temp), [first, second], "2026-09-26", check_remote=True)
            log = output.getvalue()

        self.assertEqual(result[0], second)
        self.assertEqual([call.args[1] for call in generate.call_args_list], [first, second])
        self.assertIn(first["title"], log)
        self.assertIn(first["candidate"]["url"], log)
        self.assertIn("providers tried=Gemini, OpenRouter, Cloudflare Workers AI", log)
        self.assertIn("Following ranked candidate 2", log)

    def test_first_valid_candidate_stops_before_second(self):
        first = {"title": "First confirmed story with substantial technical impact", "candidate": {"url": "https://a.example/news"}}
        second = {"title": "Second confirmed story with substantial technical impact", "candidate": {"url": "https://b.example/news"}}
        with tempfile.TemporaryDirectory() as temp, \
             patch("scripts.blog_automation.run.generate_render_validate", return_value=("first", "<html>first</html>", {"sections": []})) as generate:
            result = generate_first_quality_valid_story(Path(temp), [first, second], "2026-09-26", check_remote=True)

        self.assertEqual(result[0], first)
        generate.assert_called_once()

    def test_all_ranked_candidates_exhausted_returns_no_story(self):
        stories = [{"title": f"Confirmed story {n} with technical impact", "candidate": {"url": f"https://{n}.example/news"}}
                   for n in (1, 2)]
        rejected = llm_provider.ArticleQualityProvidersExhausted("placeholder detected", list(llm_provider.PROVIDERS))
        with tempfile.TemporaryDirectory() as temp, \
             patch("scripts.blog_automation.run.generate_render_validate", side_effect=[rejected, rejected]) as generate, \
             patch("scripts.blog_automation.run.publish") as publish:
            result = generate_first_quality_valid_story(Path(temp), stories, "2026-09-26", check_remote=True)
            if result:
                publish()

        self.assertIsNone(result)
        self.assertEqual(generate.call_count, 2)
        publish.assert_not_called()


if __name__ == "__main__":
    unittest.main()
