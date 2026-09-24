# Daily English blog automation

The workflow runs at 12:15, 15:15, 18:15 and 21:15 UTC, corresponding to 09:15, 12:15, 15:15 and 18:15 in Sao Paulo (UTC-3). It queries official feeds, keeps only items published on the current `America/Sao_Paulo` date, removes previously used stories before Gemini ranking, and selects at most one technical story per run. No relevant confirmed event means no article and no commit. Feed content is untrusted data. The validator enforces 1,300-1,800 words, at least seven substantive sections (80+ words each), sources, SEO metadata, HTML structure, and a 1200x630 story-specific social card.

## GitHub setup

Add repository secret `GEMINI_API_KEY` under **Settings > Secrets and variables > Actions > New repository secret**. Optionally set the Actions variable `GEMINI_MODEL`; the default is `gemini-2.5-flash`.

Open **Actions > Daily English Blog Automation > Run workflow** and enable `dry_run` for the real collection, Gemini selection/generation, image creation and validation path without changing the repository. Offline non-news tests run with `python -m scripts.blog_automation.run --offline-fixture`; this does not call Gemini.

## Sources and coverage

Every configured feed logs name, HTTP/feed result, RSS/Atom type, parsed entry count, entries dated today and any request/XML/date error. The run summarizes configured/successful/failed feeds, today's candidates before and after deduplication, and counts per source/company. Feed failures are isolated.

Configured official feeds in `sources.json`: OpenAI; Google AI, Google DeepMind, Google Developers and Android Developers; Microsoft Source and Azure; GitHub; Cloudflare; NVIDIA; AMD; AWS; Amazon corporate; Apple; Meta Newsroom and Meta Engineering; Intel; Samsung.

Current coverage gaps, recorded in `coverage_notes`: Anthropic newsroom (previous RSS returned 404); Rockstar Newswire (previous RSS returned 404; no scraping; technical-interest-only rule); IBM (previous feed malformed XML); Oracle (previous RSS 403); Adobe and Qualcomm (previous RSS 404); xAI and Tesla (no validated structured feed); Meta AI has an official blog but no RSS validated. These are not falsely counted as functioning feeds. Google subchannels, Microsoft Azure and Amazon/AWS are separate. Add a source only after confirming its official feed returns valid RSS/Atom. Update/remove entries in `feeds` and adjust `coverage_notes` when coverage changes.

## Blog index and publishing

The site remains English-only under `/blog/`; no PT-BR or Spanish pages are generated. Existing design and ad integration are preserved. `blog/posts.json` is rebuilt from real English blog pages by `scripts/generate-rss.mjs`; `/js/blog-related-posts.js` fills Latest and Related sidebar lists without rewriting older post files. Sitemap generation stays in the existing scripts.

To pause automatic publishing, disable the workflow in Actions. To retain manual dispatches while pausing cron, remove only the workflow's `schedule` block.
