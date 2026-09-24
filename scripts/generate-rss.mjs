import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== "--root" || !args[1])) {
  throw new Error("Usage: node scripts/generate-rss.mjs [--root .pages-dist]");
}
const ROOT = path.resolve(process.cwd(), args[1] || ".");
const BLOG_DIR = path.join(ROOT, "blog");
const SITE = "https://pklavc.com";

function walk(directory, files = []) {
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (/^[._]/.test(entry.name) || entry.name === "node_modules") continue;
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
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if ((attrs.property || attrs.name || "").toLowerCase() === selector.toLowerCase()) return attrs.content || "";
  }
  return "";
}

function parseAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4]);
  }
  return attrs;
}

function validDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(value) && Number.isFinite(Date.parse(value));
}

function extractPost(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const head = (html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || html)
    .replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((match) => parseAttributes(match[0]));
  if (metas.some((attrs) => /^refresh$/i.test(attrs["http-equiv"] || "") ||
    (/^(robots|googlebot|bingbot)$/i.test(attrs.name || "") && /(?:^|[\s,])(noindex|none)(?:$|[\s,])/i.test(attrs.content || "")))) return null;

  const relative = path.relative(ROOT, filePath).split(path.sep).join("/");
  const expectedUrl = `${SITE}/${relative.replace(/index\.html$/, "")}`;
  const canonical = [...head.matchAll(/<link\b[^>]*>/gi)].map((match) => parseAttributes(match[0]))
    .find((attrs) => (attrs.rel || "").toLowerCase().split(/\s+/).includes("canonical"));
  let url;
  try {
    url = new URL(canonical?.href || expectedUrl, expectedUrl).href;
  } catch {
    return null;
  }
  if (url !== expectedUrl) return null;
  const scriptPattern = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    try {
      // Script contents are raw JSON; HTML entity decoding corrupts quoted text.
      const parsed = JSON.parse(match[1].trim());
      const post = findBlogPosting(parsed);
      if (post) {
        const articleTags = metas.filter((attrs) => (attrs.property || "").toLowerCase() === "article:tag").map((attrs) => attrs.content).filter(Boolean);
        const section = metaContent(html, "article:section") || (typeof post.articleSection === "string" ? post.articleSection : "");
        const keywordList = Array.isArray(post.keywords) ? post.keywords : [];
        const fallbackTags = keywordList.flatMap((keyword) => String(keyword).split(",")).map((tag) => tag.trim()).filter(Boolean);
        return {
          title: post.headline,
          description: post.description,
          url,
          date: post.dateModified || post.datePublished,
          published: post.datePublished,
          keywords: keywordList,
          category: section || keywordList[0] || "Engineering",
          tags: [...new Set(articleTags.length ? articleTags : fallbackTags)].filter((tag) => tag !== section && tag !== keywordList[0])
        };
      }
    } catch {
      // Some legacy pages may not expose parseable JSON-LD. Fall through to meta tags.
    }
  }

  const title = metaContent(html, "og:title");
  const description = metaContent(html, "og:description") || metaContent(html, "description");
  const date = metaContent(html, "article:modified_time") || metaContent(html, "article:published_time");
  const published = metaContent(html, "article:published_time") || date;

  if (!title || !url || !date) return null;
  return { title, description, url, date, published, keywords: [], category: metaContent(html, "article:section") || "Engineering", tags: [...new Set(metas.filter((attrs) => (attrs.property || "").toLowerCase() === "article:tag").map((attrs) => attrs.content).filter(Boolean))] };
}

function toRssDate(value) {
  return new Date(value).toUTCString();
}

const seen = new Set();
const posts = walk(BLOG_DIR)
  .filter((filePath) => path.dirname(filePath) !== BLOG_DIR)
  .map(extractPost)
  .filter(Boolean)
  .filter((post) => post.url && post.title && validDate(post.date) && validDate(post.published))
  .filter((post) => {
    if (seen.has(post.url)) throw new Error(`Duplicate RSS URL: ${post.url}`);
    seen.add(post.url);
    return true;
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const lastBuildDate = posts.length ? toRssDate(posts[0].date) : "";

const items = posts.map((post) => {
  const categories = post.keywords.map((keyword) => `      <category>${escapeXml(keyword)}</category>`).join("\n");
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <dc:creator>Patrick Araujo</dc:creator>
      <pubDate>${toRssDate(post.published || post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
${categories ? `${categories}\n` : ""}    </item>`;
}).join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Patrick Araujo Engineering Blog</title>
    <link>${SITE}/blog/</link>
    <description>Backend engineering, AI systems, automation, API integrations, cloud architecture, security, and software delivery notes by Patrick Araujo.</description>
    <language>en</language>${lastBuildDate ? `\n    <lastBuildDate>${lastBuildDate}</lastBuildDate>` : ""}
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>\n`;

fs.writeFileSync(path.join(ROOT, "feed.xml"), feed, "utf8");
const indexPosts = [...new Map(posts.map((post) => [post.url, {
  title: post.title,
  url: new URL(post.url).pathname,
  date: String(post.published || post.date).slice(0, 10),
  category: post.category || "Engineering",
  tags: post.tags || [],
  description: post.description || ""
}])).values()].sort((a, b) => b.date.localeCompare(a.date) || a.url.localeCompare(b.url));
fs.writeFileSync(path.join(BLOG_DIR, "posts.json"), `${JSON.stringify(indexPosts, null, 2)}\n`, "utf8");
console.log(`Generated feed.xml with ${posts.length} posts.`);
console.log(`Generated blog/posts.json with ${indexPosts.length} unique posts.`);
