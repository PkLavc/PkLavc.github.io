# Admin authentication configuration

The Worker keeps the existing password format: lowercase hexadecimal SHA-256 of the UTF-8 password. Generate it locally without putting the password in command history or an argument:

```powershell
$secure = Read-Host 'Admin password' -AsSecureString
$plain = [System.Net.NetworkCredential]::new('', $secure).Password
$hash = $plain | node scripts/generate-admin-password-hash.mjs
Remove-Variable plain, secure
$hash
```

Configure the resulting hash as the Cloudflare Worker secret `ADMIN_PASSWORD_HASH`; never put the password itself in Wrangler configuration. The deployment workflow reads GitHub Actions secrets `CHATBOT_ADMIN_PASSWORD_HASH` and `CHATBOT_ADMIN_USERNAME`, plus the existing `JWT_SECRET`, then syncs them to Worker secrets `ADMIN_PASSWORD_HASH`, `ADMIN_USERNAME`, and `JWT_SECRET`.

For the existing deployment workflow, `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must also be configured as GitHub Actions secrets. The allowed frontend origins are the non-secret Worker variable `ALLOWED_ORIGINS` in `wrangler.toml`; it currently includes `https://pklavc.com`, `https://www.pklavc.com`, and local development origins.
