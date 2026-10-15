import { describe, expect, it } from "vitest";
import worker, { reserveSkyletAiBudget, runProviderChat } from "../src/index";
import { offSiteReply, siteBudgetReply, siteFaq, siteLanguage, skyletSiteScope } from "../src/skylet-scope";

describe("Skylet scope and local multilingual FAQs", () => {
  it("accepts site, blog, Patrick, store and recent article questions", () => {
    for (const q of [
      "Quais produtos tem na loja?",
      "Que notícia de GTA 6 está no blog?",
      "Fale sobre os projetos de Patrick Araujo",
      "Como encontrar as matérias no site?",
      "Tell me about Patrick Araujo's projects.",
      "Where can I find the store?",
      "¿Dónde está el blog de PkLavc?",
      "What is the latest GTA 6 article?",
    ]) expect(skyletSiteScope(q), q).toBe(true);
  });

  it("refuses unrelated prompts even when they name a social network", () => {
    for (const q of [
      "Qual a capital da França?",
      "Como fazer um bolo?",
      "Qual é o valor de pi?",
      "What's the weather in Miami?",
      "Solve this math homework",
      "How to create a YouTube channel",
      "Como configurar Instagram",
      "Escribe un poema sobre el océano",
      "What is quantum mechanics?",
    ]) expect(skyletSiteScope(q), q).toBe(false);
  });

  it("allows only short related follow-ups and does not inherit arbitrary prompts", () => {
    expect(skyletSiteScope("E onde encontro?", "Como funciona a loja PkLavc?")).toBe(true);
    expect(skyletSiteScope("E quanto custa?", "Qual a matéria do blog?")).toBe(true);
    expect(skyletSiteScope("Como fazer bolo?", "Qual a matéria do blog?")).toBe(false);
    expect(skyletSiteScope("E onde encontro?", "Who won the football match?")).toBe(false);
  });

  it("prepares accurate FAQs in PT, EN and ES without calling a model", () => {
    const examples = [
      ["Onde encontro a loja?", "https://pklavc.com/store/"],
      ["Where is the store?", "https://pklavc.com/store/"],
      ["¿Dónde encuentro la tienda?", "https://pklavc.com/store/"],
      ["Onde posso ler notícias no blog?", "https://pklavc.com/blog/"],
      ["Where can I read blog articles?", "https://pklavc.com/blog/"],
      ["Como ver o mapa de visitantes do site?", "https://pklavc.com/pt/visitantes/"],
      ["Where is the visitor map of the site?", "https://pklavc.com/visitors/"],
      ["Onde encontro os projetos?", "https://pklavc.com/projects/"],
    ];
    for (const [question, result] of examples) {
      expect(siteFaq(question), question).toContain(result);
    }
    expect(siteFaq("Qual é o preço do item X na loja?")).toBeNull();
    expect(siteFaq("Qual foi a última notícia do GTA 6?")).toBeNull();
  });

  it("returns site-exclusive refusals in 3 languages", () => {
    expect(offSiteReply("Qual a capital da França?")).toContain("exclusivamente");
    expect(offSiteReply("¿Cuál es la capital de Francia?")).toContain("exclusivamente");
    expect(offSiteReply("What is the capital of France?")).toContain("only");
    expect(siteBudgetReply("Como faço?")).toContain("limite");
    expect(siteLanguage("¿Dónde está la tienda?")).toBe("es");
  });
});

describe("Cloudflare AI budget and retained priority", () => {
  it("uses one atomic D1 budget reservation, fails closed on exhausted/error", async () => {
    let sql = "";
    const valid = { DB: { prepare(query: string) {
      sql = query;
      return { bind(..._args: unknown[]) { return { first: async () => ({ requests: 1 }) }; } };
    } } } as never;
    expect(await reserveSkyletAiBudget(valid)).toBe(true);
    expect(sql).toContain("ON CONFLICT");
    expect(sql).toContain("RETURNING requests");
    const exhausted = { DB: { prepare() { return { bind() { return { first: async () => null }; } }; } } } as never;
    expect(await reserveSkyletAiBudget(exhausted)).toBe(false);
    expect(await reserveSkyletAiBudget({ DB: { prepare() { throw Error("D1 quota exceeded"); } } } as never)).toBe(false);
  });

  it("keeps Workers AI first for an in-scope model request", async () => {
    let aiCalls = 0;
    const result = await runProviderChat("site context", {
      PROMPT_VERSION: "test",
      AI: { async run() { aiCalls++; return { response: "The store is at pklavc.com/store/." }; } },
    } as never, false, "chat", "offline");
    expect(result.provider).toBe("cloudflare");
    expect(result.text).toContain("pklavc.com");
    expect(aiCalls).toBe(1);
  });

  it("does not call D1, KV or AI for a clearly unrelated new chat message", async () => {
    let calls = 0;
    const fail = () => { calls++; throw Error("offtopic must not access shared quotas"); };
    const env = {
      ALLOWED_ORIGINS: "https://pklavc.com",
      CACHE: { get: fail, put: fail },
      SESSIONS: { get: fail, put: fail },
      DB: { prepare: fail },
      AI: { run: fail },
    } as never;
    const request = new Request("https://api.pklavc.com/chat", {
      method: "POST", headers: { "Origin": "https://pklavc.com", "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Qual a capital da França?" }),
    });
    const response = await worker.fetch(request, env, {} as never);
    expect(response.status).toBe(200);
    const body = await response.json() as { reply: string; provider: string };
    expect(body.provider).toBe("local");
    expect(body.reply).toContain("exclusivamente");
    expect(calls).toBe(0);
  });

  it("streams a local off-topic refusal without calling D1/KV/AI", async () => {
    const env = {
      ALLOWED_ORIGINS: "https://pklavc.com",
      CACHE: { get() { throw Error("KV must not be read"); } },
      SESSIONS: {}, DB: { prepare() { throw Error("D1 must not be used"); } },
      AI: { run() { throw Error("AI must not be used"); } },
    } as never;
    const response = await worker.fetch(new Request("https://api.pklavc.com/chat/stream", {
      method: "POST", headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
      body: JSON.stringify({ message: "What is quantum mechanics?" }),
    }), env, {} as never);
    expect(response.status).toBe(200);
    const events = await response.text();
    expect(events).toContain("Skylet answers only");
    expect(events).toContain('"done":true');
  });
});
