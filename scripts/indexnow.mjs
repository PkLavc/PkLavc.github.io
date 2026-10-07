import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// https://www.indexnow.org/documentation
// This public ownership key is served by Pages; no account API token is needed.
export const SITE = "https://pklavc.com";
export const KEY_FILE = "indexnow-key.txt";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10000;
const SITE_WIDE_SOURCES = new Set([
  "robots.txt", "ai.txt", "llms.txt", "llms-full.txt", "context.txt",
  "portfolio-context.txt", KEY_FILE,
  "scripts/build-pages-artifact.mjs", "scripts/normalize-seo.mjs",
  "scripts/generate-discovery.mjs", "scripts/generate-sitemaps.mjs",
]);

export function validateUrl(value) {
  if (typeof value !== "string" || /\s|\\|%(?![\da-f]{2})/i.test(value)) {
    throw new Error("Malformed IndexNow URL.");
  }
  let url;
  try { url = new URL(value); } catch { throw new Error("Malformed IndexNow URL."); }
  if (url.origin !== SITE || url.username || url.password || url.search || url.hash || url.href !== value) {
    throw new Error("IndexNow URLs must be canonical HTTPS URLs on pklavc.com without queries or fragments.");
  }
  return url.href;
}

function decodeXml(value) {
  return value.replace(/&([^;]+);/g, (_, entity) => {
    const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
    if (Object.hasOwn(named, entity)) return named[entity];
    if (!/^#(?:x[\da-f]+|\d+)$/i.test(entity)) throw new Error("Unsupported sitemap XML entity.");
    const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    if (!Number.isInteger(code) || code < 1 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) {
      throw new Error("Invalid sitemap XML entity.");
    }
    return String.fromCodePoint(code);
  });
}

export function parseSitemap(xml) {
  if (typeof xml !== "string" || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error("Invalid sitemap XML.");
  const document = xml.replace(/<!--[\s\S]*?-->/g, "").trim();
  if (!/^(?:<\?xml[^>]*>\s*)?<urlset\b[^>]*>[\s\S]*<\/urlset>\s*$/.test(document)) {
    throw new Error("Expected a complete URL sitemap, not a sitemap index.");
  }
  const blocks = [...document.matchAll(/<url>\s*([\s\S]*?)\s*<\/url>/g)];
  if (!blocks.length || blocks.length !== (document.match(/<url>/g) || []).length ||
      blocks.length !== (document.match(/<loc>/g) || []).length) {
    throw new Error("Sitemap must contain one location per complete URL entry.");
  }
  const urls = blocks.map((block) => {
    const match = block[1].match(/<loc>([^<]+)<\/loc>/);
    if (!match) throw new Error("Missing or malformed sitemap location.");
    return validateUrl(decodeXml(match[1].trim()));
  });
  return [...new Set(urls)];
}

export function readSitemapTree(readFile, initialPath = "sitemap.xml") {
  const seen = new Set();
  function read(file) {
    if (!/^[a-z\d/_-]+\.xml$/i.test(file) || file.split("/").some((part) => !part)) {
      throw new Error("Unsafe historical sitemap path.");
    }
    if (seen.has(file)) return [];
    if (seen.size >= 50) throw new Error("Too many historical sitemaps.");
    seen.add(file);
    const document = readFile(file).replace(/<!--[\s\S]*?-->/g, "").trim();
    if (!/<sitemapindex\b/.test(document)) return parseSitemap(document);
    if (!/^(?:<\?xml[^>]*>\s*)?<sitemapindex\b[^>]*>[\s\S]*<\/sitemapindex>\s*$/.test(document)) {
      throw new Error("Invalid historical sitemap index.");
    }
    const blocks = [...document.matchAll(/<sitemap>\s*([\s\S]*?)\s*<\/sitemap>/g)];
    if (!blocks.length || blocks.length !== (document.match(/<sitemap>/g) || []).length ||
        blocks.length !== (document.match(/<loc>/g) || []).length) {
      throw new Error("Malformed historical sitemap index entries.");
    }
    return blocks.flatMap((block) => {
      const location = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!location) throw new Error("Missing historical sitemap location.");
      const url = new URL(validateUrl(decodeXml(location.trim())));
      return read(url.pathname.slice(1));
    });
  }
  return [...new Set(read(initialPath))];
}

export function routeFromPath(file) {
  // Git paths are repository relative. Never interpret arbitrary paths as URLs.
  if (typeof file !== "string" || file.startsWith("/") || /[\\?#%\s]/.test(file) ||
      file.split("/").some((segment) => !segment || segment === "." || segment === "..") || !file.endsWith(".html")) return null;
  if (file === "index.html") return `${SITE}/`;
  return `${SITE}/${file.endsWith("/index.html") ? file.slice(0, -"index.html".length) : file}`;
}

export function selectSubmissionUrls({ urls, changedPaths = [], previousUrls = [], all = false }) {
  const current = new Set(urls.map(validateUrl));
  const previous = new Set(previousUrls.map(validateUrl));
  const submitAll = all || changedPaths.some((file) => SITE_WIDE_SOURCES.has(file));
  const selected = new Set(submitAll ? current : []);
  // Site-wide canonical/noindex normalization can remove indexed URLs without
  // editing each source HTML file, so notify those withdrawals as well.
  if (submitAll) for (const url of previous) if (!current.has(url)) selected.add(url);
  // An old indexed route still needs a notification after deletion or noindex.
  for (const file of changedPaths) {
    const url = routeFromPath(file);
    if (url && (current.has(url) || previous.has(url))) selected.add(url);
  }
  return [...selected].sort();
}

export function buildPayload(key, urls) {
  if (typeof key !== "string" || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error("Invalid IndexNow ownership key.");
  const urlList = [...new Set(urls.map(validateUrl))];
  if (!urlList.length || urlList.length > MAX_URLS) throw new Error("IndexNow requires between 1 and 10,000 URLs per request.");
  return { host: new URL(SITE).host, key, keyLocation: `${SITE}/${KEY_FILE}`, urlList };
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function submitIndexNow(payload, { fetchImpl = fetch, wait = delay, keyAttempts = 5, expectedSha = "", deploymentAttempts = 6 } = {}) {
  // Validate again for callers importing this function. A redirect or an HTML 200
  // error page is not proof that the new key was published on the correct host.
  const validated = buildPayload(payload.key, payload.urlList);
  if (expectedSha) {
    if (!/^[\da-f]{40}$/i.test(expectedSha)) throw new Error("Expected deployment must be a full Git commit SHA.");
    let deployed = false;
    for (let attempt = 0; attempt < deploymentAttempts; attempt += 1) {
      try {
        const response = await fetchImpl(`${SITE}/.well-known/site-deployment.json?v=${expectedSha}`, {
          redirect: "error", headers: { "User-Agent": "PkLavc-IndexNow/1.0", "Cache-Control": "no-cache" },
          signal: AbortSignal.timeout(15000),
        });
        if (response.status === 200 && (await response.json()).commit === expectedSha) {
          deployed = true;
          break;
        }
      } catch { /* The edge may still be serving the preceding Pages deployment. */ }
      if (attempt + 1 < deploymentAttempts) await wait(10000);
    }
    if (!deployed) throw new Error("The expected commit is not publicly deployed; no URLs were submitted.");
  }
  let verified = false;
  let keyStatus = "unavailable";
  for (let attempt = 0; attempt < keyAttempts; attempt += 1) {
    try {
      const response = await fetchImpl(validated.keyLocation, {
        redirect: "error", headers: { "User-Agent": "PkLavc-IndexNow/1.0", "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(15000),
      });
      keyStatus = `HTTP ${response.status}`;
      if (response.status === 200 && (await response.text()).trim() === validated.key) {
        verified = true;
        break;
      }
    } catch { keyStatus = "request failed"; }
    if (attempt + 1 < keyAttempts) await wait(3000);
  }
  if (!verified) throw new Error(`Public IndexNow ownership file not verified (${keyStatus}); no URLs were submitted.`);
  const response = await fetchImpl(ENDPOINT, {
    method: "POST", redirect: "error", signal: AbortSignal.timeout(30000),
    headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": "PkLavc-IndexNow/1.0" },
    body: JSON.stringify(validated),
  });
  if (![200, 202].includes(response.status)) {
    // Do not echo a provider response that might contain the verification key.
    throw new Error(`IndexNow returned HTTP ${response.status}; notification was not confirmed. Check ownership, payload, or rate limits before retrying.`);
  }
  return { status: response.status, count: validated.urlList.length, verificationPending: response.status === 202 };
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 16 * 1024 * 1024 });
}

function changesSince(revision) {
  if (!/^[\da-f]{7,40}$/i.test(revision)) throw new Error("--since requires a Git commit SHA.");
  git(["rev-parse", "--verify", `${revision}^{commit}`]);
  const parts = git(["diff", "--name-status", "-z", "--no-renames", revision, "HEAD", "--"]).split("\0").filter(Boolean);
  const changedPaths = [];
  for (let index = 0; index < parts.length; index += 2) {
    if (!/^[AMDT]$/.test(parts[index]) || !parts[index + 1]) throw new Error("Unexpected Git diff format.");
    changedPaths.push(parts[index + 1]);
  }
  const previousUrls = readSitemapTree((file) => {
    try { return git(["show", `${revision}:${file}`]); } catch {
      throw new Error("Cannot read the previous sitemap; use --all for an initial publication.");
    }
  });
  return { changedPaths, previousUrls };
}

async function main(args) {
  const options = { root: ".pages-dist", all: false, dryRun: false, since: "", "expected-sha": process.env.GITHUB_SHA || "" };
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--all") options.all = true;
    else if (args[index] === "--dry-run") options.dryRun = true;
    else if (["--root", "--since", "--expected-sha"].includes(args[index]) && args[index + 1] && !args[index + 1].startsWith("--")) {
      options[args[index].slice(2)] = args[++index];
    } else throw new Error("Usage: node scripts/indexnow.mjs [--root .pages-dist] (--all | --since COMMIT_SHA) [--expected-sha SHA] [--dry-run]");
  }
  if (!options.all && !options.since) throw new Error("Choose --all for initial submission or --since COMMIT_SHA for changed pages.");
  if (/^0+$/.test(options.since)) { options.all = true; options.since = ""; }
  const changes = options.since ? changesSince(options.since) : {};
  const urls = selectSubmissionUrls({
    urls: parseSitemap(fs.readFileSync(path.resolve(options.root, "sitemap.xml"), "utf8")),
    ...changes, all: options.all,
  });
  if (!urls.length) {
    console.log("IndexNow: no changed indexed pages; no notification sent.");
    return;
  }
  const key = fs.readFileSync(path.resolve(options.root, KEY_FILE), "utf8").trim();
  const payload = buildPayload(key, urls);
  if (options.dryRun) {
    console.log(`IndexNow dry run: ${urls.length} URLs selected; no network requests made.`);
    console.log(JSON.stringify({ host: payload.host, urlList: payload.urlList }, null, 2));
    return;
  }
  const result = await submitIndexNow(payload, { expectedSha: options["expected-sha"] });
  console.log(`IndexNow HTTP ${result.status}: ${result.count} URLs received${result.verificationPending ? "; search engine ownership verification pending" : ""}. Receipt does not guarantee indexing or AI citation.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`IndexNow: ${error.message}`);
    process.exitCode = 1;
  });
}
