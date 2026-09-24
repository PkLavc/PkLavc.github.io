import { describe, expect, it } from "vitest";
import worker from "../src/index";

const env = { ALLOWED_ORIGINS: "https://pklavc.com" } as never;
const context = {} as never;

describe("ad geolocation", () => {
  it("returns only coarse Cloudflare country and region data", async () => {
    const request = new Request("https://api.pklavc.com/ads/geo", {
      headers: { Origin: "https://pklavc.com" },
    });
    Object.defineProperty(request, "cf", { value: { country: "BR", regionCode: "SP", city: "São Paulo" } });

    const response = await worker.fetch(request, env, context);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ country: "BR", region: "SP" });
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://pklavc.com");
  });

  it("uses null values when Cloudflare has no location", async () => {
    const request = new Request("https://api.pklavc.com/ads/geo", {
      headers: { Origin: "https://pklavc.com" },
    });

    const response = await worker.fetch(request, env, context);

    expect(await response.json()).toEqual({ country: null, region: null });
  });

  it("rejects an unapproved origin", async () => {
    const request = new Request("https://api.pklavc.com/ads/geo", {
      headers: { Origin: "https://untrusted.example" },
    });

    const response = await worker.fetch(request, env, context);

    expect(response.status).toBe(403);
  });
});
