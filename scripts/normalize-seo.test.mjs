import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { normalizeSeoHtml, removeDuplicateHiddenCopy } from "./normalize-seo.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PERSON = "https://pklavc.com/#person";
const JSON_LD = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
function read(file) { return fs.readFileSync(path.join(ROOT, file), "utf8"); }
function normalize(html) { return normalizeSeoHtml(html, { directory: ROOT }); }
function graph(html) { return [...html.matchAll(JSON_LD)].flatMap((match) => { const node = JSON.parse(match[1]); return node["@graph"] || [node]; }); }
function byType(html, type) { return graph(html).filter((node) => [node["@type"]].flat().includes(type)); }

test("profile pages resolve to the same Patrick identity", () => {
  for (const file of ["index.html", "about/index.html", "pt/sobre/index.html", "es/sobre/index.html", "resume/index.html"]) {
    const html = normalize(read(file));
    const profile = byType(html, "ProfilePage")[0];
    assert.equal(profile.mainEntity["@id"], PERSON, file);
    const person = byType(html, "Person")[0];
    assert.equal(person["@id"], PERSON);
    assert.deepEqual(person.sameAs, ["https://github.com/PkLavc", "https://www.linkedin.com/in/pklavc/"]);
  }
});

test("the main repository exposes only the three institutional blog pages, not the private blog application", () => {
  for (const relative of ["scripts/blog_automation", "js/blog-related-posts.js", "css/blog.css"]) {
    assert.equal(fs.existsSync(path.join(ROOT, relative)), false, `${relative} must remain absent`);
  }
  for (const relative of ["blog/index.html", "pt/blog/index.html", "es/blog/index.html"]) {
    assert.equal(fs.existsSync(path.join(ROOT, relative)), true, `${relative} must exist`);
  }
  for (const relative of ["blog/feed.xml", "blog/sitemap.xml", "blog/posts.json", "blog/old-article/index.html", "pt/blog/old-article/index.html", "es/blog/old-article/index.html"]) {
    assert.equal(fs.existsSync(path.join(ROOT, relative)), false, `${relative} must remain absent`);
  }
});

test("institutional blog pages have reciprocal language metadata, real links, and indexable canonicals", () => {
  const routes = ["/blog/", "/pt/blog/", "/es/blog/"];
  const files = ["blog/index.html", "pt/blog/index.html", "es/blog/index.html"];
  for (let index = 0; index < files.length; index += 1) {
    const html = normalize(read(files[index]));
    assert.ok(html.includes(`<link rel="canonical" href="https://pklavc.com${routes[index]}">`));
    assert.match(html, /name="robots" content="index, follow(?:,|"|s)/);
    for (const route of routes) assert.ok(html.includes(`https://pklavc.com${route}`), `${files[index]} missing alternate ${route}`);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:card"/);
    assert.match(html, /application\/ld\+json/);
    const usefulLinks = index === 0
      ? ["/projects/", "/editorial-policy/", "/privacy-policy/"]
      : index === 1
        ? ["/pt/projetos/", "/pt/politica-editorial/", "/pt/politica-de-privacidade/"]
        : ["/es/proyectos/", "/es/politica-editorial/", "/es/politica-de-privacidad/"];
    for (const href of [...usefulLinks, "mailto:contact@pklavc.com", "https://github.com/PkLavc"]) {
      assert.ok(html.includes(href), `${files[index]} missing useful link ${href}`);
    }
  }
});

test("root sitemap lists only the three public institutional blog routes", () => {
  const xml = read("sitemap.xml");
  const blogUrls = [...xml.matchAll(/<loc>(https:\/\/pklavc\.com\/(?:pt\/|es\/)?blog\/)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(blogUrls.sort(), [
    "https://pklavc.com/blog/",
    "https://pklavc.com/es/blog/",
    "https://pklavc.com/pt/blog/"
  ]);
  assert.doesNotMatch(xml, /https:\/\/pklavc\.com\/(?:pt\/|es\/)?blog\/[a-z0-9-]+\//i);
  assert.doesNotMatch(read("sitemap-index.xml"), /blog\/sitemap\.xml/);
});

test("repository and language markup uses project evidence and preserves coauthors", () => {
  const cpp = byType(normalize(read("projects/os-resource-optimizer/index.html")), "SoftwareSourceCode");
  assert.equal(cpp.length, 1);
  assert.equal(cpp[0].codeRepository, "https://github.com/PkLavc/os-resource-optimizer");
  assert.deepEqual(cpp[0].programmingLanguage, ["C++"]);
  const equiptrack = normalize(read("projects/equiptrack/index.html"));
  assert.equal(byType(equiptrack, "SoftwareSourceCode").length, 0, "A sponsor URL is not a repository");
  assert.deepEqual(byType(equiptrack, "SoftwareApplication")[0].author.map((author) => author.name), ["Arthur Perico", "Patrick Araujo"]);
  assert.equal(byType(normalize(read("projects/ai-engineer/index.html")), "SoftwareSourceCode").length, 0, "A role collection is not source code");
  assert.equal(byType(normalize(read("projects/raw-api-ingestion-pipeline/index.html")), "SoftwareSourceCode").length, 1, "Merge duplicate project nodes");
});

test("preview dimensions match the existing image and intentional noindex survives", () => {
  assert.match(normalize(read("about/index.html")), /property="og:image:width" content="1024"/);
  assert.match(normalize(read("about/index.html")), /max-image-preview:large/);
  for (const file of ["search/index.html", "status/index.html", "visitors/index.html", "pt/visitantes/index.html", "es/visitantes/index.html", "projects/skylet-assistant/demo/index.html"]) {
    assert.match(normalize(read(file)), /name="robots" content="noindex, follow"/, file);
  }
});

test("self-refresh removal preserves CSS fallbacks and real redirects", () => {
  const fixture = '<html lang="en"><head><link rel="canonical" href="https://pklavc.com/"><noscript><meta http-equiv="refresh" content="0;url=https://pklavc.com/"></noscript><noscript><link rel="stylesheet" href="/css/global.css"></noscript><noscript><meta http-equiv="refresh" content="0;url=https://pklavc.com/about/"></noscript></head><body></body></html>';
  const output = normalize(fixture);
  assert.ok(!output.includes('content="0;url=https://pklavc.com/"'));
  assert.ok(output.includes('<noscript><link rel="stylesheet" href="/css/global.css"></noscript>'));
  assert.ok(output.includes('content="0;url=https://pklavc.com/about/"'));
});

test("hidden cleanup preserves accessibility content inside the document", () => {
  const label = '<h2 class="visually-hidden">Technology stack</h2><p class="visually-hidden">Python and SQL</p>';
  const footer = '<footer>Patrick Araujo</footer>';
  const appended = '<div class="visually-hidden"><p>Backend software engineer, Python, SQL.</p></div>';
  assert.equal(removeDuplicateHiddenCopy(`<body>${label}${footer}${appended}</body>`), `<body>${label}${footer}</body>`);
  assert.equal(removeDuplicateHiddenCopy(`<body>${appended}</body>`), `<body>${appended}</body>`);
});

test("all source pages retain visible markup, runtime scripts and styles; normalization is idempotent", () => {
  const skip = new Set([".git", ".pages-dist", ".agents", ".codex", "node_modules", "src", "scripts", "_temp"]);
  function walk(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const file = path.join(directory, entry.name);
      return skip.has(entry.name) ? [] : entry.isDirectory() ? walk(file) : entry.name.endsWith(".html") ? [file] : [];
    });
  }
  const body = (html) => removeDuplicateHiddenCopy(html).split(/<body\b[^>]*>/i)[1]?.replace(JSON_LD, "").replace(/\s+/g, " ").trim();
  const scripts = (html) => html.match(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi) || [];
  const styles = (html) => html.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || [];
  const pages = walk(ROOT);
  assert.ok(pages.length > 130);
  for (const file of pages) {
    const input = fs.readFileSync(file, "utf8");
    const output = normalize(input);
    assert.equal(normalize(output), output, `Idempotence: ${file}`);
    assert.equal(body(output), body(input), `Visible body: ${file}`);
    assert.deepEqual(scripts(output), scripts(input), `Runtime scripts: ${file}`);
    assert.deepEqual(styles(output), styles(input), `Styles: ${file}`);
    graph(output);
  }
});
