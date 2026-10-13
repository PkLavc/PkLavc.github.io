// TikTok OAuth exchange and server-side token lifecycle, isolated by environment.
export interface TikTokOAuthEnv {
  SESSIONS: KVNamespace;
  TIKTOK_SANDBOX_CLIENT_KEY?: string;
  TIKTOK_SANDBOX_CLIENT_SECRET?: string;
  TIKTOK_CLIENT_KEY?: string;
  TIKTOK_CLIENT_SECRET?: string;
}

const TIKTOK_TOKEN_ENDPOINT = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_REDIRECT_URI = "https://pklavc.com/tiktok/callback/";
const TIKTOK_SANDBOX_TOKEN_KEY = "tiktok:sandbox:tokens";
const TIKTOK_PRODUCTION_TOKEN_KEY = "tiktok:production:tokens";

export function activeTikTokEnvironment(env: TikTokOAuthEnv): "sandbox" | "production" {
  return env.TIKTOK_CLIENT_KEY && env.TIKTOK_CLIENT_SECRET ? "production" : "sandbox";
}

export function publicTikTokConfig(env: TikTokOAuthEnv): { environment: "sandbox" | "production"; client_key: string } {
  const environment = activeTikTokEnvironment(env);
  return { environment, client_key: environment === "production" ? env.TIKTOK_CLIENT_KEY! : env.TIKTOK_SANDBOX_CLIENT_KEY || "" };
}

function oauthCredentials(env: TikTokOAuthEnv, environment: "sandbox" | "production") {
  const key = environment === "production" ? env.TIKTOK_CLIENT_KEY : env.TIKTOK_SANDBOX_CLIENT_KEY;
  const secret = environment === "production" ? env.TIKTOK_CLIENT_SECRET : env.TIKTOK_SANDBOX_CLIENT_SECRET;
  if (!key || !secret) throw new Error("tiktok_" + environment + "_not_configured");
  return { key, secret };
}

function tokenStorageKey(environment: "sandbox" | "production") {
  return environment === "production" ? TIKTOK_PRODUCTION_TOKEN_KEY : TIKTOK_SANDBOX_TOKEN_KEY;
}
const ACCESS_TOKEN_REFRESH_SKEW_SECONDS = 15 * 60;
const TIKTOK_REVIEW_SESSION_PREFIX = "tiktok:creator-session:";
const TIKTOK_REVIEW_SESSION_TTL_SECONDS = 2 * 60 * 60;
const TIKTOK_REVIEW_COOKIE = "__Host-pklavc_tiktok_review";
const TIKTOK_OAUTH_STATE_COOKIE = "__Host-pklavc_tiktok_oauth_state";
const TIKTOK_OAUTH_STATE_TTL_SECONDS = 10 * 60;

function cookieValue(request: Request, name: string): string {
  return (request.headers.get("Cookie") || "")
    .split(";").map((part) => part.trim())
    .find((part) => part.startsWith(name + "="))?.slice(name.length + 1) || "";
}

function sessionId(request: Request): string {
  const id = cookieValue(request, TIKTOK_REVIEW_COOKIE);
  return /^[0-9a-f-]{36}$/i.test(id) ? id : "";
}

export function handleTikTokOAuthStart(env: TikTokOAuthEnv): Response {
  const config = publicTikTokConfig(env);
  if (!config.client_key) return json({ error: "tiktok_not_configured" }, 503);
  const state = crypto.randomUUID();
  const response = json({ ok: true, state, environment: config.environment, client_key: config.client_key });
  response.headers.append("Set-Cookie",
    `${TIKTOK_OAUTH_STATE_COOKIE}=${state}; Path=/; Max-Age=${TIKTOK_OAUTH_STATE_TTL_SECONDS}; Secure; HttpOnly; SameSite=Strict`);
  return response;
}

export async function handleTikTokLogout(request: Request, env: TikTokOAuthEnv): Promise<Response> {
  const id = sessionId(request);
  if (id) await env.SESSIONS.delete(TIKTOK_REVIEW_SESSION_PREFIX + id);
  const response = json({ ok: true });
  response.headers.append("Set-Cookie",
    `${TIKTOK_REVIEW_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Secure; HttpOnly; SameSite=Strict`);
  response.headers.append("Set-Cookie",
    `${TIKTOK_OAUTH_STATE_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Secure; HttpOnly; SameSite=Strict`);
  return response;
}

async function creatorSession(request: Request, env: TikTokOAuthEnv): Promise<TikTokStoredTokens | null> {
  const id = sessionId(request);
  if (!id) return null;
  const raw = await env.SESSIONS.get(TIKTOK_REVIEW_SESSION_PREFIX + id);
  if (!raw) return null;
  try {
    const stored = JSON.parse(raw) as TikTokStoredTokens;
    if (!stored.open_id || !stored.access_token || !stored.refresh_token ||
        !stored.session_expires_at || stored.session_expires_at <= Math.floor(Date.now() / 1000) ||
        stored.environment !== activeTikTokEnvironment(env)) return null;
    return stored;
  } catch {
    return null;
  }
}

export type TikTokStoredTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  open_id: string;
  scope: string;
  expires_at: number;
  refresh_expires_at: number;
  environment: "sandbox" | "production";
  session_expires_at?: number;
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
  const environment = activeTikTokEnvironment(env);
  let credentials: ReturnType<typeof oauthCredentials>;
  try { credentials = oauthCredentials(env, environment); }
  catch { return json({ error: "tiktok_" + environment + "_not_configured" }, 503); }

  let body: { code?: string; redirect_uri?: string; state?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const code = String(body.code || "").trim();
  const redirectUri = String(body.redirect_uri || "").trim();
  const state = String(body.state || "").trim();

  if (!code) {
    return json({ error: "missing_code" }, 400);
  }

  if (redirectUri !== TIKTOK_REDIRECT_URI) {
    return json({ error: "invalid_redirect_uri" }, 400);
  }
  // Server-side state binding prevents forged account authorization and token takeover.
  if (!/^[0-9a-f-]{36}$/i.test(state) ||
      state !== cookieValue(request, TIKTOK_OAUTH_STATE_COOKIE)) {
    return json({ error: "invalid_oauth_state" }, 403);
  }

  const form = new URLSearchParams({
    client_key: credentials.key,
    client_secret: credentials.secret,
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

  const stored = tokenBundle(payload, environment);
  stored.session_expires_at = Math.floor(Date.now() / 1000) + TIKTOK_REVIEW_SESSION_TTL_SECONDS;
  if (!stored.open_id || !stored.scope.split(/[\s,]+/).includes("video.publish")) {
    return json({ error: "tiktok_video_publish_not_authorized" }, 403);
  }
  // Each creator receives an isolated, short-lived secure session. Never overwrite
  // the legacy service-owned token key used by private GitHub Actions tests.
  const reviewSession = crypto.randomUUID();
  await env.SESSIONS.put(TIKTOK_REVIEW_SESSION_PREFIX + reviewSession, JSON.stringify(stored), {
    expirationTtl: TIKTOK_REVIEW_SESSION_TTL_SECONDS,
  });

  const response = json({
    ok: true,
    environment,
    open_id: stored.open_id,
    scope: stored.scope,
    expires_in: Number(payload.expires_in || 0),
    refresh_expires_in: Number(payload.refresh_expires_in || 0),
  });
  response.headers.append("Set-Cookie",
    `${TIKTOK_REVIEW_COOKIE}=${reviewSession}; Path=/; Max-Age=${TIKTOK_REVIEW_SESSION_TTL_SECONDS}; Secure; HttpOnly; SameSite=Strict`);
  response.headers.append("Set-Cookie",
    `${TIKTOK_OAUTH_STATE_COOKIE}=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Strict`);
  return response;
}

export async function hasTikTokReviewSession(request: Request, env: TikTokOAuthEnv): Promise<boolean> {
  const stored = await creatorSession(request, env);
  return Boolean(stored && stored.scope.split(/[\s,]+/).includes("video.publish") &&
    stored.refresh_expires_at > Math.floor(Date.now() / 1000));
}

// With a request, return ONLY this browser's authorized account. Without a request,
// retain the existing service-owned credential for the private GitHub Actions workflow.
export async function getTikTokTokens(env: TikTokOAuthEnv, request?: Request): Promise<TikTokStoredTokens> {
  const environment = activeTikTokEnvironment(env);
  const raw = request
    ? await creatorSession(request, env)
    : await env.SESSIONS.get(tokenStorageKey(environment));
  if (!raw) throw new Error("tiktok_not_authorized");

  let stored: TikTokStoredTokens;
  try {
    stored = typeof raw === "string" ? JSON.parse(raw) as TikTokStoredTokens : raw;
  } catch {
    throw new Error("tiktok_token_state_invalid");
  }

  const now = Math.floor(Date.now() / 1000);
  if (stored.environment !== environment) throw new Error("tiktok_reauthorization_required");
  if (!stored.scope.split(/[\s,]+/).includes("video.publish")) throw new Error("tiktok_video_publish_not_authorized");
  if (!stored.access_token || !stored.refresh_token || stored.refresh_expires_at <= now) {
    throw new Error("tiktok_reauthorization_required");
  }
  if (stored.expires_at > now + ACCESS_TOKEN_REFRESH_SKEW_SECONDS) return stored;
  return refreshTikTokTokens(env, stored.refresh_token, environment, request, stored.open_id, stored.session_expires_at);
}

async function refreshTikTokTokens(
  env: TikTokOAuthEnv,
  refreshToken: string,
  environment: "sandbox" | "production",
  request?: Request,
  expectedOpenId?: string,
  sessionExpiresAt?: number,
): Promise<TikTokStoredTokens> {
  const credentials = oauthCredentials(env, environment);

  const response = await fetch(TIKTOK_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: new URLSearchParams({
      client_key: credentials.key,
      client_secret: credentials.secret,
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

  const stored = tokenBundle(payload, environment);
  stored.session_expires_at = sessionExpiresAt;
  if (expectedOpenId && stored.open_id !== expectedOpenId) {
    throw new Error("tiktok_account_changed_during_refresh");
  }
  await saveTikTokTokens(env, stored, request);
  return stored;
}

function tokenBundle(payload: TikTokTokenResponse, environment: "sandbox" | "production"): TikTokStoredTokens {
  const now = Math.floor(Date.now() / 1000);
  return {
    access_token: String(payload.access_token || ""),
    refresh_token: String(payload.refresh_token || ""),
    token_type: String(payload.token_type || "Bearer"),
    open_id: String(payload.open_id || ""),
    scope: String(payload.scope || ""),
    expires_at: now + Number(payload.expires_in || 0),
    refresh_expires_at: now + Number(payload.refresh_expires_in || 0),
    environment,
  };
}

async function saveTikTokTokens(env: TikTokOAuthEnv, stored: TikTokStoredTokens, request?: Request): Promise<void> {
  const key = request ? TIKTOK_REVIEW_SESSION_PREFIX + sessionId(request) : tokenStorageKey(stored.environment);
  if (request && !sessionId(request)) throw new Error("tiktok_not_authorized");
  const now = Math.floor(Date.now() / 1000);
  const refreshTtl = Math.max(60, stored.refresh_expires_at - now);
  if (request && (!stored.session_expires_at || stored.session_expires_at <= now)) {
    throw new Error("tiktok_reauthorization_required");
  }
  await env.SESSIONS.put(key, JSON.stringify(stored), {
    expirationTtl: request ? Math.max(60, Math.min(stored.session_expires_at! - now, refreshTtl)) : refreshTtl,
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
