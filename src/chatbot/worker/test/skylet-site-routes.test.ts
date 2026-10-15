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
  it("streaming refuses general assistant requests locally", async () => {
    const { response, calls } = await query("/chat/stream", "Tell me a joke");
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("only questions");
    expect(calls).toBe(0);
  });
});
