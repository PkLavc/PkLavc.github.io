import { describe, expect, it } from "vitest";
import { handlePush, type PushEnv } from "../src/push";

const base = "https://api.pklavc.com";
const secret = "unit-test-secret-that-is-long-enough-for-auth";

describe("optional Web Push API safeguards", () => {
  const emptyDB = { prepare: () => ({ first: async () => null }) } as unknown as D1Database;
  const env = { DB: emptyDB, JWT_SECRET: secret } as PushEnv;

  it("returns disabled public configuration without touching private keys", async () => {
    const response = await handlePush(new Request(base + "/push/config"), env);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ enabled: false, publicKey: null });
  });

  it("rejects cross-site subscriptions before database reads or writes", async () => {
    const response = await handlePush(new Request(base + "/push/subscribe", {
      method: "POST", headers: { Origin: "https://untrusted.example", "Content-Type": "application/json" },
      body: JSON.stringify({ subscription: {}, topics: { tech: true, games: false, store: false } }),
    }), env);
    expect(response.status).toBe(403);
  });

  it("rejects invalid or missing browser key material", async () => {
    const response = await handlePush(new Request(base + "/push/subscribe", {
      method: "POST", headers: { Origin: "https://pklavc.com", "Content-Type": "application/json" },
      body: JSON.stringify({ subscription: { endpoint: "https://example.com/test", keys: {} },
        topics: { tech: true, games: false, store: false } }),
    }), env);
    expect(response.status).toBe(400);
  });

  it("does not expose subscriber or VAPID administration without authentication", async () => {
    for (const uri of ["/push/admin/vapid", "/push/admin/subscribers?id=" + "a".repeat(64)]) {
      const response = await handlePush(new Request(base + uri), env);
      expect(response.status).toBe(401);
    }
  });
});
