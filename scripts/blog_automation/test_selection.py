from __future__ import annotations
import json, unittest
from unittest.mock import patch
from .select_story import select, verify_evidence

class StoryEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.candidate={"id":1,"url":"https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/","title":"The Biggest News From Connect 2026","published_date":"2026-09-24","primary":True,"company":"Meta","publisher":"Meta Newsroom"}
        self.story={"candidate_id":1,"confirmed_event_date":"2026-09-24","score":9,"event_key":"meta-connect-2026-announcements","title":"Meta Connect 2026 Introduces New AI and Developer Features","slug":"meta-connect-2026-ai-developer-features","description":"Meta announced a set of AI and developer technology updates at Connect 2026.","category":"AI","tags":["AI","Developer Tools"],"source_urls":["https://www.meta.com/blog/meta-connect-2026-everything-we-announced/"],"same_event_reason":{"https://www.meta.com/blog/meta-connect-2026-everything-we-announced/":"Meta's official recap covers the same Connect 2026 announcements and technical products."}}
        self.page=(200,"https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/",b'<html><head><title>The Biggest News From Meta Connect 2026</title><meta property=\"article:published_time\" content=\"2026-09-24T08:00:00Z\"><link rel=\"canonical\" href=\"https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/\"></head></html>',"text/html")

    def verified_primary(self):
        return patch("scripts.blog_automation.select_story.validate_primary",return_value=(True,{"url":self.candidate["url"],"host":"about.fb.com","http":"HTTP 200","canonical":self.candidate["url"],"official_host":True,"event_date":"compatible","result":"VERIFIED"}))

    def test_meta_grounding_official_url_suffices_when_primary_absent_from_grounding(self):
        story={**self.story,"candidate":self.candidate,"_grounded":["https://www.meta.com/blog/meta-connect-2026-everything-we-announced/"]}
        with self.verified_primary(),patch("scripts.blog_automation.select_story.call") as call:
            result=verify_evidence(story,"2026-09-24",[])
        self.assertEqual(result["sources"],[self.candidate["url"],"https://www.meta.com/blog/meta-connect-2026-everything-we-announced/"])
        call.assert_not_called()

    def test_one_grounded_secondary_triggers_one_enrichment_and_passes(self):
        story={**self.story,"candidate":self.candidate,"source_urls":[],"_grounded":[]}
        extra="https://www.meta.com/blog/meta-connect-2026-developer-tools/"
        with self.verified_primary(),patch("scripts.blog_automation.select_story.call",return_value=(json.dumps({"sources":[{"url":extra,"why_same_event":"Official Meta documentation details the same Connect 2026 announcements and developer changes."}]}),[extra])) as call:
            result=verify_evidence(story,"2026-09-24",[])
        self.assertEqual(result["sources"],[self.candidate["url"],extra]); self.assertEqual(call.call_count,1)

    def test_enrichment_failure_rejects_one_source(self):
        story={**self.story,"candidate":self.candidate,"source_urls":[],"_grounded":[]}
        with self.verified_primary(),patch("scripts.blog_automation.select_story.call",return_value=(json.dumps({"sources":[]}),[])) as call:
            result=verify_evidence(story,"2026-09-24",[])
        self.assertIsNone(result); self.assertEqual(call.call_count,1)

    def test_invalid_primary_rejects_even_with_many_grounded_secondaries(self):
        story={**self.story,"candidate":self.candidate,"_grounded":["https://meta.com/one","https://meta.com/two"],"source_urls":["https://meta.com/one","https://meta.com/two"]}
        with patch("scripts.blog_automation.select_story.validate_primary",return_value=(False,{"url":self.candidate["url"],"host":"about.fb.com","http":"ERROR: HTTP 503","canonical":"none","official_host":True,"event_date":"REJECTED","result":"REJECTED"})),patch("scripts.blog_automation.select_story.call") as call:
            result=verify_evidence(story,"2026-09-24",[])
        self.assertIsNone(result); call.assert_not_called()

    def test_primary_http_redirect_canonical_title_and_date_validation(self):
        with patch("scripts.blog_automation.select_story.urllib.request.urlopen") as open_url:
            response=open_url.return_value.__enter__.return_value
            response.status=200; response.geturl.return_value="https://about.fb.com/final"
            response.read.return_value=self.page[2]; response.headers.get.return_value="text/html"
            from .select_story import validate_primary
            ok,details=validate_primary(self.candidate,{**self.story,"confirmed_event_date":"2026-09-24"},"2026-09-24")
        self.assertTrue(ok); self.assertEqual(details["result"],"VERIFIED")

class RankedSelectionTests(unittest.TestCase):
    def test_returns_up_to_three_ranked_unique_events_in_one_selector_call(self):
        candidates=[{"id":i,"url":f"https://meta.com/{i}","primary":True,"company":"Meta","title":f"Event {i}"} for i in range(1,4)]
        entries=[{"candidate_id":i,"confirmed_event_date":"2026-09-24","score":11-i,"event_key":f"event-{i}","title":f"Event {i}","source_urls":[]} for i in (1,2,3)]
        with patch("scripts.blog_automation.select_story.call",return_value=(json.dumps({"ranked_candidates":entries}),[])) as call:
            result=select(candidates,"2026-09-24",[],[{"event_key":"old","title":"Already published","company":"Meta","source_urls":["https://meta.com/old"]}])
        self.assertEqual([s["candidate"]["id"] for s in result],[1,2,3]); call.assert_called_once()

    def test_ranked_selector_discards_score_below_8_and_duplicate_event_key(self):
        candidates=[{"id":1,"url":"https://meta.com/1","primary":True,"company":"Meta"},
                    {"id":2,"url":"https://github.com/2","primary":True,"company":"GitHub"},
                    {"id":3,"url":"https://google.com/3","primary":True,"company":"Google"}]
        entries=[{"candidate_id":1,"confirmed_event_date":"2026-09-24","score":9,"event_key":"same","title":"A"},
                 {"candidate_id":2,"confirmed_event_date":"2026-09-24","score":8,"event_key":"same","title":"B"},
                 {"candidate_id":3,"confirmed_event_date":"2026-09-24","score":7,"event_key":"low","title":"C"}]
        with patch("scripts.blog_automation.select_story.call",return_value=(json.dumps({"ranked_candidates":entries}),[])):
            result=select(candidates,"2026-09-24",[])
        self.assertEqual([s["candidate"]["id"] for s in result],[1])

    def test_enrichment_http_failure_is_one_attempt_then_rejects(self):
        base=StoryEvidenceTests(); base.setUp()
        story={**base.story,"candidate":base.candidate,"source_urls":[],"_grounded":[]}
        with patch("scripts.blog_automation.select_story.validate_primary",return_value=(True,{"url":story["candidate"]["url"],"host":"about.fb.com","http":"HTTP 200","canonical":story["candidate"]["url"],"official_host":True,"event_date":"compatible","result":"VERIFIED"})),patch("scripts.blog_automation.select_story.call",side_effect=RuntimeError("service unavailable")) as call:
            result=verify_evidence(story,"2026-09-24",[])
        self.assertIsNone(result); call.assert_called_once()

if __name__=="__main__": unittest.main()
