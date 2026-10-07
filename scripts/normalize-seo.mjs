import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ORIGIN = "https://pklavc.com";
const PERSON_ID = `${ORIGIN}/#person`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const PROFILE_URL = `${ORIGIN}/about/`;
const DEFAULT_IMAGE = `${ORIGIN}/images/og/og-default.png`;
const JSON_LD = /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi;
const PRIVATE_PATH = /^\/(?:search|status|visitors|(?:pt|es)\/(?:search|busca|buscar|pesquisa|status|estado|visitantes))\/$/;
const PAGE_TYPES = new Set(["WebPage", "AboutPage", "ProfilePage", "CollectionPage"]);
const SKIP_DIRECTORIES = new Set([".git", ".agents", ".codex", ".pages-dist", "node_modules", "src", "scripts", "_temp"]);

function decode(value) {
  return String(value ?? "").replace(/&(?:amp|quot|apos|lt|gt|#39|#x[\da-f]+|#\d+);/gi, (entity) => {
    const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">" };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    const number = entity.toLowerCase().startsWith("&#x") ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10);
    return number <= 0x10ffff ? String.fromCodePoint(number) : entity;
  });
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    result[match[1].toLowerCase()] = decode(match[2] ?? match[3]);
  }
  return result;
}

function getMeta(html, key) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if ((attrs.name || attrs.property || "").toLowerCase() === key) return attrs.content || "";
  }
  return "";
}

function setMeta(head, key, content, attribute = "name") {
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}">`;
  let found = false;
  const result = head.replace(/<meta\b[^>]*>/gi, (original) => {
    const attrs = attributes(original);
    if ((attrs.name || attrs.property || "").toLowerCase() !== key) return original;
    if (found) return "";
    found = true;
    return tag;
  });
  return found ? result : `${result}\n    ${tag}`;
}

function canonicalUrl(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    if (attrs.rel === "canonical") return attrs.href || "";
  }
  return "";
}

function pageLanguage(url, html) {
  const lang = attributes(html.match(/<html\b[^>]*>/i)?.[0] || "").lang;
  return lang === "pt" ? "pt-BR" : lang || (url.includes("/pt/") ? "pt-BR" : url.includes("/es/") ? "es" : "en");
}

function ownPerson(value = {}) {
  const person = {
    ...value,
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Patrick Araujo",
    alternateName: "PkLavc",
    url: PROFILE_URL,
    jobTitle: "Backend Software Engineer",
    sameAs: ["https://github.com/PkLavc", "https://www.linkedin.com/in/pklavc/"],
  };
  // Email is contact information, not another identity page. areaServed is not a Person property.
  if (person.email) person.email = "contact@pklavc.com";
  delete person.areaServed;
  if (Array.isArray(person.worksFor)) person.worksFor = person.worksFor.filter((organization) => organization.name !== "Freelance and Contract Clients");
  return person;
}

function personReference() {
  return { "@type": "Person", "@id": PERSON_ID, name: "Patrick Araujo", url: PROFILE_URL };
}

function isOwnPerson(value) {
  return value?.["@type"] === "Person" && /^(?:Patrick Ara[uú]jo|PkLavc)$/i.test(value.name || "");
}

function normalizeIdentity(value) {
  if (Array.isArray(value)) return value.map(normalizeIdentity);
  if (typeof value === "string") return decode(value);
  if (!value || typeof value !== "object") return value;
  const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeIdentity(item)]));
  if (typeof result["@id"] === "string" && /^https:\/\/pklavc\.com\/.*#(?:person|patrick-araujo)\/?$/.test(result["@id"])) result["@id"] = PERSON_ID;
  if (isOwnPerson(result)) {
    // Rich profiles keep their existing, page-supported credentials and experience.
    return Object.keys(result).some((key) => ["sameAs", "jobTitle", "hasCredential", "knowsAbout"].includes(key)) ? ownPerson(result) : personReference();
  }
  if (["Article", "BlogPosting"].includes(result["@type"]) && result.url?.startsWith(`${ORIGIN}/`)) {
    const url = result.url;
    result["@id"] = `${url}#article`;
    result.inLanguage = url.includes("/pt/") ? "pt-BR" : url.includes("/es/") ? "es" : "en";
    result.author ||= personReference();
    result.publisher ||= personReference();
    result.mainEntityOfPage = { "@id": `${url}#webpage` };
  }
  return result;
}

function repoUrl(value) {
  try {
    const url = new URL(value);
    if (url.hostname !== "github.com") return "";
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repo || ["sponsors", "topics", "orgs", "features", "settings", "marketplace", "login"].includes(owner.toLowerCase())) return "";
    return `https://github.com/${owner}/${repo.replace(/\.git$/, "")}`;
  } catch { return ""; }
}

function repositoryFromPage(html) {
  const body = (html.split(/<body\b[^>]*>/i)[1] || "").replace(JSON_LD, "");
  const candidates = [];
  for (const match of body.matchAll(/<a\b[^>]*>/gi)) {
    const candidate = repoUrl(attributes(match[0]).href);
    if (candidate) candidates.push(candidate);
  }
  // Links in the page provide evidence; never infer a repository from a sponsor/profile link.
  return candidates[0] || "";
}

function sourceLanguages(html, existing = []) {
  const evidence = [];
  for (const match of html.matchAll(/<(?:div|span)\b[^>]*class=["'][^"']*\btech-tag\b[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|span)>/gi)) evidence.push(match[1]);
  for (const match of html.matchAll(/<li>\s*<strong>\s*(?:Stack|Language|Lenguaje|Linguagem|Languages)\s*:?\s*<\/strong>([\s\S]*?)<\/li>/gi)) evidence.push(match[1]);
  // Only explicit stack labels or an existing curated language value are evidence.
  const text = decode((evidence.length ? evidence : [existing].flat()).join(" ").replace(/<[^>]+>/g, " "));
  return [
    [/\bPython\b/i, "Python"], [/\bTypeScript\b/i, "TypeScript"], [/\bJavaScript\b/i, "JavaScript"],
    [/\bSQL\b/i, "SQL"], [/\bC\+\+(?:\d+)?\b|\bC\+\+(?=\s|$|,)/i, "C++"],
    [/\bC#(?=\s|$|,)/i, "C#"], [/\bJava\b/i, "Java"], [/\bPHP\b/i, "PHP"],
    [/\bDeluge\b/i, "Deluge"], [/\bRust\b/i, "Rust"], [/\bGo\b/, "Go"],
  ].filter(([pattern]) => pattern.test(text)).map(([, label]) => label);
}

function imageDimensions(directory, imageUrl) {
  try {
    const url = new URL(imageUrl);
    if (url.origin !== ORIGIN) return null;
    const file = path.resolve(directory, `.${decodeURIComponent(url.pathname)}`);
    if (!file.startsWith(`${path.resolve(directory)}${path.sep}`)) return null;
    const data = fs.readFileSync(file);
    if (data.subarray(1, 4).toString() === "PNG") return [data.readUInt32BE(16), data.readUInt32BE(20)];
    if (data.toString("ascii", 8, 12) === "WEBP" && data.toString("ascii", 12, 16) === "VP8X") return [1 + data.readUIntLE(24, 3), 1 + data.readUIntLE(27, 3)];
  } catch { /* Leave unknown image dimensions unspecified instead of guessing. */ }
  return null;
}

export function removeDuplicateHiddenCopy(html) {
  // Only the standalone keyword copy appended after the footer/runtime scripts is removed.
  // Heading labels, carousel descriptions and hidden interactive panels stay intact.
  return html.replace(/(<\/(?:script|footer)>\s*)<div\s+class=["']visually-hidden["']>\s*<p>[^<]*<\/p>\s*<\/div>(?=\s*<\/body>)/gi, "$1");
}

function removeSelfRefresh(html, url) {
  return html.replace(/<noscript>\s*(<meta\b[^>]*>)\s*<\/noscript>/gi, (original, meta) => {
    const attrs = attributes(meta);
    const target = attrs.content?.match(/^\s*\d+(?:\.\d+)?\s*;\s*url\s*=\s*(.+)$/i)?.[1];
    return attrs["http-equiv"]?.toLowerCase() === "refresh" && target === url ? "" : original;
  });
}

export function normalizeSeoHtml(original, { directory = process.cwd(), filename = "index.html" } = {}) {
  const url = canonicalUrl(original);
  if (!url.startsWith(`${ORIGIN}/`) || !original.includes("</head>")) return original;
  const language = pageLanguage(url, original);
  const pathname = new URL(url).pathname;
  let html = removeSelfRefresh(removeDuplicateHiddenCopy(original), url);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "Patrick Araujo");
  const description = getMeta(html, "description");
  const robots = getMeta(html, "robots");
  const noindex = PRIVATE_PATH.test(pathname) || /\bnoindex\b/i.test(robots);
  const imageUrl = getMeta(html, "og:image") || DEFAULT_IMAGE;
  html = html.replace(/(<head\b[^>]*>)([\s\S]*?)(<\/head>)/i, (_, start, head, end) => {
    const directives = PRIVATE_PATH.test(pathname) ? "noindex, follow" : noindex ? robots : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    head = setMeta(head, "robots", directives);
    head = setMeta(head, "author", "Patrick Araujo");
    head = setMeta(head, "og:url", url, "property");
    head = setMeta(head, "og:site_name", "Patrick Araujo", "property");
    head = setMeta(head, "og:locale", language === "pt-BR" ? "pt_BR" : language === "es" ? "es_ES" : "en_US", "property");
    head = setMeta(head, "og:image", imageUrl, "property");
    head = setMeta(head, "twitter:image", getMeta(head, "twitter:image") || imageUrl);
    head = setMeta(head, "og:image:alt", getMeta(head, "og:image:alt") || "Patrick Araujo — PkLavc", "property");
    head = setMeta(head, "twitter:image:alt", getMeta(head, "twitter:image:alt") || getMeta(head, "og:image:alt"));
    head = setMeta(head, "twitter:card", getMeta(head, "twitter:card") || "summary_large_image");
    const dimensions = imageDimensions(directory, imageUrl);
    if (dimensions) {
      head = setMeta(head, "og:image:width", dimensions[0], "property");
      head = setMeta(head, "og:image:height", dimensions[1], "property");
    }
    if (/^\/(?:pt\/|es\/)?blog\/[^/]+\/$/.test(pathname)) head = setMeta(head, "article:author", PROFILE_URL, "property");
    return `${start}${head}${end}`;
  });

  // Preserve intentional noindex demos/utility pages without adding rich-result candidates.
  if (noindex) return html;

  const nodes = [];
  const placeholders = [];
  html = html.replace(JSON_LD, (script, json) => {
    let parsed;
    try { parsed = JSON.parse(json); }
    catch (error) { throw new Error(`Invalid JSON-LD in ${filename}: ${error.message}`); }
    const roots = Array.isArray(parsed) ? parsed : parsed["@graph"] || [parsed];
    nodes.push(...roots.map((node) => ({ node, generated: /data-schema=["']software-source-code["']/i.test(script) })));
    const placeholder = `<!-- pklavc-json-ld-${placeholders.length} -->`;
    placeholders.push(placeholder);
    return placeholder;
  });

  const repository = repositoryFromPage(original);
  const graph = [];
  const ids = new Set();
  let page;
  for (const entry of nodes) {
    let node = normalizeIdentity(entry.node);
    delete node["@context"];
    const types = [node["@type"]].flat();
    if (types.includes("SoftwareSourceCode")) {
      if (entry.generated && (!repository || nodes.some((other) => other.node["@type"] === "CollectionPage"))) continue;
      node["@id"] = `${url}#source-code`;
      node.inLanguage = language;
      node.mainEntityOfPage = { "@id": `${url}#webpage` };
      const languages = sourceLanguages(original, entry.generated ? [] : node.programmingLanguage || []);
      if (languages.length) node.programmingLanguage = languages;
      else delete node.programmingLanguage;
      if (repository) node.codeRepository = repository;
      else delete node.codeRepository;
    }
    if (types.includes("WebSite")) node = { "@type": "WebSite", "@id": WEBSITE_ID, url: `${ORIGIN}/`, name: "Patrick Araujo", alternateName: "PkLavc", publisher: { "@id": PERSON_ID }, inLanguage: ["en", "pt-BR", "es"] };
    if (types.some((type) => PAGE_TYPES.has(type))) {
      node["@id"] = `${url}#webpage`;
      node.url = url;
      node.inLanguage = language;
      node.isPartOf = { "@id": WEBSITE_ID };
      if (types.includes("AboutPage")) node["@type"] = ["AboutPage", "ProfilePage"];
      if (types.includes("ProfilePage") || types.includes("AboutPage")) node.mainEntity = isOwnPerson(node.mainEntity) ? node.mainEntity : { "@id": PERSON_ID };
      page = node;
    }
    if (types.includes("Blog")) {
      node["@id"] = `${url}#blog`;
      node.inLanguage = language;
      node.isPartOf = { "@id": WEBSITE_ID };
    }
    if (types.includes("BreadcrumbList")) node["@id"] = `${url}#breadcrumb`;
    if (node["@id"] && ids.has(node["@id"])) continue;
    if (node["@id"]) ids.add(node["@id"]);
    graph.push(node);
  }

  if (!ids.has(WEBSITE_ID)) graph.push({ "@type": "WebSite", "@id": WEBSITE_ID, url: `${ORIGIN}/`, name: "Patrick Araujo", alternateName: "PkLavc", publisher: { "@id": PERSON_ID }, inLanguage: ["en", "pt-BR", "es"] });
  if (!graph.some((node) => isOwnPerson(node))) graph.push(ownPerson());
  if (!page) {
    page = { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: language, author: personReference(), isPartOf: { "@id": WEBSITE_ID } };
    graph.push(page);
  }
  const main = graph.find((node) => ["BlogPosting", "Article", "SoftwareApplication", "SoftwareSourceCode", "Blog"].includes(node["@type"]));
  if (main && !page.mainEntity) {
    main["@id"] ||= `${url}#software`;
    page.mainEntity = { "@id": main["@id"] };
  }
  if (ids.has(`${url}#breadcrumb`)) page.breadcrumb = { "@id": `${url}#breadcrumb` };
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
  const script = `<script type="application/ld+json" data-seo="normalized">${json}</script>`;
  if (placeholders.length) {
    html = html.replace(placeholders[0], script);
    for (const placeholder of placeholders.slice(1)) html = html.replace(placeholder, "");
  } else html = html.replace("</head>", `    ${script}\n</head>`);
  return html;
}

export function normalizeSeoDirectory(directory) {
  const root = path.resolve(directory);
  let pages = 0;
  let updated = 0;
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const file = path.join(current, entry.name);
      if (entry.isDirectory() && !SKIP_DIRECTORIES.has(entry.name)) walk(file);
      else if (entry.isFile() && entry.name.endsWith(".html")) {
        pages += 1;
        const original = fs.readFileSync(file, "utf8");
        const normalized = normalizeSeoHtml(original, { directory: root, filename: path.relative(root, file) });
        if (normalized !== original) { fs.writeFileSync(file, normalized); updated += 1; }
      }
    }
  }
  walk(root);
  return { pages, updated };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const directory = path.resolve(process.argv[2] || ".pages-dist");
  console.log(`SEO normalization: ${JSON.stringify(normalizeSeoDirectory(directory))}`);
}
