/**
 * Anonymous daily visitor rollups. Historical rows remain in the original
 * geo_visit_daily and traffic_source_daily tables; new visits update one
 * primary-key row per UTC day.
 *
 * JSON object keys contain only server-normalized country/region,
 * known channel and allowlisted public page dimensions.
 */
export interface VisitorRollupRow {
  geo_counts: string;
  region_names: string;
  source_counts: string;
}

type LegacyCountry = { country_code: string; visits: number };
type LegacyRegion = { country_code: string; region_code: string; region_name: string; visits: number };
type LegacyChannel = { channel: string; visits: number };
type LegacyPage = { section: string; page_key: string; visits: number };

function objectCounts(input: string): Record<string, number> {
  try {
    const parsed: unknown = JSON.parse(input || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "number" && Number.isFinite(value) && value > 0) result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

function objectNames(input: string): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(input || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

export function combineGeoVisits(
  oldCountries: LegacyCountry[], oldRegions: LegacyRegion[], rollups: VisitorRollupRow[],
) {
  const byCountry = new Map<string, number>();
  const byRegion = new Map<string, { code: string; name: string; visits: number }>();
  for (const row of oldCountries) {
    const country = String(row.country_code || "").toUpperCase();
    if (/^[A-Z]{2}$/.test(country)) byCountry.set(country, (byCountry.get(country) || 0) + Number(row.visits || 0));
  }
  for (const row of oldRegions) {
    const country = String(row.country_code || "").toUpperCase();
    const code = String(row.region_code || "").toUpperCase();
    if (!/^[A-Z]{2}$/.test(country) || !code) continue;
    const key = country + "|" + code;
    const old = byRegion.get(key);
    byRegion.set(key, {
      code,
      name: String(row.region_name || "") || old?.name || code,
      visits: (old?.visits || 0) + Number(row.visits || 0),
    });
  }
  for (const row of rollups) {
    const names = objectNames(row.region_names);
    for (const [key, count] of Object.entries(objectCounts(row.geo_counts))) {
      const sep = key.indexOf("|");
      if (sep !== 2) continue;
      const country = key.slice(0, sep);
      const region = key.slice(sep + 1);
      if (!/^[A-Z]{2}$/.test(country) || (region && !/^[A-Z0-9-]{1,24}$/.test(region))) continue;
      byCountry.set(country, (byCountry.get(country) || 0) + count);
      if (region) {
        const old = byRegion.get(key);
        byRegion.set(key, {
          code: region,
          name: names[key] || old?.name || region,
          visits: (old?.visits || 0) + count,
        });
      }
    }
  }
  const regionsByCountry = new Map<string, Array<{ code: string; name: string; visits: number }>>();
  for (const [key, value] of byRegion) {
    const country = key.slice(0, 2);
    const group = regionsByCountry.get(country) || [];
    group.push(value);
    regionsByCountry.set(country, group);
  }
  const countries = [...byCountry].map(([code, visits]) => ({
    code, visits, regions: (regionsByCountry.get(code) || []).sort((a, b) => b.visits - a.visits),
  })).sort((a, b) => b.visits - a.visits || a.code.localeCompare(b.code));
  return {
    countries,
    summary: {
      visits: countries.reduce((sum, row) => sum + row.visits, 0),
      countries: countries.length,
      regions: byRegion.size,
    },
  };
}

export function combineTrafficVisits(
  oldChannels: LegacyChannel[], oldPages: LegacyPage[], rollups: VisitorRollupRow[],
) {
  const channelCounts = new Map<string, number>();
  const pageCounts = new Map<string, { section: string; page_key: string; visits: number }>();
  const addChannel = (key: string, count: number) =>
    channelCounts.set(key, (channelCounts.get(key) || 0) + count);
  const addPage = (section: string, page: string, count: number) => {
    const key = section + "|" + page;
    const previous = pageCounts.get(key);
    pageCounts.set(key, { section, page_key: page, visits: (previous?.visits || 0) + count });
  };
  oldChannels.forEach(row => addChannel(row.channel, Number(row.visits || 0)));
  oldPages.forEach(row => addPage(row.section, row.page_key, Number(row.visits || 0)));
  for (const row of rollups) {
    for (const [key, count] of Object.entries(objectCounts(row.source_counts))) {
      const fields = key.split("|");
      if (fields.length !== 3) continue;
      const [channel, section, page] = fields;
      if (!channel || !section || !page) continue;
      addChannel(channel, count);
      addPage(section, page, count);
    }
  }
  const channels = [...channelCounts].map(([channel, visits]) => ({ channel, visits }))
    .sort((a, b) => b.visits - a.visits || a.channel.localeCompare(b.channel)).slice(0, 20);
  const pages = [...pageCounts.values()]
    .sort((a, b) => b.visits - a.visits || a.page_key.localeCompare(b.page_key)).slice(0, 20);
  return {
    channels,
    pages,
    attributed_visits: [...channelCounts.values()].reduce((sum, value) => sum + value, 0),
  };
}
