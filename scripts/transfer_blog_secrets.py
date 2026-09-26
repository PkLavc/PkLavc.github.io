import base64
import json
import os
import urllib.error
import urllib.request

from nacl.public import PublicKey, SealedBox

TOKEN = os.environ["TRANSFER_PAT"]
REPOSITORY = "PkLavc/blog"
NAMES = (
    "GEMINI_API_KEY",
    "OPENROUTER_API_KEY",
    "CLOUDFLARE_API_TOKEN",
    "CLOUDFLARE_ACCOUNT_ID",
    "ADSENSE_CLIENT_ID",
)
API = "https://api.github.com"


def request(url, *, method="GET", body=None):
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {TOKEN}",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    data = json.dumps(body).encode() if body is not None else None
    if data is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as error:
        error.close()
        raise RuntimeError(f"GitHub API returned HTTP {error.code}") from None
    except (urllib.error.URLError, TimeoutError):
        raise RuntimeError("GitHub API request failed due to a network error") from None


status, response = request(f"{API}/repos/{REPOSITORY}/actions/secrets/public-key")
if status != 200:
    raise SystemExit(f"Target public-key lookup failed: HTTP {status}")
public_key = json.loads(response)
box = SealedBox(PublicKey(base64.b64decode(public_key["key"])))

for name in NAMES:
    value = os.environ.get(name, "")
    if not value:
        print(f"{name}: source value unavailable; skipped")
        continue
    encrypted = base64.b64encode(box.encrypt(value.encode("utf-8"))).decode("ascii")
    status, _ = request(
        f"{API}/repos/{REPOSITORY}/actions/secrets/{name}",
        method="PUT",
        body={"encrypted_value": encrypted, "key_id": public_key["key_id"]},
    )
    if status not in (201, 204):
        raise SystemExit(f"{name}: target write failed with HTTP {status}")
    print(f"{name}: transferred (HTTP {status})")
