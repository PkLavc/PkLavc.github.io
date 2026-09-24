# Daily English blog automation

The workflow runs at 15:15 UTC every day (12:15 in São Paulo). It reads official RSS/Atom feeds in `sources.json`, keeps items published on the current São Paulo date, then asks Gemini with Google Search grounding to confirm the original event date and select no more than one engineering-relevant story. No strong candidate means no article and no commit. Feed text is passed to the model as untrusted data. Search grounding is evidence for verification, not an automatic source list: an article can cite at most five explicitly selected, verified URLs, including the primary source.

## GitHub setup

Add repository secret `GEMINI_API_KEY` under **Settings → Secrets and variables → Actions → New repository secret**. Optionally add the Actions variable `GEMINI_MODEL`; the default is `gemini-2.5-flash`.

Open **Actions → Daily English Blog Automation → Run workflow**. Enable `dry_run` to generate and validate a preview without changing repository files. For a local Gemini dry-run, set `GEMINI_API_KEY` in your shell and run `python -m scripts.blog_automation.run --dry-run`; never save API keys in this repository.

For an offline template and validator check without Gemini or network, run `python -m scripts.blog_automation.run --offline-fixture`. This is explicitly a non-news fixture and is never published.

Edit `sources.json` to add or remove official RSS/Atom feeds and watched topics. The workflow is English-only and writes pages under `/blog/`; it does not create PT-BR or Spanish translations. New pages retain the site's existing styles, metadata, navigation, deploy-time ad injection, RSS and sitemap generators. Automatic post URLs are listed in `/blog/automation-sitemap.xml`, linked from `/sitemap-index.xml`.

To pause automatic publishing, disable the workflow in the repository Actions tab. Alternatively, remove its `schedule` block to keep manual runs.
