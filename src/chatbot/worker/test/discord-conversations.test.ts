import { afterEach, describe, expect, it, vi } from "vitest";
import { drainDiscordMessageQueue, enqueueDiscordMessage } from "../src/discord-conversations";

const conversationId = "12345678-1234-1234-1234-123456789012";

function createEnv(threadId: string | null = "discord-thread") {
  const queue: Array<{ id: number; author: "Visitante" | "Skylet"; content: string; status: "queued" | "sent" }> = [];
  const mirrorKeys = new Set<string>();
  const conversation: Record<string, unknown> = {
    conversation_id: conversationId,
    discord_thread_id: threadId,
    control_message_id: "control-message",
    status: "AI",
    mirror_lock_token: null,
    mirror_lock_until: null,
  };
  let nextQueueId = 1;

  const DB = {
    prepare(sql: string) {
      let values: unknown[] = [];
      const statement = {
        bind(...args: unknown[]) { values = args; return statement; },
        async first() {
          if (sql.startsWith("SELECT * FROM discord_conversations")) return { ...conversation };
          if (sql.startsWith("SELECT control_message_id FROM discord_conversations")) return { control_message_id: conversation.control_message_id };
          if (sql.startsWith("SELECT id, author, content FROM discord_message_queue")) return queue.find(row => row.status === "queued") || null;
          if (sql.startsWith("SELECT id FROM discord_message_queue")) return queue.find(row => row.status === "queued") || null;
          return null;
        },
        async run() {
          if (sql.startsWith("UPDATE discord_conversations SET mirror_lock_token")) {
            if (conversation.mirror_lock_until && String(conversation.mirror_lock_until) >= String(values[3])) return { meta: { changes: 0 } };
            conversation.mirror_lock_token = values[0];
            conversation.mirror_lock_until = values[1];
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET mirror_lock_token = NULL")) {
            if (conversation.mirror_lock_token !== values[1]) return { meta: { changes: 0 } };
            conversation.mirror_lock_token = null;
            conversation.mirror_lock_until = null;
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET discord_thread_id = 'pending'")) {
            if (conversation.discord_thread_id !== null) return { meta: { changes: 0 } };
            conversation.discord_thread_id = "pending";
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET discord_thread_id = ?")) {
            conversation.discord_thread_id = values[0];
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET discord_thread_id = NULL, control_message_id = NULL")) {
            if (conversation.discord_thread_id !== values[2]) return { meta: { changes: 0 } };
            conversation.discord_thread_id = null;
            conversation.control_message_id = null;
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET control_message_id = 'pending'")) {
            if (conversation.control_message_id !== null) return { meta: { changes: 0 } };
            conversation.control_message_id = "pending";
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET control_message_id = ?")) {
            conversation.control_message_id = values[0];
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_conversations SET control_message_id = NULL")) {
            conversation.control_message_id = null;
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("INSERT OR IGNORE INTO discord_mirrored_messages")) {
            const key = String(values[0]);
            if (mirrorKeys.has(key)) return { meta: { changes: 0 } };
            mirrorKeys.add(key);
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("DELETE FROM discord_mirrored_messages")) {
            const existed = mirrorKeys.delete(String(values[0]));
            return { meta: { changes: existed ? 1 : 0 } };
          }
          if (sql.startsWith("INSERT INTO discord_message_queue")) {
            queue.push({ id: nextQueueId++, author: values[1] as "Visitante" | "Skylet", content: String(values[2]), status: "queued" });
            return { meta: { changes: 1 } };
          }
          if (sql.startsWith("UPDATE discord_message_queue SET status = 'sent'")) {
            const row = queue.find(item => item.id === values[0]);
            if (row) row.status = "sent";
            return { meta: { changes: row ? 1 : 0 } };
          }
          if (sql.startsWith("INSERT OR IGNORE INTO discord_conversations")) return { meta: { changes: 0 } };
          return { meta: { changes: 1 } };
        },
      };
      return statement;
    },
    async batch() { return []; },
  };
  return { env: { DB, DISCORD_BOT_TOKEN: "test-token", DISCORD_CHANNEL_ID: "channel", DISCORD_OWNER_USER_ID: "owner-user" } as never, DB, conversation };
}

describe("ordered Discord conversation delivery", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends Visitante: cursos before Skylet: resposta", async () => {
    const { env, DB } = createEnv();
    const sent: Array<{ url: string; content: string }> = [];
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === "POST" && url.endsWith("/messages")) sent.push({ url, content: JSON.parse(String(init.body)).content });
      return Response.json({ id: "posted-message" });
    }));

    await enqueueDiscordMessage(env, conversationId, "Visitante", "cursos");
    await enqueueDiscordMessage(env, conversationId, "Skylet", "resposta");
    await drainDiscordMessageQueue(env, conversationId);

    expect(sent.map(item => item.content)).toEqual(["**Visitante:**\ncursos", "**Skylet:**\nresposta"]);
    expect(sent.every(item => item.url.includes("/channels/discord-thread/messages"))).toBe(true);
  });

  it("keeps subsequent turns in order on the same Discord thread", async () => {
    const { env, DB } = createEnv();
    const sent: Array<{ url: string; content: string }> = [];
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === "POST" && url.endsWith("/messages")) sent.push({ url, content: JSON.parse(String(init.body)).content });
      return Response.json({ id: "posted-message" });
    }));

    await enqueueDiscordMessage(env, conversationId, "Visitante", "cursos");
    await enqueueDiscordMessage(env, conversationId, "Skylet", "resposta");
    await enqueueDiscordMessage(env, conversationId, "Visitante", "mais uma dúvida");
    await enqueueDiscordMessage(env, conversationId, "Skylet", "segunda resposta");
    await drainDiscordMessageQueue(env, conversationId);

    expect(sent.map(item => item.content)).toEqual([
      "**Visitante:**\ncursos",
      "**Skylet:**\nresposta",
      "**Visitante:**\nmais uma dúvida",
      "**Skylet:**\nsegunda resposta",
    ]);
    expect(new Set(sent.map(item => item.url))).toEqual(new Set(["https://discord.com/api/v10/channels/discord-thread/messages"]));
  });

  it("creates seven-day threads and adds the configured owner as a member", async () => {
    const { env } = createEnv(null);
    let createBody: Record<string, unknown> | undefined;
    let ownerMemberPath = "";
    let ownerMemberMethod = "";
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith("/channels/channel/threads")) {
        createBody = JSON.parse(String(init?.body));
        return Response.json({ id: "new-thread" });
      }
      if (url.endsWith("/thread-members/owner-user")) {
        ownerMemberPath = url;
        ownerMemberMethod = init?.method || "";
        return new Response(null, { status: 204 });
      }
      return Response.json({ id: "posted-message" });
    }));

    await enqueueDiscordMessage(env, conversationId, "Visitante", "cursos");
    await drainDiscordMessageQueue(env, conversationId);

    expect(createBody?.auto_archive_duration).toBe(10080);
    expect(ownerMemberPath).toBe("https://discord.com/api/v10/channels/new-thread/thread-members/owner-user");
    expect(ownerMemberMethod).toBe("PUT");
  });

  it.each(["AI", "HUMAN"] as const)("recreates a deleted thread while preserving %s handoff state", async status => {
    const { env, conversation } = createEnv("deleted-thread");
    conversation.status = status;
    const requests: Array<{ url: string; method: string; body?: Record<string, unknown> }> = [];
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = init?.method || "GET";
      const body = init?.body ? JSON.parse(String(init.body)) as Record<string, unknown> : undefined;
      requests.push({ url, method, body });
      if (url.endsWith("/channels/deleted-thread/messages")) {
        return Response.json({ code: 10003, message: "Unknown Channel" }, { status: 404 });
      }
      if (url.endsWith("/channels/channel/threads")) return Response.json({ id: "replacement-thread" });
      if (url.endsWith("/thread-members/owner-user")) return new Response(null, { status: 204 });
      if (url.endsWith("/channels/replacement-thread/messages")) return Response.json({ id: "new-control-message" });
      return Response.json({ id: "patched" });
    }));

    await enqueueDiscordMessage(env, conversationId, "Visitante", "Olá novamente");
    await drainDiscordMessageQueue(env, conversationId);

    const recreationIndex = requests.findIndex(request => request.url.endsWith("/channels/channel/threads"));
    const ownerIndex = requests.findIndex(request => request.url.endsWith("/thread-members/owner-user"));
    const visitorIndex = requests.findIndex(request => request.url.endsWith("/channels/replacement-thread/messages") && String(request.body?.content).startsWith("**Visitante:**\n"));
    expect(recreationIndex).toBeGreaterThan(-1);
    expect(ownerIndex).toBeGreaterThan(recreationIndex);
    expect(visitorIndex).toBeGreaterThan(ownerIndex);
    expect(requests[recreationIndex].body?.auto_archive_duration).toBe(10080);
    expect(conversation.discord_thread_id).toBe("replacement-thread");
    expect(conversation.status).toBe(status);
  });

  it("does not create duplicate replacement threads when queued deliveries race", async () => {
    const { env, conversation } = createEnv("deleted-thread");
    let creationCount = 0;
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/channels/deleted-thread/messages")) return Response.json({ code: 10003, message: "Unknown Channel" }, { status: 404 });
      if (url.endsWith("/channels/channel/threads")) return Response.json({ id: `replacement-${++creationCount}` });
      if (url.includes("/thread-members/")) return new Response(null, { status: 204 });
      return Response.json({ id: "posted" });
    }));

    await Promise.all([
      enqueueDiscordMessage(env, conversationId, "Visitante", "cursos"),
      enqueueDiscordMessage(env, conversationId, "Skylet", "resposta"),
    ]);
    await Promise.all([drainDiscordMessageQueue(env, conversationId), drainDiscordMessageQueue(env, conversationId)]);
    await drainDiscordMessageQueue(env, conversationId);

    expect(creationCount).toBe(1);
    expect(conversation.discord_thread_id).toBe("replacement-1");
  });

  it("unarchives an existing thread instead of creating a replacement", async () => {
    const { env, conversation } = createEnv("archived-thread");
    const requests: Array<{ url: string; method?: string; body?: Record<string, unknown> }> = [];
    let firstPost = true;
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const body = init?.body ? JSON.parse(String(init.body)) as Record<string, unknown> : undefined;
      requests.push({ url, method: init?.method, body });
      if (url.endsWith("/channels/archived-thread/messages") && firstPost) {
        firstPost = false;
        return Response.json({ code: 50083, message: "thread is archived" }, { status: 400 });
      }
      return Response.json({ id: "posted" });
    }));

    await enqueueDiscordMessage(env, conversationId, "Visitante", "cursos");
    await drainDiscordMessageQueue(env, conversationId);

    expect(requests.some(request => request.url.endsWith("/channels/archived-thread") && request.method === "PATCH" && request.body?.archived === false)).toBe(true);
    expect(requests.some(request => request.url.endsWith("/channels/channel/threads"))).toBe(false);
    expect(conversation.discord_thread_id).toBe("archived-thread");
  });
});
