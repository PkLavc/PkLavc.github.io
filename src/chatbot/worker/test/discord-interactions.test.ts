import { afterEach, describe, expect, it, vi } from "vitest";
import { handleDiscordInteraction, verifyDiscordSignature } from "../src/discord-interactions";

const keyPairPromise = crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
const timestamp = "1780000000";
const conversationId = "12345678-1234-1234-1234-123456789012";
const threadId = "discord-thread";

async function signedRequest(body: string, publicKeyHex: string, privateKey: CryptoKey, overrides: Record<string, string> = {}) {
  const signature = new Uint8Array(await crypto.subtle.sign({ name: "Ed25519" }, privateKey, new TextEncoder().encode(timestamp + body)));
  const hex = Array.from(signature, byte => byte.toString(16).padStart(2, "0")).join("");
  return new Request("https://api.pklavc.com/discord/interactions", { method: "POST", body, headers: { "X-Signature-Timestamp": timestamp, "X-Signature-Ed25519": hex, ...overrides } });
}

function toHex(bytes: ArrayBuffer) { return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join(""); }

function createHarness(status: "AI" | "HUMAN" | "CLOSED" = "AI") {
  const control = { conversation_id: conversationId, discord_thread_id: threadId, control_message_id: "control-message", status };
  const humanMessages: string[] = [];
  const calls: Array<{ url: string; method: string; body?: Record<string, unknown> }> = [];
  const DB = {
    prepare(sql: string) {
      let values: unknown[] = [];
      const statement = {
        sql,
        get values() { return values; },
        bind(...args: unknown[]) { values = args; return statement; },
        async first() { return sql.startsWith("SELECT * FROM discord_conversations") ? { ...control } : null; },
        async run() {
          if (sql.startsWith("UPDATE discord_conversations SET status = ?")) control.status = String(values[0]) as typeof status;
          return { meta: { changes: 1 } };
        },
      };
      return statement;
    },
    async batch(statements: Array<{ sql: string; values: unknown[] }>) {
      if (statements[0]?.sql.startsWith("UPDATE discord_conversations SET status = 'HUMAN'")) control.status = "HUMAN";
      if (statements[1]?.sql.startsWith("INSERT INTO messages")) humanMessages.push(String(statements[1].values[1]));
      return [{ meta: { changes: 1 } }, { meta: { changes: 1 } }, { meta: { changes: 1 } }];
    },
  };
  const env = { DISCORD_PUBLIC_KEY: "", DISCORD_OWNER_USER_ID: "owner", DISCORD_BOT_TOKEN: "test-token", DB } as never;
  const pending: Promise<unknown>[] = [];
  const ctx = { waitUntil(promise: Promise<unknown>) { pending.push(promise); } } as never;
  vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const body = init?.body ? JSON.parse(String(init.body)) as Record<string, unknown> : undefined;
    calls.push({ url, method: init?.method || "GET", body });
    return Response.json({ id: "posted-message" });
  }));
  return { env, ctx, control, humanMessages, calls, pending };
}

async function invoke(interaction: Record<string, unknown>, harness: ReturnType<typeof createHarness>) {
  const keys = await keyPairPromise;
  const publicKey = toHex(await crypto.subtle.exportKey("raw", keys.publicKey));
  (harness.env as { DISCORD_PUBLIC_KEY: string }).DISCORD_PUBLIC_KEY = publicKey;
  const body = JSON.stringify(interaction);
  const request = await signedRequest(body, publicKey, keys.privateKey);
  const response = await handleDiscordInteraction(request, harness.env, harness.ctx);
  return { response, body: await response.json() as Record<string, any> };
}

function component(action: string, type = 3, actorId = "owner") {
  return { type, member: { user: { id: actorId } }, channel_id: threadId, data: { custom_id: `skylet:${action}:${conversationId}` } };
}

async function finishTasks(harness: ReturnType<typeof createHarness>) { await Promise.all(harness.pending); }

describe("Discord interactions", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("accepts a correctly signed PING type 1 and returns PONG", async () => {
    const harness = createHarness();
    const { response, body } = await invoke({ type: 1 }, harness);
    expect(response.status).toBe(200);
    expect(body).toEqual({ type: 1 });
  });

  it("preserves Ed25519 signature verification", async () => {
    const keys = await keyPairPromise;
    const publicKey = toHex(await crypto.subtle.exportKey("raw", keys.publicKey));
    const body = JSON.stringify({ type: 1 });
    const valid = await signedRequest(body, publicKey, keys.privateKey);
    expect(await verifyDiscordSignature(body, valid.headers.get("X-Signature-Ed25519"), timestamp, publicKey)).toBe(true);
    expect(await verifyDiscordSignature(`${body} `, valid.headers.get("X-Signature-Ed25519"), timestamp, publicKey)).toBe(false);
    expect(await verifyDiscordSignature(body, null, null, publicKey)).toBe(false);
  });

  it("lets the owner use the type 3 Assumir button and changes AI to HUMAN", async () => {
    const harness = createHarness("AI");
    const { body } = await invoke(component("assume"), harness);
    expect(body).toEqual({ type: 6 });
    await finishTasks(harness);
    expect(harness.control.status).toBe("HUMAN");
  });

  it("lets the owner use the type 3 Responder button and opens a type 9 modal", async () => {
    const harness = createHarness("HUMAN");
    const { body } = await invoke(component("reply"), harness);
    expect(body).toMatchObject({ type: 9, data: { custom_id: `skylet:reply_submit:${conversationId}` } });
  });

  it("lets the owner use the type 3 Devolver para IA button and changes HUMAN to AI", async () => {
    const harness = createHarness("HUMAN");
    const { body } = await invoke(component("return"), harness);
    expect(body).toEqual({ type: 6 });
    await finishTasks(harness);
    expect(harness.control.status).toBe("AI");
  });

  it("lets the owner use the type 3 Encerrar button and closes the conversation", async () => {
    const harness = createHarness("AI");
    const { body } = await invoke(component("close"), harness);
    expect(body).toEqual({ type: 6 });
    await finishTasks(harness);
    expect(harness.control.status).toBe("CLOSED");
    expect(harness.calls.some(call => call.url.endsWith(`/channels/${threadId}`) && call.body?.archived === true)).toBe(true);
  });

  it("accepts a type 5 modal submit, persists the human reply, and mirrors it to the thread", async () => {
    const harness = createHarness("HUMAN");
    const { body } = await invoke({
      type: 5,
      member: { user: { id: "owner" } },
      channel_id: threadId,
      data: { custom_id: `skylet:reply_submit:${conversationId}`, components: [{ components: [{ custom_id: "reply_text", value: "Olá, posso ajudar." }] }] },
    }, harness);
    expect(body).toEqual({ type: 5, data: { flags: 64 } });
    await finishTasks(harness);
    expect(harness.control.status).toBe("HUMAN");
    expect(harness.humanMessages).toEqual(["Ol\u00e1, posso ajudar."]);
    expect(harness.calls.some(call => call.url.endsWith(`/channels/${threadId}/messages`) && String(call.body?.content).includes("Olá, posso ajudar."))).toBe(true);
  });

  it("rejects an unauthorized owner action sent as a real type 3 component", async () => {
    const harness = createHarness("AI");
    const { body } = await invoke(component("assume", 3, "intruder"), harness);
    expect(body).toMatchObject({ type: 4, data: { flags: 64 } });
    expect(harness.control.status).toBe("AI");
  });

  it("returns the unsupported response for application command type 2", async () => {
    const harness = createHarness();
    const { body } = await invoke(component("assume", 2), harness);
    expect(body).toMatchObject({ type: 4, data: { content: "Interação não suportada.", flags: 64 } });
    expect(harness.control.status).toBe("AI");
  });
});
