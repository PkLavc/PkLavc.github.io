"""Authorize and rotate Pinterest OAuth v5 for the owner's business account.

Uses client ID 1624382, the app secret received after Trial approval, a
one-use auth code obtained from PkLavc's static OAuth callback, and the
existing Instagram GitHub Secrets-write credential. No tokens are logged.
All access/refresh tokens stay inside GitHub Actions Secrets.
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

CLIENT_ID = "1624382"
REPO = "PkLavc/PkLavc.github.io"
REDIRECT_URI = "https://pklavc.com/pinterest/callback/"
OAUTH_URL = "https://api.pinterest.com/v5/oauth/token"
USER_URL = "https://api.pinterest.com/v5/user_account"
SCOPES = {"boards:read", "boards:write", "pins:read", "pins:write", "user_accounts:read"}


def set_value(name):
    v = os.getenv(name, "").strip()
    return v if v and v.lower() not in ("null", "none", "undefined") else ""


def oauth_grant(secret, grant, value):
    creds = base64.b64encode((CLIENT_ID + ":" + secret).encode()).decode()
    form = {"grant_type": grant}
    if grant == "authorization_code":
        form.update(code=value, redirect_uri=REDIRECT_URI)
    elif grant == "refresh_token":
        form["refresh_token"] = value
    else:
        raise ValueError("Unsupported Pinterest grant.")
    req = urllib.request.Request(
        OAUTH_URL, method="POST",
        data=urllib.parse.urlencode(form).encode(),
        headers={"Authorization": "Basic " + creds,
                 "Content-Type": "application/x-www-form-urlencoded",
                 "Accept": "application/json", "User-Agent": "PkLavcPinterestOAuth/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            payload = json.load(resp)
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"Pinterest OAuth HTTP {exc.code}, check approval, consent, and redirect URI.") from None
    except (urllib.error.URLError, OSError, TimeoutError):
        raise RuntimeError("Pinterest OAuth unavailable.") from None
    if not isinstance(payload, dict):
        raise RuntimeError("Pinterest OAuth did not return a token response.")
    access = str(payload.get("access_token") or "")
    refresh = str(payload.get("refresh_token") or "")
    if not access.startswith("pina") or not refresh.startswith("pinr"):
        raise RuntimeError("Pinterest did not issue a user OAuth token and refresh token.")
    if int(payload.get("expires_in") or 0) < 14*86400:
        raise RuntimeError("Pinterest returned an unexpectedly short-lived access token.")
    scopes = set(str(payload.get("scope") or "").replace(",", " ").split())
    if scopes and not SCOPES.issubset(scopes):
        raise RuntimeError("Pinterest authorization did not include required Pins and boards write scopes.")
    print("::add-mask::" + access, flush=True)
    print("::add-mask::" + refresh, flush=True)
    return access, refresh


def check_identity(access):
    request = urllib.request.Request(USER_URL, headers={
        "Authorization": "Bearer " + access, "Accept": "application/json",
        "User-Agent": "PkLavcPinterestOAuth/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=25) as r:
            data = json.load(r)
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"Pinterest business-account check HTTP {exc.code}.") from None
    except (urllib.error.URLError, OSError, TimeoutError):
        raise RuntimeError("Pinterest identity check unavailable.") from None
    if not isinstance(data, dict) or str(data.get("username", "")).lower() != "pklavc":
        raise RuntimeError("OAuth token does not belong to the @pklavc business account.")


def github_env(credential):
    env = dict(os.environ, GH_TOKEN=credential)
    p = subprocess.run(
        ["gh", "api", f"repos/{REPO}/actions/secrets/public-key", "--jq", ".key_id"],
        env=env, text=True, capture_output=True, timeout=25)
    if p.returncode != 0 or not p.stdout.strip():
        raise RuntimeError("Existing GitHub credential cannot access Actions Secrets.")
    return env


def update_secrets(access, refresh, env):
    for name, token in (("PINTEREST_ACCESS_TOKEN", access), ("PINTEREST_REFRESH_TOKEN", refresh)):
        p = subprocess.run(["gh", "secret", "set", name, "--repo", REPO],
                           input=token + "\n", env=env, text=True,
                           capture_output=True, timeout=45)
        if p.returncode:
            raise RuntimeError("GitHub could not write " + name + ". Manual verification required.")
    print("Pinterest access and continuous refresh tokens stored in GitHub Secrets.")


def run(mode):
    secret = set_value("PINTEREST_APP_SECRET")
    github_token = set_value("INSTAGRAM_TOKEN_ROTACION")
    if not secret or not github_token:
        print("PENDING: Pinterest trial approval or app credentials not yet available.")
        return
    env = github_env(github_token)
    if mode == "preflight":
        print("Pinterest app secret configured and GitHub Secrets write access valid.")
        return
    if mode == "bootstrap":
        code = set_value("PINTEREST_OAUTH_CODE")
        if not code:
            print("PENDING: generate a single-use Pinterest authorization code first.")
            return
        access, refresh = oauth_grant(secret, "authorization_code", code)
        check_identity(access)
        update_secrets(access, refresh, env)
        deleted = subprocess.run(["gh", "secret", "delete", "PINTEREST_OAUTH_CODE",
                                  "--repo", REPO],
                                 env=env, text=True, capture_output=True, timeout=30)
        if deleted.returncode != 0:
            print("::warning::Please delete the consumed PINTEREST_OAUTH_CODE secret manually.")
        else:
            print("One-time Pinterest OAuth code removed from GitHub after successful exchange.")
    elif mode == "refresh":
        old = set_value("PINTEREST_REFRESH_TOKEN")
        if not old:
            print("PENDING: no Pinterest continuous refresh token yet.")
            return
        access, refresh = oauth_grant(secret, "refresh_token", old)
        check_identity(access)
        update_secrets(access, refresh, env)
    else:
        raise ValueError("Unsupported Pinterest token action.")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--mode", choices=("preflight", "bootstrap", "refresh"), default="preflight")
    args = p.parse_args()
    try:
        run(args.mode)
    except Exception as exc:
        print("::error::Pinterest token management failed: " + str(exc), file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
