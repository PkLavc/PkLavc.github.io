# Architecture Overview

## High-level split

### Online environment (production)
- GitHub Pages for frontend (`pklavc.com`)
- Cloudflare Worker for API (`api.pklavc.com`)
- Cloudflare D1 + KV (+ optional R2)
- Wake-on-request execution

Use for public demo with minimal cost and no always-on server.

### Local environment (optional and lightweight)
- Optional `n8n` only (`docker compose --profile local-workflows up -d`)
- No local API runtime required for production parity

## LLM provider strategy
- Primary: Groq
- Fallback: OpenRouter
- Provider failover automatic at runtime

## Core feature map
- Conversational memory: D1 conversations + messages
- PDF upload: Worker endpoint with extraction best-effort + optional R2 persistence
- RAG: chunking + embeddings + vector scoring
- Streaming: SSE endpoint
- Auth: JWT
- Admin panel: analytics + conversation audit
- Security: sanitization, guardrails, PII masking, rate limit
- Prompt versioning: D1 `prompt_versions`

## Observability
- Structured JSON logs
- Trace ID per request
- Optional Langfuse trace ingestion

## CI/CD and automation
- Worker CI (lint/typecheck/tests/json validation)
- Worker deploy on push/main after validation gate
- Pipelines for docs sync, embeddings, ETL, docs generation
- Scheduled health checks
- Automated sitemap maintenance
