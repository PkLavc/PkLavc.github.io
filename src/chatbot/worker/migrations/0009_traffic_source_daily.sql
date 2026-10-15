CREATE TABLE IF NOT EXISTS traffic_source_daily (
  visit_date TEXT NOT NULL,
  channel TEXT NOT NULL,
  section TEXT NOT NULL,
  page_key TEXT NOT NULL,
  visits INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (visit_date, channel, section, page_key)
);

CREATE INDEX IF NOT EXISTS idx_traffic_source_daily_date
  ON traffic_source_daily(visit_date);

CREATE INDEX IF NOT EXISTS idx_traffic_source_daily_date_channel
  ON traffic_source_daily(visit_date, channel);
