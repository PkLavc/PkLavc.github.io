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
});
