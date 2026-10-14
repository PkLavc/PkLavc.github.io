# Pinterest Publisher — setup and safe activation

Account: https://br.pinterest.com/pklavc/
Application: PkLavc Publisher, app ID `1624382`
Status as of 2026-10-14: **Trial access pending.** No live Pinterest API calls or public Pins have been confirmed.

## Prepared now
- Original English **Games** + **Tech** news Pins use the exact article image from `PkLavc/blog/en/posts.json`, with fallback to PkLavc-owned image, direct `pklavc.com/blog/en/...` URL and appropriate hashtags.
- Curated **Store** Pins use real products and images from `store/products.json`, and deep-link to `https://pklavc.com/store/?product=<product ID>`. Users see the requested product in the existing PkLavc Store before choosing an affiliate merchant.
- Dedicated Pinterest boards: `PkLavc | Gaming & Rockstar`, `PkLavc | Technology & AI`, `PkLavc | Tech & Gaming Finds`. The publisher reuses existing boards before creating new ones.
- Resilient `social-state/pinterest-published.json` reservations, per-category daily caps and remote duplicate checks.
- Public Github Actions: `.github/workflows/pinterest-publish.yml` and `.github/workflows/pinterest-token.yml`.
- No Pinterest ads, paid promotions, merchant catalog setup, or billing endpoints.

## After Pinterest approves Trial access
1. In developer settings for application `1624382`, register **exactly** `https://pklavc.com/pinterest/callback/` as the redirect URI.
2. Add this new GitHub Actions secret on `PkLavc/PkLavc.github.io`: `PINTEREST_APP_SECRET` (the secret that becomes visible after approval). Reuse the already configured `INSTAGRAM_TOKEN_ROTACION` (GitHub Secrets:write credential). No need to manually create an access token or refresh token.
3. Configure GitHub Actions repository **variable** `PINTEREST_API_TIER=trial`.
4. Use `https://pklavc.com/pinterest/connect/` to approve Pinterest OAuth for the PkLavc account. Copy the *one-time* authorization code from the callback page into `PINTEREST_OAUTH_CODE` as a temporary Actions Secret; never paste it into chat or source files.
5. Manually run **Pinterest OAuth bootstrap and automatic token refresh** with mode `bootstrap`. It exchanges the code via app ID and secret, verifies `@pklavc`, creates `PINTEREST_ACCESS_TOKEN` and `PINTEREST_REFRESH_TOKEN` in GitHub Secrets, and deletes `PINTEREST_OAUTH_CODE` after successful exchange.
6. Run **Pinterest PkLavc organic Tech Games and Store Pins** in `check` or `preview` mode. A user-initiated `trial-publish` test is allowed in Trial only, but resulting Pins are visible **only to the owner**.

## After Pinterest approves Standard access
Set repository **variables** `PINTEREST_API_TIER=standard` and `PINTEREST_PUBLIC_ENABLED=true` to enable live scheduled public Pins. App Tier needs manual confirmation; **never enable the public gate until Standard is approved**.

## Rotation and schedule
- The token maintenance workflow runs on the 1st/16th of each month, but does **not run** while the app tier variable remains unset/pending.
- On approval and OAuth bootstrap, Pinterest's **continuous refresh tokens** for newly created apps are used and rotated in GitHub Secrets, with no manual secret copying on regular rotation. API changes, revocation or permission changes may require another interactive authorization.
- Pin schedule after Standard gate: 3 Games + 2 Tech + 2 curated Store opportunities per day (UTC 12,13,14,15,17,19,21). The workflow skips automatically when no eligible content is available; quotas and rate limits apply.
- The workflow is fully dormant on scheduled runs while `PINTEREST_API_TIER` is pending or `PINTEREST_PUBLIC_ENABLED` is not `true`; it cannot spend any Pinterest Ads budget.

**Current blocker:** Pinterest has not issued the app secret or write scopes, so actual Pinterest publishing and OAuth exchange cannot be tested yet.
