import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";

const DOMAIN = "pklavc.com";
const API = "https://api.cloudflare.com/client/v4";
const READ_ONLY_FIELDS = new Set(["stale_zone_configuration", "using_latest_model"]);

// Official API: https://developers.cloudflare.com/api/resources/bot_management/methods/update/
// The update endpoint accepts optional fields; submit only the one setting being changed.
// Never disable Bot Fight Mode, WAF rules, JavaScript detections, or other general protection.
export async function configureCloudflareDiscovery({ token, apply = false, fetchImpl = fetch, log = console.log }) {
  if (!token?.trim()) throw new Error("CLOUDFLARE_API_TOKEN is missing. Configure the existing GitHub Actions secret; never paste it into logs.");
  const redact = (value) => String(value).split(token).join("[REDACTED]");
  const api = async (endpoint, method = "GET", body) => {
    const label = endpoint.replace(/\/zones\/[a-f0-9]{32}/gi, "/zones/{zone_id}");
    let response;
    try {
      response = await fetchImpl(`${API}${endpoint}`, {
        method,
        redirect: "error",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(30_000),
      });
    } catch {
      throw new Error(`${method} ${label}: network request failed or timed out; configuration was not verified.`);
    }
    let payload;
    try { payload = await response.json(); } catch {
      throw new Error(`${method} ${label}: HTTP ${response.status}, invalid JSON; configuration was not verified.`);
    }
    if (!response.ok || payload.success !== true) {
      // Keep logs useful without exposing API response bodies or account information.
      const codes = (payload.errors || []).map((error) => String(error.code).replace(/[^\d-]/g, "")).filter(Boolean).join(", ") || "not supplied";
      const scope = endpoint.startsWith("/zones?") ? "Zone Read for pklavc.com" : `Bot Management ${method === "GET" ? "Read" : "Write"} for pklavc.com`;
      throw new Error(`${method} ${label}: HTTP ${response.status}, Cloudflare error code(s): ${codes}. Verify token access and ${scope}; no success is assumed.`);
    }
    return payload;
  };

  const zones = await api(`/zones?name=${DOMAIN}&match=all&per_page=50`);
  if (!Array.isArray(zones.result) || zones.result.length !== 1 || zones.result[0].name !== DOMAIN ||
      (zones.result_info?.total_count !== undefined && zones.result_info.total_count !== 1)) {
    throw new Error("Expected exactly one accessible pklavc.com zone. The token may belong to another account or lack Zone Read access. No settings changed.");
  }
  const zone = zones.result[0];
  if (!/^[a-f0-9]{32}$/i.test(zone.id) || zone.status !== "active") {
    throw new Error("pklavc.com zone is not active or its identifier is invalid. No settings changed.");
  }
  log(`Verified zone: ${DOMAIN}; status: active; mode: ${apply ? "apply" : "audit (read only)"}.`);
  if (typeof zone.plan?.name === "string") log(`Plan: ${redact(zone.plan.name).replace(/[\r\n]/g, " ").slice(0, 80)}.`);
  const endpoint = `/zones/${zone.id}/bot_management`;
  const before = (await api(endpoint)).result;
  if (!before || typeof before !== "object" || !["block", "only_on_ad_pages", "disabled"].includes(before.ai_bots_protection)) {
    throw new Error("Cloudflare did not return a recognized ai_bots_protection setting. No settings changed; check AI Crawl Control in the dashboard.");
  }
  log(`ai_bots_protection: ${before.ai_bots_protection}.`);
  let after = before;
  const changes = [];
  if (before.ai_bots_protection !== "disabled") {
    if (apply) {
      await api(endpoint, "PUT", { ai_bots_protection: "disabled" });
      after = (await api(endpoint)).result;
      if (after?.ai_bots_protection !== "disabled") {
        throw new Error("Cloudflare accepted the update but the subsequent read did not confirm ai_bots_protection=disabled. Check the dashboard before retrying.");
      }
      const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
      const unexpected = [...keys].filter((key) => key !== "ai_bots_protection" && !READ_ONLY_FIELDS.has(key) && !isDeepStrictEqual(before[key], after[key]));
      if (unexpected.length) {
        throw new Error("The subsequent read detected other Bot Management settings changing. No further writes performed; review concurrent dashboard/API changes.");
      }
      changes.push("ai_bots_protection=disabled (verified by a subsequent GET)");
      log("Applied and verified ai_bots_protection=disabled; other returned Bot Management settings preserved.");
    } else {
      log("Proposed change: ai_bots_protection=disabled. Run with --apply to apply this single setting.");
    }
  } else {
    log("AI bot blocking toggle is already disabled; no update needed.");
  }

  const attention = [];
  for (const key of ["crawler_protection", "is_robots_txt_managed", "bot_preference_sync_enabled", "cf_robots_variant", "sbfm_verified_bots", "content_bots_protection"]) {
    if (Object.hasOwn(after, key)) log(`${key}: ${redact(JSON.stringify(after[key]))}.`);
  }
  if (after.crawler_protection === "enabled") attention.push("AI Labyrinth is enabled (crawler_protection); review it in AI Crawl Control.");
  if (after.is_robots_txt_managed === true || after.bot_preference_sync_enabled === true || after.cf_robots_variant === "policy_only") {
    attention.push("Cloudflare manages or synchronizes robots policies; verify the served robots.txt and AI Search/AI User preferences in the dashboard.");
  }
  if (after.sbfm_verified_bots === "block") attention.push("Verified bots are blocked by Super Bot Fight Mode; review the cause before modifying general security.");
  // Crawler Hints is documented as a dashboard feature, with no supported public API
  // in the current reference. Do not guess /settings/crawler_hints or use private flags APIs.
  attention.push("Crawler Hints: check Caching > Configuration in Cloudflare and enable it if off. Its state was not accessible through a documented public API.");
  attention.push("Custom firewall and per-crawler AI Crawl Control rules were not changed or exhaustively audited by this script.");
  for (const item of attention) log(`Attention: ${item}`);
  return { domain: DOMAIN, apply, aiBotsProtection: after.ai_bots_protection, changes, attention };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== "--apply") || args.length > 1) throw new Error("Usage: node scripts/configure-cloudflare-discovery.mjs [--apply]");
  const lines = [];
  try {
    await configureCloudflareDiscovery({ token: process.env.CLOUDFLARE_API_TOKEN, apply: args.includes("--apply"), log: (line) => { lines.push(line); console.log(line); } });
  } catch (error) {
    const message = String(error.message).split(process.env.CLOUDFLARE_API_TOKEN || "\0").join("[REDACTED]");
    lines.push(`BLOCKED: ${message}`);
    console.error(`BLOCKED: ${message}`);
    process.exitCode = 1;
  } finally {
    if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Cloudflare discovery configuration\n\n${lines.map((line) => `- ${line}`).join("\n")}\n`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
