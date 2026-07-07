import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE = "https://pklavc.com";
const TODAY = "2026-07-07";
const SITEMAP_DIR = path.join(ROOT, "sitemaps");

const groups = {
  pages: [],
  blog: [],
  projects: [],
  pt: [],
  es: []
};

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", ".pages-dist", "node_modules"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function routeFromFile(filePath) {
  const relative = toPosix(path.relative(ROOT, filePath));
  if (relative === "index.html") return "/";
  if (!relative.endsWith("/index.html")) return `/${relative}`;
  return `/${relative.slice(0, -"/index.html".length)}/`;
}

function absoluteUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/")) return `${SITE}${value}`;
  return "";
}

function parseAttributes(tag) {
  const attrs = {};
  tag.replace(/([a-zA-Z:-]+)\s*=\s*["']([^"']*)["']/g, (_, name, value) => {
    attrs[name.toLowerCase()] = value;
    return "";
  });
  return attrs;
}

function canonicalFromHtml(html, route) {
  const match = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i);
  if (!match) return `${SITE}${route}`;
  const attrs = parseAttributes(match[0]);
  const canonical = absoluteUrl(attrs.href);
  return canonical && canonical.startsWith(SITE) ? canonical : `${SITE}${route}`;
}

function alternatesFromHtml(html) {
  const alternates = [];
  const seen = new Set();
  const pattern = /<link\b[^>]*rel=["']alternate["'][^>]*>/gi;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const attrs = parseAttributes(match[0]);
    const hreflang = attrs.hreflang;
    const href = absoluteUrl(attrs.href);
    if (!hreflang || !href || !href.startsWith(SITE)) continue;
    const key = `${hreflang}|${href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    alternates.push({ hreflang, href });
  }
  return alternates;
}

function isNoindex(html, relative) {
  if (["404.html", "410.html", "503.html"].includes(relative)) return true;
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

function gitLastmod(filePath) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", filePath], {
      cwd: ROOT,
      encoding: "utf8"
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : TODAY;
  } catch {
    return TODAY;
  }
}

function classify(route) {
  if (route.startsWith("/pt/")) return "pt";
  if (route.startsWith("/es/")) return "es";
  if (route.startsWith("/blog/")) return "blog";
  if (route.startsWith("/projects/")) return "projects";
  return "pages";
}

function priorityFor(route, group) {
  if (route === "/") return "1.0";
  if (["/about/", "/projects/", "/blog/"].includes(route)) return "0.8";
  if (group === "blog" || group === "projects") return "0.7";
  if (group === "pt" || group === "es") return route.split("/").length <= 3 ? "0.7" : "0.6";
  return "0.5";
}

function changefreqFor(route, group) {
  if (route === "/" || route.endsWith("/blog/")) return "weekly";
  if (route.includes("/visitors/") || route.includes("/visitantes/") || route === "/status/") return "daily";
  if (group === "blog") return "monthly";
  return "monthly";
}

function renderUrlset(entries) {
  const body = entries.map((entry) => {
    const alternates = entry.alternates.map((alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`
    ).join("\n");
    return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
${alternates ? `${alternates}\n` : ""}    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

function renderIndex(files) {
  const latestByFile = new Map();
  for (const [name, entries] of Object.entries(groups)) {
    const latest = entries.map((entry) => entry.lastmod).sort().at(-1) || TODAY;
    latestByFile.set(`${name}.xml`, latest);
  }

  const body = files.map((file) => `  <sitemap>
    <loc>${SITE}/sitemaps/${file}</loc>
    <lastmod>${latestByFile.get(file) || TODAY}</lastmod>
  </sitemap>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

for (const filePath of walk(ROOT)) {
  const relative = toPosix(path.relative(ROOT, filePath));
  const html = fs.readFileSync(filePath, "utf8");
  if (isNoindex(html, relative)) continue;

  const route = routeFromFile(filePath);
  const loc = canonicalFromHtml(html, route);
  if (!loc.startsWith(SITE)) continue;

  const group = classify(new URL(loc).pathname);
  groups[group].push({
    loc,
    alternates: alternatesFromHtml(html),
    lastmod: gitLastmod(filePath),
    changefreq: changefreqFor(route, group),
    priority: priorityFor(route, group)
  });
}

for (const entries of Object.values(groups)) {
  entries.sort((a, b) => a.loc.localeCompare(b.loc));
}

fs.mkdirSync(SITEMAP_DIR, { recursive: true });
const files = [];
for (const [name, entries] of Object.entries(groups)) {
  if (!entries.length) continue;
  const file = `${name}.xml`;
  fs.writeFileSync(path.join(SITEMAP_DIR, file), renderUrlset(entries), "utf8");
  files.push(file);
}

const index = renderIndex(files);
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), index, "utf8");
fs.writeFileSync(path.join(ROOT, "sitemap-index.xml"), index, "utf8");

console.log(`Generated sitemap index and ${files.length} sitemap files.`);
for (const file of files) {
  const name = path.basename(file, ".xml");
  console.log(`- sitemaps/${file}: ${groups[name].length} URLs`);
}
