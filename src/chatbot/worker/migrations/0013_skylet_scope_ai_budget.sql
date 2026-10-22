-- One shared daily model-call cap protects Skylet's Workers AI spending.
-- Scope verification also gets its own ceiling within that shared cap.
ALTER TABLE skylet_ai_daily_budget
  ADD COLUMN scope_checks INTEGER NOT NULL DEFAULT 0 CHECK (scope_checks >= 0);
