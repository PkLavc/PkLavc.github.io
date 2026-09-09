import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SOURCE_ROOT = process.cwd();
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== "--root" || !args[1])) {
  throw new Error("Usage: node scripts/generate-sitemaps.mjs [--root .pages-dist]");
}
const ROOT = path.resolve(SOURCE_ROOT, args[1] || ".");
const SITE = "https://pklavc.com";
const SITEMAP_DIR = path.join(ROOT, "sitemaps");
const groups = { pages: [], blog: [], projects: [], pt: [], es: [] };
const utilityRoutes = new Set([
  "/404.html", "/410.html", "/503.html", "/maintenance/", "/search/", "/status/",
  "/visitors/", "/pt/visitantes/", "/es/visitantes/"
]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (/^[._]/.test(entry.name) || ["node_modules", "src", "scripts", "dist", "build", "coverage"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function decodeEntities(value) {
  return String(value || "").replace(/&(?:amp|quot|apos|lt|gt|#39|#x[\da-f]+|#\d+);/gi, (entity) => {
    const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&#39;": "'" };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    const hex = /^&#x/i.test(entity);
    const code = parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10);
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function routeFromFile(filePath) {
  const relative = toPosix(path.relative(ROOT, filePath));
  if (relative === "index.html") return "/";
  return relative.endsWith("/index.html") ? `/${relative.slice(0, -"index.html".length)}` : `/${relative}`;
}

function parseAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4]);
  }
  return attrs;
}

function siteUrl(value, route = "/") {
  if (!value) return "";
  try {
    const url = new URL(value, `${SITE}${route}`);
    return url.origin === SITE && !url.username && !url.password && !url.search && !url.hash ? url.href : "";
  } catch {
    return "";
  }
}

function pageMetadata(html, route) {
  const head = (html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || html)
    .replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
  const blocked = metas.some((attrs) =>
    /^(robots|googlebot|bingbot)$/i.test(attrs.name || "") && /(?:^|[\s,])(noindex|none)(?:$|[\s,])/i.test(attrs.content || "")
  );
  const redirect = metas.some((attrs) => /^refresh$/i.test(attrs["http-equiv"] || ""));
  const canonical = links.find((attrs) => (attrs.rel || "").toLowerCase().split(/\s+/).includes("canonical"));
  const loc = canonical ? siteUrl(canonical.href, route) : `${SITE}${route}`;
  const alternates = links.filter((attrs) =>
    (attrs.rel || "").toLowerCase().split(/\s+/).includes("alternate") &&
    /^(?:x-default|[a-z]{2,3}(?:-[a-z\d]{2,8})*)$/i.test(attrs.hreflang || "")
  ).map((attrs) => ({ hreflang: attrs.hreflang, href: siteUrl(attrs.href, route) })).filter((attrs) => attrs.href);
  return { blocked, redirect, loc, alternates };
}

function gitLastmods() {
  const dates = new Map();
  try {
    if (execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: SOURCE_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim() === "true") {
      console.warn("Shallow Git history: omitting lastmod. Use actions/checkout fetch-depth: 0 for source dates.");
      return dates;
    }
    const history = execFileSync("git", ["-c", "core.quotepath=false", "log", "--format=__LASTMOD__%cs", "--name-only", "--", "*.html"], {
      cwd: SOURCE_ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"]
    });
    let date;
    for (const line of history.split(/\r?\n/)) {
      if (/^__LASTMOD__\d{4}-\d{2}-\d{2}$/.test(line)) date = line.slice("__LASTMOD__".length);
      else if (line && date && !dates.has(line)) dates.set(line, date);
    }
  } catch {
    console.warn("Git source dates unavailable: omitting lastmod rather than inventing freshness.");
  }
  return dates;
}

function classify(route) {
  if (route.startsWith("/pt/")) return "pt";
  if (route.startsWith("/es/")) return "es";
  if (route.startsWith("/blog/")) return "blog";
  if (route.startsWith("/projects/")) return "projects";
  return "pages";
}

function renderUrlset(entries) {
  const body = entries.map((entry) => {
    const alternates = entry.alternates.map((alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`
    );
    return ["  <url>", `    <loc>${escapeXml(entry.loc)}</loc>`, ...alternates,
      ...(entry.lastmod ? [`    <lastmod>${entry.lastmod}</lastmod>`] : []), "  </url>"].join("\n");
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

const dates = gitLastmods();
const pages = new Map();
let excluded = 0;
for (const filePath of walk(ROOT)) {
  const route = routeFromFile(filePath);
  const metadata = pageMetadata(fs.readFileSync(filePath, "utf8"), route);
  // Canonical aliases must not duplicate URLs or overwrite the target's metadata.
  if (utilityRoutes.has(route) || metadata.blocked || metadata.redirect || metadata.loc !== `${SITE}${route}`) {
    excluded += 1;
    continue;
  }
  if (pages.has(metadata.loc)) throw new Error(`Duplicate sitemap URL: ${metadata.loc}`);
  pages.set(metadata.loc, { ...metadata, lastmod: dates.get(toPosix(path.relative(ROOT, filePath))) });
}

let excludedAlternates = 0;
for (const page of pages.values()) {
  const seen = new Set();
  page.alternates = page.alternates.filter((alternate) => {
    const target = pages.get(alternate.href);
    const reciprocal = target && (target.loc === page.loc || target.alternates.some((other) => other.href === page.loc));
    if (!reciprocal || seen.has(alternate.hreflang.toLowerCase())) {
      excludedAlternates += 1;
      return false;
    }
    seen.add(alternate.hreflang.toLowerCase());
    return true;
  });
  groups[classify(new URL(page.loc).pathname)].push(page);
}

fs.mkdirSync(SITEMAP_DIR, { recursive: true });
for (const [name, entries] of Object.entries(groups)) {
  entries.sort((a, b) => a.loc.localeCompare(b.loc));
  fs.writeFileSync(path.join(SITEMAP_DIR, `${name}.xml`), renderUrlset(entries), "utf8");
}

// Keep the primary sitemap at the domain root so its scope covers the whole site.
// Group files remain available for Search Console reporting; the compatibility index
// references the root sitemap, without guessing its file-modification timestamp.
const allPages = [...pages.values()].sort((a, b) => a.loc.localeCompare(b.loc));
if (allPages.length > 50000) throw new Error("Root sitemap exceeds 50,000 URLs; split into root-level sitemap files.");
const sitemap = renderUrlset(allPages);
if (Buffer.byteLength(sitemap, "utf8") > 50 * 1024 * 1024) throw new Error("Root sitemap exceeds 50 MB.");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(ROOT, "sitemap-index.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
`, "utf8");

console.log(`Generated sitemap.xml with ${pages.size} canonical URLs (${excluded} excluded pages, ${excludedAlternates} excluded alternates).`);
for (const [name, entries] of Object.entries(groups)) console.log(`- sitemaps/${name}.xml: ${entries.length} URLs`);
