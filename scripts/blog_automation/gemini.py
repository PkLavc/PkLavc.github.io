from __future__ import annotations

import datetime as dt
import json
import os
import random
import re
import time
import urllib.error
import urllib.request
from email.utils import parsedate_to_datetime

DEFAULT_REQUEST_BUDGET = 6
MIN_REQUEST_INTERVAL = 15.0
MAX_TOTAL_COOLDOWN = 300.0


class GeminiOperationalError(RuntimeError):
    """Expected API availability or budget failure; never publish this run."""

    def __init__(self, circuit: str, detail: str):
        self.circuit = circuit
        super().__init__(detail)


API_REQUESTS = 0
HTTP_RESULTS = {"Successful": 0, "429": 0, "503": 0, "Other errors": 0}
LOGICAL_CALLS = {"Selector": 0, "Enrichment": 0, "Article generation": 0}
LAST_REQUEST_AT: float | None = None
TOTAL_COOLDOWN = 0.0
CIRCUIT_BREAKER = "none"


def _setting(name: str, default: int) -> int:
    try:
        return max(1, int(os.environ.get(name, str(default))))
    except ValueError:
        return default


def request_budget() -> int:
    return _setting("MAX_GEMINI_HTTP_REQUESTS_PER_RUN", DEFAULT_REQUEST_BUDGET)


def request_count() -> int:
    return API_REQUESTS


def reset_state() -> None:
    """Reset process state for isolated local tests; not used during a workflow."""
    global API_REQUESTS, LAST_REQUEST_AT, TOTAL_COOLDOWN, CIRCUIT_BREAKER
    API_REQUESTS, LAST_REQUEST_AT, TOTAL_COOLDOWN, CIRCUIT_BREAKER = 0, None, 0.0, "none"
    for values in (HTTP_RESULTS, LOGICAL_CALLS):
        for key in values:
            values[key] = 0


def report_usage() -> None:
    print("Gemini logical calls:")
    for name, count in LOGICAL_CALLS.items():
        print(f"{name}: {count}")
    print("Gemini HTTP requests:")
    for name, count in HTTP_RESULTS.items():
        print(f"{name}: {count}")
    print(f"Total: {API_REQUESTS} / {request_budget()}")
    print(f"Total Gemini cooldown: {TOTAL_COOLDOWN:.0f}s")
    print(f"Circuit breaker: {CIRCUIT_BREAKER}")


def _stop(circuit: str, detail: str) -> GeminiOperationalError:
    global CIRCUIT_BREAKER
    CIRCUIT_BREAKER = circuit
    return GeminiOperationalError(circuit, detail)


def _wait(seconds: float, circuit: str) -> None:
    global TOTAL_COOLDOWN
    seconds = max(0.0, seconds)
    if TOTAL_COOLDOWN + seconds > MAX_TOTAL_COOLDOWN:
        raise _stop(circuit, "Gemini cooldown limit reached; wait for the next scheduled run.")
    if seconds:
        print(f"Gemini cooldown: {seconds:.0f}s")
        time.sleep(seconds)
        TOTAL_COOLDOWN += seconds


def _pace() -> None:
    if LAST_REQUEST_AT is not None:
        _wait(MIN_REQUEST_INTERVAL - (time.monotonic() - LAST_REQUEST_AT), "RATE_LIMIT")


def _safe_message(message: object, key: str, prompt: str = "") -> str:
    value = str(message).replace(key, "[REDACTED]") if key else str(message)
    if prompt:
        value = value.replace(prompt, "[PROMPT REDACTED]")
    value = re.sub(r"AIza[\w-]+|(?i:bearer)\s+\S+|(?i:key|api_key|x-goog-api-key)\s*[=:]\s*\S+", "[REDACTED]", value)
    value = re.sub(r"https?://\S+", "[URL]", value)
    return " ".join(value.split())[:180]


def _retry_after(raw: str | None) -> float | None:
    if not raw:
        return None
    try:
        return max(0.0, float(raw))
    except ValueError:
        try:
            stamp = parsedate_to_datetime(raw)
            return max(0.0, (stamp - dt.datetime.now(dt.timezone.utc)).total_seconds())
        except (TypeError, ValueError, OverflowError):
            return None


def _error_info(exc: urllib.error.HTTPError, key: str, prompt: str) -> tuple[str, str, str, float | None]:
    try:
        body = json.loads(exc.read(16384).decode("utf-8", "replace"))
        error = body.get("error", {}) if isinstance(body, dict) else {}
        if not isinstance(error, dict):
            error = {}
    except (OSError, ValueError, UnicodeError, AttributeError):
        error = {}
    api_status = _safe_message(error.get("status", "unknown"), key, prompt)[:80]
    raw_message = str(error.get("message", "No API message supplied."))
    message = _safe_message(raw_message, key, prompt)
    reasons = []
    for detail in error.get("details", []) if isinstance(error.get("details", []), list) else []:
        if isinstance(detail, dict):
            reasons.append(str(detail.get("reason", "")).lower())
            reasons.extend(str(item.get("description", "")).lower() for item in detail.get("violations", [])
                           if isinstance(item, dict))
    lower = " ".join(reasons + [raw_message.lower()])
    if "quota_exceeded" in lower or ("quota" in lower and any(x in lower for x in ("daily", "per day", "per_day"))):
        kind = "quota_exceeded"
    elif exc.code == 429:
        kind = "too_many_requests" if "too_many_requests" in lower else "rate_limit_exceeded"
    elif exc.code in {500, 502, 503, 504}:
        kind = "service_unavailable"
    else:
        kind = reasons[0] if reasons else "non_transient"
    retry_after = _retry_after(exc.headers.get("Retry-After") if exc.headers else None)
    exc.close()
    return api_status, kind, message, retry_after


def _grounded_sources(candidate: dict) -> list[str]:
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
    return sources


def call(prompt: str, *, search: bool = False, purpose: str = "Article generation") -> tuple[str, list[str]]:
    global API_REQUESTS, LAST_REQUEST_AT
    if CIRCUIT_BREAKER != "none":
        raise GeminiOperationalError(CIRCUIT_BREAKER, "Gemini circuit breaker is open for this run.")
    if purpose not in LOGICAL_CALLS:
        raise ValueError("Unknown Gemini logical call purpose")
    key = os.environ.get("GEMINI_API_KEY", "")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is not configured.")
    model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
    payload = {"contents": [{"role": "user", "parts": [{"text": prompt}]}], "generationConfig": {"temperature": 0.2}}
    if search:
        payload["tools"] = [{"google_search": {}}]
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json", "x-goog-api-key": key}, method="POST")
    if API_REQUESTS >= request_budget():
        print(f"Gemini request budget reached: {API_REQUESTS}/{request_budget()}. Stopping Gemini work for this run.")
        raise _stop("REQUEST_BUDGET", "Gemini request budget reached.")
    LOGICAL_CALLS[purpose] += 1
    for attempt in range(3):
        if API_REQUESTS >= request_budget():
            print(f"Gemini request budget reached: {API_REQUESTS}/{request_budget()}. Stopping Gemini work for this run.")
            raise _stop("REQUEST_BUDGET", "Gemini request budget reached.")
        _pace()
        API_REQUESTS += 1
        LAST_REQUEST_AT = time.monotonic()
        print(f"Gemini {purpose} HTTP request {API_REQUESTS}/{request_budget()}: model={model}; Google Search={'on' if search else 'off'}")
        try:
            with urllib.request.urlopen(req, timeout=120) as response:
                data = json.loads(response.read().decode("utf-8"))
            HTTP_RESULTS["Successful"] += 1
            candidates = data.get("candidates", []) if isinstance(data, dict) else []
            candidate = candidates[0] if isinstance(candidates, list) and candidates else {}
            text = "".join(part.get("text", "") for part in candidate.get("content", {}).get("parts", []) if not part.get("thought"))
            if text:
                return text, _grounded_sources(candidate)
            reason = candidate.get("finishReason") or data.get("promptFeedback", {}).get("blockReason") or "no candidate text"
            if attempt == 2:
                raise _stop("SERVICE_UNAVAILABLE", f"Gemini returned no text after three attempts (reason={_safe_message(reason, key)}).")
            _wait((30, 90)[attempt] * random.uniform(0.9, 1.1), "SERVICE_UNAVAILABLE")
        except urllib.error.HTTPError as exc:
            HTTP_RESULTS["429" if exc.code == 429 else "503" if exc.code == 503 else "Other errors"] += 1
            api_status, kind, message, retry_after = _error_info(exc, key, prompt)
            circuit = "DAILY_QUOTA" if kind == "quota_exceeded" else "RATE_LIMIT" if exc.code == 429 else "SERVICE_UNAVAILABLE"
            retryable = exc.code in {429, 500, 502, 503, 504} and kind != "quota_exceeded" and attempt < 2
            action = "retry after cooldown" if retryable else "stop Gemini calls for this workflow"
            print(f"Gemini error: HTTP={exc.code}; API status={api_status}; Type={kind}; Message={message}; Retry-After={retry_after if retry_after is not None else 'none'}; Action={action}")
            if kind == "quota_exceeded":
                print("Gemini daily quota exhausted. No additional Gemini calls will be made in this workflow. Article not published.")
                raise _stop("DAILY_QUOTA", "Gemini daily quota exhausted.") from None
            if not retryable:
                if exc.code in {429, 500, 502, 503, 504}:
                    raise _stop(circuit, f"Gemini temporarily unavailable after {attempt + 1} request(s).") from None
                raise RuntimeError(f"Gemini API HTTP {exc.code}; {kind}; {message}") from None
            base = (60, 180)[attempt] if exc.code == 429 else (30, 90)[attempt]
            delay = retry_after if retry_after is not None else base * random.uniform(0.9, 1.1)
            _wait(delay, circuit)
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            HTTP_RESULTS["Other errors"] += 1
            retryable = attempt < 2
            print(f"Gemini error: HTTP=unavailable; Type={type(exc).__name__}; Action={'retry after cooldown' if retryable else 'stop Gemini calls for this workflow'}")
            if not retryable:
                raise _stop("SERVICE_UNAVAILABLE", "Gemini network connection unavailable after three requests.") from None
            _wait((30, 90)[attempt] * random.uniform(0.9, 1.1), "SERVICE_UNAVAILABLE")
    raise _stop("SERVICE_UNAVAILABLE", "Gemini did not return an article response.")
