# RAG Pipeline

This architecture keeps retrieval quality stable while staying inside free-tier constraints.

## Pipeline Stages
1. Ingestion
- Input from `/upload/pdf` accepts either file content or manual text fallback.
- Text is sanitized and chunked with overlap (`size=900`, `overlap=120`).
- Document metadata is stored in `documents`.

2. Embedding
- Primary: OpenRouter embeddings endpoint.
- Fallback: deterministic local embedding for resiliency.
- Embeddings are cached in KV by content hash to reduce duplicate calls.

3. Storage
- `document_chunks` stores chunk text and serialized embedding vectors.
- Optional binary storage in R2 for original uploaded file bytes.

4. Retrieval
- Query embedding is generated with cache lookup.
- Candidate chunks are loaded from recent user-scoped rows.
- Similarity uses cosine score and top-k selection.

5. Prompt Composition
- Prompt contains system template, prompt version, task label, memory block, and RAG block.
- Security delimiters are injected to reduce instruction override attacks.

## Free-Tier Optimization
- Short-lived response cache in KV reduces repeated completions.
- Embedding cache avoids repeated embedding API cost.
- Automation pipeline prepares KV embedding seed artifacts (`embeddings-kv-seed.json`) for bulk warming workflows.
- Context pruning controls prompt growth using `MAX_CONTEXT_CHARS`.
- Top-k retrieval default is small (`4`) to reduce tokens.

## Quality Controls
- Input guardrails run before prompt assembly.
- Output sanitization and optional strict JSON validation run after completion.
- Prompt versioning allows controlled quality rollouts.

## Future Upgrades
- Move from brute-force similarity to ANN index when scale grows.
- Add chunk scoring penalties for stale or duplicate content.
- Add retrieval audit records (selected chunk IDs + scores).
