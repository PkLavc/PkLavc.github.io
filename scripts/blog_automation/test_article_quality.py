from __future__ import annotations

import copy
import re
import unittest
from pathlib import Path

from .generate_article import render
from .run import fixture
from .validate_article import validate


class ArticleQualityGateTests(unittest.TestCase):
    def setUp(self):
        self.root = Path.cwd()
        self.day = "2026-09-24"
        self.story, article = fixture(self.day)
        _, self.document = render(self.root, self.story, article, self.day)

    def test_offline_fixture_meets_strict_article_contract(self):
        validate(self.root, self.document, self.story, self.day, check_remote=False)

    def test_short_content_is_rejected(self):
        short = re.sub(r"<p>[\s\S]*?</p>", "<p>Too short.</p>", self.document)
        with self.assertRaisesRegex(ValueError, "minimum is 1,300"):
            validate(self.root, short, self.story, self.day, check_remote=False)

    def test_content_above_1800_words_is_allowed(self):
        long_document = self.document.replace("</section>", f"<p>{'additional context ' * 150}</p></section>", 1)
        validate(self.root, long_document, self.story, self.day, check_remote=False)

    def test_unsupported_technical_capability_inferences_are_rejected(self):
        examples = (
            "The product likely includes more sophisticated code generation capabilities.",
            "The product probably uses specialized fine-tuning on large codebases.",
            "A probable internal architecture relies on additional orchestration services.",
            "The feature presumably supports full CI/CD automation.",
            "The model might include a hidden static analysis subsystem.",
            "The product likely relies on a proprietary deployment architecture.",
            "This could mean that the product supports autonomous production deployments.",
            "The system could be based on an undocumented model architecture.",
        )
        for sentence in examples:
            with self.subTest(sentence=sentence):
                story, article = fixture(self.day)
                article = copy.deepcopy(article)
                article["sections"][1]["paragraphs"][0] += " " + sentence
                _, document = render(self.root, story, article, self.day)
                with self.assertRaisesRegex(ValueError, "unsupported technical speculation detected"):
                    validate(self.root, document, story, self.day, check_remote=False)

    def test_could_for_practical_workflow_consequence_remains_allowed(self):
        story, article = fixture(self.day)
        article = copy.deepcopy(article)
        article["sections"][1]["paragraphs"][0] += " A development team could test this workflow against its own integration requirements before adoption."
        _, document = render(self.root, story, article, self.day)
        validate(self.root, document, story, self.day, check_remote=False)

    def test_fewer_than_seven_content_sections_is_rejected(self):
        blocks = re.findall(r'<section data-editorial-kind="(?:fact|analysis|neutral)">[\s\S]*?</section>', self.document)
        weak = self.document
        for block in blocks[2:]:
            weak = weak.replace(block, "", 1)
        with self.assertRaisesRegex(ValueError, "minimum is 7"):
            validate(self.root, weak, self.story, self.day, check_remote=False)


if __name__ == "__main__":
    unittest.main()
