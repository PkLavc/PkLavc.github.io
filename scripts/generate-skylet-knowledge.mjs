import fs from "node:fs";
import path from "node:path";

/**
 * Small, public, static retrieval index for Skylet. Built from the same
 * HTML/discovery/catalog files published on GitHub Pages. No embeddings,
 * Workers AI, D1, remote scraping or hand-written article answers.
 */
const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
const json = (file, fallback) => {
  try { return JSON.parse(read(file)) || fallback; } catch { return fallback; }
};
const clip = (value, length) => String(value || "").replace(/\s+/g, " ").trim().slice(0, length);
const siteUrl = (value) => {
  try {
    const url = new URL(value, "https://pklavc.com");
    if (!["pklavc.com", "www.pklavc.com"].includes(url.hostname)) return "";
    if (url.protocol !== "https:") return "";
    return url.pathname;
  } catch { return ""; }
};

function indexPages(root) {
  const blocks = read(path.join(root, "portfolio-context.txt")).split(/^### /m).slice(1);
  const pages = [];
  const seen = new Set();
  for (const block of blocks) {
    const title = clip(block.split("\n", 1)[0], 120);
    const source = block.match(/^Source:\s*(\S+)/m)?.[1] || "";
    const locale = block.match(/^Language:\s*(en|pt|es)\s*$/m)?.[1] || "en";
    const pathname = siteUrl(source);
    if (!pathname || seen.has(pathname)) continue;
    // Include first-party portfolio/projects/work/channel pages, not every
    // article; article metadata is indexed separately and more accurately.
    const allowed = /^(?:\/(?:pt|es))?\/(?:about|sobre|acerca-de|projects|projetos|proyectos|connect|links|resume|curriculo|certifications|certificacoes|certificaciones|uses|now|stacks|collections|colecoes|colecciones|media-kit|blog)(?:\/|$)/.test(pathname)
      || pathname === "/" || pathname === "/pt/" || pathname === "/es/";
    if (!allowed || pathname.split("/").length > 8) continue;
    const afterLanguage = block.split(/^Language:.*$/m).slice(1).join("\n").trim();
    const description = clip(afterLanguage.split(/\n\s*\n|^### /m)[0], 420);
    if (!title || !description) continue;
    pages.push({ t: title, d: description, u: pathname, l: locale });
    seen.add(pathname);
    if (pages.length >= 550) break;
  }
  return pages;
}

function indexPosts(root) {
  const payload = json(path.join(root, "blog", "posts.json"), []);
  if (!Array.isArray(payload)) return [];
  return payload.filter(p => p && typeof p.title === "string" && siteUrl(p.url))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
    .slice(0, 600).map(p => {
      const localized = {};
      for (const lang of ["pt", "es"]) {
        const x = p.localized?.[lang];
        if (x && siteUrl(x.url)) {
          localized[lang] = [clip(x.title, 160), clip(x.description, 280), siteUrl(x.url)];
        }
      }
      return {
        t: clip(p.title, 160), d: clip(p.description, 280),
        u: siteUrl(p.url), dt: clip(p.date, 12), c: clip(p.blog_category || p.category, 24),
        tags: (Array.isArray(p.tags) ? p.tags : []).slice(0, 7).map(x => clip(x, 32)),
        i: localized,
      };
    });
}

function indexProducts(root) {
  const payload = json(path.join(root, "store", "products.json"), { products: [] });
  const entries = Array.isArray(payload.products) ? payload.products : [];
  return entries.filter(p => p && p.name && (p.id || p.url)).slice(0, 2000).map(p => ({
    n: clip(p.name, 140), d: clip(p.description, 170),
    c: clip(p.category, 52), b: clip(p.vendor, 44), s: clip(p.program, 32),
    id: clip(p.id, 110), pr: Number.isFinite(Number(p.price)) && Number(p.price) > 0 ? Number(p.price) : null,
    cur: /^[A-Z]{3}$/.test(String(p.currency || "")) ? p.currency : "",
    a: p.available !== false,
  }));
}

function stripHtml(value) {
  return clip(String(value || "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|quot|apos);/gi, " "), 350);
}

function indexWork(root) {
  const html = read(path.join(root, "about", "index.html"));
  const companies = [...html.matchAll(/<article class="experience-company"[^>]*>([\s\S]*?)<\/article>/gi)];
  const work = [];
  for (const [, block] of companies) {
    const header = block.match(/experience-company-header[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/i);
    const company = header ? stripHtml(header[1]) : "";
    if (!company) continue;
    const overview = block.match(/experience-company-header[\s\S]*?<h3[^>]*>[\s\S]*?<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
    const roles = [...block.matchAll(/experience-role-heading[^>]*>[\s\S]*?<b[^>]*>([\s\S]*?)<\/b>\s*<small[^>]*>([\s\S]*?)<\/small>/gi)]
      .map(([, title, period]) => [stripHtml(title), stripHtml(period)]).slice(0, 8);
    work.push({ n: company, d: stripHtml(overview?.[1] || ""), roles, u: "/about/" });
  }
  return work.slice(0, 18);
}

function indexChannels(root) {
  const html = read(path.join(root, "connect", "index.html"));
  const urls = [...html.matchAll(/href\s*=\s*["'](https:\/\/[^"'\s]+)["']/gi)].map(m => m[1].replace(/&amp;/g, "&"));
  const services = [
    ["youtube", /(?:^|\.)youtube\.com$/],
    ["instagram", /(?:^|\.)instagram\.com$/],
    ["tiktok", /(?:^|\.)tiktok\.com$/],
    ["discord", /(?:^|\.)discord\.gg$|(?:^|\.)discord\.com$/],
    ["telegram", /(?:^|\.)t\.me$|(?:^|\.)telegram\.me$/],
    ["linkedin", /(?:^|\.)linkedin\.com$/],
    ["github", /(?:^|\.)github\.com$/],
    ["threads", /(?:^|\.)threads\.(?:com|net)$/],
    ["bluesky", /(?:^|\.)bsky\.app$/],
    ["pinterest", /(?:^|\.)pinterest\.[a-z.]+$/],
    ["mastodon", /(?:^|\.)mastodon\.[a-z.]+$/],
    ["whatsapp", /(?:^|\.)whatsapp\.com$|(?:^|\.)wa\.me$/],
  ];
  const seen = new Set();
  return urls.flatMap(raw => {
    try {
      const url = new URL(raw);
      if (url.protocol !== "https:") return [];
      const match = services.find(([, rx]) => rx.test(url.hostname.toLowerCase()));
      if (!match) return [];
      const key = match[0] + "|" + url.href;
      if (seen.has(key)) return [];
      seen.add(key);
      return [{ n: match[0], u: url.href }];
    } catch { return []; }
  }).slice(0, 60);
}

export function generateSkyletKnowledge(root) {
  const output = path.join(root, "assets", "skylet", "knowledge.json");
  const data = {
    version: 1,
    date: new Date().toISOString().slice(0, 10),
    pages: indexPages(root),
    posts: indexPosts(root),
    products: indexProducts(root),
    work: indexWork(root),
    channels: indexChannels(root),
  };
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(data));
  return {
    output, pages: data.pages.length, posts: data.posts.length,
    products: data.products.length, work: data.work.length, channels: data.channels.length,
    bytes: fs.statSync(output).size,
  };
}
