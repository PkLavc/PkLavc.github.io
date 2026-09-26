from __future__ import annotations

import json
import os
import random
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Any

from . import gemini


@dataclass
class LLMResponse:
    provider: str
    model: str
    text: str
    sources: list[str]
    usage: dict[str, Any] | None = None


class LLMProvidersUnavailable(RuntimeError):
    pass


class LLMRequestRejected(RuntimeError):
    """Non-transient request/schema error; do not hide it with a provider switch."""


PROVIDERS = ("Gemini", "OpenRouter", "Cloudflare Workers AI")
STATES: dict[str, dict[str, Any]] = {}
LOGICAL_CALLS = {"Selector": 0, "Enrichment": 0, "Article generation": 0}
PROVIDER_BY_PURPOSE: dict[str, str] = {}
FALLBACKS_USED = 0
OPENROUTER_REQUESTS = 0
CLOUDFLARE_REQUESTS = 0
OPENROUTER_LAST: float | None = None
CLOUDFLARE_LAST: float | None = None
_HTTP_COUNTS = {"OpenRouter": {"Successful": 0, "429": 0, "503": 0, "Other errors": 0},
                "Cloudflare Workers AI": {"Successful": 0, "429": 0, "503": 0, "Other errors": 0}}


def _state(provider: str) -> dict[str, Any]:
    return STATES.setdefault(provider, {"circuit": "none", "result": "NOT_CALLED", "requests": 0,
                                        "model_requested": "", "model_returned": ""})


def reset_state() -> None:
    global FALLBACKS_USED, OPENROUTER_REQUESTS, CLOUDFLARE_REQUESTS, OPENROUTER_LAST, CLOUDFLARE_LAST
    STATES.clear()
    for purpose in LOGICAL_CALLS:
        LOGICAL_CALLS[purpose] = 0
    PROVIDER_BY_PURPOSE.clear()
    FALLBACKS_USED = OPENROUTER_REQUESTS = CLOUDFLARE_REQUESTS = 0
    OPENROUTER_LAST = CLOUDFLARE_LAST = None
    for counts in _HTTP_COUNTS.values():
        for key in counts:
            counts[key] = 0


def _limit(name: str, default: int) -> int:
    try:
        return max(1, int(os.environ.get(name, str(default))))
    except ValueError:
        return default


def _budget(provider: str) -> int:
    if provider == "OpenRouter":
        return _limit("MAX_OPENROUTER_HTTP_REQUESTS_PER_RUN", 3)
    return _limit("MAX_CLOUDFLARE_AI_HTTP_REQUESTS_PER_RUN", 3)


def _clean_message(value: object, *secrets: str) -> str:
    text = str(value)
    for secret in secrets:
        if secret:
            text = text.replace(secret, "[REDACTED]")
    text = re.sub(r"(?i)bearer\s+\S+|AIza[\w-]+|(?:api[_-]?key|token)\s*[=:]\s*\S+", "[REDACTED]", text)
    text = " ".join(text.replace("\n", " ").split())
    return text[:200]


def _content(data: dict[str, Any], provider: str) -> tuple[str, str, dict[str, Any] | None]:
    model = str(data.get("model") or "")
    usage = data.get("usage") if isinstance(data.get("usage"), dict) else None
    if provider == "Cloudflare Workers AI":
        result = data.get("result") or {}
        text = result.get("response", "") if isinstance(result, dict) else ""
        if not text and isinstance(result, dict):
            choices = result.get("choices") or []
            text = ((choices[0].get("message") or {}).get("content", "") if choices else "")
        usage = usage or (result.get("usage") if isinstance(result, dict) and isinstance(result.get("usage"), dict) else None)
    else:
        choices = data.get("choices") or []
        message = (choices[0].get("message") or {}) if choices else {}
        text = message.get("content", "")
        if isinstance(text, list):
            text = "".join(x.get("text", "") for x in text if isinstance(x, dict))
    return (text if isinstance(text, str) else ""), model, usage


def _validate_response(text: str, purpose: str, require_json: bool) -> None:
    if not text.strip():
        raise ValueError("empty model response")
    if not require_json:
        return
    clean = text.strip()
    fence = "`" * 3
    if clean.startswith(fence):
        clean = clean[len(fence):]
        if clean.lower().startswith("json"):
            clean = clean[4:]
        if clean.rstrip().endswith(fence):
            clean = clean.rstrip()[:-len(fence)]
    if purpose == "Selector" and clean.strip() == "NO_STORY":
        return
    try:
        value = json.loads(clean.strip())
    except (ValueError, TypeError) as exc:
        raise ValueError("invalid JSON response") from exc
    if purpose == "Selector":
        valid = clean.strip() == "NO_STORY" or (isinstance(value, dict) and
                (isinstance(value.get("ranked_candidates"), list) or "candidate_id" in value))
    elif purpose == "Enrichment":
        valid = isinstance(value, dict) and isinstance(value.get("sources"), list)
    elif purpose == "Article generation":
        valid = isinstance(value, dict) and (isinstance(value.get("sections"), list) or "rejection" in value)
    else:
        valid = isinstance(value, (dict, list))
    if not valid:
        raise ValueError("response does not match expected schema")


def _post(provider: str, prompt: str, purpose: str, attempt: int) -> LLMResponse:
    global OPENROUTER_REQUESTS, CLOUDFLARE_REQUESTS, OPENROUTER_LAST, CLOUDFLARE_LAST
    if provider == "OpenRouter":
        key = os.environ.get("OPENROUTER_API_KEY", "")
        model = os.environ.get("OPENROUTER_MODEL", "openrouter/free")
        if not key:
            _state(provider).update(circuit="NOT_CONFIGURED", result="NOT_CONFIGURED", model_requested=model)
            raise LLMProvidersUnavailable("OpenRouter fallback unavailable: API key not configured.")
        if OPENROUTER_REQUESTS >= _budget(provider):
            _state(provider).update(circuit="REQUEST_BUDGET", result="REQUEST_BUDGET")
            raise LLMProvidersUnavailable("OpenRouter request budget reached.")
        now = time.monotonic()
        if OPENROUTER_LAST is not None and now - OPENROUTER_LAST < 1:
            time.sleep(1 - (now - OPENROUTER_LAST))
        OPENROUTER_REQUESTS += 1
        OPENROUTER_LAST = time.monotonic()
        endpoint = "https://openrouter.ai/api/v1/chat/completions"
        headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json",
                   "HTTP-Referer": "https://pklavc.com", "X-Title": "PkLavc Blog Automation"}
        body = {"model": model, "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.2, "max_tokens": 8192 if purpose == "Article generation" else 4096}
    else:
        token = os.environ.get("CLOUDFLARE_API_TOKEN", "")
        account = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")
        model = os.environ.get("CLOUDFLARE_AI_MODEL", "@cf/openai/gpt-oss-120b")
        if not token or not account:
            _state(provider).update(circuit="NOT_CONFIGURED", result="NOT_CONFIGURED", model_requested=model)
            raise LLMProvidersUnavailable("Cloudflare Workers AI fallback unavailable: credentials not configured.")
        if CLOUDFLARE_REQUESTS >= _budget(provider):
            _state(provider).update(circuit="REQUEST_BUDGET", result="REQUEST_BUDGET")
            raise LLMProvidersUnavailable("Cloudflare Workers AI request budget reached.")
        now = time.monotonic()
        if CLOUDFLARE_LAST is not None and now - CLOUDFLARE_LAST < 1:
            time.sleep(1 - (now - CLOUDFLARE_LAST))
        CLOUDFLARE_REQUESTS += 1
        CLOUDFLARE_LAST = time.monotonic()
        endpoint = "https://api.cloudflare.com/client/v4/accounts/" + urllib.parse.quote(account, safe="") + "/ai/run/" + urllib.parse.quote(model, safe="@/")
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        body = {"messages": [{"role": "user", "content": prompt}], "temperature": 0.2,
                "max_tokens": 8192 if purpose == "Article generation" else 4096}
    state = _state(provider)
    state["requests"] += 1
    state["model_requested"] = model
    request = urllib.request.Request(endpoint, data=json.dumps(body).encode(), headers=headers, method="POST")
    print(f"{provider}: Model requested: {model}; HTTP request {state['requests']}/{_budget(provider)}")
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            data = json.loads(response.read().decode("utf-8"))
        text, returned_model, usage = _content(data, provider)
        if not text.strip():
            raise ValueError("empty model response")
        _HTTP_COUNTS[provider]["Successful"] += 1
        state.update(result="SUCCESS", model_returned=returned_model or model)
        print(f"{provider}: Model returned: {returned_model or model}; Result: SUCCESS")
        return LLMResponse(provider, returned_model or model, text, [], usage)
    except urllib.error.HTTPError as exc:
        _HTTP_COUNTS[provider]["429" if exc.code == 429 else "503" if exc.code in {500, 502, 503, 504} else "Other errors"] += 1
        try:
            raw = exc.read(8192).decode("utf-8", "replace")
        except OSError:
            raw = ""
        msg = _clean_message(raw, prompt, os.environ.get("OPENROUTER_API_KEY", ""), os.environ.get("CLOUDFLARE_API_TOKEN", ""))
        exc.close()
        if exc.code in {401, 403}:
            state.update(circuit="AUTH_FAILED", result="AUTH_FAILED")
            print(f"{provider}: HTTP {exc.code}; Result: AUTH_FAILED; trying next provider")
            raise LLMProvidersUnavailable(f"{provider} authentication failed (HTTP {exc.code}).") from None
        transient = exc.code in {408, 425, 429, 500, 502, 503, 504}
        if not transient:
            state.update(circuit="REQUEST_REJECTED", result="REQUEST_REJECTED")
            raise LLMRequestRejected(f"{provider} rejected request (HTTP {exc.code}): {msg}") from None
        state.update(result=f"HTTP_{exc.code}")
        if attempt == 2 or (exc.code == 429 and "quota" in raw.lower()):
            state.update(circuit="RATE_LIMIT" if exc.code == 429 else "SERVICE_UNAVAILABLE", result="EXHAUSTED")
            print(f"{provider}: HTTP {exc.code}; Result: {state['circuit']}; {msg}")
            raise LLMProvidersUnavailable(f"{provider} unavailable after {attempt + 1} request(s).") from None
        delay = (5, 15)[attempt] * random.uniform(0.9, 1.1)
        retry_after = exc.headers.get("Retry-After") if exc.headers else None
        if retry_after:
            try:
                delay = min(60, max(0, float(retry_after)))
            except ValueError:
                pass
        state.update(result=f"RETRY_HTTP_{exc.code}")
        print(f"{provider}: HTTP {exc.code}; Action: retry after cooldown; Message: {msg}")
        time.sleep(delay)
        return _post(provider, prompt, purpose, attempt + 1)
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        _HTTP_COUNTS[provider]["Other errors"] += 1
        state.update(result="NETWORK_ERROR")
        if attempt >= 2:
            state.update(circuit="SERVICE_UNAVAILABLE", result="EXHAUSTED")
            print(f"{provider}: network failure; Result: SERVICE_UNAVAILABLE")
            raise LLMProvidersUnavailable(f"{provider} network unavailable after three requests.") from None
        delay = (5, 15)[attempt] * random.uniform(0.9, 1.1)
        print(f"{provider}: network failure ({type(exc).__name__}); retry after cooldown")
        time.sleep(delay)
        return _post(provider, prompt, purpose, attempt + 1)
    except (ValueError, KeyError, TypeError) as exc:
        state.update(circuit="INVALID_RESPONSE", result="INVALID_RESPONSE")
        print(f"{provider}: invalid/empty response; provider circuit opened for this run")
        raise LLMProvidersUnavailable(f"{provider} returned an invalid response: {_clean_message(exc)}") from None


def _call_one(provider: str, prompt: str, purpose: str, search: bool, require_json: bool) -> LLMResponse:
    state = _state(provider)
    if state.get("circuit") != "none":
        raise LLMProvidersUnavailable(f"{provider} circuit open: {state['circuit']}.")
    if provider == "Gemini":
        if not os.environ.get("GEMINI_API_KEY"):
            state.update(circuit="NOT_CONFIGURED", result="NOT_CONFIGURED")
            raise LLMProvidersUnavailable("Gemini unavailable: API key not configured.")
        model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
        state["model_requested"] = model
        try:
            text, sources = gemini.call(prompt, search=search, purpose=purpose)
        except gemini.GeminiOperationalError as exc:
            state.update(circuit=exc.circuit, result=exc.circuit)
            print(f"Gemini: HTTP requests: {gemini.request_count()}; Result: {exc.circuit}")
            raise LLMProvidersUnavailable(str(exc)) from None
        except RuntimeError as exc:
            state.update(circuit="REQUEST_REJECTED", result="REQUEST_REJECTED")
            raise LLMRequestRejected(str(exc)) from None
        state.update(result="SUCCESS", model_returned=model)
        return LLMResponse("Gemini", model, text, sources)
    model = os.environ.get("OPENROUTER_MODEL", "openrouter/free") if provider == "OpenRouter" else os.environ.get("CLOUDFLARE_AI_MODEL", "@cf/openai/gpt-oss-120b")
    state["model_requested"] = model
    return _post(provider, prompt, purpose, 0)


def call_llm(prompt: str, purpose: str, search: bool = False, require_json: bool = False) -> LLMResponse:
    global FALLBACKS_USED
    if purpose not in LOGICAL_CALLS:
        raise ValueError("Unknown logical call purpose")
    LOGICAL_CALLS[purpose] += 1
    print(f"LLM provider chain for {purpose}: 1. Gemini -> 2. OpenRouter -> 3. Cloudflare Workers AI")
    failures = []
    for index, provider in enumerate(PROVIDERS):
        if index:
            print(f"Falling back to {provider}.")
            FALLBACKS_USED += 1
        try:
            response = _call_one(provider, prompt, purpose, search if provider == "Gemini" else False, require_json)
            try:
                _validate_response(response.text, purpose, require_json)
            except ValueError as exc:
                _state(provider).update(circuit="INVALID_RESPONSE", result="INVALID_RESPONSE")
                print(f"{provider}: invalid response schema; provider circuit opened for this run")
                raise LLMProvidersUnavailable(f"{provider} returned an invalid response schema.") from exc
            PROVIDER_BY_PURPOSE[purpose] = provider
            return response
        except LLMProvidersUnavailable as exc:
            failures.append(f"{provider}: {exc}")
            continue
        except LLMRequestRejected:
            raise
    raise LLMProvidersUnavailable("All configured LLM providers failed or are unavailable. " + " | ".join(failures))


def mark_article_quality_failure() -> str:
    provider = PROVIDER_BY_PURPOSE.get("Article generation", "")
    if provider not in PROVIDERS:
        return ""
    _state(provider).update(circuit="QUALITY_VALIDATION_FAILED", result="QUALITY_VALIDATION_FAILED")
    print(f"{provider}: article failed existing quality validation; provider circuit opened for article generation.")
    return provider


def report_usage() -> None:
    gemini.report_usage()
    print("LLM provider usage:")
    print("Logical calls:")
    for purpose, count in LOGICAL_CALLS.items():
        print(f"{purpose}: {count}")
    for purpose in LOGICAL_CALLS:
        print(f"{purpose} provider: {PROVIDER_BY_PURPOSE.get(purpose, 'none')}")
    print(f"OpenRouter HTTP requests: {OPENROUTER_REQUESTS} / {_budget('OpenRouter')}; results={_HTTP_COUNTS['OpenRouter']}")
    print(f"Cloudflare Workers AI HTTP requests: {CLOUDFLARE_REQUESTS} / {_budget('Cloudflare Workers AI')}; results={_HTTP_COUNTS['Cloudflare Workers AI']}")
    print(f"Fallbacks used: {FALLBACKS_USED}")
    print("Provider circuits: " + ", ".join(f"{p}={_state(p)['circuit']}" for p in PROVIDERS))
