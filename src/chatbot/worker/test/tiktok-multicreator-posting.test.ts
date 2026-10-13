import { afterEach, describe, expect, it, vi } from "vitest";
import { handleTikTokOAuthStart, handleTikTokOAuthExchange } from "../src/tiktok-oauth";
import { handleTikTokDirectFilePost, handleTikTokPostStatus } from "../src/tiktok-publish";

const stateCookie = "__Host-pklavc_tiktok_oauth_state";
const endpoint = "https://api.pklavc.com";
const statuses: string[] = [];
const tokensUsed: string[] = [];
const store = new Map<string, string>();
const env = {
  SESSIONS: {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    put: vi.fn(async (key: string, value: string) => { store.set(key, value); }),
    delete: vi.fn(async (key: string) => { store.delete(key); }),
  } as unknown as KVNamespace,
  TIKTOK_CLIENT_KEY: "production-key",
  TIKTOK_CLIENT_SECRET: "production-secret",
  TIKTOK_SANDBOX_CLIENT_KEY: "sandbox-key",
  TIKTOK_SANDBOX_CLIENT_SECRET: "sandbox-secret",
};

function response(data: unknown): Response {
  return Response.json({ data, error: { code: "ok" } });
}

async function createSession(code: string): Promise<string> {
  const begin = await handleTikTokOAuthStart(env).json() as { state: string };
  const result = await handleTikTokOAuthExchange(new Request(endpoint + "/tiktok/oauth/exchange", {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: stateCookie + "=" + begin.state },
    body: JSON.stringify({ code, state: begin.state, redirect_uri: "https://pklavc.com/tiktok/callback/" }),
  }), env);
  expect(result.status).toBe(200);
  return result.headers.get("Set-Cookie")?.match(/__Host-pklavc_tiktok_review=[0-9a-f-]{36}/)?.[0] || "";
}

describe("TikTok Direct Post account separation", () => {
  afterEach(() => { vi.unstubAllGlobals(); store.clear(); statuses.length = 0; tokensUsed.length = 0; });

  it("sends each creator video and status query using only their own authorization", async () => {
    vi.stubGlobal("fetch", vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      const form = new URLSearchParams(String(init?.body || ""));
      const code = String(form.get("code") || "");
      const user = code === "alice-code" ? "alice" : "bob";
      return Response.json({
        access_token: user + "-access",
        refresh_token: user + "-refresh",
        open_id: user + "-open-id",
        scope: "user.info.basic,video.publish,video.upload",
        expires_in: 86400,
        refresh_expires_in: 2592000,
      });
    }));
    const alice = await createSession("alice-code");
    const bob = await createSession("bob-code");
    expect(alice).not.toBe(bob);
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const token = String(new Headers(init?.headers).get("Authorization") || "");
      if (url.endsWith("/creator_info/query/")) {
        tokensUsed.push(token);
        return response({ privacy_level_options: ["SELF_ONLY"], creator_username: token.includes("alice") ? "alice" : "bob" });
      }
      if (url.endsWith("/video/init/")) {
        tokensUsed.push(token);
        return response({ publish_id: token.includes("alice") ? "alice-post" : "bob-post", upload_url: "https://upload.example.test/video" });
      }
      if (url === "https://upload.example.test/video") return new Response(null, { status: 201 });
      if (url.endsWith("/status/fetch/")) {
        statuses.push(token);
        return response({ status: "PUBLISH_COMPLETE" });
      }
      throw new Error("Unexpected TikTok URL " + url);
    }));
    for (const cookie of [alice, bob]) {
      const postUrl = new URL(endpoint + "/tiktok/publish/file");
      postUrl.searchParams.set("privacy_level", "SELF_ONLY");
      postUrl.searchParams.set("commercial_content", "false");
      postUrl.searchParams.set("brand_organic_toggle", "false");
      postUrl.searchParams.set("brand_content_toggle", "false");
      const upload = await handleTikTokDirectFilePost(new Request(postUrl, {
        method: "POST", headers: { "Content-Type": "video/mp4", Cookie: cookie },
        body: new Uint8Array([0, 1, 2, 3]),
      }), env);
      expect(upload.status).toBe(200);
      const body = await upload.json() as { publish_id: string };
      const status = await handleTikTokPostStatus(new Request(endpoint + "/tiktok/publish/status", {
        method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie },
        body: JSON.stringify({ publish_id: body.publish_id }),
      }), env, new Request(endpoint, { headers: { Cookie: cookie } }));
      expect(status.status).toBe(200);
    }
    expect(tokensUsed).toEqual(["Bearer alice-access", "Bearer alice-access", "Bearer bob-access", "Bearer bob-access"]);
    expect(statuses).toEqual(["Bearer alice-access", "Bearer bob-access"]);
  });
});
