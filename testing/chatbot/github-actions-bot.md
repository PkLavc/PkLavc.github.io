# GitHub Actions Bot (No external key)

A lightweight bot is configured in .github/workflows/about-me-bot.yml.

## How it works
- Trigger: new issue/PR comment containing /aboutme
- Runtime: GitHub Actions
- Auth: built-in GITHUB_TOKEN (no external API key)
- Behavior: keyword-based reply about Patrick profile

## Example comments
- /aboutme
- /aboutme backend
- /aboutme saas
- /aboutme stack
- /aboutme observabilidade

## Important limitation
This GitHub Actions bot is asynchronous and repository-scoped.
It is not a real-time web chat backend for GitHub Pages.

Use it as a free online bot channel, and keep n8n local/runtime for true chat UX.
