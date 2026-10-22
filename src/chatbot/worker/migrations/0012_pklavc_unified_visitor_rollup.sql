-- One atomic row update per PkLavc visit: geolocation, source/page and
-- daily budget live in the same D1 record. No secondary indexes are needed.
-- Existing geo_visit_daily and traffic_source_daily stay readable as history.
-- Values are anonymous daily counters, never IPs, identities, or URLs.
CREATE TABLE IF NOT EXISTS pklavc_visit_rollup_daily (
  visit_date TEXT PRIMARY KEY NOT NULL,
  visits INTEGER NOT NULL DEFAULT 0 CHECK (visits >= 0),
  geo_counts TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(geo_counts)),
  region_names TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(region_names)),
  source_counts TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(source_counts)),
  updated_at TEXT NOT NULL
);
