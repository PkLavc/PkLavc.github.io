import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import worker from "../src/index";

const ORIGIN = "https://pklavc.com";
const context = {} as ExecutionContext;

function fixture(role: "admin" | "user" = "admin") {
  const values = new Map<string, string>();
  const users = new Map<number, { id: number; username: string; role: string; password_hash: string }>();
  let nextId = 1;
  const sessions = {
    async get(key: string) { return values.get(key) ?? null; },
    async put(key: string, value: string) { values.set(key, value); },
    async delete(key: string) { values.delete(key); },
  } as unknown as KVNamespace;
  const db = {
    prepare(sql: string) {
      let args: unknown[] = [];
      const statement = {
        bind(...values: unknown[]) { args = values; return statement; },
        async run() {
          if (sql.startsWith("INSERT OR IGNORE INTO users")) {
            const username = String(args[0]);
            if (![...users.values()].some((user) => user.username === username)) {
              users.set(nextId, { id: nextId, username, role: String(args[2]), password_hash: String(args[1]) });
              nextId += 1;
            }
          }
          return { success: true };
        },
        async first<T>() {
          if (sql.includes("FROM users WHERE username")) {
            const user = [...users.values()].find((item) => item.username === args[0]);
            if (!user) return null;
            if (sql.includes("password_hash")) return { password_hash: user.password_hash } as T;
            return { id: user.id, username: user.username, role: user.role } as T;
          }
          if (sql.includes("FROM users WHERE id")) {
            const user = users.get(Number(args[0]));
            return user ? { id: user.id, username: user.username, role: user.role } as T : null;
          }
          return { total: 1 } as T;
        },
        async all<T>() { return { results: [] as T[] }; },
      };
      return statement as never;
    },
  } as unknown as D1Database;
  if (role === "user") users.set(1, { id: 1, username: "operator", role, password_hash: "ee0874170b7f6f32b8c2ac9573c428d35b575270a66b757c2c0185d2bd09718d" });
  return {
    values,
    env: {
      DB: db,
      SESSIONS: sessions,
      CACHE: sessions,
      APP_NAME: "test",
      ALLOWED_ORIGINS: `${ORIGIN},https://www.pklavc.com`,
      FRONTEND_URL: ORIGIN,
      DEFAULT_CHAT_MODEL: "test",
      DEFAULT_EMBED_MODEL: "test",
      PROMPT_VERSION: "test",
      JWT_EXP_HOURS: "24",
      RATE_LIMIT_PER_MINUTE: "30",
      PII_MASKING: "false",
      ADMIN_USERNAME: role === "admin" ? "administrator" : "operator",
      ADMIN_PASSWORD_HASH: "15a596e3c98c407e043751ff3b21ff0358a1bdfdf3fe948b1523893a8e5de2e8",
      JWT_SECRET: "unit-test-secret",
    } as never,
  };
}

function request(path: string, method = "GET", extra: Record<string, string> = {}, body?: unknown) {
  return new Request(`https://api.pklavc.com${path}`, {
    method,
    headers: { Origin: ORIGIN, "CF-Connecting-IP": "203.0.113.7", ...extra },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function login(state: ReturnType<typeof fixture>, username = "administrator", password = "correct") {
  return worker.fetch(request("/auth/login", "POST", { "Content-Type": "application/json" }, { username, password }), state.env, context);
}

function cookieFrom(response: Response) {
  return response.headers.get("Set-Cookie")?.split(";")[0] || "";
}

describe("admin authentication", () => {
  it("logs in with a secure HttpOnly cookie and returns no JWT", async () => {
    const state = fixture();
    const response = await login(state);
    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload).toEqual({ authenticated: true, username: "administrator", role: "admin" });
    expect(cookieFrom(response)).toContain("pklavc_admin_session=");
    expect(response.headers.get("Set-Cookie")).toContain("HttpOnly");
    expect(response.headers.get("Set-Cookie")).toContain("Secure");
    expect(response.headers.get("Set-Cookie")).toContain("SameSite=Strict");
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBe("true");
  });

  it("rejects wrong credentials without distinguishing fields", async () => {
    const response = await login(fixture(), "administrator", "wrong");
    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "invalid_credentials" });
  });

  it("restores a valid session, rejects missing or expired sessions, and revokes on logout", async () => {
    const state = fixture();
    const loggedIn = await login(state);
    const cookie = cookieFrom(loggedIn);
    const session = await worker.fetch(request("/auth/session", "GET", { Cookie: cookie }), state.env, context);
    expect(session.status).toBe(200);
    expect(await session.json()).toMatchObject({ authenticated: true, role: "admin" });
    expect((await worker.fetch(request("/auth/session"), state.env, context)).status).toBe(401);

    const token = cookie.slice("pklavc_admin_session=".length);
    const expired = await signExpiredToken();
    state.values.set(`session:${expired}`, JSON.stringify({ uid: 1, role: "admin" }));
    expect((await worker.fetch(request("/auth/session", "GET", { Cookie: `pklavc_admin_session=${expired}` }), state.env, context)).status).toBe(401);

    const logout = await worker.fetch(request("/auth/logout", "POST", { Cookie: cookie }), state.env, context);
    expect(logout.status).toBe(200);
    expect(logout.headers.get("Set-Cookie")).toContain("Max-Age=0");
    expect(state.values.has(`session:${token}`)).toBe(false);
    expect((await worker.fetch(request("/auth/session", "GET", { Cookie: cookie }), state.env, context)).status).toBe(401);
  });

  it("protects admin APIs with 401/403 and permits an authenticated admin", async () => {
    const admin = fixture();
    for (const route of ["/admin/analytics", "/admin/conversations"]) {
      expect((await worker.fetch(request(route), admin.env, context)).status).toBe(401);
    }
    const adminLogin = await login(admin);
    const adminResponse = await worker.fetch(request("/admin/analytics", "GET", { Cookie: cookieFrom(adminLogin) }), admin.env, context);
    expect(adminResponse.status).toBe(200);

    const ordinary = fixture("user");
    const userLogin = await login(ordinary, "operator", "anything");
    expect(userLogin.status).toBe(200);
    for (const route of ["/admin/analytics", "/admin/conversations"]) {
      const response = await worker.fetch(request(route, "GET", { Cookie: cookieFrom(userLogin) }), ordinary.env, context);
      expect(response.status).toBe(403);
    }
  });

  it("limits login attempts and never combines credentialed CORS with wildcard", async () => {
    const state = fixture();
    for (let attempt = 0; attempt < 5; attempt += 1) await login(state, "administrator", "wrong");
    expect((await login(state)).status).toBe(429);
    const response = await worker.fetch(new Request("https://api.pklavc.com/auth/session", { headers: { Origin: "https://evil.example" } }), state.env, context);
    expect(response.headers.get("Access-Control-Allow-Origin")).not.toBe("*");
    expect(response.headers.get("Access-Control-Allow-Credentials")).not.toBe("true");
  });

  it("uses credentials include and does not persist credentials in browser storage", () => {
    const source = readFileSync(new URL("../../../../js/admin.js", import.meta.url), "utf8");
    expect(source).toContain("credentials: 'include'");
    expect(source).not.toMatch(/(?:localStorage|sessionStorage)\s*\./);
    expect(source).toContain("API + '/auth/session'");
    expect(source).toContain("session.role === 'admin'");
  });
});

async function signExpiredToken() {
  const encode = (value: unknown) => btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const data = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: "administrator", role: "admin", uid: 1, exp: 1 })}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode("unit-test-secret"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data)));
  const encodedSignature = btoa(String.fromCharCode(...signature)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${data}.${encodedSignature}`;
}
