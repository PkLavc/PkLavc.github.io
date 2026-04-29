# Architecture Overview

## Scope
The chatbot stack combines a Cloudflare Worker backend with a static portfolio frontend.

## Components
- Worker API: `src/chatbot/worker/src/index.ts`
- Manual knowledge base: `src/chatbot/worker/src/manual-rag.ts`
- Scripts: `src/chatbot/scripts/*.mjs`
- Frontend widget: `js/skyler-widget.js`, `css/skyler-widget.css`

## Runtime Flow
1. Client sends chat message to the Worker.
2. Worker applies guardrails and conversation routing.
3. Local reply is only used for simple greetings.
4. LLM is the default path for non-greeting messages.
5. Portfolio RAG context is added only when the query is portfolio-related.
6. Response is stored in conversation history and returned to client.

## Data and Caching
- D1 stores messages, analytics, and prompt versions.
- KV `CACHE` stores site RAG cache and metadata.
- KV `SESSIONS` stores short-lived response cache and session state.

## Providers
- Primary provider: Groq
- Fallback provider: OpenRouter

## Notes
- Site context includes extracted title/description/body text and JSON-LD from core pages.
- Manual RAG is used as deterministic profile grounding and safety net.
