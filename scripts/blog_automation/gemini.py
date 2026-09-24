from __future__ import annotations

import json
import os
import time
import urllib.request
import urllib.error


def call(prompt: str, *, search: bool = False) -> tuple[str, list[str]]:
    key = os.environ.get("GEMINI_API_KEY", "")
    if not key:
        raise RuntimeError("GEMINI_API_KEY não está configurada.")
    model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
    payload = {"contents": [{"role": "user", "parts": [{"text": prompt}]}], "generationConfig": {"temperature": 0.2}}
    if search:
        payload["tools"] = [{"google_search": {}}]
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json", "x-goog-api-key": key}, method="POST")
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=120) as response:
                data = json.loads(response.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as exc:
            if exc.code not in {429, 500, 502, 503, 504} or attempt == 3:
                raise RuntimeError(f"Gemini API HTTP {exc.code}; see model availability and quota settings.") from None
            delay = 2 ** (attempt + 1)
            print(f"Gemini temporariamente indisponível (HTTP {exc.code}); nova tentativa em {delay}s ({attempt + 1}/3).")
            time.sleep(delay)
    candidate = data.get("candidates", [{}])[0]
    text = "".join(part.get("text", "") for part in candidate.get("content", {}).get("parts", []))
    sources = []
    for chunk in candidate.get("groundingMetadata", {}).get("groundingChunks", []):
        uri = chunk.get("web", {}).get("uri", "")
        if uri.startswith("https://") and "vertexaisearch.cloud.google.com" in uri:
            try:
                req = urllib.request.Request(uri, headers={"User-Agent": "PkLavcDailyBlog/1.0"})
                with urllib.request.urlopen(req, timeout=12) as response:
                    uri = response.geturl()
            except (OSError, urllib.error.URLError, TimeoutError):
                continue
        if uri.startswith("https://") and uri not in sources:
            sources.append(uri)
    if not text:
        raise RuntimeError("Gemini retornou resposta vazia.")
    return text, sources
