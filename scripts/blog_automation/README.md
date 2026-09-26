# Daily English blog automation

The workflow runs at 12:15, 15:15, 18:15 and 21:15 UTC, corresponding to 09:15, 12:15, 15:15 and 18:15 in Sao Paulo (UTC-3). It queries official feeds, keeps only items published on the current `America/Sao_Paulo` date, removes previously used stories before Gemini ranking, and selects at most one technical story per run. No relevant confirmed event means no article and no commit. Feed content is untrusted data. The validator enforces a minimum of 1,300 words (no upper limit), at least seven substantive sections (80+ words each), sources, SEO metadata, HTML structure, and a 1200x630 story-specific social card.

## GitHub setup

Add repository secret `GEMINI_API_KEY` under **Settings > Secrets and variables > Actions > New repository secret**. Optionally set the Actions variable `GEMINI_MODEL`; the default is `gemini-2.5-flash`.

Gemini normally needs one selector request and one article request. The selector's Google Search URLs are checked directly before any enrichment. Enrichment runs only for missing essential evidence or an explicit evidence gap. The per-run HTTP request budget defaults to six, including retries; set the Actions variable `MAX_GEMINI_HTTP_REQUESTS_PER_RUN` to change it. Calls are spaced at least 15 seconds apart. Temporary HTTP 429 errors use `Retry-After` or approximately 60/180-second backoffs; HTTP 502/503/504 use approximately 30/90 seconds. There are at most two retries per logical call and at most five minutes of cumulative cooldown. Daily quota exhaustion, exhausted retries, or a spent request budget end the run without publishing. The final log separates logical calls, HTTP outcomes, cooldown, and circuit breaker status.

Open **Actions > Daily English Blog Automation > Run workflow** and enable `dry_run` for the real collection, Gemini selection/generation, image creation and validation path without changing the repository. Offline non-news tests run with `python -m scripts.blog_automation.run --offline-fixture`; this does not call Gemini.

## Sources and coverage

Every configured feed logs name, HTTP/feed result, RSS/Atom type, parsed entry count, entries dated today and any request/XML/date error. The run summarizes configured/successful/failed feeds, today's candidates before and after deduplication, and counts per source/company. Feed failures are isolated.

Configured sources in `sources.json` use a per-source cascade: configured RSS/Atom, a first-party RSS/Atom alternate discovered in the official HTML page, dated official HTML listing cards, then article-level publication metadata (schema.org `datePublished`, article published-time metadata, or a `time[datetime]` element). All article URLs and redirect destinations must stay on explicitly allowed company domains; undated records are never converted into same-day candidates. Article-date lookups are bounded to 15 items per source. A failed structured endpoint does not disable its official HTML fallback. The log keeps the initial feed error visible even when a fallback succeeds. Rockstar Newswire results still have to pass the technology-interest-only editorial rule.

The 2026-09-26 source audit led to official fallbacks for Anthropic Newsroom, DeepMind, Google Cloud, AI at Meta, IBM, Oracle News Releases, Adobe, Qualcomm, xAI, Tesla Blog, and Rockstar Newswire. Follow-up real workflows established 22/28 feeds responding; the remaining failures are logged, never reported as “no news.” Google Developers' RSS contains undated entries, so the collector now verifies article-level publication metadata for up to 15 official links. Oracle Blogs and Tesla Blog remain inaccessible to the GitHub runner (HTTP 403), so coverage gaps are documented rather than replaced with third-party feeds. Actual reachability and counts are reported per run. Google subchannels, Microsoft Azure, and Amazon/AWS remain separate.

## Blog index and publishing

The site remains English-only under `/blog/`; no PT-BR or Spanish pages are generated. Existing design and ad integration are preserved. `blog/posts.json` is rebuilt from real English blog pages by `scripts/generate-rss.mjs`. `/js/index.js` detects an English blog article and loads `/js/blog-related-posts.js`; the latter creates missing Latest/Related cards for legacy articles and fills them without using `innerHTML` or rewriting old post files. Sitemap generation stays in the existing scripts.

To pause automatic publishing, disable the workflow in Actions. To retain manual dispatches while pausing cron, remove only the workflow's `schedule` block.
