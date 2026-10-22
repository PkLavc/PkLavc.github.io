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

async function query(path: string, message: string, extra: Record<string, unknown> = {}) {
  const { env, calls } = noDatabaseEnv();
  const request = new Request("https://api.pklavc.com" + path, {
    method: "POST",
    headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
    body: JSON.stringify({ message, ...extra }),
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
  it("remembers local capabilities and replies to De exemplos in Portuguese without D1 or AI", async () => {
    const first = await query("/chat", "oque pode falar?");
    const initial = await first.response.json() as { reply: string; conversation_id: string | null };
    expect(initial.conversation_id).toBeNull(); // no D1 records for FAQs
    const recent_messages = [
      { role: "user", content: "oque pode falar?" },
      { role: "assistant", content: initial.reply },
    ];
    const next = await query("/chat", "De exemplos", { recent_messages, locale: "en" });
    const answer = await next.response.json() as { reply: string; local_reason: string };
    expect(answer.local_reason).toBe("faq:skylet_context_examples");
    expect(answer.reply).toContain("Exemplos:");
    expect(next.calls).toBe(0);
    const streaming = await query("/chat/stream", "De exemplos", { recent_messages, locale: "en" });
    expect(await streaming.response.text()).toContain("Exemplos:");
    expect(streaming.calls).toBe(0);
  });

  it("refuses examples without site context when the safe AI classifier is unavailable", async () => {
    const standalone = await query("/chat", "De exemplos", { locale: "en" });
    const result = await standalone.response.json() as { reply: string; local_reason: string };
    expect(result.local_reason).toBe("outside_site_scope");
    expect(result.reply).toContain("exclusivamente");
    expect(standalone.calls).toBe(1); // Failed D1 reservation, zero model calls.
    const wrongContext = await query("/chat", "Dê exemplos", {
      recent_messages: [{ role: "user", content: "Qual a previsão do tempo?" }],
      locale: "pt",
    });
    expect((await wrongContext.response.json() as { local_reason: string }).local_reason)
      .toBe("outside_site_scope");
    expect(wrongContext.calls).toBe(1);
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
  it("refuses off-site questions safely when the classifier budget cannot be reserved", async () => {
    const { response, calls } = await query("/chat", "Qual a previsão do tempo?");
    const data = await response.json() as { provider: string; local_reason: string; reply: string };
    expect(response.status).toBe(200);
    expect(data.local_reason).toBe("outside_site_scope");
    expect(data.reply).toContain("exclusivamente");
    expect(calls).toBe(1); // Budget check only; no model call.
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
  it("streaming refuses general assistant requests if AI classifier is unavailable", async () => {
    const { response, calls } = await query("/chat/stream", "Tell me a joke");
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("only questions");
    expect(calls).toBe(1);
  });
});


describe("budgeted AI scope verification", () => {
  async function scopeRequest(path: "/chat" | "/chat/stream", label: string, scopeAllowance = true) {
    const sqlStatements: string[] = [];
    const aiInputs: unknown[] = [];
    const env = {
      CACHE: {}, SESSIONS: {},
      ALLOWED_ORIGINS: "https://pklavc.com",
      DB: {
        prepare(sql: string) {
          sqlStatements.push(sql);
          return {
            bind() {
              return {
                async first() {
                  // Scope classifier gets a daily sub-budget; a verified site
                  // question goes through the usual dynamic chat budget next.
                  if (sql.includes("scope_checks")) return scopeAllowance ? { requests: 1 } : null;
                  if (sql.includes("optional_daily_usage")) return null;
                  throw Error("Unexpected D1 operation after dynamic budget");
                },
              };
            },
          };
        },
      },
      AI: {
        async run(_model: string, options: unknown) {
          aiInputs.push(options);
          return { response: label };
        },
      },
    } as never;
    const request = new Request("https://api.pklavc.com" + path, {
      method: "POST",
      headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Qual a previsão do tempo em BH?" }),
    });
    const response = await worker.fetch(request, env, { waitUntil() {} } as never);
    return { response, sqlStatements, aiInputs };
  }

  it("verifies suspected off-topic requests with only Cloudflare AI and rejects OTHER", async () => {
    const { response, aiInputs, sqlStatements } = await scopeRequest("/chat", "OTHER");
    const payload = await response.json() as { local_reason: string; reply: string };
    expect(payload.local_reason).toBe("outside_site_scope");
    expect(payload.reply).toContain("exclusivamente");
    expect(aiInputs).toHaveLength(1);
    expect((aiInputs[0] as { max_tokens: number }).max_tokens).toBe(12);
    expect(sqlStatements).toHaveLength(1);
    expect(sqlStatements[0]).toContain("scope_checks < ?");
  });

  it("reclassifies SITE to existing answer flow rather than refusing", async () => {
    const { response, aiInputs, sqlStatements } = await scopeRequest("/chat", "SITE");
    const payload = await response.json() as { local_reason: string; reply: string };
    expect(payload.local_reason).toBe("daily_chat_request_budget");
    expect(payload.reply).toContain("limite diário");
    expect(aiInputs).toHaveLength(1);
    expect(sqlStatements).toHaveLength(2);
    expect(sqlStatements[1]).toContain("optional_daily_usage");
  });

  it("applies the same SITE routing to streaming", async () => {
    const { response, aiInputs, sqlStatements } = await scopeRequest("/chat/stream", "SITE");
    expect(await response.text()).toContain("limite diário");
    expect(aiInputs).toHaveLength(1);
    expect(sqlStatements).toHaveLength(2);
  });

  it("never calls any AI or third-party provider when classification quota is exhausted", async () => {
    const { response, aiInputs, sqlStatements } = await scopeRequest("/chat", "SITE", false);
    const payload = await response.json() as { local_reason: string };
    expect(payload.local_reason).toBe("outside_site_scope");
    expect(aiInputs).toHaveLength(0);
    expect(sqlStatements).toHaveLength(1);
  });
});
