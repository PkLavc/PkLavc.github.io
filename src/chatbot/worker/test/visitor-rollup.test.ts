import { describe, expect, it } from "vitest";
import { combineGeoVisits, combineTrafficVisits } from "../src/visitor-rollup";

const rollups = [
  {
    geo_counts: JSON.stringify({ "BR|MG": 3, "US|CA": 2 }),
    region_names: JSON.stringify({ "BR|MG": "Minas Gerais", "US|CA": "California" }),
    source_counts: JSON.stringify({
      "instagram|games|games/gta-6-news": 2,
      "youtube|tech|tech/agent-api": 1,
    }),
  },
  {
    geo_counts: JSON.stringify({ "BR|MG": 4, "BR|SP": 1 }),
    region_names: JSON.stringify({ "BR|MG": "Minas Gerais", "BR|SP": "São Paulo" }),
    source_counts: JSON.stringify({ "instagram|games|games/gta-6-news": 3 }),
  },
];

describe("one-write daily visit rollup", () => {
  it("retains previous geography and merges new daily totals without double counting", () => {
    const result = combineGeoVisits(
      [{ country_code: "BR", visits: 8 }],
      [{ country_code: "BR", region_code: "MG", region_name: "Minas Gerais", visits: 8 }],
      rollups,
    );
    expect(result.summary).toEqual({ visits: 18, countries: 2, regions: 3 });
    expect(result.countries[0].code).toBe("BR");
    expect(result.countries[0].visits).toBe(16);
    expect(result.countries[0].regions.find(r => r.code === "MG")?.visits).toBe(15);
    expect(result.countries[1].regions[0].name).toBe("California");
  });

  it("combines historic and new source/page counts but retains top-page ordering", () => {
    const result = combineTrafficVisits(
      [{ channel: "instagram", visits: 7 }],
      [{ section: "games", page_key: "games/gta-6-news", visits: 7 }],
      rollups,
    );
    expect(result.attributed_visits).toBe(13);
    expect(result.channels).toEqual([
      { channel: "instagram", visits: 12 },
      { channel: "youtube", visits: 1 },
    ]);
    expect(result.pages[0]).toEqual({
      section: "games", page_key: "games/gta-6-news", visits: 12,
    });
  });

  it("ignores invalid JSON and does not introduce fabricated countries or pages", () => {
    const result = combineGeoVisits([], [], [{
      geo_counts: "not-json", region_names: "{}", source_counts: "{}",
    }]);
    expect(result.summary.visits).toBe(0);
    expect(result.countries).toEqual([]);
    expect(combineTrafficVisits([], [], [{
      geo_counts: "{}", region_names: "{}", source_counts: "broken",
    }]).channels).toEqual([]);
  });
});
