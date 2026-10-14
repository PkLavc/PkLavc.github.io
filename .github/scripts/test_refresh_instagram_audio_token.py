"""Offline unit tests for Facebook Audio token expiry safety."""
import importlib.util
import os
from pathlib import Path
import unittest
from unittest.mock import patch, Mock

path = Path(__file__).with_name("refresh_instagram_audio_token.py")
spec = importlib.util.spec_from_file_location("instagram_audio_token_maintain", path)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class AudioTokenTests(unittest.TestCase):
    def setUp(self):
        self.env = patch.dict(os.environ, {
            "INSTAGRAM_AUDIO_ACCESS_TOKEN": "old-test-only",
            "INSTAGRAM_BUSINESS_ACCOUNT_ID": "17841402026786370",
            "INSTAGRAM_APP_SECRET": "secret-test-only",
            "INSTAGRAM_ROTATION_GITHUB_TOKEN": "github-test-only",
            "INSTAGRAM_AUDIO_APP_ID": "11111",
        })
        self.env.start()
        self.addCleanup(self.env.stop)

    @patch.object(mod, "get")
    def test_audio_uses_user_token(self, get):
        get.return_value = {"audio": [{"audio_id": "100"}]}
        mod.check_audio("test-user-token", "123")
        self.assertEqual(get.call_args.args[0], "/ig_audio")
        self.assertEqual(get.call_args.args[1]["access_token"], "test-user-token")

    @patch.object(mod, "check_audio")
    @patch.object(mod, "expiry")
    @patch.object(mod, "extend")
    @patch.object(mod.subprocess, "run")
    def test_short_token_is_extended_and_rotated(self, run, extend, expiry, check):
        with patch.object(mod.time, "time", return_value=1000000):
            expiry.side_effect = [1000000 + 3600, 1000000 + 59*86400]
            extend.return_value = ("new-test-only", 59*86400)
            run.return_value = Mock(returncode=0)
            mod.run()
            self.assertEqual(run.call_count, 1)
            self.assertEqual(run.call_args.kwargs["input"], "new-test-only\n")
            self.assertEqual(check.call_count, 2)

    @patch.object(mod, "check_audio")
    @patch.object(mod, "expiry")
    @patch.object(mod, "extend")
    @patch.object(mod.subprocess, "run")
    def test_long_lived_token_is_not_needlessly_rotated(self, run, extend, expiry, check):
        with patch.object(mod.time, "time", return_value=1000000):
            expiry.return_value = 1000000 + 50*86400
            mod.run()
        extend.assert_not_called()
        run.assert_not_called()

    @patch.object(mod, "check_audio")
    @patch.object(mod, "expiry")
    @patch.object(mod, "extend")
    @patch.object(mod.subprocess, "run")
    def test_meta_refusal_to_extend_never_overwrites_secret(self, run, extend, expiry, check):
        with patch.object(mod.time, "time", return_value=1000000):
            expiry.side_effect = [1000000 + 10*86400, 1000000 + 10*86400]
            extend.return_value = ("new-test-only", 59*86400)
            with self.assertRaisesRegex(RuntimeError, "did not extend"):
                mod.run()
        run.assert_not_called()

    @patch.object(mod, "get")
    def test_invalid_audio_rejected(self, get):
        get.return_value = {"audio": []}
        with self.assertRaisesRegex(RuntimeError, "usable Instagram audio"):
            mod.check_audio("bad", "123")


if __name__ == "__main__":
    unittest.main()
