import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://pklavc.com";

function decode(value) {
  return value.replace(/&(?:amp|lt|gt|quot|apos|#39|#(\d+)|#x([\da-f]+));/gi, (match, decimal, hex) => {
    if (decimal || hex) return String.fromCodePoint(parseInt(decimal || hex, hex ? 16 : 10));
    return ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&#39;": "'" })[match.toLowerCase()] || match;
  }).replace(/\s+/g, " ").trim();
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map((m) => [m[1].toLowerCase(), decode(m[3])]));
}

function readPages(root) {
  const urls = new Set();
  const visited = new Set();
  function readMap(relative) {
    if (visited.has(relative)) return;
    visited.add(relative);
    const xml = fs.readFileSync(path.join(root, relative), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = new URL(decode(match[1]));
      if (url.origin !== SITE) throw new Error(`Unexpected sitemap host: ${url}`);
      if (xml.includes("<sitemapindex")) readMap(url.pathname.slice(1));
      else urls.add(url.href);
    }
  }
  readMap("sitemap.xml");
  return [...urls].sort().map((url) => {
    const route = new URL(url).pathname;
    const file = path.join(root, route.slice(1), route.endsWith("/") ? "index.html" : "");
    const html = fs.readFileSync(file, "utf8");
    const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attributes(m[0]));
    return {
      url, route,
      title: decode(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || route),
      description: tags.find((tag) => tag.name?.toLowerCase() === "description")?.content || "",
      language: attributes(html.match(/<html\b[^>]*>/i)?.[0] || "").lang || "en",
    };
  });
}

function link(page) {
  const label = page.title.replace(/[\[\]]/g, "");
  return `- [${label}](${page.url}): ${page.description}`;
}

export function generateDiscovery(directory = process.cwd()) {
  const root = path.resolve(directory);
  const pages = readPages(root);
  const byRoute = new Map(pages.map((page) => [page.route, page]));
  const home = byRoute.get("/");
  if (!home) throw new Error("Discovery requires an indexable homepage.");
  const primary = ["/", "/about/", "/projects/", "/blog/", "/resume/", "/media-kit/", "/certifications/", "/editorial-policy/"]
    .map((route) => byRoute.get(route)).filter(Boolean);
  const projects = pages.filter((page) => /^\/projects\/[^/]+\/$/.test(page.route));
  const collections = pages.filter((page) => /^\/(?:collections|stacks)\//.test(page.route));
  const introduction = `# Patrick Araujo / PkLavc

> ${home.description}

Patrick Araujo publishes this personal engineering portfolio and blog under the handle PkLavc.
The profiles linked by this website are [GitHub](https://github.com/PkLavc) and [LinkedIn](https://www.linkedin.com/in/pklavc/).
Professional contact: contact@pklavc.com.

This directory is generated from the site's canonical HTML pages. Descriptions below summarize those pages; follow their links for full articles, project evidence, and current details. A project page does not by itself establish that its code is publicly available or open source; check its repository and license.
`;
  const brief = `${introduction}
## Profile and primary pages

${primary.map(link).join("\n")}

## Project case studies

${projects.map(link).join("\n")}

## Topics and reading collections

${collections.map(link).join("\n")}

## Languages

- [English](${SITE}/)
- [Português do Brasil](${SITE}/pt/)
- [Español](${SITE}/es/)

## Optional

- [Complete page directory](${SITE}/llms-full.txt): Canonical links and descriptions in every published language.
- [Sitemap](${SITE}/sitemap.xml): Indexable page URLs and language alternatives.
- [Engineering blog RSS](${SITE}/feed.xml): English article feed.
`;
  const full = `${introduction}
## Complete canonical page directory

This is a directory of page summaries, not the full text of the linked articles.

${pages.map((page) => `### ${page.title}\n\nSource: ${page.url}\nLanguage: ${page.language}\n\n${page.description}\n`).join("\n")}`;
  const files = {
    "llms.txt": brief,
    "llms-full.txt": full,
    "context.txt": brief,
    "portfolio-context.txt": full,
    "ai.txt": `# Public content discovery\n\nWebsite: ${SITE}/\nCrawl policy: ${SITE}/robots.txt\nSitemap: ${SITE}/sitemap.xml\nPage directory: ${SITE}/llms.txt\nFull directory: ${SITE}/llms-full.txt\nAuthor profile: ${SITE}/about/\n\nThese optional directories summarize public HTML. They are not crawler access controls or a guarantee of indexing, ranking, training, or citation. Public source pages contain the original content.\n`,
  };
  let updated = 0;
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(root, name);
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content) {
      fs.writeFileSync(file, content, "utf8");
      updated++;
    }
  }
  console.log(`Discovery: ${pages.length} canonical pages, ${projects.length} project summaries; ${updated} files updated.`);
  return { pages: pages.length, projects: projects.length, updated };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const rootIndex = process.argv.indexOf("--root");
  generateDiscovery(rootIndex >= 0 ? process.argv[rootIndex + 1] : process.cwd());
}
