import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE = "https://pklavc.com";
const TODAY = "2026-07-07";
const HUMAN_DATE = "July 7, 2026";

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(relativePath, content) {
  const target = path.join(ROOT, relativePath);
  ensureDir(target);
  fs.writeFileSync(target, content.trimStart() + "\n", "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function head({ title, description, canonical, robots = "index, follow" }) {
  const absolute = canonical.startsWith("http") ? canonical : `${SITE}${canonical}`;
  return `    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Patrick Araujo">
        <meta name="description" content="${escapeHtml(description)}">
        <meta name="robots" content="${robots}">
        <meta property="og:title" content="${escapeHtml(title)}">
        <meta property="og:description" content="${escapeHtml(description)}">
        <meta property="og:url" content="${absolute}">
        <meta property="og:type" content="website">
        <meta property="og:image" content="${SITE}/images/og-default.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:site_name" content="Patrick Araujo">
        <meta property="og:locale" content="en_US">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${escapeHtml(title)}">
        <meta name="twitter:description" content="${escapeHtml(description)}">
        <meta name="twitter:image" content="${SITE}/images/og-default.png">
        <meta name="twitter:site" content="@PkLavc">
        <meta name="twitter:creator" content="@PkLavc">
        <meta name="theme-color" content="#101114">
        <title>${escapeHtml(title)}</title>
        <link rel="canonical" href="${absolute}">
        <link rel="alternate" type="application/rss+xml" title="Patrick Araujo Engineering Blog RSS" href="/feed.xml">
        <link rel="manifest" href="/manifest.webmanifest">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="msapplication-config" content="/browserconfig.xml">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;700&family=Raleway:wght@300;600&display=optional" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;700&family=Raleway:wght@300;600&display=optional"></noscript>
        <link rel="preload" href="/css/global.css" as="style">
        <link rel="preload" href="/css/site-pages.css" as="style">
        <link rel="stylesheet" href="/css/global.css">
        <link rel="stylesheet" href="/css/site-pages.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js" defer></script>
    </head>`;
}

function navigation() {
  return `        <div id="breaker"></div>
        <div id="breaker-two"></div>
        <div id="all">
            <div class="cursor"></div>
            <div id="navigation-content" role="navigation" aria-label="Primary navigation">
                <div class="logo"></div>
                <div class="navigation-links">
                    <a href="/" data-text="HOME" id="home-link">HOME</a>
                    <a href="/about/" data-text="ABOUT" id="about-link">ABOUT</a>
                    <a href="/projects/" data-text="PROJECTS" id="projects-link">PROJECTS</a>
                    <a href="/blog/" data-text="BLOG" id="blog-link">BLOG</a>
                </div>
            </div>
            <div id="navigation-bar">
                <div class="menubar" role="button" tabindex="0" aria-label="Open navigation">
                    <span class="first-span"></span>
                    <span class="second-span"></span>
                    <span class="third-span"></span>
                </div>
            </div>`;
}

function footer() {
  return `        </div>
        <footer class="footer-minimal">
            <div class="footer-container">
                <div class="footer-link-list" aria-label="Footer links">
                    <a class="footer-link-pill" href="https://github.com/PkLavc" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a class="footer-link-pill" href="https://www.linkedin.com/in/pklavc/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a class="footer-link-pill" href="mailto:contact@pklavc.com">Email</a>
                    <a class="footer-link-pill footer-link-pill-accent" href="https://github.com/sponsors/PkLavc" target="_blank" rel="noopener noreferrer">Sponsor me</a>
                </div>
                <p class="footer-meta"><span class="footer-copyright-line">&copy; <span data-current-year></span> Patrick Araujo</span> <span class="footer-meta-separator">&bull;</span><span class="footer-legal-inline" aria-label="Legal links"><a class="footer-legal-link" href="/privacy-policy/">Privacy Policy</a><span aria-hidden="true">/</span><a class="footer-legal-link" href="/terms-of-use/">Terms of Use</a><span aria-hidden="true">/</span><a class="footer-legal-link" href="/editorial-policy/">Editorial Policy</a></span></p>
            </div>
        </footer>
        <script>
            (function() {
                document.querySelectorAll('[data-current-year]').forEach(function(node) {
                    node.textContent = String(new Date().getFullYear());
                });
            }());
        </script>
        <script src="/js/i18n.js" defer></script>
        <script src="/js/jquery.min.js" defer></script>
        <script src="/js/index.js" defer></script>`;
}

function page({ title, description, canonical, kicker, lead, body, actions = "", extra = "", robots }) {
  return `<!DOCTYPE html>
<html lang="en">
${head({ title, description, canonical, robots })}
    <body class="seo-layout site-page-layout">
${navigation()}
            <main class="site-page-main" role="main">
                <section class="site-page-hero">
                    <span class="site-page-kicker">${escapeHtml(kicker)}</span>
                    <h1 class="site-page-title">${escapeHtml(title)}</h1>
                    <p class="site-page-lead">${lead}</p>
                    ${actions}
                </section>
                ${body}
            </main>
${footer()}
${extra}
    </body>
</html>`;
}

function card(title, text, chips = []) {
  const chipHtml = chips.length
    ? `<div class="site-page-chip-row">${chips.map((chip) => `<span class="site-page-chip">${escapeHtml(chip)}</span>`).join("")}</div>`
    : "";
  return `<article class="site-page-card"><h2>${escapeHtml(title)}</h2><p>${text}</p>${chipHtml}</article>`;
}

function changelogEntries() {
  let rows = [];
  try {
    const output = execFileSync("git", ["log", "--date=short", "--pretty=format:%h%x09%ad%x09%s", "-n", "28"], {
      cwd: ROOT,
      encoding: "utf8",
    });
    rows = output.split(/\r?\n/).filter(Boolean).map((line) => {
      const [hash, date, ...messageParts] = line.split("\t");
      const message = messageParts.join("\t");
      return { hash, date, message };
    });
  } catch {
    rows = [];
  }

  if (!rows.length) {
    return [{ hash: "", date: TODAY, message: "Initial public changelog prepared." }];
  }

  return rows;
}

function changelogLabel(message) {
  const lower = message.toLowerCase();
  if (lower.includes("publish")) return `Published blog update: ${message.replace(/^publish\s+/i, "")}.`;
  if (lower.includes("404")) return "Refined the not found experience and localized recovery links.";
  if (lower.includes("footer")) return "Adjusted footer layout, legal links, and mobile social placement.";
  if (lower.includes("politic")) return "Aligned policy page panels and institutional page spacing.";
  if (lower.includes("adsense")) return "Prepared advertising integration points for the blog.";
  if (lower.includes("hash")) return "Updated cache-busting hashes for static assets.";
  if (lower.includes("selene") || lower.includes("world") || lower.includes("visita") || lower.includes("map")) return "Improved visitor map visuals, global reach animation, and mobile behavior.";
  if (lower.includes("carrocel") || lower.includes("carousel")) return "Improved draggable project carousel behavior.";
  if (lower.includes("about")) return "Expanded about-page positioning across AI, backend, and software engineering.";
  if (lower.includes("projects")) return "Expanded project pages, trails, and related project structure.";
  if (lower.includes("resume")) return "Refined resume-oriented content and career positioning.";
  return message.replace(/\.$/, "") + ".";
}

function writeRootFiles() {
  writeFile("manifest.webmanifest", JSON.stringify({
    name: "Patrick Araujo Portfolio",
    short_name: "PkLavc",
    description: "Backend, AI, automation, API integration, and software engineering portfolio by Patrick Araujo.",
    lang: "en",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#101114",
    theme_color: "#00d1ff",
    icons: [
      { src: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
    ],
    categories: ["portfolio", "developer", "business", "technology"]
  }, null, 2));

  writeFile(".well-known/security.txt", `Contact: mailto:security@pklavc.com
Expires: 2027-07-07T00:00:00Z
Preferred-Languages: en, pt-BR
Canonical: https://pklavc.com/.well-known/security.txt`);

  writeFile("humans.txt", `/* TEAM */
Owner: Patrick Araujo
Site: https://pklavc.com/
Contact: mailto:contact@pklavc.com
Security: mailto:security@pklavc.com
Location: Brazil / remote

/* SITE */
Purpose: Portfolio, engineering writing, project documentation, and public demos.
Stack: HTML, CSS, JavaScript, GitHub Pages, Cloudflare edge services, API workers.
Focus: Backend engineering, AI systems, automation, API integrations, data pipelines.
Last updated: ${HUMAN_DATE}`);

  writeFile("browserconfig.xml", `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/icon-192.png"/>
      <TileColor>#101114</TileColor>
    </tile>
  </msapplication>
</browserconfig>`);

  const sourceFavicon = path.join(ROOT, "images", "favicon.svg");
  const targetFavicon = path.join(ROOT, "favicon.svg");
  if (fs.existsSync(sourceFavicon)) {
    fs.copyFileSync(sourceFavicon, targetFavicon);
  }

  writeFile("images/og-default.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#06080f"/>
      <stop offset="0.56" stop-color="#101114"/>
      <stop offset="1" stop-color="#160817"/>
    </linearGradient>
    <radialGradient id="cyan" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#7ff1ff"/>
      <stop offset="0.48" stop-color="#00d1ff"/>
      <stop offset="1" stop-color="#073147"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1020" cy="110" r="240" fill="#00d1ff" opacity="0.1"/>
  <circle cx="140" cy="540" r="260" fill="#ff2aaa" opacity="0.08"/>
  <g transform="translate(88 96)">
    <text x="0" y="0" fill="#00d1ff" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="800" letter-spacing="5">PKLAVC.COM</text>
    <text x="0" y="116" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="78" font-weight="800">Patrick Araujo</text>
    <text x="0" y="192" fill="#dce8ee" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="700">Backend, AI and automation engineering</text>
    <text x="0" y="272" fill="#b7c7cf" font-family="Inter, Arial, sans-serif" font-size="30">APIs, RAG, data pipelines, Workers and production software.</text>
  </g>
  <g transform="translate(956 336)">
    <circle cx="0" cy="0" r="92" fill="url(#cyan)" opacity="0.96"/>
    <path d="M-120 0c50-32 190-32 240 0M-100-48c62 32 138 32 200 0M-100 48c62-32 138-32 200 0" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.72"/>
    <path d="M-88 0h176M0-90c26 50 26 130 0 180M0-90c-26 50-26 130 0 180" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.9"/>
  </g>
</svg>`);
}

function writePages() {
  writeFile("uses/index.html", page({
    title: "Uses",
    description: "Current tools, stack, and working setup behind Patrick Araujo's backend, AI, automation, and software engineering work.",
    canonical: "/uses/",
    kicker: "Working setup",
    lead: "A practical snapshot of the tools I use to build backend systems, AI workflows, automations, API integrations, and public portfolio infrastructure.",
    body: `<section class="site-page-section"><h2>Core Stack</h2><div class="site-page-grid">
${card("Languages", "Python, JavaScript, TypeScript, SQL, HTML, CSS, and C++ for systems-oriented experiments.", ["Python", "TypeScript", "SQL", "C++"])}
${card("Backend", "FastAPI, Node.js, NestJS, Cloudflare Workers, GitHub Actions, Supabase, PostgreSQL, Redis, queues, and scheduled jobs.", ["APIs", "Workers", "Queues"])}
${card("AI Engineering", "RAG pipelines, local model experiments, LangGraph-style orchestration, embeddings, memory, retrieval, evaluations, and tool boundaries.", ["RAG", "Agents", "Eval"])}
</div></section>
<section class="site-page-section"><h2>Daily Workflow</h2><div class="site-page-grid two">
${card("Development", "VS Code, Codex, Git, browser DevTools, local scripts, Playwright checks where useful, and plain static deploys when the site does not need a server.", ["Codex", "Git", "DevTools"])}
${card("Operations", "Cloudflare, GitHub Pages, API health endpoints, cache-busting hashes, RSS, sitemap hygiene, privacy-first visitor telemetry, and simple status checks.", ["Cloudflare", "Pages", "Status"])}
</div></section>`
  }));

  writeFile("now/index.html", page({
    title: "Now",
    description: "A current but durable view of the main engineering work and project areas Patrick Araujo is focused on.",
    canonical: "/now/",
    kicker: "Now page",
    lead: "Inspired by Derek Sivers' now-page idea: a compact view of the projects and technical themes that are active in my work without turning the portfolio into a timeline.",
    body: `<section class="site-page-section"><h2>Main Project Tracks</h2><div class="site-page-grid">
${card("Lavc Systems", "A local multi-agent AI platform built around FastAPI, React, Ollama, LangGraph-style workflows, ChromaDB RAG, memory, task orchestration, and observability.", ["AI Platform", "RAG", "Local-first"])}
${card("Skyler Assistant", "A public portfolio assistant with intent-aware retrieval, cached site context, provider fallback, and careful answer boundaries.", ["Chatbot", "RAG", "API"])}
${card("API Integration Pipeline", "Operational integrations that collect Hablla, Zoho, Zenvia, SIGE, Omie, and related payloads into replayable reporting datasets.", ["ETL", "Supabase", "GitHub Actions"])}
${card("Visitor Map", "Privacy-minded anonymous analytics for showing countries, regions, and aggregate access patterns without exposing personal visitor data.", ["Analytics", "Privacy", "Map"])}
${card("Engineering Blog", "Writing about AI systems, backend architecture, automation, cloud constraints, compliance, and software design tradeoffs.", ["Writing", "Architecture", "RSS"])}
${card("Systems Portfolio", "Supporting projects around SaaS backends, zero-trust proxies, event-driven services, SRE automation, and deployment patterns.", ["Backend", "Security", "SRE"])}
</div></section>
<section class="site-page-section"><h2>Current Direction</h2><p>I am keeping the site focused on work that shows real engineering shape: systems that move data safely, integrate APIs reliably, use AI with boundaries, and remain understandable after deployment.</p></section>`
  }));

  writeFile("resume/index.html", page({
    title: "Resume",
    description: "Resume-style summary for Patrick Araujo, covering backend engineering, AI systems, automation, API integrations, and software architecture.",
    canonical: "/resume/",
    kicker: "Private route",
    lead: "Backend and AI-oriented software engineer focused on automation, API integrations, operational data pipelines, RAG workflows, and production-minded web systems.",
    body: `<section class="site-page-section"><h2>Experience</h2><div class="site-page-grid two">
<article class="site-page-card"><div class="resume-role"><h2>Temporary Contracts</h2><span class="resume-period">Backend / Automation</span></div><p>Built API integrations, scheduled data collection jobs, reporting automations, OAuth dispatch flows, and SQL-backed operational datasets across CRM, ERP, call, and service systems.</p></article>
<article class="site-page-card"><div class="resume-role"><h2>Independent Engineering Projects</h2><span class="resume-period">AI / Software</span></div><p>Developed public and local systems involving RAG, AI assistants, multi-agent orchestration, backend architecture, visitor analytics, project documentation, and static site infrastructure.</p></article>
</div></section>
<section class="site-page-section"><h2>Strengths</h2><ul class="site-page-list">
<li><strong>Backend Engineering</strong>API design, workers, queues, data modeling, integrations, auth boundaries, and operational reporting.</li>
<li><strong>AI Systems</strong>RAG, prompt boundaries, context loading, agent workflows, local model experimentation, and evaluation-aware design.</li>
<li><strong>Software Delivery</strong>Static deployments, cache-busting, GitHub Actions, Cloudflare Workers, observability, and privacy-aware telemetry.</li>
</ul></section>
<section class="site-page-section"><h2>Technology</h2><div class="site-page-chip-row"><span class="site-page-chip">Python</span><span class="site-page-chip">JavaScript</span><span class="site-page-chip">TypeScript</span><span class="site-page-chip">SQL</span><span class="site-page-chip">FastAPI</span><span class="site-page-chip">Node.js</span><span class="site-page-chip">Cloudflare Workers</span><span class="site-page-chip">Supabase</span><span class="site-page-chip">PostgreSQL</span><span class="site-page-chip">RAG</span><span class="site-page-chip">GitHub Actions</span></div></section>`
  }));

  const changes = changelogEntries().map((entry) => `<li><span class="changelog-date">${escapeHtml(entry.date)}${entry.hash ? ` / ${escapeHtml(entry.hash)}` : ""}</span><strong>${escapeHtml(changelogLabel(entry.message))}</strong></li>`).join("\n");
  writeFile("changelog/index.html", page({
    title: "Changelog",
    description: "Readable changelog for recent portfolio, blog, design, automation, and infrastructure updates on pklavc.com.",
    canonical: "/changelog/",
    kicker: "Site history",
    lead: "A human-readable digest generated from recent Git history. It highlights what changed in the portfolio, pages, blog, visitor map, and deployment setup.",
    body: `<section class="site-page-section"><h2>Recent Changes</h2><ul class="site-page-timeline">${changes}</ul></section>`
  }));

  writeFile("status/index.html", page({
    title: "Status",
    description: "Lightweight public status page for pklavc.com static delivery, RSS, sitemap, public API health, and visitor analytics endpoints.",
    canonical: "/status/",
    kicker: "Operational checks",
    lead: "A lightweight browser-side status page for the parts of this portfolio that can be safely checked from a public page.",
    body: `<section class="site-page-section"><h2>Live Checks</h2><div class="status-grid">
${[
      { id: "site", name: "Portfolio delivery", url: "/" },
      { id: "api", name: "Public API health", url: "https://api.pklavc.com/health" },
      { id: "visitors", name: "Visitor analytics API", url: "https://api.pklavc.com/analytics/map" },
      { id: "feed", name: "RSS feed", url: "/feed.xml" },
      { id: "sitemap", name: "Sitemap", url: "/sitemap.xml" }
    ].map((check) => {
      return `<article class="status-row" data-status-row="${check.id}"><div><strong class="status-name">${check.name}</strong><span class="status-detail" data-status-detail>Checking ${check.url}</span></div><span class="status-pill checking" data-status-pill>Checking</span></article>`;
    }).join("\n")}
</div><p class="site-page-note">Last checked in this browser: <span data-status-updated>starting</span>. Cross-origin checks can show unknown if an endpoint does not expose browser-readable CORS headers.</p></section>`,
    extra: `        <script src="/js/status-page.js" defer></script>`
  }));

  writeFile("maintenance/index.html", page({
    title: "Maintenance",
    description: "Maintenance page for pklavc.com when a deploy or service update is in progress.",
    canonical: "/maintenance/",
    kicker: "Temporary state",
    robots: "noindex, nofollow",
    lead: "This page is reserved for planned maintenance or short deploy windows. The public site is static-first, so this route should normally be quiet.",
    body: `<section class="site-page-section"><h2>What to expect</h2><div class="site-page-grid two">
${card("Static site", "Core portfolio pages are served as static files and should remain available during most backend or API maintenance.", ["GitHub Pages", "Cache"])}
${card("Live features", "Assistant, visitor analytics, and API-backed demos may be paused independently when workers or APIs are being updated.", ["API", "Workers"])}
</div></section>`,
    actions: `<div class="maintenance-orbit" aria-hidden="true"></div><div class="site-page-actions"><a class="site-page-button" href="/">Return home</a><a class="site-page-button secondary" href="/status/">View status</a></div>`
  }));

  writeFile("503.html", page({
    title: "Service Unavailable",
    description: "Temporary service unavailable page for pklavc.com.",
    canonical: "/503.html",
    kicker: "503",
    robots: "noindex, nofollow",
    lead: "A deploy, maintenance window, or upstream service interruption may be in progress.",
    body: `<section class="site-page-section"><h2>Recovery links</h2><div class="site-page-actions"><a class="site-page-button" href="/">Home</a><a class="site-page-button secondary" href="/status/">Status</a><a class="site-page-button secondary" href="/projects/">Projects</a></div></section>`,
    actions: `<div class="maintenance-orbit" aria-hidden="true"></div>`
  }));

  writeFile("410.html", page({
    title: "Gone",
    description: "This portfolio route is no longer available.",
    canonical: "/410.html",
    kicker: "410",
    robots: "noindex, nofollow",
    lead: "This route was intentionally retired. The portfolio keeps old dead ends explicit so crawlers and visitors do not keep retrying content that moved out of scope.",
    body: `<section class="site-page-section"><h2>Where to go next</h2><div class="site-page-actions"><a class="site-page-button" href="/">Home</a><a class="site-page-button secondary" href="/projects/">Projects</a><a class="site-page-button secondary" href="/blog/">Blog</a></div></section>`
  }));
}

function upsertSitemap() {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return;

  let xml = fs.readFileSync(sitemapPath, "utf8");
  const routes = [
    { loc: `${SITE}/uses/`, changefreq: "monthly", priority: "0.5" },
    { loc: `${SITE}/now/`, changefreq: "monthly", priority: "0.5" },
    { loc: `${SITE}/status/`, changefreq: "daily", priority: "0.4" },
    { loc: `${SITE}/changelog/`, changefreq: "weekly", priority: "0.4" }
  ];

  for (const route of routes) {
    if (xml.includes(`<loc>${route.loc}</loc>`)) continue;
    const entry = `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
    xml = xml.replace("</urlset>", `${entry}</urlset>`);
  }

  fs.writeFileSync(sitemapPath, xml, "utf8");
}

function upsertDiscoveryLinks() {
  const files = [
    "index.html",
    "pt/index.html",
    "es/index.html",
    "about/index.html",
    "pt/sobre/index.html",
    "es/sobre/index.html",
    "projects/index.html",
    "pt/projetos/index.html",
    "es/proyectos/index.html",
    "blog/index.html",
    "pt/blog/index.html",
    "es/blog/index.html",
    "visitors/index.html",
    "pt/visitantes/index.html",
    "es/visitantes/index.html"
  ];

  const block = `        <meta name="theme-color" content="#101114">
        <link rel="alternate" type="application/rss+xml" title="Patrick Araujo Engineering Blog RSS" href="/feed.xml">
        <link rel="manifest" href="/manifest.webmanifest">
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <meta name="msapplication-config" content="/browserconfig.xml">`;

  for (const relative of files) {
    const filePath = path.join(ROOT, relative);
    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, "utf8");
    if (/rel=["']manifest["']\s+href=["']\/manifest\.webmanifest(?:\?[^"']*)?["']/i.test(html)) continue;
    html = html.replace(/(\s*<\/head>)/i, `\n${block}$1`);
    fs.writeFileSync(filePath, html, "utf8");
  }
}

writeRootFiles();
writePages();
upsertSitemap();
upsertDiscoveryLinks();

console.log("Generated utility pages, root metadata files, default OG SVG, and sitemap entries.");
