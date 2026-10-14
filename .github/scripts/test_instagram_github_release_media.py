"""One-time, non-publishing Instagram media-host smoke test.

Generate a short MP4 in GitHub Actions, temporarily upload it as a GitHub
release asset, and ask Instagram to process a Reel container referencing it.
Never publish a Reel and always delete the temporary release/tag afterwards.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess
import tempfile
import time
import sys
import urllib.parse
import urllib.request
import urllib.error

GRAPH = "https://graph.facebook.com/v26.0"

def github(*args: str) -> str:
    p = subprocess.run(["gh", *args], text=True, capture_output=True, timeout=90)
    if p.returncode:
        raise RuntimeError("GitHub release operation failed (subcommand: " + args[0] + ").")
    return p.stdout.strip()

def meta(method: str, path: str, params: dict[str, str]) -> dict:
    values = urllib.parse.urlencode(params).encode()
    url = GRAPH + path
    if method == "GET":
        url += "?" + values.decode()
        values = None
    request = urllib.request.Request(url, data=values, method=method,
                                     headers={"Accept": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=45) as result:
            response = json.load(result)
    except urllib.error.HTTPError as error:
        # Never dump the token-bearing URL or response body.
        print(f"Meta {method} {path}: HTTP {error.code}.")
        raise RuntimeError("Meta rejected URL-host container request.") from None
    if not isinstance(response, dict) or response.get("error"):
        raise RuntimeError("Meta returned an unexpected container response.")
    return response

def make_video(out: Path) -> None:
    subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-f", "lavfi", "-i", "color=c=black:s=540x960:r=30",
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
        "-t", "5.0", "-c:v", "libx264", "-preset", "ultrafast",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart", str(out),
    ], check=True, timeout=120)

def test() -> None:
    repo = os.environ["GITHUB_REPOSITORY"]
    tag = "ig-media-host-test-" + os.environ["GITHUB_RUN_ID"]
    ig = os.environ["INSTAGRAM_BUSINESS_ACCOUNT_ID"]
    access_token = os.environ["INSTAGRAM_AUDIO_ACCESS_TOKEN"]
    if not access_token:
        raise RuntimeError("INSTAGRAM_AUDIO_ACCESS_TOKEN is not configured.")
    with tempfile.TemporaryDirectory() as tmp:
        movie = Path(tmp) / "pklavc-github-media-test.mp4"
        make_video(movie)
        uploaded = False
        try:
            github("release", "create", tag, str(movie),
                   "--repo", repo, "--prerelease", "--latest=false",
                   "--title", "Transient Instagram media-host test",
                   "--notes", "Automated MP4 fetch test only; release deleted after verification.")
            uploaded = True
            url = f"https://github.com/{repo}/releases/download/{tag}/{movie.name}"
            # GitHub's redirect is intentional; the Meta fetcher must support it.
            request = urllib.request.Request(url, headers={"User-Agent":"PkLavcMediaHostTest/1"})
            with urllib.request.urlopen(request, timeout=60) as r:
                mime = r.headers.get("Content-Type", "")
                data = r.read(16)
                destination = r.url
                print(f"Public GitHub MP4 reachable: status={r.status}; type={mime}; signature={data[4:12]!r}; redirected={'github.com' not in destination}.")
                if r.status != 200 or b"ftyp" not in data or "video" not in mime.lower() and "octet-stream" not in mime.lower():
                    raise RuntimeError("Release asset is not publicly served as MP4.")
            catalog = meta("GET", "/ig_audio", {
                "audio_type": "music", "user_id": ig, "access_token": access_token,
            })
            music = next((str(a.get("audio_id")) for a in catalog.get("audio", [])
                          if isinstance(a, dict) and a.get("audio_id")), None)
            if not music:
                raise RuntimeError("Meta returned no music usable for an attach test.")
            audio = json.dumps({"audio_id":music,"audio_volume":100,"video_volume":0},separators=(",",":"))
            created = meta("POST", f"/{ig}/media", {
                "media_type":"REELS", "video_url":url, "share_to_feed":"false",
                "caption":"", "audio_configuration":audio, "access_token":access_token,
            })
            container = created.get("id")
            if not container:
                raise RuntimeError("Meta did not return an Instagram Reel container.")
            print("Meta accepted GitHub release URL + catalog music request; waiting for media processing.")
            status = "UNKNOWN"
            for attempt in range(18):
                status = meta("GET", f"/{container}",{
                    "fields":"status_code", "access_token":access_token,
                }).get("status_code","UNKNOWN")
                if status in ("FINISHED","ERROR","EXPIRED"):
                    break
                time.sleep(8)
            print("Instagram video_url container final state:", status)
            if status != "FINISHED":
                raise RuntimeError("Meta could not fully process the GitHub-hosted MP4.")
            print("PASS: Instagram successfully processed a GitHub-hosted Reel. No Reel was published.")
        finally:
            if uploaded:
                try:
                    github("release", "delete", tag, "--repo", repo, "--cleanup-tag", "--yes")
                    print("Deleted temporary GitHub release asset and tag.")
                except Exception:
                    print("::error::Temporary release cleanup failed. Manual cleanup required:", tag)
                    raise

def inspect_music() -> None:
    token = os.environ["INSTAGRAM_AUDIO_ACCESS_TOKEN"]
    for aid in ("1893379722072857", "1064870852967241", "4582304738710634"):
        try:
            info = meta("GET", f"/{aid}", {
                "fields": "id,title,display_artist,audio_type",
                "access_token": token,
            })
            print("Previous successful MUSIC", aid, "metadata:", json.dumps(info, ensure_ascii=False))
        except RuntimeError:
            print("Previous MUSIC", aid, "metadata unavailable.")

if __name__ == "__main__":
    if "--inspect-music" in sys.argv:
        inspect_music()
    else:
        test()
