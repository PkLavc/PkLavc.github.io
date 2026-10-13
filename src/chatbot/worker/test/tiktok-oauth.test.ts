import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getTikTokTokens,
  handleTikTokOAuthExchange,
  handleTikTokOAuthStart,
  handleTikTokLogout,
  hasTikTokReviewSession,
  publicTikTokConfig,
} from "../src/tiktok-oauth";

const redirect_uri = "https://pklavc.com/tiktok/callback/";
const api = "https://api.pklavc.com";
const stateCookie = "__Host-pklavc_tiktok_oauth_state";
const sessionCookie = "__Host-pklavc_tiktok_review";

function fixture(production = true) {
  const store = new Map<string, string>();
  const kv = {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    put: vi.fn(async (key: string, value: string, _options?: { expirationTtl?: number }) => {
      store.set(key, value);
    }),
    delete: vi.fn(async (key: string) => { store.delete(key); }),
  };
  const env = {
    SESSIONS: kv as unknown as KVNamespace,
    TIKTOK_CLIENT_KEY: production ? "production-key" : undefined,
    TIKTOK_CLIENT_SECRET: production ? "production-secret" : undefined,
    TIKTOK_SANDBOX_CLIENT_KEY: "sandbox-key",
    TIKTOK_SANDBOX_CLIENT_SECRET: "sandbox-secret",
  };
  vi.stubGlobal("fetch", vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
    const form = new URLSearchParams(String(init?.body || ""));
    expect(form.get("client_key")).toBe(production ? "production-key" : "sandbox-key");
    expect(form.get("client_secret")).toBe(production ? "production-secret" : "sandbox-secret");
    const account = form.get("code") === "alice-code" ? "alice" : "bob";
    return Response.json({
      access_token: account + "-access",
      refresh_token: account + "-refresh",
      open_id: account + "-open-id",
      scope: "user.info.basic,video.publish,video.upload",
      expires_in: 86400,
      refresh_expires_in: 2592000,
      token_type: "Bearer",
    });
  }));
  return { store, kv, env };
}

async function authorize(env: ReturnType<typeof fixture>["env"], code: string) {
  const start = handleTikTokOAuthStart(env);
  const payload = await start.json() as { state: string };
  expect(payload.state).toMatch(/^[0-9a-f-]{36}$/i);
  const response = await handleTikTokOAuthExchange(new Request(api + "/tiktok/oauth/exchange", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: stateCookie + "=" + payload.state,
    },
    body: JSON.stringify({ code, state: payload.state, redirect_uri }),
  }), env);
  const cookie = response.headers.get("Set-Cookie")?.match(/__Host-pklavc_tiktok_review=[0-9a-f-]{36}/)?.[0] || "";
  return { response, cookie };
}

describe("TikTok multi-creator production OAuth", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("uses the existing production credentials and does not expose access or refresh tokens", async () => {
    const { env, store } = fixture();
    expect(publicTikTokConfig(env)).toMatchObject({ environment: "production", client_key: "production-key" });
    const { response, cookie } = await authorize(env, "alice-code");
    expect(response.status).toBe(200);
    expect(cookie).toContain(sessionCookie);
    const body = await response.json() as Record<string, unknown>;
    expect(body.open_id).toBe("alice-open-id");
    expect(body.environment).toBe("production");
    expect(JSON.stringify(body)).not.toContain("alice-access");
    expect(JSON.stringify(body)).not.toContain("alice-refresh");
    expect(store.has("tiktok:production:tokens")).toBe(false);
    expect(store.has("tiktok:sandbox:tokens")).toBe(false);
    expect([...store.keys()].filter((key) => key.startsWith("tiktok:creator-session:"))).toHaveLength(1);
  });

  it("isolates two creator accounts and prevents using missing or mismatched sessions", async () => {
    const { env } = fixture();
    const alice = await authorize(env, "alice-code");
    const bob = await authorize(env, "bob-code");
    const requestA = new Request(api + "/tiktok/creator-info", { headers: { Cookie: alice.cookie } });
    const requestB = new Request(api + "/tiktok/creator-info", { headers: { Cookie: bob.cookie } });
    expect(await hasTikTokReviewSession(requestA, env)).toBe(true);
    expect(await hasTikTokReviewSession(requestB, env)).toBe(true);
    expect((await getTikTokTokens(env, requestA)).access_token).toBe("alice-access");
    expect((await getTikTokTokens(env, requestB)).access_token).toBe("bob-access");
    await expect(getTikTokTokens(env, new Request(api + "/tiktok/creator-info"))).rejects.toThrow("tiktok_not_authorized");
  });

  it("supports sandbox independently of production", async () => {
    const { env, store } = fixture(false);
    expect(publicTikTokConfig(env).environment).toBe("sandbox");
    const { response, cookie } = await authorize(env, "alice-code");
    expect((await response.json() as { environment: string }).environment).toBe("sandbox");
    expect((await getTikTokTokens(env, new Request(api, { headers: { Cookie: cookie } }))).environment).toBe("sandbox");
    expect(store.has("tiktok:production:tokens")).toBe(false);
    expect(store.has("tiktok:sandbox:tokens")).toBe(false);
  });

  it("rejects forged OAuth state before exchanging any token", async () => {
    const { env } = fixture();
    const response = await handleTikTokOAuthExchange(new Request(api + "/tiktok/oauth/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "alice-code", state: "fake", redirect_uri }),
    }), env);
    expect(response.status).toBe(403);
    expect((await response.json() as { error: string }).error).toBe("invalid_oauth_state");
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it("disconnects only the requesting creator, preserving other sessions", async () => {
    const { env } = fixture();
    const alice = await authorize(env, "alice-code");
    const bob = await authorize(env, "bob-code");
    const aliceRequest = new Request(api + "/tiktok/oauth/logout", { headers: { Cookie: alice.cookie } });
    const logout = await handleTikTokLogout(aliceRequest, env);
    expect(logout.status).toBe(200);
    const clearCookies = logout.headers.getSetCookie().join("\\n");
    expect(clearCookies).toContain("__Host-pklavc_tiktok_review=;");
    expect(clearCookies).toContain("__Host-pklavc_tiktok_oauth_state=;");
    expect(clearCookies).toContain("Max-Age=0");
    expect(clearCookies).toContain("HttpOnly");
    expect(await hasTikTokReviewSession(aliceRequest, env)).toBe(false);
    expect(await hasTikTokReviewSession(new Request(api, { headers: { Cookie: bob.cookie } }), env)).toBe(true);
  });

  it("rejects callbacks with an unregistered redirect URI", async () => {
    const { env } = fixture();
    const start = await handleTikTokOAuthStart(env).json() as { state: string };
    const response = await handleTikTokOAuthExchange(new Request(api + "/tiktok/oauth/exchange", {
      method: "POST",
      headers: { Cookie: stateCookie + "=" + start.state, "Content-Type": "application/json" },
      body: JSON.stringify({ code: "alice-code", state: start.state, redirect_uri: "https://other.site/callback" }),
    }), env);
    expect(response.status).toBe(400);
  });
});
