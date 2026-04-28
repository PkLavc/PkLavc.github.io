# Observability and LLMOps

This document defines the production observability baseline for the Cloudflare-first chatbot runtime.

## Objectives
- End-to-end traceability for each request (`trace_id`, `traceparent`).
- Provider-level reliability metrics (primary/fallback, retries, failure reasons).
- Cost and token visibility with low overhead.
- Fast incident triage without long-lived servers.

## Telemetry Sources
- Worker structured logs (`console.log` JSON payloads).
- D1 analytics events (`analytics_events` table).
- Optional Langfuse ingestion (`sendLangfuseTrace`).

## Event Taxonomy
- `login`: successful authentication.
- `upload_pdf`: document ingestion and chunking.
- `chat`: chat completion metadata.
- `otel_span`: coarse-grained pseudo-spans for request timing.

## Required Metadata Fields
- `trace_id`: request correlation identifier.
- `traceparent`: distributed trace header for interoperability.
- `user_id`: numeric user ID when available.
- `provider`: `groq` or `openrouter`.
- `fallback`: boolean indicating provider fallback.
- `task`: task routing label (`chat`, `summary`, `classification`, `lead_scoring`, `admin_insights`).
- `latency_ms`: end-to-end latency in milliseconds.
- `tokens_estimate`: approximate token count using char-to-token heuristic.
- `prompt_version`: active prompt version used by the request.

## SLO Suggestions (Free-Tier Friendly)
- P95 `/chat` latency: < 3000 ms.
- P95 `/chat/stream` first token: < 1500 ms.
- Provider hard failure rate: < 2% daily.
- Guardrail false-positive rate: < 3% on sampled traffic.

## Alerting Strategy
Use GitHub Actions schedule plus a small script-driven health monitor.

Minimum checks:
- `GET /health` returns `ok: true`.
- Auth route rejects invalid credentials and accepts known admin credentials.
- Chat route returns valid response shape and `trace_id`.

## Incident Response
1. Query `analytics_events` filtered by `trace_id`.
2. Check provider/fallback path for burst failures.
3. Verify rate-limit keys and session TTL behavior.
4. Roll prompt version if quality regression is tied to prompt update.

## Data Retention
- D1 analytics: short horizon in free tier (recommended 7 to 30 days).
- KV cache keys: aggressively short TTL (`response` 180s, embeddings 24h).
- Optional R2 uploads: rotate or archive periodically.

## Privacy
- PII masking is enabled by default (`PII_MASKING=true`).
- Output redaction strips obvious secret-like key/value patterns.
- Avoid storing raw secrets in trace metadata.
