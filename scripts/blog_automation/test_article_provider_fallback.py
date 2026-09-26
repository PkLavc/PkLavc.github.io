from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from . import llm_provider
from .run import generate_render_validate
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


if __name__ == "__main__":
    unittest.main()
