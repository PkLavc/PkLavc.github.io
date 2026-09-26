# Blog Publishing Standard

Use `BLOG_BACKLOG_EN.md` as the ordered source of topics. Publish each backlog topic in English, Brazilian Portuguese, and Spanish as one batch, adapting phrasing and examples to each audience rather than translating literally.

## Current Article Template

- Follow recent event articles such as `/blog/microsoft-copilot-home-code-autopilot-update/` for the shared site shell, SEO metadata, breadcrumb, hero, footer, and dynamic sidebar.
- Add `data-auto-post="true"` and `data-event-date` on event-driven articles where appropriate.
- Include sidebar lists with `data-blog-post-list="latest"` and `data-blog-post-list="related"`, and load `/js/blog-related-posts.js` so the site fills them from `/blog/posts.json`.
- Use a visual system explanation: decision tree, architecture/pipeline, comparison matrix, chart, or operational dashboard. Include a practical implementation section, failure modes, and primary references when available.
- Distinguish sourced facts from analysis and clearly label proposals, drafts, and changing regulatory status.

## Indexes and Sitemap

- Add English posts to `/blog/posts.json` so the dynamic recent/related lists can include them.
- Add the topic to the three language blog index JSON-LD and featured cards when publishing all three translations.
- Add English auto-post URLs to `blog/automation-sitemap.xml`; add available language alternates to `sitemaps/blog.xml` when appropriate. `sitemap.xml` is generated without auto-post pages, so do not add them there manually. English-only posts may be published in parallel and must remain untouched when a translated batch updates the blog sitemap.
- Mark the backlog topic complete only after all required language pages, index entries, and sitemap entries exist.

## Before Commit

- Inspect `git status` and preserve unrelated or parallel English-only work.
- Validate JSON-LD and `posts.json` as JSON, sitemap XML, language alternates, local related links, and page references.
- Check mobile widths so diagrams and tables do not cause page-level horizontal overflow; tables may scroll inside their own wrapper.
- Commit only the completed article batch and its indexes/sitemap/backlog changes unless the user explicitly asks otherwise.
