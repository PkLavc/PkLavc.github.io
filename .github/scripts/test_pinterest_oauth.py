"""Offline Pinterest OAuth and GitHub Secret rotation tests, no real API requests."""
import importlib.util
from pathlib import Path
import os
import unittest
from unittest.mock import patch, Mock

name = Path(__file__).with_name("pinterest_oauth.py")
spec = importlib.util.spec_from_file_location("pklavc_pinterest_oauth", name)
auth = importlib.util.module_from_spec(spec)
spec.loader.exec_module(auth)


class PinterestOauthTests(unittest.TestCase):
    def test_app_id_and_exact_oauth_callback(self):
        self.assertEqual(auth.CLIENT_ID, "1624382")
        self.assertEqual(auth.REDIRECT_URI, "https://pklavc.com/pinterest/callback/")

    def test_required_scopes_do_not_request_ad_permissions(self):
        self.assertIn("pins:write", auth.SCOPES)
        self.assertIn("boards:write", auth.SCOPES)
        self.assertIn("pins:read", auth.SCOPES)
        self.assertNotIn("ads:write", auth.SCOPES)

    def test_pending_approval_does_not_try_oauth(self):
        with patch.dict(os.environ, {"PINTEREST_APP_SECRET": "null",
                                     "INSTAGRAM_TOKEN_ROTACION": "secret"}, clear=True):
            with patch.object(auth, "oauth_grant", side_effect=AssertionError("should not exchange")):
                auth.run("bootstrap")

    def test_credentials_required_for_approval(self):
        with patch.dict(os.environ, {}, clear=True):
            with patch.object(auth, "github_env", side_effect=AssertionError("not called")):
                auth.run("refresh")

    def test_auth_code_payload_grant_and_validation(self):
        with patch.object(auth.urllib.request, "urlopen") as open_mock:
            response = open_mock.return_value.__enter__.return_value
            response.read.return_value = b'{"access_token":"pina_new","refresh_token":"pinr_new","expires_in":2592000,"scope":"pins:read pins:write boards:read boards:write user_accounts:read"}'
            result = auth.oauth_grant("appsecret", "authorization_code", "single-use-code")
        self.assertEqual(result, ("pina_new", "pinr_new"))
        sent = open_mock.call_args.args[0]
        self.assertIn("grant_type=authorization_code", sent.data.decode())
        self.assertIn("redirect_uri=", sent.data.decode())
        self.assertNotIn(b"appsecret", sent.data)
        self.assertEqual(sent.headers["Authorization"][:6], "Basic ")

    def test_token_rotation_uses_refresh_and_updates_both_secrets(self):
        env = {"GH_TOKEN": "githubfake"}
        response = Mock(returncode=0)
        with patch.dict(os.environ, {"PINTEREST_APP_SECRET": "app-secret",
                                     "INSTAGRAM_TOKEN_ROTACION": "githubfake",
                                     "PINTEREST_REFRESH_TOKEN": "pinr_old"}, clear=True):
            with patch.object(auth, "github_env", return_value=env):
                with patch.object(auth, "oauth_grant", return_value=("pina_new", "pinr_new")) as grant:
                    with patch.object(auth, "check_identity"):
                        with patch.object(auth.subprocess, "run", return_value=response) as runner:
                            auth.run("refresh")
        grant.assert_called_once_with("app-secret", "refresh_token", "pinr_old")
        args = [c.args[0] for c in runner.call_args_list]
        self.assertEqual([a[3] for a in args], ["PINTEREST_ACCESS_TOKEN", "PINTEREST_REFRESH_TOKEN"])

    def test_auth_code_deleted_only_after_tokens_saved(self):
        with patch.dict(os.environ, {"PINTEREST_APP_SECRET": "app",
                                     "INSTAGRAM_TOKEN_ROTACION": "gh",
                                     "PINTEREST_OAUTH_CODE": "temporary"}, clear=True):
            with patch.object(auth, "github_env", return_value={"GH_TOKEN": "gh"}):
                with patch.object(auth, "oauth_grant", return_value=("pina", "pinr")):
                    with patch.object(auth, "check_identity"):
                        with patch.object(auth, "update_secrets") as update:
                            with patch.object(auth.subprocess, "run", return_value=Mock(returncode=0)) as run:
                                auth.run("bootstrap")
        update.assert_called_once()
        self.assertIn("delete", run.call_args.args[0])
        self.assertIn("PINTEREST_OAUTH_CODE", run.call_args.args[0])


if __name__ == "__main__":
    unittest.main()
