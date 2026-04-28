# Environment Separation

## Local (optional mode)
Purpose:
- optional workflow automation experiments
- no required local API stack

Runtime:
- `docker compose --profile local-workflows up -d` in `testing/chatbot`

Main endpoint:
- n8n: `http://localhost:5678`

## Online (demo mode)
Purpose:
- lightweight public demo
- minimal free-cost operation

Runtime:
- Worker only on demand
- no full stack server running 24h

Main endpoints:
- Frontend: `https://pklavc.com/testing/`
- API: `https://api.pklavc.com`

## Data paths
Local:
- `testing/chatbot/volumes/n8n/*`

Online:
- D1: relational and conversation data
- KV: session/rate counters
- R2: optional binary uploads

## Rule of thumb
- Validate behavior through CI + preview checks.
- Publish only lightweight APIs and curated documents online.
