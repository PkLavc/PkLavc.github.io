// Optional Web Push API. No outgoing push requests run on Cloudflare: GitHub Actions sends them.
export interface PushEnv {
  DB: D1Database;
  JWT_SECRET: string;
}
const encoder = new TextEncoder();
const TOPICS = ["tech", "games", "store"] as const;
type Topic = (typeof TOPICS)[number];
const DAILY_CAP: Record<Topic, number> = { tech: 2, games: 3, store: 1 };
const MUTATION_BUDGET = 1500;
const PAGE_SIZE = 200;

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
function isTopic(value: unknown): value is Topic {
  return typeof value === "string" && (TOPICS as readonly string[]).includes(value);
}
function isWebOrigin(request: Request): boolean {
  return ["https://pklavc.com", "https://www.pklavc.com"].includes(request.headers.get("origin") || "");
}
function validEndpoint(endpoint: unknown): endpoint is string {
  if (typeof endpoint !== "string" || endpoint.length > 1800 || endpoint.length < 25) return false;
  try {
    const u = new URL(endpoint);
    return u.protocol === "https:" && !u.username && !u.password && !u.hash && !u.port &&
      !["localhost", "127.0.0.1"].includes(u.hostname) && !/\s/.test(endpoint);
  } catch { return false; }
}
function normalizedFlags(value: unknown): Record<Topic, number> | null {
  if (!value || typeof value !== "object") return null;
  const o = value as Record<string, unknown>;
  if (!TOPICS.every(t => typeof o[t] === "boolean")) return null;
  const flags = { tech: Number(o.tech), games: Number(o.games), store: Number(o.store) };
  return flags.tech || flags.games || flags.store ? flags : null;
}
async function hash(value: string): Promise<string> {
  const bytes = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
async function isAdmin(request: Request, env: PushEnv): Promise<boolean> {
  if (!env.JWT_SECRET || env.JWT_SECRET.length < 20) return false;
  const candidate = request.headers.get("authorization") || "";
  const expected = "Bearer " + await hash("pklavc-webpush-admin:v1:" + env.JWT_SECRET);
  if (candidate.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= candidate.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
async function body(request: Request): Promise<Record<string, any> | null> {
  if (Number(request.headers.get("content-length") || 0) > 8192) return null;
  try {
    const raw = await request.text();
    if (raw.length > 8192) return null;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, any> : null;
  } catch { return null; }
}
function validLocale(v: unknown): "en" | "pt" | "es" {
  return v === "pt" || v === "es" ? v : "en";
}
function validKey(v: unknown): v is string {
  return typeof v === "string" && v.length >= 16 && v.length <= 150 && /^[a-zA-Z0-9_-]+$/.test(v);
}
function validCursor(v: unknown): v is string {
  return typeof v === "string" && /^[a-f0-9]{64}$/.test(v);
}

export async function handlePush(request: Request, env: PushEnv): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  if (!path.startsWith("/push/")) return reply({ error: "not_found" }, 404);
  // No queries at page load; the browser fetches /push/config only after a user click.
  if (path === "/push/config" && request.method === "GET") {
    const row = await env.DB.prepare("SELECT public_key FROM push_config WHERE id = 1").first<{ public_key: string }>();
    return reply({ enabled: Boolean(row?.public_key), publicKey: row?.public_key || null, topics: TOPICS });
  }
  if (path === "/push/subscribe" && request.method === "POST") {
    if (!isWebOrigin(request)) return reply({ error: "origin_not_allowed" }, 403);
    const data = await body(request);
    const sub = data?.subscription;
    const flags = normalizedFlags(data?.topics);
    if (!flags || !validEndpoint(sub?.endpoint) || !validKey(sub?.keys?.p256dh) || !validKey(sub?.keys?.auth)) {
      return reply({ error: "invalid_subscription" }, 400);
    }
    const active = await env.DB.prepare("SELECT public_key FROM push_config WHERE id = 1").first();
    if (!active) return reply({ error: "not_ready" }, 503);
    const day = new Date().toISOString().slice(0, 10);
    const accepted = await env.DB.prepare(
      "INSERT INTO push_daily_signups(day, count) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET count=count+1 WHERE count < ? RETURNING count"
    ).bind(day, MUTATION_BUDGET).first();
    if (!accepted) return reply({ error: "signup_budget_reached" }, 429);
    await env.DB.prepare(
      "INSERT INTO push_subscriptions(endpoint_hash, endpoint, p256dh, auth, locale, tech, games, store, updated_at) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now')) ON CONFLICT(endpoint_hash) DO UPDATE SET " +
      "endpoint=excluded.endpoint, p256dh=excluded.p256dh, auth=excluded.auth, locale=excluded.locale, " +
      "tech=excluded.tech, games=excluded.games, store=excluded.store, updated_at=datetime('now')"
    ).bind(await hash(sub.endpoint), sub.endpoint, sub.keys.p256dh, sub.keys.auth,
      validLocale(data?.locale), flags.tech, flags.games, flags.store).run();
    return reply({ ok: true });
  }
  if (path === "/push/unsubscribe" && request.method === "POST") {
    if (!isWebOrigin(request)) return reply({ error: "origin_not_allowed" }, 403);
    const data = await body(request);
    if (!validEndpoint(data?.endpoint)) return reply({ error: "invalid_endpoint" }, 400);
    await env.DB.prepare("DELETE FROM push_subscriptions WHERE endpoint_hash = ?")
      .bind(await hash(data.endpoint)).run();
    return reply({ ok: true });
  }

  if (!path.startsWith("/push/admin/")) return reply({ error: "not_found" }, 404);
  if (!(await isAdmin(request, env))) return reply({ error: "unauthorized" }, 401);
  if (path === "/push/admin/vapid" && request.method === "GET") {
    const cfg = await env.DB.prepare("SELECT public_key, private_encrypted FROM push_config WHERE id = 1")
      .first<{ public_key: string; private_encrypted: string }>();
    return reply({ configured: Boolean(cfg), publicKey: cfg?.public_key || null,
      encryptedPrivateKey: cfg?.private_encrypted || null });
  }
  if (path === "/push/admin/vapid" && request.method === "POST") {
    const data = await body(request);
    if (!validKey(data?.publicKey) || typeof data?.encryptedPrivateKey !== "string" ||
        !/^[a-zA-Z0-9_.-]{40,800}$/.test(data.encryptedPrivateKey)) {
      return reply({ error: "invalid_keys" }, 400);
    }
    // Never rotate an existing pair. Rotating VAPID silently would orphan subscriptions.
    const result = await env.DB.prepare(
      "INSERT INTO push_config(id, public_key, private_encrypted) VALUES (1, ?, ?) ON CONFLICT(id) DO NOTHING"
    ).bind(data.publicKey, data.encryptedPrivateKey).run();
    return reply({ ok: true, created: Number(result.meta?.changes || 0) === 1 });
  }
  if (path === "/push/admin/campaign/start" && request.method === "POST") {
    const data = await body(request);
    if (!isTopic(data?.topic) || !validCursor(data?.id) ||
        typeof data?.url !== "string" || !/^\/(blog|store)\//.test(data.url) ||
        data.url.length > 500) return reply({ error: "invalid_campaign" }, 400);
    const existing = await env.DB.prepare("SELECT status FROM push_campaigns WHERE id = ?")
      .bind(data.id).first<{ status: string }>();
    if (existing) return reply({ accepted: true, status: existing.status, id: data.id });
    const day = new Date().toISOString().slice(0, 10);
    const result = await env.DB.prepare(
      "INSERT INTO push_campaigns(id, day, topic, url, status) " +
      "SELECT ?, ?, ?, ?, 'sending' WHERE (SELECT COUNT(*) FROM push_campaigns WHERE day = ? AND topic = ?) < ? " +
      "ON CONFLICT(id) DO NOTHING RETURNING id"
    ).bind(data.id, day, data.topic, data.url, day, data.topic, DAILY_CAP[data.topic]).first();
    if (!result) return reply({ accepted: false, reason: "daily_campaign_limit" });
    return reply({ accepted: true, status: "sending", id: data.id });
  }
  if (path === "/push/admin/subscribers" && request.method === "GET") {
    const id = url.searchParams.get("id");
    const after = url.searchParams.get("after") || "";
    if (!validCursor(id) || (after && !validCursor(after))) return reply({ error: "invalid_cursor" }, 400);
    const campaign = await env.DB.prepare("SELECT topic, status, cursor FROM push_campaigns WHERE id = ?")
      .bind(id).first<{ topic: string; status: string; cursor: string }>();
    if (!campaign || !isTopic(campaign.topic)) return reply({ error: "unknown_campaign" }, 404);
    if (campaign.status === "done") return reply({ items: [], next: null, done: true });
    const cursor = after > (campaign.cursor || "") ? after : (campaign.cursor || "");
    // The SQL column name can only be one of the hard-coded, validated values.
    const rows = await env.DB.prepare(
      `SELECT endpoint_hash, endpoint, p256dh, auth, locale FROM push_subscriptions
       WHERE ${campaign.topic} = 1 AND endpoint_hash > ? ORDER BY endpoint_hash LIMIT ?`
    ).bind(cursor, PAGE_SIZE).all();
    const items = rows.results || [];
    return reply({ items, next: items.length ? items[items.length - 1].endpoint_hash : null });
  }
  if (path === "/push/admin/campaign/progress" && request.method === "POST") {
    const data = await body(request);
    if (!validCursor(data?.id) || !validCursor(data?.cursor) ||
        !Number.isSafeInteger(data?.sent) || data.sent < 0 || data.sent > PAGE_SIZE ||
        !Array.isArray(data?.invalid) || data.invalid.length > PAGE_SIZE ||
        !data.invalid.every(validCursor)) return reply({ error: "invalid_progress" }, 400);
    await env.DB.prepare(
      "UPDATE push_campaigns SET cursor = CASE WHEN cursor < ? THEN ? ELSE cursor END, " +
      "sent_count = sent_count + ?, updated_at = datetime('now') WHERE id = ? AND status = 'sending'"
    ).bind(data.cursor, data.cursor, data.sent, data.id).run();
    if (data.invalid.length) {
      await env.DB.prepare(`DELETE FROM push_subscriptions WHERE endpoint_hash IN (${data.invalid.map(() => "?").join(",")})`)
        .bind(...data.invalid).run();
    }
    return reply({ ok: true });
  }
  if (path === "/push/admin/campaign/finish" && request.method === "POST") {
    const data = await body(request);
    if (!validCursor(data?.id)) return reply({ error: "invalid_campaign" }, 400);
    await env.DB.prepare("UPDATE push_campaigns SET status='done', updated_at=datetime('now') WHERE id = ?")
      .bind(data.id).run();
    return reply({ ok: true });
  }
  return reply({ error: "not_found" }, 404);
}
