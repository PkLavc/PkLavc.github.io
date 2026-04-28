# Telegram Setup (n8n)

## 1) Create bot with BotFather
1. Open Telegram and search for BotFather.
2. Send /newbot.
3. Pick a bot name and username.
4. Copy the token.

## 2) Configure n8n credentials
1. In n8n, open Credentials.
2. Create Telegram API credential.
3. Paste the token.

## 3) Build flow
1. Import template: `workflows/telegram-about-me-template.json`.
2. Add Telegram Trigger credentials.
3. Configure API endpoint to your deployed URL:
   - `https://api.pklavc.com/chat`
4. Add API bearer token in n8n env as `CHATBOT_API_TOKEN`.
5. Keep conversation id pattern `telegram-<chatId>` to preserve memory.

## 4) Webhook/public URL requirement
Telegram needs a public HTTPS webhook URL.
Options:
- Cloudflare Tunnel (free)
- ngrok free plan
- deploy n8n in a free cloud runtime

## 5) Security notes
- Never commit Telegram token in git.
- In production, use environment variables and secret manager.
- Use an API token from `/api/auth/login` and rotate credentials periodically.
