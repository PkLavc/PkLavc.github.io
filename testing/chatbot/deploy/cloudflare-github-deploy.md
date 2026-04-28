# Cloudflare + GitHub Deployment Guide

## Target architecture
- Frontend: GitHub Pages at `https://pklavc.com`
- API: Cloudflare Worker at `https://api.pklavc.com`
- Data: Cloudflare D1 + KV
- Optional uploads: Cloudflare R2
- Local optional tooling: Docker + n8n only

## 1) Cloudflare resources
Create in Cloudflare dashboard:
1. Worker: `pklavc-chat-api`
2. D1 database: `pklavc-chat-db`
3. KV namespaces:
   - `pklavc-chat-sessions`
   - `pklavc-chat-rate-limit`
4. Optional R2 bucket: `pklavc-chat-uploads`

## 2) Worker configuration
1. Open `testing/chatbot/worker/wrangler.toml`.
2. Replace IDs:
   - `database_id`
   - KV namespace IDs
3. Keep route target as `api.pklavc.com/*`.

## 3) Secrets
Set via CLI or dashboard:
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH` (SHA-256)
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `LANGFUSE_BASE_URL` (optional)
- `LANGFUSE_PUBLIC_KEY` (optional)
- `LANGFUSE_SECRET_KEY` (optional)

Example:
```bash
cd testing/chatbot/worker
npx wrangler secret put JWT_SECRET
npx wrangler secret put GROQ_API_KEY
npx wrangler secret put OPENROUTER_API_KEY
```

## 4) D1 migrations
```bash
cd testing/chatbot/worker
npx wrangler d1 migrations apply pklavc-chat-db
```

## 5) Deploy worker
```bash
cd testing/chatbot/worker
npm install
npm run deploy
```

## 6) Domain mapping
In Cloudflare DNS:
- Add `api` CNAME to Worker route target as required by your zone setup.
- Configure Worker route: `api.pklavc.com/*`

## 7) Frontend integration
`testing/index.html` and `js/testing-chat.js` already default to:
- `https://api.pklavc.com`

No backend server required for GitHub Pages runtime.

## 8) GitHub Actions secrets required
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CHATBOT_JWT_SECRET`
- `CHATBOT_ADMIN_USERNAME`
- `CHATBOT_ADMIN_PASSWORD_HASH`
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `LANGFUSE_BASE_URL` (optional)
- `LANGFUSE_PUBLIC_KEY` (optional)
- `LANGFUSE_SECRET_KEY` (optional)

## 9) Health checks
- `https://pklavc.com/testing/`
- `https://api.pklavc.com/health`

Health workflow is automated in GitHub Actions.
