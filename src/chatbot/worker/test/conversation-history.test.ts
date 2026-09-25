import { describe, expect, it } from "vitest";
import worker from "../src/index";

const visitorId = "10000000-0000-4000-8000-000000000001";

function createEnv(ownerId = 1) {
  const users = new Map<string, { id: number; username: string; role: string }>();
  let nextVisitorUserId = 1;
  const rows = [
    { id: 10, role: "user", content: "cursos", created_at: "2026-09-25T10:00:00.000Z" },
    { id: 11, role: "assistant", content: "resposta", created_at: "2026-09-25T10:00:01.000Z" },
  ];
  const conversation = { id: "owned-conversation", user_id: ownerId };
  const control = { conversation_id: conversation.id, discord_thread_id: "thread-1", control_message_id: "control-1", status: "AI" };
  const DB = {
    prepare(sql: string) {
      let values: unknown[] = [];
      const statement = {
        bind(...args: unknown[]) { values = args; return statement; },
        async first() {
          if (sql.startsWith("SELECT id, username, role FROM users WHERE username =")) return users.get(String(values[0])) || null;
          if (sql.startsWith("SELECT user_id FROM conversations WHERE id = ?")) return values[0] === conversation.id ? { user_id: conversation.user_id } : null;
          if (sql.startsWith("SELECT id FROM conversations WHERE id = ? AND user_id = ?")) {
            return values[0] === conversation.id && values[1] === conversation.user_id ? { id: conversation.id } : null;
          }
          if (sql.startsWith("SELECT * FROM discord_conversations WHERE conversation_id = ?")) return values[0] === conversation.id ? control : null;
          return null;
        },
        async all() { return { results: rows }; },
        async run() {
          if (sql.startsWith("INSERT OR IGNORE INTO users")) {
            const username = String(values[0]);
            if (!users.has(username)) {
              const id = username.startsWith("visitor-") ? nextVisitorUserId++ : 10;
              users.set(username, { id, username, role: String(values[2]) });
            }
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE conversations SET user_id = ?")) {
            if (conversation.id === values[2] && conversation.user_id === values[3]) {
              conversation.user_id = Number(values[0]);
              return { meta: { changes: 1 } };
            }
            return { meta: { changes: 0 } };
          }
          return { meta: { changes: 1 } };
        },
      };
      return statement;
    },
  };
  const env = {
    DB,
    CACHE: { async get() { return null; }, async put() {} },
    SESSIONS: { async get() { return null; }, async put() {} },
    ALLOWED_ORIGINS: "*",
    JWT_SECRET: "test-secret",
  } as never;
  return { env, conversation, rows };
}

function historyRequest(ip: string, id = visitorId) {
  return new Request("https://api.pklavc.com/conversations/history?conversation_id=owned-conversation", {
    headers: { "CF-Connecting-IP": ip, "X-Skylet-Visitor-Id": id },
  });
}

describe("visitor conversation history", () => {
  it("restores ordered D1 history for the same persistent visitor after the IP changes", async () => {
    const { env, rows } = createEnv();
    const ctx = { waitUntil() {} } as never;
    const first = await worker.fetch(historyRequest("first-ip"), env, ctx);
    const afterReload = await worker.fetch(historyRequest("different-ip"), env, ctx);

    expect(first.status).toBe(200);
    expect(afterReload.status).toBe(200);
    expect((await afterReload.json() as { items: unknown[] }).items).toEqual(rows);
  });

  it("does not reveal a conversation when a different visitor supplies its id", async () => {
    const { env } = createEnv();
    const ctx = { waitUntil() {} } as never;
    const owner = await worker.fetch(historyRequest("same-ip"), env, ctx);
    const other = await worker.fetch(historyRequest("same-ip", "20000000-0000-4000-8000-000000000002"), env, ctx);

    expect(owner.status).toBe(200);
    expect(other.status).toBe(404);
    expect(await other.json()).toEqual({ error: "conversation_not_found" });
  });

  it("adopts a legacy IP-owned conversation only after verifying that legacy owner", async () => {
    const { env, conversation } = createEnv(10);
    const response = await worker.fetch(historyRequest("old-ip"), env, { waitUntil() {} } as never);

    expect(response.status).toBe(200);
    expect(conversation.user_id).toBe(1);
  });
});
