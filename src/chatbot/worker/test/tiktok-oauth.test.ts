import { afterEach, describe, expect, it, vi } from "vitest";
import { handleTikTokOAuthExchange } from "../src/tiktok-oauth";

describe("TikTok sandbox OAuth exchange", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exchanges the authorization code server-side and never returns tokens to the browser", async () => {
    const put = vi.fn(async (_key: string, _value: string, _options?: { expirationTtl?: number }) => undefined);
    const tokenPayload = {
      access_token: "access-secret",
      refresh_token: "refresh-secret",
      token_type: "Bearer",
      open_id: "open-id",
      scope: "user.info.basic,video.publish,video.upload",
      expires_in: 86400,
      refresh_expires_in: 31536000,
    };

    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const form = new URLSearchParams(String(init?.body || ""));
      expect(form.get("client_key")).toBe("sandbox-key");
      expect(form.get("client_secret")).toBe("sandbox-secret");
      expect(form.get("code")).toBe("authorization-code");
      expect(form.get("grant_type")).toBe("authorization_code");
      expect(form.get("redirect_uri")).toBe("https://pklavc.com/tiktok/callback/");
      return new Response(JSON.stringify(tokenPayload), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await handleTikTokOAuthExchange(
      new Request("https://api.pklavc.com/tiktok/oauth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: "authorization-code",
          redirect_uri: "https://pklavc.com/tiktok/callback/",
        }),
      }),
      {
        SESSIONS: { put } as unknown as KVNamespace,
        TIKTOK_SANDBOX_CLIENT_KEY: "sandbox-key",
        TIKTOK_SANDBOX_CLIENT_SECRET: "sandbox-secret",
      },
    );

    expect(response.status).toBe(200);
    const body = await response.json() as Record<string, unknown>;
    expect(body.ok).toBe(true);
    expect(body.open_id).toBe("open-id");
    expect(JSON.stringify(body)).not.toContain("access-secret");
    expect(JSON.stringify(body)).not.toContain("refresh-secret");
    expect(put).toHaveBeenCalledTimes(2);
    const tokenWrite = put.mock.calls.find((call) => call[0] === "tiktok:sandbox:tokens");
    expect(tokenWrite).toBeTruthy();
    const stored = String(tokenWrite?.[1] || "");
    expect(stored).toContain("access-secret");
    expect(stored).toContain("refresh-secret");
    const sessionWrite = put.mock.calls.find((call) => String(call[0]).startsWith("tiktok:review-session:"));
    expect(sessionWrite).toBeTruthy();
  });

  it("rejects a redirect URI different from the registered callback", async () => {
    const response = await handleTikTokOAuthExchange(
      new Request("https://api.pklavc.com/tiktok/oauth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: "authorization-code",
          redirect_uri: "https://example.com/callback",
        }),
      }),
      {
        SESSIONS: {} as KVNamespace,
        TIKTOK_SANDBOX_CLIENT_KEY: "sandbox-key",
        TIKTOK_SANDBOX_CLIENT_SECRET: "sandbox-secret",
      },
    );

    expect(response.status).toBe(400);
  });
});
