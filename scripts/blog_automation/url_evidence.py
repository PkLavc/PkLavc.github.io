from __future__ import annotations

import html.parser
import re
import urllib.error
import urllib.parse
import urllib.request

TRACKING_KEYS = {"gclid", "fbclid", "dclid", "msclkid", "mc_cid", "mc_eid", "ref_src", "igshid"}


def normalize_url(url: str) -> str:
    """Normalize URL syntax without treating different pages on a host as equivalent."""
    parts = urllib.parse.urlsplit(url.strip())
    scheme = parts.scheme.lower()
    host = (parts.hostname or "").lower()
    if not scheme or not host:
        return ""
    port = parts.port
    netloc = host if not port or (scheme, port) in {("https", 443), ("http", 80)} else f"{host}:{port}"
    kept = []
    for key, value in urllib.parse.parse_qsl(parts.query, keep_blank_values=True):
        lowered = key.lower()
        if lowered.startswith("utm_") or lowered in TRACKING_KEYS:
            continue
        kept.append((key, value))
    path = re.sub(r"/{2,}", "/", parts.path or "/")
    if path != "/" and not re.search(r"\.[A-Za-z0-9]{1,8}$", path):
        path = path.rstrip("/")
    query = urllib.parse.urlencode(sorted(kept))
    return urllib.parse.urlunsplit((scheme, netloc, path, query, ""))


class _CanonicalParser(html.parser.HTMLParser):
    canonical = ""

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "link":
            return
        attr = {k.lower(): v for k, v in attrs}
        if "canonical" in (attr.get("rel") or "").lower().split() and attr.get("href"):
            self.canonical = attr["href"]


def resolve_url(url: str, timeout: int = 8) -> tuple[str, str]:
    """Follow HTTP redirects and read a same-origin canonical link when available."""
    request = urllib.request.Request(url, headers={"User-Agent": "PkLavcDailyBlog/1.0", "Range": "bytes=0-65535"})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            final = response.geturl()
            content_type = response.headers.get("Content-Type", "")
            canonical = ""
            if "html" in content_type.lower():
                parser = _CanonicalParser()
                parser.feed(response.read(65536).decode("utf-8", "replace"))
                proposed = urllib.parse.urljoin(final, parser.canonical)
                if (urllib.parse.urlsplit(proposed).hostname and urllib.parse.urlsplit(proposed).scheme == "https"
                        and urllib.parse.urlsplit(proposed).hostname.lower() == (urllib.parse.urlsplit(final).hostname or "").lower()):
                    canonical = proposed
            return final, canonical
    except (OSError, urllib.error.URLError, TimeoutError, ValueError):
        return url, ""


def equivalent_url(left: str, right: str, resolver=resolve_url) -> bool:
    if normalize_url(left) == normalize_url(right):
        return True
    left_final, left_canonical = resolver(left)
    right_final, right_canonical = resolver(right)
    left_values = {normalize_url(x) for x in (left, left_final, left_canonical) if x}
    right_values = {normalize_url(x) for x in (right, right_final, right_canonical) if x}
    return bool(left_values & right_values)
