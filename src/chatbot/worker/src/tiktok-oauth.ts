export interface TikTokOAuthEnv {
  SESSIONS: KVNamespace;
  TIKTOK_SANDBOX_CLIENT_KEY?: string;
  TIKTOK_SANDBOX_CLIENT_SECRET?: string;
}

const TIKTOK_TOKEN_ENDPOINT = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_REDIRECT_URI = "https://pklavc.com/tiktok/callback/";
const TIKTOK_SANDBOX_TOKEN_KEY = "tiktok:sandbox:tokens";

type TikTokTokenResponse = {
  access_token?: string;
  expires_in?: number;
  open_id?: string;
  refresh_expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
  log_id?: string;
};

export async function handleTikTokOAuthExchange(
  request: Request,
  env: TikTokOAuthEnv,
): Promise<Response> {
  if (!env.TIKTOK_SANDBOX_CLIENT_KEY || !env.TIKTOK_SANDBOX_CLIENT_SECRET) {
    return json({ error: "tiktok_sandbox_not_configured" }, 503);
  }

  let body: { code?: string; redirect_uri?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const code = String(body.code || "").trim();
  const redirectUri = String(body.redirect_uri || "").trim();

  if (!code) {
    return json({ error: "missing_code" }, 400);
  }

  if (redirectUri !== TIKTOK_REDIRECT_URI) {
    return json({ error: "invalid_redirect_uri" }, 400);
  }

  const form = new URLSearchParams({
    client_key: env.TIKTOK_SANDBOX_CLIENT_KEY,
    client_secret: env.TIKTOK_SANDBOX_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: TIKTOK_REDIRECT_URI,
  });

  const tokenResponse = await fetch(TIKTOK_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: form,
  });

  let payload: TikTokTokenResponse;
  try {
    payload = await tokenResponse.json() as TikTokTokenResponse;
  } catch {
    return json({ error: "tiktok_invalid_response" }, 502);
  }

  if (!tokenResponse.ok || payload.error || !payload.access_token || !payload.refresh_token) {
    return json({
      error: payload.error || "tiktok_token_exchange_failed",
      error_description: payload.error_description || null,
      log_id: payload.log_id || null,
    }, 502);
  }

  const now = Math.floor(Date.now() / 1000);
  const stored = {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    token_type: payload.token_type || "Bearer",
    open_id: payload.open_id || "",
    scope: payload.scope || "",
    expires_at: now + Number(payload.expires_in || 0),
    refresh_expires_at: now + Number(payload.refresh_expires_in || 0),
    environment: "sandbox",
  };

  const refreshTtl = Math.max(60, Number(payload.refresh_expires_in || 31536000));
  await env.SESSIONS.put(TIKTOK_SANDBOX_TOKEN_KEY, JSON.stringify(stored), {
    expirationTtl: refreshTtl,
  });

  return json({
    ok: true,
    environment: "sandbox",
    open_id: stored.open_id,
    scope: stored.scope,
    expires_in: Number(payload.expires_in || 0),
    refresh_expires_in: Number(payload.refresh_expires_in || 0),
  });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
