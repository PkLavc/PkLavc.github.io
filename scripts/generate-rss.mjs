import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "blog");
const SITE = "https://pklavc.com";

function walk(directory, files = []) {
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && entry.name === "index.html") {
      files.push(fullPath);
    }
  }

  return files;
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function findBlogPosting(value) {
  if (!value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findBlogPosting(item);
      if (result) return result;
    }
    return null;
  }

  const type = value["@type"];
  const types = Array.isArray(type) ? type : [type];
  if (types.includes("BlogPosting")) return value;

  for (const child of Object.values(value)) {
    const result = findBlogPosting(child);
    if (result) return result;
  }

  return null;
}

function metaContent(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i")
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeEntities(match[1]);
  }

  return "";
}

function extractPost(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const scriptPattern = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    const raw = decodeEntities(match[1]).trim();
    try {
      const parsed = JSON.parse(raw);
      const post = findBlogPosting(parsed);
      if (post) {
        return {
          title: post.headline,
          description: post.description,
          url: typeof post.url === "string" ? post.url : post.mainEntityOfPage,
          date: post.dateModified || post.datePublished,
          published: post.datePublished,
          keywords: Array.isArray(post.keywords) ? post.keywords : []
        };
      }
    } catch {
      // Some legacy pages may not expose parseable JSON-LD. Fall through to meta tags.
    }
  }

  const title = metaContent(html, "og:title");
  const description = metaContent(html, "og:description") || metaContent(html, "description");
  const url = metaContent(html, "og:url");
  const date = metaContent(html, "article:modified_time") || metaContent(html, "article:published_time");

  if (!title || !url || !date) return null;
  return { title, description, url, date, published: date, keywords: [] };
}

function toRssDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toUTCString();
  return date.toUTCString();
}

const posts = walk(BLOG_DIR)
  .filter((filePath) => path.dirname(filePath) !== BLOG_DIR)
  .map(extractPost)
  .filter(Boolean)
  .filter((post) => post.url && post.title && post.date)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const lastBuildDate = posts.length ? toRssDate(posts[0].date) : new Date().toUTCString();

const items = posts.map((post) => {
  const categories = post.keywords.map((keyword) => `      <category>${escapeXml(keyword)}</category>`).join("\n");
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <pubDate>${toRssDate(post.published || post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
${categories ? `${categories}\n` : ""}    </item>`;
}).join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Patrick Araujo Engineering Blog</title>
    <link>${SITE}/blog/</link>
    <description>Backend engineering, AI systems, automation, API integrations, cloud architecture, security, and software delivery notes by Patrick Araujo.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

fs.writeFileSync(path.join(ROOT, "feed.xml"), feed, "utf8");
console.log(`Generated feed.xml with ${posts.length} posts.`);
