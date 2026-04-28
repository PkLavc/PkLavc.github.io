# Cloudflare Worker API

## Purpose
Serverless public API for portfolio chatbot demo, running at `api.pklavc.com`.

## Features
- JWT authentication
- conversational memory (D1)
- PDF/text upload with RAG indexing
- embeddings and vector scoring
- task-based model routing (chat/summary/classification)
- streaming SSE chat
- Groq primary + OpenRouter fallback
- retry with backoff and provider failover
- guardrails and sanitization
- PII masking
- KV response and embedding cache
- rate limiting with KV
- admin analytics endpoints
- prompt versioning in D1

## Setup
1. Install dependencies:
```bash
npm install
```
2. Configure `wrangler.toml` bindings.
3. Apply D1 migrations:
```bash
npx wrangler d1 migrations apply pklavc-chat-db
```
4. Set secrets:
```bash
npx wrangler secret put JWT_SECRET
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put OPENROUTER_API_KEY
```
5. Run dev:
```bash
npm run dev
```
6. Deploy:
```bash
npm run deploy
```

## Endpoint summary
- `GET /health`
- `POST /auth/login`
- `POST /upload/pdf`
- `POST /chat`
- `POST /chat/stream`
- `GET /conversations`
- `GET /admin/analytics`
- `GET /admin/conversations`
