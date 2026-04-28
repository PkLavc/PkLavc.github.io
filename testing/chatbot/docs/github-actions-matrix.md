# GitHub Actions Matrix

## Workflows

### `chatbot-ci.yml`
- npm install
- lint
- typecheck
- test
- JSON validation

### `deploy-cloudflare-worker.yml`
- Validate (lint/typecheck/tests/json) before deployment
- Deploy Worker on push to main after validation
- Uses Cloudflare API token + account ID

### `automation-pipelines.yml`
- Document sync
- Offline embeddings generation
- KV embedding seed preparation artifact
- ETL analytics batch
- Auto docs generation
- Health checks

### `sitemap-maintenance.yml`
- Scheduled sitemap update
- Auto-commit when changes exist

### Existing
- `pages.yml` keeps GitHub Pages deploy pipeline active.

## Recommended branch policy
- PR required to merge into `main`
- CI required status checks:
  - chatbot-ci / build-lint-test

## Suggested schedule tuning
- health checks: every 6h
- automation batch: every 6h
- sitemap maintenance: daily
