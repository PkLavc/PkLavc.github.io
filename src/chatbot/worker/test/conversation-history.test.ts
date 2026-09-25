import { describe, expect, it } from "vitest";
import worker from "../src/index";

function createEnv() {
  const users = new Map<string, { id: number; username: string; role: string }>();
  const rows = [
    { id: 10, role: "user", content: "cursos", created_at: "2026-09-25T10:00:00.000Z" },
    { id: 11, role: "assistant", content: "resposta", created_at: "2026-09-25T10:00:01.000Z" },
  ];
  const conversation = { id: "owned-conversation", user_id: 1 };
  const control = { conversation_id: conversation.id, discord_thread_id: "thread-1", control_message_id: "control-1", status: "AI" };
  const DB = {
    prepare(sql: string) {
      let values: unknown[] = [];
      const statement = {
        bind(...args: unknown[]) { values = args; return statement; },
        async first() {
          if (sql.startsWith("SELECT id, username, role FROM users WHERE username =")) return users.get(String(values[0])) || null;
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
            if (!users.has(username)) users.set(username, { id: users.size + 1, username, role: String(values[2]) });
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET status = 'CLOSED'")) control.status = "CLOSED";
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
  return { env, conversation, control, rows };
}

describe("visitor conversation history", () => {
  it("restores ordered D1 history for the conversation owner", async () => {
    const { env, rows } = createEnv();
    const response = await worker.fetch(new Request("https://api.pklavc.com/conversations/history?conversation_id=owned-conversation", { headers: { "CF-Connecting-IP": "visitor-ip" } }), env, { waitUntil() {} } as never);

    expect(response.status).toBe(200);
    expect((await response.json() as { items: unknown[] }).items).toEqual(rows);
  });

  it("does not reveal a conversation when another visitor supplies its id", async () => {
    const { env } = createEnv();
    const ctx = { waitUntil() {} } as never;
    await worker.fetch(new Request("https://api.pklavc.com/conversations/history?conversation_id=owned-conversation", { headers: { "CF-Connecting-IP": "visitor-ip" } }), env, ctx);
    const response = await worker.fetch(new Request("https://api.pklavc.com/conversations/history?conversation_id=owned-conversation", { headers: { "CF-Connecting-IP": "different-visitor-ip" } }), env, ctx);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "conversation_not_found" });
  });
});
