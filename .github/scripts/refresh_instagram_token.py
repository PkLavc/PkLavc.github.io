"""Refresh Instagram Login long-lived token and rotate GitHub Actions secrets across site and blog.

Never log, print, or check in the current or refreshed access token.
Expected secrets:
  INSTAGRAM_ACCESS_TOKEN (existing Instagram Login long-lived token)
  INSTAGRAM_ROTATION_GITHUB_TOKEN (dedicated Secrets write credential for both repositories)
"""
from __future__ import annotations

import json
import secrets
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

REFRESH_URL = "https://graph.instagram.com/refresh_access_token"
VERIFY_URL = "https://graph.instagram.com/me"
TARGETS = (
    ("PkLavc/PkLavc.github.io", "INSTAGRAM_ACCESS_TOKEN"),
    ("PkLavc/PkLavc.github.io", "INSTAGRAM_ANALYTICS_ACCESS_TOKEN"),
    ("PkLavc/blog", "INSTAGRAM_ACCESS_TOKEN"),
)


def fetch_json(url: str, *, params: dict[str, str]) -> dict:
    # Do not surface urllib HTTP errors, which could include access tokens in URLs.
    request = urllib.request.Request(
        url + "?" + urllib.parse.urlencode(params),
        headers={"Accept": "application/json", "User-Agent": "PkLavcTokenRotation/1"},
    )
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            payload = json.loads(response.read())
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as exc:
        raise RuntimeError(f"Instagram API request failed ({type(exc).__name__}).") from None
    if not isinstance(payload, dict) or payload.get("error"):
        raise RuntimeError("Instagram API rejected token operation.")
    return payload


def rotate(*, preflight: bool = False) -> None:
    old_token = os.environ.get("INSTAGRAM_ACCESS_TOKEN", "").strip()
    github_token = os.environ.get("INSTAGRAM_ROTATION_GITHUB_TOKEN", "").strip()
    if not old_token:
        raise RuntimeError("Missing INSTAGRAM_ACCESS_TOKEN in site Actions secrets.")
    if not github_token:
        raise RuntimeError("Missing INSTAGRAM_ROTATION_GITHUB_TOKEN in site Actions secrets.")

    # Check GitHub secret access before attempting to refresh the Meta token.
    # The credential must have Secrets:read and Secrets:write on both repositories.
    env = os.environ.copy()
    env["GH_TOKEN"] = github_token
    for repository in sorted({repo for repo, _ in TARGETS}):
        result = subprocess.run(
            ["gh", "api", f"repos/{repository}/actions/secrets/public-key", "--jq", ".key_id"],
            text=True, capture_output=True, env=env, timeout=30,
        )
        if result.returncode or not result.stdout.strip():
            raise RuntimeError(
                f"GitHub credential cannot read Actions secrets in {repository}; "
                "grant Secrets:read and Secrets:write on both repositories."
            )


    # Check actual Secrets write capability with disposable, non-sensitive secrets.
    if preflight:
        probe_name = "IG_ROTATION_PROBE_" + secrets.token_hex(6).upper()
        for repository in sorted({repo for repo, _ in TARGETS}):
            probe = None
            try:
                probe = subprocess.run(
                    ["gh", "secret", "set", probe_name, "--repo", repository],
                    input="nonsecret-probe-value\n", text=True, capture_output=True,
                    env=env, timeout=45,
                )
                if probe.returncode:
                    raise RuntimeError(f"Cannot WRITE Actions secrets in {repository}.")
            finally:
                deletion = subprocess.run(
                    ["gh", "secret", "delete", probe_name, "--repo", repository],
                    text=True, capture_output=True, env=env, timeout=30,
                )
                if deletion.returncode and probe is not None and probe.returncode == 0:
                    raise RuntimeError(f"Could not remove test secret in {repository}.")
            print(f"GitHub secrets WRITE verified for {repository}.", flush=True)
        identity = fetch_json(VERIFY_URL, params={
            "fields": "id,username", "access_token": old_token,
        })
        if not identity.get("id"):
            raise RuntimeError("Current Instagram token did not validate.")
        print("Instagram authentication validated without early token refresh.", flush=True)
        return

    refreshed = fetch_json(
        REFRESH_URL,
        params={"grant_type": "ig_refresh_token", "access_token": old_token},
    )
    new_token = str(refreshed.get("access_token") or "").strip()
    expires_in = int(refreshed.get("expires_in") or 0)
    if not new_token or expires_in < 14 * 24 * 3600:
        raise RuntimeError("Instagram returned no usable long-lived token.")

    # Mask even if the next step fails; tokens must never appear in workflow logs.
    print("::add-mask::" + new_token, flush=True)
    identity = fetch_json(VERIFY_URL, params={
        "fields": "id,username",
        "access_token": new_token,
    })
    if not identity.get("id"):
        raise RuntimeError("Refreshed token did not validate against Instagram.")

    for repository, name in TARGETS:
        result = subprocess.run(
            ["gh", "secret", "set", name, "--repo", repository],
            input=new_token + "\n",
            text=True,
            capture_output=True,
            env=env,
            timeout=45,
        )
        if result.returncode:
            # Suppress CLI output to avoid accidental disclosure of credentials.
            raise RuntimeError(f"Failed to update {name} in {repository}; exit={result.returncode}.")
        print(f"Updated {repository}: {name}", flush=True)
    print("Instagram token renewed and synchronized to both GitHub repositories.", flush=True)


if __name__ == "__main__":
    try:
        rotate(preflight="--preflight" in sys.argv)
    except Exception as exc:
        print("::error::Instagram token renewal failed: " + str(exc), file=sys.stderr)
        sys.exit(1)
