# Security Baseline

This file defines mandatory controls for production on Cloudflare Workers.

## Authentication and Sessions
- JWT signed with HMAC-SHA256 (`JWT_SECRET`).
- Expiration enforced via `exp` claim.
- Session presence enforced in KV (`session:<token>`), enabling soft revocation by TTL expiration.
- Admin endpoints require `role=admin`.

## Request Hardening
- CORS allowlist via `ALLOWED_ORIGINS`.
- Global rate limiting in KV by IP + token identity hash.
- Input sanitization removes control characters and trims oversized payloads.

## Prompt Injection and Abuse Mitigation
- Guardrails block known override patterns.
- Prompt includes fixed security delimiters and policy reminder lines.
- User input and retrieved data are always treated as untrusted content.

## Data Protection
- PII masking enabled by default for inbound/outbound text.
- Output filtering removes script tags and obvious secret-like tokens.
- Sensitive secrets remain in GitHub/Cloudflare secret stores only.

## Secrets Management
- Required secrets:
  - `CHATBOT_JWT_SECRET`
  - `GROQ_API_KEY`
  - `OPENROUTER_API_KEY`
  - `CHATBOT_ADMIN_PASSWORD_HASH`
- Optional observability secrets:
  - `LANGFUSE_BASE_URL`
  - `LANGFUSE_PUBLIC_KEY`
  - `LANGFUSE_SECRET_KEY`

## CI/CD Security
- Worker deploy workflow uses repository secrets only.
- Lint, typecheck, tests, and JSON validation run before deploy.
- Avoid committing `.dev.vars`, temporary logs, or generated artifacts with sensitive values.

## Operational Checklist
- Rotate JWT and provider keys periodically.
- Rehash admin password when rotating credentials.
- Validate CORS allowlist after domain changes.
- Review analytics anomalies for brute-force or prompt abuse patterns.
