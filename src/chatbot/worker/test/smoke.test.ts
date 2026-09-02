import { describe, expect, it } from "vitest";
import { buildProviderFallbackReply, runProviderChat } from "../src/index";

describe("worker scaffold", () => {
  it("has test runtime configured", () => {
    expect(true).toBe(true);
  });

  it("returns local RAG content when external providers are unavailable", async () => {
    const fallback = buildProviderFallbackReply(
      "Compare a arquitetura do projeto Lavc Systems com o projeto Raw API.",
      "chat",
    );

    const result = await runProviderChat(
      "provider prompt",
      { PROMPT_VERSION: "test" } as never,
      false,
      "chat",
      fallback,
    );

    expect(result.provider).toBe("local");
    expect(result.fallback).toBe(true);
    expect(result.text).toContain("Lavc Systems");
    expect(result.text).toContain("Raw API Ingestion Pipeline");
  });

  it("uses the Cloudflare AI binding as the primary provider", async () => {
    const result = await runProviderChat(
      "provider prompt",
      {
        PROMPT_VERSION: "test",
        AI: {
          run: async () => ({
            response: "Reply:\nCloudflare response\n\nConversation memory:\ninternal prompt content",
          }),
        },
      } as never,
      false,
      "chat",
      "local fallback",
    );

    expect(result.provider).toBe("cloudflare");
    expect(result.fallback).toBe(false);
    expect(result.text).toBe("Cloudflare response");
  });
});
