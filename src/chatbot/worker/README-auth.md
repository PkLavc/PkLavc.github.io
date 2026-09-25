# Site admin authentication configuration

This configures sign-in for the site's `/adm/` area. The existing Cloudflare Worker is used as its HTTP backend; this is separate from chatbot or Skylet authentication.

The Worker keeps the existing password format: lowercase hexadecimal SHA-256 of the UTF-8 password. Generate it locally without putting the password in command history or an argument:

```powershell
$secure = Read-Host 'Admin password' -AsSecureString
$plain = [System.Net.NetworkCredential]::new('', $secure).Password
$hash = $plain | node scripts/generate-admin-password-hash.mjs
Remove-Variable plain, secure
$hash
```

Configure the resulting hash as the GitHub Actions secret `ADMIN_PASSWORD_HASH`; the existing deployment workflow syncs it to the Cloudflare Worker secret with the same name. Set `ADMIN_USERNAME` and `JWT_SECRET` as GitHub Actions secrets too; each is synchronized to the Worker secret with the same name. Never put the password itself in Wrangler configuration.

For the existing deployment workflow, `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` must also be configured as GitHub Actions secrets. The allowed frontend origins are the non-secret Worker variable `ALLOWED_ORIGINS` in `wrangler.toml`; it currently includes `https://pklavc.com`, `https://www.pklavc.com`, and local development origins.
