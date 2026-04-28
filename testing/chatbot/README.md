# Testing Chatbot Stack (Cloudflare + GitHub)

Production is fully cloud-first and serverless.

## Architecture
- Frontend: GitHub Pages (`https://pklavc.com/testing/`)
- API: Cloudflare Worker (`https://api.pklavc.com`)
- Data: Cloudflare D1 + KV
- File storage (optional): Cloudflare R2
- LLM providers: Groq primary, OpenRouter fallback

Main source files:
- `worker/src/index.ts`
- `worker/wrangler.toml`
- `worker/migrations/`

## Capabilities
- Conversational memory with context pruning
- PDF/text ingestion and chunked RAG retrieval
- Embedding cache and response cache in KV
- SSE streaming responses
- JWT auth + KV-backed session tracking
- Admin analytics endpoints
- Multi-provider retries + failover
- Prompt guardrails, PII masking, output sanitization
- Optional strict JSON output validation with schema/type checks
- Prompt versioning and structured tracing metadata

## Lightweight local mode
Only optional local workflow tooling is kept (`n8n`).

Run optional local tooling:
```bash
docker compose --profile local-workflows up -d
```

No local API runtime is required for production.

## CI/CD
Workflows in `.github/workflows/`:
- `chatbot-ci.yml`: lint, typecheck, tests, JSON validation
- `deploy-cloudflare-worker.yml`: validate + migrate D1 + deploy Worker
- `automation-pipelines.yml`: docs sync, embeddings generation, ETL, health checks
- `sitemap-maintenance.yml`: scheduled sitemap updates

## Required docs
- `deploy/cloudflare-github-deploy.md`
- `docs/architecture-overview.md`
- `docs/environment-separation.md`
- `docs/github-actions-matrix.md`
- `docs/observability.md`
- `docs/rag-pipeline.md`
- `docs/security.md`

## Environment variables
Non-secret vars live in `worker/wrangler.toml`.

Secrets must be configured in GitHub and Cloudflare:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CHATBOT_JWT_SECRET`
- `CHATBOT_ADMIN_USERNAME`
- `CHATBOT_ADMIN_PASSWORD_HASH`
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- Optional Langfuse secrets (`LANGFUSE_*`)

## Free-tier optimization strategy
- Keep prompt/token footprint bounded (`MAX_CONTEXT_CHARS`, low top-k).
- Reuse cached embeddings and short-lived response cache.
- Prefer deterministic fallback embedding when provider limits are hit.
- Use scheduled health checks and analytics snapshots rather than always-on infrastructure.

## Troubleshooting
- `session_expired`: token missing/expired in KV, log in again.
- `rate_limited`: reduce burst traffic or increase `RATE_LIMIT_PER_MINUTE`.
- `all_providers_failed:*`: check provider secrets and temporary provider status.
- Empty RAG: verify uploads succeeded and chunks were written to D1.
