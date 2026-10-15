-- Skylet's own small, hard per-day model-call reservation.
-- Writes stop once the daily ceiling is reached. Article generation never
-- uses this table and Cloudflare Workers AI is not called by Skylet.
CREATE TABLE IF NOT EXISTS skylet_ai_daily_budget (
  usage_date TEXT PRIMARY KEY,
  requests INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
