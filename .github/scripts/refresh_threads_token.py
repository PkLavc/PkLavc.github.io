"""Maintain the long-lived Threads token using the existing GitHub rotation credential.

THREADS_ACCESS_TOKEN was created in Meta's long-lived user token generator.
Refresh twice monthly before expiry with th_refresh_token; synchronize back to
the same Actions Secret without printing the current or replacement token.
"""
from __future__ import annotations
import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

GRAPH = "https://graph.threads.net"
REPO = "PkLavc/PkLavc.github.io"
SECRET = "THREADS_ACCESS_TOKEN"


def configured(value):
    return bool(value and value.strip() and value.strip().lower() not in {
        "null", "none", "undefined"})


def request(path, params, token=""):
    uri = GRAPH + path + "?" + urllib.parse.urlencode(params)
    headers = {"Accept": "application/json", "User-Agent": "PkLavcThreadsTokenRotate/1"}
    if token:
        headers["Authorization"] = "Bearer " + token
    try:
        with urllib.request.urlopen(urllib.request.Request(uri, headers=headers), timeout=30) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"Threads token API rejected request (HTTP {exc.code}).") from None
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        raise RuntimeError("Threads token API request failed.") from None


def verify_user(token):
    profile = request("/v1.0/me", {"fields": "id,username"}, token=token)
    if (not isinstance(profile, dict) or
            str(profile.get("username", "")).lower() != "pklavc" or
            not str(profile.get("id", "")).isdigit()):
        raise RuntimeError("Threads token does not belong to @pklavc.")
    return profile


def verify_github_write_access(credential):
    env = os.environ.copy()
    env["GH_TOKEN"] = credential
    result = subprocess.run(
        ["gh", "api", f"repos/{REPO}/actions/secrets/public-key",
         "--jq", ".key_id"], capture_output=True, text=True, env=env, timeout=30)
    if result.returncode or not result.stdout.strip():
        raise RuntimeError("GitHub rotation credential cannot access repository Actions Secrets.")
    return env


def run(preflight=False):
    old_token = os.environ.get(SECRET, "").strip()
    write_token = os.environ.get("INSTAGRAM_TOKEN_ROTACION", "").strip()
    if not configured(old_token):
        raise RuntimeError("THREADS_ACCESS_TOKEN missing.")
    if not configured(write_token):
        raise RuntimeError("INSTAGRAM_TOKEN_ROTACION missing; cannot persist refreshed token.")
    verify_user(old_token)
    env = verify_github_write_access(write_token)
    if preflight:
        print("Threads @pklavc token authenticated, GitHub token rotation access validated.")
        return

    refreshed = request("/refresh_access_token", {
        "grant_type": "th_refresh_token", "access_token": old_token})
    updated_token = str(refreshed.get("access_token", "")).strip() if isinstance(refreshed, dict) else ""
    expires = int(refreshed.get("expires_in") or 0) if isinstance(refreshed, dict) else 0
    if not configured(updated_token) or expires < 35 * 86400:
        raise RuntimeError("Meta did not return a valid long-lived Threads token (35+ days).")
    print("::add-mask::" + updated_token, flush=True)
    verify_user(updated_token)
    updated = subprocess.run(
        ["gh", "secret", "set", SECRET, "--repo", REPO],
        input=updated_token + "\n", capture_output=True, text=True, env=env, timeout=45)
    if updated.returncode:
        raise RuntimeError("Could not persist refreshed Threads token to GitHub Secrets.")
    print(f"Threads @pklavc token renewed, GitHub Secret updated; Meta lifetime approximately {expires//86400} days.")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--preflight", action="store_true")
    args = p.parse_args()
    try:
        run(args.preflight)
    except Exception as exc:
        print("::error::Threads token maintenance failed: " + str(exc), file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
