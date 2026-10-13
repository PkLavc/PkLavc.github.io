import { afterEach, describe, expect, it, vi } from "vitest";
import { handleTikTokDirectFilePost } from "../src/tiktok-publish";

vi.mock("../src/tiktok-oauth", () => ({
  getTikTokTokens: vi.fn(async () => ({ access_token: "test-access-token" })),
  activeTikTokEnvironment: vi.fn(() => "production"),
}));

const endpoint = "https://api.pklavc.com/tiktok/publish/file";
type Post = { post_info: Record<string, unknown> };

function setupTikTok() {
  const published: Post[] = [];
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.endsWith("/creator_info/query/")) {
      return Response.json({
        data: {
          creator_username: "pklavc",
          privacy_level_options: ["PUBLIC_TO_EVERYONE", "SELF_ONLY"],
          comment_disabled: false,
          duet_disabled: false,
          stitch_disabled: false,
          max_video_post_duration_sec: 300,
        },
        error: { code: "ok" },
      });
    }
    if (url.endsWith("/video/init/")) {
      published.push(JSON.parse(String(init?.body)) as Post);
      return Response.json({
        data: { publish_id: "test-publish-id", upload_url: "https://upload.example.test/file" },
        error: { code: "ok" },
      });
    }
    if (url === "https://upload.example.test/file") return new Response(null, { status: 201 });
    throw new Error("Unexpected outbound TikTok endpoint: " + url);
  });
  vi.stubGlobal("fetch", fetchMock);
  return { published, fetchMock };
}

function request(params: Record<string, string>) {
  const url = new URL(endpoint);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return new Request(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "video/mp4" },
    body: new Uint8Array([0, 1, 2, 3]),
  });
}

const noCommercial = {
  privacy_level: "SELF_ONLY",
  commercial_content: "false",
  brand_organic_toggle: "false",
  brand_content_toggle: "false",
};

describe("TikTok Direct Post audit declarations", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends explicit organic and paid partnership flags to TikTok", async () => {
    const { published } = setupTikTok();
    const organic = await handleTikTokDirectFilePost(request({
      privacy_level: "SELF_ONLY",
      commercial_content: "true",
      brand_organic_toggle: "true",
      brand_content_toggle: "false",
      is_aigc: "true",
    }), {} as never);
    expect(organic.status).toBe(200);
    expect(published[0].post_info).toMatchObject({
      privacy_level: "SELF_ONLY",
      brand_organic_toggle: true,
      brand_content_toggle: false,
      is_aigc: true,
    });

    const sponsored = await handleTikTokDirectFilePost(request({
      privacy_level: "PUBLIC_TO_EVERYONE",
      commercial_content: "true",
      brand_organic_toggle: "false",
      brand_content_toggle: "true",
      is_aigc: "false",
    }), {} as never);
    expect(sponsored.status).toBe(200);
    expect(published[1].post_info).toMatchObject({
      privacy_level: "PUBLIC_TO_EVERYONE",
      brand_organic_toggle: false,
      brand_content_toggle: true,
      is_aigc: false,
    });
  });

  it("blocks paid partnership posts with Only me privacy", async () => {
    const { published } = setupTikTok();
    const response = await handleTikTokDirectFilePost(request({
      ...noCommercial,
      commercial_content: "true",
      brand_content_toggle: "true",
    }), {} as never);
    expect(response.status).toBe(409);
    expect((await response.json() as { error: string }).error).toBe("branded_content_cannot_be_private");
    expect(published).toHaveLength(0);
  });

  it("blocks enabled commercial disclosure without a category", async () => {
    const { published } = setupTikTok();
    const response = await handleTikTokDirectFilePost(request({
      ...noCommercial,
      commercial_content: "true",
    }), {} as never);
    expect(response.status).toBe(400);
    expect((await response.json() as { error: string }).error).toBe("commercial_content_declaration_invalid");
    expect(published).toHaveLength(0);
  });

  it("blocks requests missing disclosure information or privacy choice", async () => {
    const { published } = setupTikTok();
    const absent = await handleTikTokDirectFilePost(request({
      privacy_level: "SELF_ONLY",
    }), {} as never);
    expect(absent.status).toBe(400);
    expect((await absent.json() as { error: string }).error).toBe("commercial_content_declaration_required");

    const privacy = await handleTikTokDirectFilePost(request({
      ...noCommercial,
      privacy_level: "",
    }), {} as never);
    expect(privacy.status).toBe(400);
    expect((await privacy.json() as { error: string }).error).toBe("privacy_level_required");
    expect(published).toHaveLength(0);
  });
});
