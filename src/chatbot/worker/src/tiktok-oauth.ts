// TikTok sandbox OAuth exchange and server-side token lifecycle.
export interface TikTokOAuthEnv {
  SESSIONS: KVNamespace;
  TIKTOK_SANDBOX_CLIENT_KEY?: string;
  TIKTOK_SANDBOX_CLIENT_SECRET?: string;
}

const TIKTOK_TOKEN_ENDPOINT = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_REDIRECT_URI = "https://pklavc.com/tiktok/callback/";
const TIKTOK_SANDBOX_TOKEN_KEY = "tiktok:sandbox:tokens";
const ACCESS_TOKEN_REFRESH_SKEW_SECONDS = 15 * 60;

export type TikTokStoredTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  open_id: string;
  scope: string;
  expires_at: number;
  refresh_expires_at: number;
  environment: "sandbox";
};

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

  const stored = tokenBundle(payload);
  await saveTikTokTokens(env, stored);

  return json({
    ok: true,
    environment: "sandbox",
    open_id: stored.open_id,
    scope: stored.scope,
    expires_in: Number(payload.expires_in || 0),
    refresh_expires_in: Number(payload.refresh_expires_in || 0),
  });
}

export async function getTikTokTokens(env: TikTokOAuthEnv): Promise<TikTokStoredTokens> {
  const raw = await env.SESSIONS.get(TIKTOK_SANDBOX_TOKEN_KEY);
  if (!raw) {
    throw new Error("tiktok_not_authorized");
  }

  let stored: TikTokStoredTokens;
  try {
    stored = JSON.parse(raw) as TikTokStoredTokens;
  } catch {
    throw new Error("tiktok_token_state_invalid");
  }

  const now = Math.floor(Date.now() / 1000);
  if (!stored.access_token || !stored.refresh_token || stored.refresh_expires_at <= now) {
    throw new Error("tiktok_reauthorization_required");
  }

  if (stored.expires_at > now + ACCESS_TOKEN_REFRESH_SKEW_SECONDS) {
    return stored;
  }

  return refreshTikTokTokens(env, stored.refresh_token);
}

async function refreshTikTokTokens(
  env: TikTokOAuthEnv,
  refreshToken: string,
): Promise<TikTokStoredTokens> {
  if (!env.TIKTOK_SANDBOX_CLIENT_KEY || !env.TIKTOK_SANDBOX_CLIENT_SECRET) {
    throw new Error("tiktok_sandbox_not_configured");
  }

  const response = await fetch(TIKTOK_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: new URLSearchParams({
      client_key: env.TIKTOK_SANDBOX_CLIENT_KEY,
      client_secret: env.TIKTOK_SANDBOX_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  let payload: TikTokTokenResponse;
  try {
    payload = await response.json() as TikTokTokenResponse;
  } catch {
    throw new Error("tiktok_refresh_invalid_response");
  }

  if (!response.ok || payload.error || !payload.access_token || !payload.refresh_token) {
    throw new Error(payload.error || "tiktok_refresh_failed");
  }

  const stored = tokenBundle(payload);
  await saveTikTokTokens(env, stored);
  return stored;
}

function tokenBundle(payload: TikTokTokenResponse): TikTokStoredTokens {
  const now = Math.floor(Date.now() / 1000);
  return {
    access_token: String(payload.access_token || ""),
    refresh_token: String(payload.refresh_token || ""),
    token_type: String(payload.token_type || "Bearer"),
    open_id: String(payload.open_id || ""),
    scope: String(payload.scope || ""),
    expires_at: now + Number(payload.expires_in || 0),
    refresh_expires_at: now + Number(payload.refresh_expires_in || 0),
    environment: "sandbox",
  };
}

async function saveTikTokTokens(env: TikTokOAuthEnv, stored: TikTokStoredTokens): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const refreshTtl = Math.max(60, stored.refresh_expires_at - now);
  await env.SESSIONS.put(TIKTOK_SANDBOX_TOKEN_KEY, JSON.stringify(stored), {
    expirationTtl: refreshTtl,
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
