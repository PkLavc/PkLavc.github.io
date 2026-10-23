-- Web Push uses the existing D1 binding but has isolated tables and a bounded signup budget.
-- No tokens/IP addresses stored; subscription endpoint and auth keys are confidential.
CREATE TABLE IF NOT EXISTS push_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  public_key TEXT NOT NULL,
  private_encrypted TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS push_subscriptions (
  endpoint_hash TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en','pt','es')),
  tech INTEGER NOT NULL DEFAULT 0 CHECK (tech IN (0,1)),
  games INTEGER NOT NULL DEFAULT 0 CHECK (games IN (0,1)),
  store INTEGER NOT NULL DEFAULT 0 CHECK (store IN (0,1)),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_push_tech ON push_subscriptions(tech, endpoint_hash);
CREATE INDEX IF NOT EXISTS idx_push_games ON push_subscriptions(games, endpoint_hash);
CREATE INDEX IF NOT EXISTS idx_push_store ON push_subscriptions(store, endpoint_hash);

CREATE TABLE IF NOT EXISTS push_daily_signups (
  day TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0)
);

CREATE TABLE IF NOT EXISTS push_campaigns (
  id TEXT PRIMARY KEY,
  day TEXT NOT NULL,
  topic TEXT NOT NULL CHECK (topic IN ('tech', 'games', 'store')),
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sending' CHECK (status IN ('sending','done')),
  cursor TEXT NOT NULL DEFAULT '',
  sent_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_push_campaigns_daily ON push_campaigns(day, topic);
