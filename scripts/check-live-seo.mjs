import fs from "node:fs";
import path from "node:path";

// Public GET requests only. User-agent tests do not prove access from a crawler's real IPs.
const SITE = "https://pklavc.com";
const args = process.argv.slice(2);
const outputIndex = args.indexOf("--output");
const report = { checkedAt: new Date().toISOString(), requests: [], sitemapPages: 0 };

async function check(url, userAgent = "PkLavc-SEO-Audit/1.0") {
  const started = Date.now();
  const result = { url, userAgent };
  let body = "";
  try {
    const response = await fetch(url, { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(25000) });
    body = await response.text();
    Object.assign(result, {
      status: response.status, finalUrl: response.url,
      type: response.headers.get("content-type"),
      robotsHeader: response.headers.get("x-robots-tag"),
      server: response.headers.get("server"),
      challenged: response.headers.get("cf-mitigated") === "challenge" || /<title>Just a moment\.\.\.<\/title>/i.test(body),
      canonical: body.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] || null,
      title: body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || null,
      bytes: Buffer.byteLength(body),
    });
    if (url.endsWith("/robots.txt")) result.body = body;
  } catch (error) {
    result.error = error.message;
  }
  result.elapsedMs = Date.now() - started;
  report.requests.push(result);
  return { result, body };
}

async function pool(items, action) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
    while (next < items.length) await action(items[next++]);
  }));
}

const sitemapUrls = new Set();
const mapsSeen = new Set();
async function sitemap(url) {
  if (mapsSeen.has(url)) return;
  mapsSeen.add(url);
  const { result, body } = await check(url);
  if (result.status !== 200) return;
  const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replace(/&amp;/g, "&"));
  for (const location of locations) {
    if (new URL(location).origin !== SITE) throw new Error(`Unexpected sitemap host: ${location}`);
  }
  if (body.includes("<sitemapindex")) {
    for (const location of locations) await sitemap(location);
  } else {
    for (const location of locations) sitemapUrls.add(location);
  }
}

await sitemap(`${SITE}/sitemap.xml`);
report.sitemapPages = sitemapUrls.size;
const sample = ["/", "/pt/", "/es/", "/about/", "/pt/sobre/", "/projects/omnichannel/", "/pt/projetos/omnichannel/", "/es/proyectos/omnichannel/", "/blog/", "/codepulse-monorepo/", "/robots.txt", "/llms.txt", "/llms-full.txt", "/feed.xml", "/sitemap-index.xml"];
const urls = new Set(sample.map((route) => `${SITE}${route}`));
if (args.includes("--all")) for (const url of sitemapUrls) urls.add(url);
console.log(`Checking ${urls.size} public URLs; published sitemap lists ${sitemapUrls.size} pages.`);
await pool([...urls], (url) => check(url));

const bots = ["Googlebot", "bingbot", "OAI-SearchBot", "GPTBot", "ChatGPT-User", "Amzn-SearchBot", "Amzn-User", "PerplexityBot", "Claude-SearchBot"];
await pool(bots, async (bot) => {
  await check(`${SITE}/robots.txt`, bot);
  await check(`${SITE}/about/`, bot);
});
await pool(["http://pklavc.com/", "https://www.pklavc.com/", "https://pklavc.github.io/", `${SITE}/__seo-audit-missing-page__`], (url) => check(url));

report.failures = report.requests.filter((item) => item.error || item.challenged || (item.status !== 200 && !item.url.endsWith("/__seo-audit-missing-page__")));
report.missingPageStatus = report.requests.find((item) => item.url.endsWith("/__seo-audit-missing-page__"))?.status;
console.log(JSON.stringify({ requests: report.requests.length, sitemapPages: report.sitemapPages, failures: report.failures, missingPageStatus: report.missingPageStatus }, null, 2));
if (outputIndex >= 0) {
  const destination = path.resolve(args[outputIndex + 1]);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, JSON.stringify(report, null, 2) + "\n");
  console.log(`Report: ${destination}`);
}
if (report.failures.length || report.missingPageStatus !== 404) process.exitCode = 1;
