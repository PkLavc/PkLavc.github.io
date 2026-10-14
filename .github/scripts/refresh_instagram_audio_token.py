"""Validate and extend the Facebook Login user token used by Instagram Audio API.

Does not touch the Instagram Login token used by other integrations.
Facebook long-lived user tokens may REQUIRE interactive reauthorization after ~60 days.
Always verify expiry, never claim an extension that Meta did not grant.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

GRAPH = "https://graph.facebook.com/" + os.getenv("INSTAGRAM_GRAPH_VERSION", "v26.0")
ACCOUNT_ID = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID", "")
REPO = "PkLavc/PkLavc.github.io"
SECRET_NAME = "INSTAGRAM_AUDIO_ACCESS_TOKEN"


def require(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError("Missing Actions secret/variable: " + name)
    return value


def get(path: str, params: dict[str, str]) -> dict:
    # Never include request URL, token or Meta error payload in logs.
    uri = GRAPH + path + "?" + urllib.parse.urlencode(params)
    try:
        with urllib.request.urlopen(urllib.request.Request(uri, headers={
            "Accept": "application/json", "User-Agent": "PkLavcAudioTokenCheck/1",
        }), timeout=30) as response:
            payload = json.load(response)
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
        raise RuntimeError("Meta Graph API request failed for " + path) from None
    if not isinstance(payload, dict) or payload.get("error"):
        raise RuntimeError("Meta Graph API rejected " + path)
    return payload


def check_audio(token: str, account: str) -> None:
    result = get("/ig_audio", {
        "audio_type": "music", "user_id": account, "access_token": token,
    })
    if not isinstance(result.get("audio"), list) or not any(
        isinstance(a, dict) and a.get("audio_id") for a in result["audio"]
    ):
        raise RuntimeError("Facebook Login token does not return usable Instagram audio.")
    print("Instagram Audio API validated for configured account.", flush=True)


def app_id_for(token: str) -> str:
    configured = os.environ.get("INSTAGRAM_AUDIO_APP_ID", "").strip()
    if configured:
        return configured
    # Graph /app maps to the issuing app for this user token.
    data = get("/app", {"fields": "id", "access_token": token})
    value = str(data.get("id") or "").strip()
    if not value.isdigit():
        raise RuntimeError("Cannot determine Meta App ID; set INSTAGRAM_AUDIO_APP_ID Actions variable.")
    return value


def expiry(token: str, app_id: str, app_secret: str) -> int:
    info = get("/debug_token", {
        "input_token": token,
        "access_token": app_id + "|" + app_secret,
    }).get("data") or {}
    if not info.get("is_valid") or str(info.get("app_id")) != app_id:
        raise RuntimeError("Audio token not valid for the configured Meta app.")
    return int(info.get("expires_at") or 0)


def extend(token: str, app_id: str, secret: str) -> tuple[str, int]:
    payload = get("/oauth/access_token", {
        "grant_type": "fb_exchange_token",
        "client_id": app_id,
        "client_secret": secret,
        "fb_exchange_token": token,
    })
    result = str(payload.get("access_token") or "").strip()
    if not result:
        raise RuntimeError("Meta did not issue a long-lived Facebook token.")
    return result, int(payload.get("expires_in") or 0)


def run() -> None:
    current = require(SECRET_NAME)
    account = require("INSTAGRAM_BUSINESS_ACCOUNT_ID")
    secret = require("INSTAGRAM_APP_SECRET")
    check_audio(current, account)
    app_id = app_id_for(current)
    now = int(time.time())
    old_exp = expiry(current, app_id, secret)
    if old_exp <= now:
        raise RuntimeError("Audio token expired. Reauthorization through Facebook Login is required.")
    remaining = (old_exp - now) // 86400
    print(f"Facebook Audio token valid; approx. {remaining} days remaining.", flush=True)
    # Only exchange short-lived tokens or tokens nearing expiry. Every run validates access.
    if remaining > 30:
        print("No extension needed; GitHub secret unchanged.", flush=True)
        return
    candidate, duration = extend(current, app_id, secret)
    # New token must actually be long-lived. Some Meta user-token exchanges do NOT
    # extend an already long-lived token, even if the API returns success.
    if duration < 45 * 86400:
        raise RuntimeError("Meta did not issue a 45+ day Facebook token; reauthorize via Meta.")
    print("::add-mask::" + candidate, flush=True)
    check_audio(candidate, account)
    new_exp = expiry(candidate, app_id, secret)
    if new_exp <= max(old_exp + 86400, now + 45 * 86400):
        raise RuntimeError("Meta did not extend token expiry; manual Facebook reauthorization is required.")
    credential = require("INSTAGRAM_ROTATION_GITHUB_TOKEN")
    env = os.environ.copy()
    env["GH_TOKEN"] = credential
    result = subprocess.run(
        ["gh", "secret", "set", SECRET_NAME, "--repo", REPO],
        input=candidate + "\n", env=env, text=True, capture_output=True, timeout=45,
    )
    if result.returncode:
        raise RuntimeError("Cannot update audio Actions secret; check INSTAGRAM_TOKEN_ROTACION Secrets:write permission.")
    print(f"Facebook Audio token extended; about {(new_exp - now)//86400} days left. GitHub secret rotated.", flush=True)


if __name__ == "__main__":
    try:
        run()
    except Exception as exc:
        # Keep errors token-free; never print HTTP response bodies.
        print("::error::Instagram audio-token maintenance: " + str(exc), file=sys.stderr)
        sys.exit(1)
