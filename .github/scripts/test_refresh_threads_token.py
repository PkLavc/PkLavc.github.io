"""Offline unit tests for Threads long-lived token refresh and GitHub rotation."""
import os
import unittest
from unittest.mock import patch
from . import refresh_threads_token as rot


class ThreadsTokenTests(unittest.TestCase):
    def test_null_or_missing_token_rejected(self):
        for value in ("", "none", "null", "undefined"):
            self.assertFalse(rot.configured(value))
        self.assertTrue(rot.configured("secret-token"))

    def test_profile_must_match_pklavc(self):
        with patch.object(rot, "request", return_value={"id": "123", "username": "PkLavc"}):
            self.assertEqual(rot.verify_user("secret")["id"], "123")
        with patch.object(rot, "request", return_value={"id": "123", "username": "other"}):
            with self.assertRaises(RuntimeError):
                rot.verify_user("secret")

    def test_preflight_does_not_renew_or_update_secret(self):
        with patch.dict(os.environ, {"THREADS_ACCESS_TOKEN": "valid",
                                     "INSTAGRAM_TOKEN_ROTACION": "git-token"}):
            with patch.object(rot, "verify_user", return_value={"id": "123"}):
                with patch.object(rot, "verify_github_write_access", return_value={}):
                    with patch.object(rot, "request", side_effect=AssertionError("token refresh")):
                        rot.run(preflight=True)

    def test_refresh_requires_long_valid_lifetime(self):
        with patch.dict(os.environ, {"THREADS_ACCESS_TOKEN": "valid",
                                     "INSTAGRAM_TOKEN_ROTACION": "git-token"}):
            with patch.object(rot, "verify_user", return_value={"id": "123"}):
                with patch.object(rot, "verify_github_write_access", return_value={}):
                    with patch.object(rot, "request", return_value={
                        "access_token": "newtoken", "expires_in": 3600}):
                        with self.assertRaises(RuntimeError):
                            rot.run()

    def test_refresh_stores_secret_without_exposing_token(self):
        class Result:
            returncode = 0
        with patch.dict(os.environ, {"THREADS_ACCESS_TOKEN": "previous",
                                     "INSTAGRAM_TOKEN_ROTACION": "git-token"}):
            with patch.object(rot, "verify_user", return_value={"id": "123"}) as verify:
                with patch.object(rot, "verify_github_write_access", return_value={"GH_TOKEN": "git-token"}):
                    with patch.object(rot, "request", return_value={
                        "access_token": "updatedtoken", "expires_in": 5184000}):
                        with patch.object(rot.subprocess, "run", return_value=Result()) as run:
                            rot.run()
        self.assertEqual(verify.call_count, 2)
        self.assertEqual(run.call_args.args[0],
                         ["gh", "secret", "set", "THREADS_ACCESS_TOKEN",
                          "--repo", "PkLavc/PkLavc.github.io"])
        self.assertEqual(run.call_args.kwargs["input"], "updatedtoken\n")


if __name__ == "__main__":
    unittest.main()
