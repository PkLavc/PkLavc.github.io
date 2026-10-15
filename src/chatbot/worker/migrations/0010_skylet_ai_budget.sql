-- This budget applies ONLY to chat model calls, never blog/social generation.
CREATE TABLE IF NOT EXISTS skylet_ai_daily_budget (
  visit_date TEXT PRIMARY KEY,
  requests INTEGER NOT NULL DEFAULT 0 CHECK (requests >= 0)
);
