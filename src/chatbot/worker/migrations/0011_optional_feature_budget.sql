-- Optional features must have a small, atomic daily budget before they
-- can consume quota needed by content generation, publishing or core APIs.
-- Anonymous aggregate only: no IP, cookie, user ID, or token stored.
CREATE TABLE IF NOT EXISTS optional_daily_usage (
  usage_date TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('visit_pklavc', 'visit_macca', 'skylet_request')),
  requests INTEGER NOT NULL DEFAULT 0 CHECK (requests >= 0),
  PRIMARY KEY (usage_date, kind)
);
