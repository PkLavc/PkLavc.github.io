import { getTikTokTokens, type TikTokOAuthEnv } from "./tiktok-oauth";

const TIKTOK_API_ROOT = "https://open.tiktokapis.com";
const MEDIA_PROXY_PREFIX = "/tiktok/media/";
const MEDIA_OBJECT_PREFIX = "social/";

export interface TikTokPublishEnv extends TikTokOAuthEnv {
  CLOUDFLARE_R2_PUBLIC_BASE_URL?: string;
}

type TikTokError = {
  code?: string;
  message?: string;
  log_id?: string;
};

type TikTokEnvelope<T> = {
  data?: T;
  error?: TikTokError;
};

type CreatorInfo = {
  creator_avatar_url?: string;
  creator_username?: string;
  creator_nickname?: string;
  privacy_level_options?: string[];
  comment_disabled?: boolean;
  duet_disabled?: boolean;
  stitch_disabled?: boolean;
  max_video_post_duration_sec?: number;
};

type PublishInitData = {
  publish_id?: string;
  upload_url?: string;
};

type PublishStatusData = {
  status?: string;
  fail_reason?: string;
  publicaly_available_post_id?: Array<string | number>;
  uploaded_bytes?: number;
  downloaded_bytes?: number;
};

export async function handleTikTokMediaProxy(
  request: Request,
  env: TikTokPublishEnv,
): Promise<Response> {
  if (!env.CLOUDFLARE_R2_PUBLIC_BASE_URL) {
    return new Response("Media proxy is not configured.", { status: 503 });
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed.", { status: 405 });
  }

  const url = new URL(request.url);
  const raw = url.pathname.slice(MEDIA_PROXY_PREFIX.length);
  const key = decodeMediaPath(raw);
  if (!key) {
    return new Response("Not found.", { status: 404 });
  }

  const upstreamUrl = buildR2Url(env.CLOUDFLARE_R2_PUBLIC_BASE_URL, key);
  const upstreamHeaders = new Headers();
  const range = request.headers.get("Range");
  if (range) upstreamHeaders.set("Range", range);

  const upstream = await fetch(upstreamUrl, {
    method: request.method,
    headers: upstreamHeaders,
    redirect: "follow",
  });

  const headers = new Headers();
  for (const name of ["Content-Type", "Content-Length", "Content-Range", "Accept-Ranges", "ETag", "Last-Modified"]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("Cache-Control", "private, no-store");

  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

export async function handleTikTokCreatorInfo(env: TikTokPublishEnv): Promise<Response> {
  try {
    const creator = await queryCreatorInfo(env);
    return json({
      ok: true,
      creator_username: creator.creator_username || "",
      creator_nickname: creator.creator_nickname || "",
      privacy_level_options: creator.privacy_level_options || [],
      comment_disabled: Boolean(creator.comment_disabled),
      duet_disabled: Boolean(creator.duet_disabled),
      stitch_disabled: Boolean(creator.stitch_disabled),
      max_video_post_duration_sec: Number(creator.max_video_post_duration_sec || 0),
    });
  } catch (error) {
    return json({ error: errorName(error) }, 502);
  }
}

export async function handleTikTokDirectPost(
  request: Request,
  env: TikTokPublishEnv,
): Promise<Response> {
  let body: { media_path?: string; title?: string; is_aigc?: boolean };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const mediaPath = normalizeMediaPath(String(body.media_path || ""));
  if (!mediaPath) {
    return json({ error: "invalid_media_path" }, 400);
  }

  try {
    const tokens = await getTikTokTokens(env);
    const creator = await queryCreatorInfoWithToken(tokens.access_token);
    const privacyOptions = creator.privacy_level_options || [];

    if (!privacyOptions.includes("SELF_ONLY")) {
      return json({
        error: "self_only_unavailable",
        privacy_level_options: privacyOptions,
      }, 409);
    }

    const title = String(body.title || "").trim().slice(0, 2200);
    const mediaUrl = `https://pklavc.com${MEDIA_PROXY_PREFIX}${encodeMediaPath(mediaPath)}`;

    const payload = {
      post_info: {
        title,
        privacy_level: "SELF_ONLY",
        disable_duet: Boolean(creator.duet_disabled),
        disable_comment: Boolean(creator.comment_disabled),
        disable_stitch: Boolean(creator.stitch_disabled),
        is_aigc: body.is_aigc !== false,
      },
      source_info: {
        source: "PULL_FROM_URL",
        video_url: mediaUrl,
      },
    };

    const response = await fetch(`${TIKTOK_API_ROOT}/v2/post/publish/video/init/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(payload),
    });

    const envelope = await parseEnvelope<PublishInitData>(response);
    if (!response.ok || envelope.error?.code !== "ok" || !envelope.data?.publish_id) {
      return tiktokFailure("tiktok_publish_init_failed", response.status, envelope.error);
    }

    return json({
      ok: true,
      publish_id: envelope.data.publish_id,
      status: "SUBMITTED",
      privacy_level: "SELF_ONLY",
      creator_username: creator.creator_username || "",
      creator_nickname: creator.creator_nickname || "",
      media_url: mediaUrl,
    });
  } catch (error) {
    return json({ error: errorName(error) }, 502);
  }
}

export async function handleTikTokPostStatus(
  request: Request,
  env: TikTokPublishEnv,
): Promise<Response> {
  let body: { publish_id?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const publishId = String(body.publish_id || "").trim();
  if (!publishId || publishId.length > 128) {
    return json({ error: "invalid_publish_id" }, 400);
  }

  try {
    const tokens = await getTikTokTokens(env);
    const response = await fetch(`${TIKTOK_API_ROOT}/v2/post/publish/status/fetch/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ publish_id: publishId }),
    });
    const envelope = await parseEnvelope<PublishStatusData>(response);
    if (!response.ok || envelope.error?.code !== "ok") {
      return tiktokFailure("tiktok_status_failed", response.status, envelope.error);
    }

    return json({
      ok: true,
      publish_id: publishId,
      status: envelope.data?.status || "",
      fail_reason: envelope.data?.fail_reason || "",
      uploaded_bytes: envelope.data?.uploaded_bytes || 0,
      downloaded_bytes: envelope.data?.downloaded_bytes || 0,
      publicly_available_post_id: envelope.data?.publicaly_available_post_id || [],
    });
  } catch (error) {
    return json({ error: errorName(error) }, 502);
  }
}

async function queryCreatorInfo(env: TikTokPublishEnv): Promise<CreatorInfo> {
  const tokens = await getTikTokTokens(env);
  return queryCreatorInfoWithToken(tokens.access_token);
}

async function queryCreatorInfoWithToken(accessToken: string): Promise<CreatorInfo> {
  const response = await fetch(`${TIKTOK_API_ROOT}/v2/post/publish/creator_info/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const envelope = await parseEnvelope<CreatorInfo>(response);
  if (!response.ok || envelope.error?.code !== "ok" || !envelope.data) {
    throw new Error(envelope.error?.code || "tiktok_creator_info_failed");
  }
  return envelope.data;
}

async function parseEnvelope<T>(response: Response): Promise<TikTokEnvelope<T>> {
  try {
    return await response.json() as TikTokEnvelope<T>;
  } catch {
    return { error: { code: "invalid_tiktok_response", message: "TikTok returned non-JSON content." } };
  }
}

function normalizeMediaPath(value: string): string {
  const clean = value.trim().replace(/^\/+/, "");
  if (!clean.startsWith(MEDIA_OBJECT_PREFIX) || !clean.endsWith(".mp4") || clean.includes("..")) {
    return "";
  }
  if (!/^[A-Za-z0-9._\/-]+$/.test(clean)) {
    return "";
  }
  return clean;
}

function decodeMediaPath(value: string): string {
  try {
    return normalizeMediaPath(value.split("/").map((part) => decodeURIComponent(part)).join("/"));
  } catch {
    return "";
  }
}

function encodeMediaPath(value: string): string {
  return value.split("/").map((part) => encodeURIComponent(part)).join("/");
}

function buildR2Url(base: string, key: string): string {
  return `${base.replace(/\/+$/, "")}/${encodeMediaPath(key)}`;
}

function tiktokFailure(prefix: string, httpStatus: number, error?: TikTokError): Response {
  return json({
    error: prefix,
    tiktok_error: error?.code || "",
    message: error?.message || "",
    log_id: error?.log_id || "",
  }, httpStatus >= 400 && httpStatus < 600 ? httpStatus : 502);
}

function errorName(error: unknown): string {
  return error instanceof Error ? error.message : "tiktok_request_failed";
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
