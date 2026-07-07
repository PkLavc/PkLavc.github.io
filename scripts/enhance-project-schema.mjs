import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PROJECT_DIRS = [
  "projects",
  "pt/projetos",
  "es/proyectos"
];

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function decode(value) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

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

function attrContent(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decode(match[1]);
  }
  return "";
}

function canonical(html, fallback) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
  return match ? decode(match[1]) : fallback;
}

function title(html) {
  const meta = attrContent(html, "og:title");
  if (meta) return meta;
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? decode(match[1].replace(/\s+/g, " ").trim()) : "Project";
}

function githubRepo(html) {
  const match = html.match(/https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/i);
  return match ? match[0] : "";
}

function languages(html) {
  const text = html.toLowerCase();
  const known = [
    ["python", "Python"],
    ["typescript", "TypeScript"],
    ["javascript", "JavaScript"],
    ["node.js", "Node.js"],
    ["fastapi", "FastAPI"],
    ["sql", "SQL"],
    ["postgres", "PostgreSQL"],
    ["c++", "C++"],
    ["react", "React"]
  ];
  return known.filter(([needle]) => text.includes(needle)).map(([, label]) => label).slice(0, 6);
}

let updated = 0;

for (const dir of PROJECT_DIRS) {
  for (const filePath of walk(path.join(ROOT, dir))) {
    const relative = path.relative(path.join(ROOT, dir), filePath);
    if (relative === "index.html") continue;

    let html = fs.readFileSync(filePath, "utf8");
    if (html.includes('data-schema="software-source-code"')) continue;

    const url = canonical(html, "");
    const name = title(html);
    const description = attrContent(html, "description") || attrContent(html, "og:description");
    const repo = githubRepo(html);
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name,
      description,
      url,
      author: {
        "@type": "Person",
        name: "Patrick Araujo",
        url: "https://pklavc.com/about/"
      },
      creator: {
        "@type": "Person",
        name: "Patrick Araujo"
      },
      programmingLanguage: languages(html)
    };

    if (repo) {
      schema.codeRepository = repo;
    }

    const script = `\n    <script type="application/ld+json" data-schema="software-source-code">${escapeHtml(JSON.stringify(schema))}</script>`;
    html = html.replace(/(\s*<\/head>)/i, `${script}$1`);
    fs.writeFileSync(filePath, html, "utf8");
    updated += 1;
  }
}

console.log(`Enhanced ${updated} project pages with SoftwareSourceCode schema.`);
