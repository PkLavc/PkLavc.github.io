import { describe, expect, it } from "vitest";
import worker, { reserveOptionalUsage } from "../src/index";
import { dimensionsOfVisit, pageDimensions, visitChannel } from "../src/traffic-attribution";

type DbCall = { sql: string; args: unknown[]; kind: "run" | "all" | "first" };
function mockDb(exhausted = false) {
  const calls: DbCall[] = [];
  const DB = {
    prepare(sql: string) {
      let args: unknown[] = [];
      return {
        bind(...values: unknown[]) { args = values; return this; },
        async run() { calls.push({ sql, args, kind: "run" as const }); return { success: true }; },
        async first() {
          calls.push({ sql, args, kind: "first" as const });
          return exhausted ? null : { requests: 1 };
        },
        async all() {
          calls.push({ sql, args, kind: "all" as const });
          if (sql.includes("SUM(visits) AS visits") && sql.includes("GROUP BY channel")) {
            return { results: [{ channel: "instagram", visits: 7 }, { channel: "youtube", visits: 4 }] };
          }
          return { results: [{ section: "games", page_key: "games/gta-6-secret", visits: 8 }] };
        },
      };
    },
  };
  return { DB: DB as never, calls };
}

const env = (DB: never) => ({
  DB, CACHE: {}, SESSIONS: {}, ALLOWED_ORIGINS: "https://pklavc.com",
}) as never;
const ctx = {} as never;
function visitRequest(pathname: string, source: string, origin = "https://pklavc.com") {
  const request = new Request("https://api.pklavc.com/analytics/visit", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify({ pathname, source, referrer: "https://www.instagram.com" }),
  });
  Object.defineProperty(request, "cf", { value: { country: "BR", regionCode: "MG", region: "Minas Gerais" } });
  return request;
}

describe("anonymous attribution dimensions", () => {
  it("normalizes known platforms and never preserves custom campaign strings", () => {
    expect(visitChannel("INSTAGRAM", "")).toBe("instagram");
    expect(visitChannel("youtube", "")).toBe("youtube");
    expect(visitChannel("DEVTO", "")).toBe("devto");
    expect(visitChannel("", "https://dev.to/pklavc/article")).toBe("devto");
    expect(visitChannel("unknown-token-value", "")).toBe("other");
    expect(visitChannel("", "https://l.instagram.com/abc?private=secret")).toBe("instagram");
    expect(visitChannel("", "https://pklavc.com/blog/en/tech/")).toBe("direct");
    expect(visitChannel("", "")).toBe("direct");
  });
  it("only attributes known first-party pages; no query strings or user-supplied IDs", () => {
    expect(pageDimensions("/blog/pt/games/gta-6-secret/")).toEqual({ section: "games", pageKey: "games/gta-6-secret" });
    expect(pageDimensions("/blog/es/tech/more-about-ai/")).toEqual({ section: "tech", pageKey: "tech/more-about-ai" });
    expect(pageDimensions("/store/")).toEqual({ section: "store", pageKey: "store" });
    expect(pageDimensions("/blog/pt/")).toEqual({ section: "blog", pageKey: "listing" });
    expect(pageDimensions("/blog/en/games")).toEqual({ section: "games", pageKey: "listing" });
    expect(pageDimensions("/blog/en/games/test/?user=123")).toEqual({ section: "games", pageKey: "games/test" });
    expect(pageDimensions("/tiktok/oauth/callback?secret=123")).toEqual({ section: "portfolio", pageKey: "other" });
    expect(dimensionsOfVisit({ pathname: "/blog/en/games/hidden/", source: "instagram" })).toEqual({
      section: "games", pageKey: "games/hidden", channel: "instagram",
    });
  });
});

describe("existing Worker visit and dashboard routes", () => {
  it("writes country, region, source, page and daily ceiling in one D1 statement", async () => {
    const { DB, calls } = mockDb();
    const response = await worker.fetch(visitRequest("/blog/en/games/gta-6-secret/", "instagram"), env(DB), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ country: "BR", region: "MG" });
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(calls).toHaveLength(1);
    expect(calls[0].kind).toBe("first");
    expect(calls[0].sql).toContain("INSERT INTO pklavc_visit_rollup_daily");
    expect(calls[0].sql).toContain("WHERE visits < ?");
    expect(calls[0].args[1]).toBe("BR|MG");
    expect(calls[0].args[2]).toBe("BR|MG");
    expect(calls[0].args[3]).toBe("Minas Gerais");
    expect(calls[0].args[4]).toBe('{"instagram|games|games/gta-6-secret":1}');
    expect(calls[0].args.at(-1)).toBe(50000);
    expect(calls[0].args.join("|")).not.toContain("private=");
  });
  it("rejects origin spoofed by a different website", async () => {
    const { DB, calls } = mockDb();
    const response = await worker.fetch(visitRequest("/", "instagram", "https://not-my-site.example"), env(DB), ctx);
    expect(response.status).toBe(403);
    expect(calls).toHaveLength(0);
  });
  it("preserves Macca geo counting without mixing source reports", async () => {
    const { DB, calls } = mockDb();
    const request = visitRequest("/", "youtube");
    const requestForMacca = new Request("https://api.pklavc.com/analytics/visit?site=macca", {
      method: "POST", headers: request.headers, body: "{}",
    });
    Object.defineProperty(requestForMacca, "cf", { value: { country: "BR", regionCode: "SP" } });
    const response = await worker.fetch(requestForMacca, env(DB), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ country: "BR", region: "SP" });
    expect(calls).toHaveLength(2);
    expect(calls[0].args[1]).toEqual("visit_macca");
    expect(calls[1].sql).toContain("macca_geo_visit_daily");
  });
  it("keeps geo response even when the one-statement daily cap is reached", async () => {
    const { DB, calls } = mockDb(true);
    const response = await worker.fetch(visitRequest("/blog/en/games/gta-6-secret/", "instagram"), env(DB), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ country: "BR", region: "MG" });
    expect(calls).toHaveLength(1);
    expect(calls[0].sql).toContain("WHERE visits < ?");
    expect(calls[0].kind).toBe("first");
  });
  it("fails closed on missing D1 table without affecting essential routes", async () => {
    const usageEnv = { DB: { prepare() { throw Error("D1 quota exceeded"); } } } as never;
    expect(await reserveOptionalUsage(usageEnv, "skylet_request", 60)).toBe(false);
  });
  it("returns public aggregate totals and popular pages with matching period", async () => {
    const { DB, calls } = mockDb();
    const request = new Request("https://api.pklavc.com/analytics/traffic?days=30", {
      headers: { Origin: "https://pklavc.com" },
    });
    const response = await worker.fetch(request, env(DB), ctx);
    expect(response.status).toBe(200);
    const result = await response.json() as {
      summary: { attributed_visits: number };
      channels: { channel: string }[];
      pages: { page_key: string }[];
      note: string;
    };
    expect(result.summary.attributed_visits).toBe(11);
    expect(result.channels[0].channel).toBe("instagram");
    expect(result.pages[0].page_key).toBe("games/gta-6-secret");
    expect(result.note).toContain("since source tracking was enabled");
    expect(calls).toHaveLength(3);
    expect(calls[0].args).toEqual(["-29 days"]);
    expect(calls[2].sql).toContain("pklavc_visit_rollup_daily");
    expect(response.headers.get("Cache-Control")).toContain("max-age=60");
  });
});
