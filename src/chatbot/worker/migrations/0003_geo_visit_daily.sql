CREATE TABLE IF NOT EXISTS geo_visit_daily (
  visit_date TEXT NOT NULL,
  country_code TEXT NOT NULL,
  region_code TEXT NOT NULL DEFAULT '',
  region_name TEXT NOT NULL DEFAULT '',
  visits INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (visit_date, country_code, region_code)
);

CREATE INDEX IF NOT EXISTS idx_geo_visit_daily_date
  ON geo_visit_daily(visit_date);

CREATE INDEX IF NOT EXISTS idx_geo_visit_daily_country_date
  ON geo_visit_daily(country_code, visit_date);
