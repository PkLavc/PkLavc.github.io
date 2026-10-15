import { describe, expect, it } from "vitest";
import worker from "../src/index";

function noDatabaseEnv() {
  let touched = 0;
  const env = {
    CACHE: {}, SESSIONS: {},
    ALLOWED_ORIGINS: "https://pklavc.com",
    DB: {
      prepare() { touched += 1; throw new Error("D1 must not be called"); },
    },
    AI: {
      run() { touched += 1; throw new Error("Cloudflare AI must not be called"); },
    },
  } as never;
  return { env, calls: () => touched };
}

async function query(path: string, message: string) {
  const { env, calls } = noDatabaseEnv();
  const request = new Request("https://api.pklavc.com" + path, {
    method: "POST",
    headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const response = await worker.fetch(request, env, { waitUntil() {} } as never);
  return { response, calls: calls() };
}

describe("Skylet real HTTP and streaming paths", () => {
  it("answers misspelled Portuguese capability question locally on HTTP", async () => {
    const { response, calls } = await query("/chat", "oque pode falar?");
    expect(response.status).toBe(200);
    const data = await response.json() as { provider: string; reply: string; local_reason: string };
    expect(data.provider).toBe("local");
    expect(data.local_reason).toBe("faq:skylet_capabilities");
    expect(data.reply).toContain("Posso ajudar com informações");
    expect(data.reply).toContain("PkLavc");
    expect(calls).toBe(0);
  });
  it("answers abbreviated and mistyped chat via SSE without consuming Cloudflare quota", async () => {
    const { response, calls } = await query("/chat/stream", "oq vc podi fala");
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/event-stream");
    const data = await response.text();
    expect(data).toContain("Posso ajudar com informações");
    expect(data).toContain('"done":true');
    expect(calls).toBe(0);
  });
  it("answers a known shop-navigation FAQ with no AI, KV or D1", async () => {
    const { response, calls } = await query("/chat", "Onde fica a loja?");
    expect(response.status).toBe(200);
    const data = await response.json() as { provider: string; reply: string };
    expect(data.provider).toBe("local");
    expect(data.reply).toContain("https://pklavc.com/store/");
    expect(calls).toBe(0);
  });
  it("refuses off-site questions before allocating a conversation", async () => {
    const { response, calls } = await query("/chat", "Qual a previsão do tempo?");
    const data = await response.json() as { provider: string; local_reason: string; reply: string };
    expect(response.status).toBe(200);
    expect(data.local_reason).toBe("outside_site_scope");
    expect(data.reply).toContain("exclusivamente");
    expect(calls).toBe(0);
  });
  it("streaming answers known questions without a model or database", async () => {
    const { response, calls } = await query("/chat/stream", "Onde está o blog?");
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/event-stream");
    expect(await response.text()).toContain("https://pklavc.com/blog/");
    expect(calls).toBe(0);
  });
  it("limits model-bound site questions before allocating D1 guest users", async () => {
    const seen: string[] = [];
    const env = {
      CACHE: {}, SESSIONS: {},
      ALLOWED_ORIGINS: "https://pklavc.com",
      DB: { prepare(sql: string) {
        seen.push(sql);
        if (!sql.includes("optional_daily_usage")) throw Error("Guest or AI database write after cap");
        return { bind() { return { first: async () => null }; } };
      } },
      AI: { run() { throw Error("AI should not be invoked"); } },
    } as never;
    const response = await worker.fetch(new Request("https://api.pklavc.com/chat", {
      method: "POST", headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Quais produtos tem na loja?" }),
    }), env, { waitUntil() {} } as never);
    expect(response.status).toBe(200);
    const payload = await response.json() as { provider: string; local_reason: string; reply: string };
    expect(payload.provider).toBe("local");
    expect(payload.local_reason).toBe("daily_chat_request_budget");
    expect(payload.reply).toContain("limite diário");
    expect(seen).toHaveLength(1);
  });
  it("applies the same dynamic budget before streaming to avoid AI calls", async () => {
    const env = {
      CACHE: {}, SESSIONS: {}, ALLOWED_ORIGINS: "https://pklavc.com",
      DB: { prepare(sql: string) {
        if (!sql.includes("optional_daily_usage")) throw Error("Unexpected database call");
        return { bind() { return { first: async () => null }; } };
      } },
      AI: { run() { throw Error("AI should not be invoked"); } },
    } as never;
    const response = await worker.fetch(new Request("https://api.pklavc.com/chat/stream", {
      method: "POST", headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Quais produtos tem na loja?" }),
    }), env, { waitUntil() {} } as never);
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("limite diário");
  });
  it("streaming refuses general assistant requests locally", async () => {
    const { response, calls } = await query("/chat/stream", "Tell me a joke");
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("only questions");
    expect(calls).toBe(0);
  });
});
