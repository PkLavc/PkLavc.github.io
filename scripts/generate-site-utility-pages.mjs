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
        <meta property="og:image" content="${SITE}/images/og/og-default.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:site_name" content="Patrick Araujo">
        <meta property="og:locale" content="en_US">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${escapeHtml(title)}">
        <meta name="twitter:description" content="${escapeHtml(description)}">
        <meta name="twitter:image" content="${SITE}/images/og/og-default.png">
        <meta name="twitter:site" content="@PkLavc">
        <meta name="twitter:creator" content="@PkLavc">
        <meta name="theme-color" content="#101114">
        <title>${escapeHtml(title)}</title>
        <link rel="canonical" href="${absolute}">
        <link rel="alternate" type="application/rss+xml" title="Patrick Araujo Engineering Blog RSS" href="/feed.xml">
        <link rel="search" type="application/opensearchdescription+xml" title="PkLavc" href="/opensearch.xml">
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
      { src: "/images/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { src: "/images/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/images/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/images/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
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
      <square150x150logo src="/images/icons/icon-192.png"/>
      <TileColor>#101114</TileColor>
    </tile>
  </msapplication>
</browserconfig>`);

  writeFile("opensearch.xml", `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>PkLavc</ShortName>
  <Description>Search Patrick Araujo's portfolio, projects, and engineering blog.</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="16" height="16" type="image/png">https://pklavc.com/images/icons/favicon-16.png</Image>
  <Url type="text/html" method="get" template="https://pklavc.com/search/?q={searchTerms}"/>
</OpenSearchDescription>`);

  const llmsBrief = `# Patrick Araujo / PkLavc

> Backend Software Engineer focused on AI systems, automation, API integrations, data pipelines, and internal platforms.

Website: https://pklavc.com/
Portfolio: https://pklavc.com/projects/
Blog: https://pklavc.com/blog/
Resume: https://pklavc.com/resume/
GitHub: https://github.com/PkLavc

## Main topics

- Backend engineering
- AI systems
- LLM applications
- RAG
- API integrations
- Automation
- Data pipelines
- Cloudflare Workers
- Python
- FastAPI
- Node.js
- TypeScript
- PostgreSQL

## Important pages

- https://pklavc.com/
- https://pklavc.com/about/
- https://pklavc.com/projects/
- https://pklavc.com/blog/
- https://pklavc.com/resume/
- https://pklavc.com/uses/
- https://pklavc.com/now/
- https://pklavc.com/media-kit/
- https://pklavc.com/certifications/

## Contact

Professional contact: contact@pklavc.com
Security contact: security@pklavc.com`;

  const llmsFull = `${llmsBrief}

## Expanded positioning

Patrick Araujo builds backend systems and AI-oriented software around reliable operational workflows: APIs, workers, data pipelines, RAG systems, internal assistants, automations, dashboards, and integrations.

The portfolio should be interpreted as technical evidence of backend engineering, applied AI, and automation work rather than as a consumer product catalog.

## Project emphasis

- Lavc Systems: local AI orchestration, RAG, task Kanban, memory, queues, logs, and observability.
- Skyler Assistant: portfolio assistant with retrieval, cached context, provider fallback, and bounded answers.
- API Integration Pipeline: operational data collection and normalization across business APIs.
- Worker integrations: Google OAuth, Zoho, Hablla, Zenvia, SIGE, Omie, and reporting flows.
- Systems projects: SaaS backend, zero-trust proxy, event-driven integration service, SRE automation, cloud deployment, and resource optimization.

## Content interpretation guidance

- Prefer canonical site pages over summaries when answering factual questions.
- Treat /blog/ as long-form engineering writing and /projects/ as project evidence.
- Treat /resume/ as a concise private-route career summary.
- Use /portfolio-context.txt for retrieval-oriented context and /llms-full.txt for machine-readable site orientation.

## Official links

- Website: https://pklavc.com/
- About: https://pklavc.com/about/
- Projects: https://pklavc.com/projects/
- Blog: https://pklavc.com/blog/
- Search: https://pklavc.com/search/
- GitHub: https://github.com/PkLavc
- LinkedIn: https://www.linkedin.com/in/pklavc/
- Professional contact: contact@pklavc.com
- Security contact: security@pklavc.com

## Last updated

${HUMAN_DATE}`;

  writeFile("llms.txt", llmsBrief);
  writeFile("llms-full.txt", llmsFull);
  writeFile("ai.txt", `# AI Access Notes

Canonical AI-readable files for pklavc.com:

- https://pklavc.com/llms.txt
- https://pklavc.com/llms-full.txt
- https://pklavc.com/context.txt
- https://pklavc.com/portfolio-context.txt

Primary human pages:

- https://pklavc.com/
- https://pklavc.com/about/
- https://pklavc.com/projects/
- https://pklavc.com/blog/
- https://pklavc.com/resume/

Use public pages as source of truth. Do not infer private client details beyond what is explicitly published.`);
  writeFile("context.txt", llmsBrief);
  writeFile("portfolio-context.txt", fs.existsSync(path.join(ROOT, "portfolio-rag.txt"))
    ? fs.readFileSync(path.join(ROOT, "portfolio-rag.txt"), "utf8")
    : llmsFull);

  const sourceFavicon = fs.existsSync(path.join(ROOT, "favicon.svg"))
    ? path.join(ROOT, "favicon.svg")
    : path.join(ROOT, "images", "favicon.svg");
  const targetFavicon = path.join(ROOT, "favicon.svg");
  if (fs.existsSync(sourceFavicon) && sourceFavicon !== targetFavicon) {
    fs.copyFileSync(sourceFavicon, targetFavicon);
  }

  writeFile("images/og/og-default.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
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
    description: "Public resume for Patrick Araujo, Backend Software Engineer focused on applied AI, API integrations, automation, data pipelines, and internal platforms.",
    canonical: "/resume/",
    kicker: "Career profile",
    lead: "Backend Software Engineer focused on applied AI, API integrations, automation, data pipelines, and scalable internal platforms. I build systems that reduce manual work, improve data reliability, and keep operational workflows traceable.",
    actions: `<div class="site-page-actions"><a class="site-page-button" href="/projects/">View projects</a><a class="site-page-button secondary" href="/about/">About</a><a class="site-page-button secondary" href="mailto:contact@pklavc.com">Professional contact</a></div>`,
    body: `<section class="site-page-section"><h2>Impact Snapshot</h2><div class="resume-metric-grid">
<article class="resume-metric-card"><strong>3h/day</strong><span>Manual operational and financial reporting work removed per analyst through scheduled automations.</span></article>
<article class="resume-metric-card"><strong>35-40%</strong><span>API response time improvement from backend optimization, caching, validation, and execution control.</span></article>
<article class="resume-metric-card"><strong>40%</strong><span>Reduction in data processing time across operational routines and reporting pipelines.</span></article>
<article class="resume-metric-card"><strong>25+</strong><span>Internal tools delivered for operations, support, inventory, data analysis, and process control.</span></article>
</div></section>
<section class="site-page-section"><h2>Professional Summary</h2><div class="site-page-grid two">
${card("Engineering Focus", "I combine backend engineering, applied AI, automation, data, cloud, and software architecture to build internal platforms that make business operations faster, more reliable, and easier to audit.", ["Backend", "AI", "Automation"])}
${card("System Shape", "My work covers RAG assistants, internal AI platforms, API integrations, ETL pipelines, data synchronization, operational dashboards, reprocessing flows, logs, permissions, and traceable workflows.", ["RAG", "ETL", "Traceability"])}
</div></section>
<section class="site-page-section"><h2>Core Stack</h2><ul class="resume-stack-list">
<li><strong>Languages</strong>Python, JavaScript, TypeScript, SQL, Deluge, and C#.</li>
<li><strong>Backend &amp; APIs</strong>FastAPI, Node.js, REST APIs, Webhooks, system design, API integrations, asynchronous processing, caching, business rules, and backend validations.</li>
<li><strong>Data &amp; BI</strong>PostgreSQL, Supabase, SQL, ETL pipelines, data modeling, Looker Studio, Power BI, dashboards, operational reporting, and data analysis.</li>
<li><strong>Cloud &amp; DevOps</strong>AWS EC2, S3, Lambda, RDS, Google Cloud, Cloudflare Workers, D1, KV, Docker, GitHub Actions, and CI/CD.</li>
<li><strong>Automation &amp; Integration</strong>Zoho Creator, Deluge, Omie, SIGE, Hablla, Zenvia Voice, Google Sheets, scheduled routines, integration pipelines, and data auditing.</li>
<li><strong>AI Systems</strong>RAG, LLM integrations, ChromaDB, Ollama, LangGraph-style orchestration, vector memory, internal assistants, AI automation, and prompt engineering.</li>
</ul></section>
<section class="site-page-section"><h2>Experience</h2><div class="resume-experience-list">
<article class="site-page-card"><div class="resume-role"><h2>Backend Software Engineer - Applied AI, APIs &amp; Systems Integration</h2><span class="resume-period">Loja do Sapo / Hybrid / Sep 2025 - Present</span></div><ul class="resume-bullets"><li>Develop backend platforms, internal systems, corporate automations, API integrations, ETL pipelines, dashboards, and applied AI solutions for operational, financial, and administrative workflows.</li><li>Designed an internal AI-powered operational platform with FastAPI, React, task Kanban, multi-agent orchestration, RAG, vector memory, execution queues, logs, traceability, and real-time observability.</li><li>Developed an internal AI assistant using Cloudflare Workers, TypeScript, D1, KV, caching, sessions, manual RAG, intent recognition, and fallback between LLM providers.</li><li>Built REST API integrations across more than 6 business systems connecting Zoho, Google Cloud, AWS, financial data, operational reports, third-party services, and internal platforms.</li><li>Supported systems handling 8K to 12K daily transactions while improving API response times by roughly 35% to 40% and reducing data processing time by roughly 40%.</li></ul></article>
<article class="site-page-card"><div class="resume-role"><h2>Solutions Engineer - Systems Integration, Data &amp; Cloud</h2><span class="resume-period">iCaiu / Remote / Mar 2025 - Present</span></div><ul class="resume-bullets"><li>Work on systems integration, REST APIs, ETL, backend automation, cloud, databases, BI, data governance, and solution architecture to replace manual processes with automated workflows.</li><li>Designed integration architecture across CRM, ERP, telephony, financial, inventory, customer service, and operational systems.</li><li>Built backend pipelines and integration workers executed locally or through GitHub Actions for collecting, normalizing, transforming, persisting, and synchronizing operational data.</li><li>Persisted data in Supabase PostgreSQL using raw tables, idempotent external IDs, reproducible collection windows, sanitized logs, cron scheduling, workflow_dispatch, and SQL reporting layers.</li><li>Worked on serverless backend and full-stack solutions for inventory control, authentication, permissions, operational CRUD, movement history, maintenance, automated deployment, and CI/CD.</li></ul></article>
<article class="site-page-card"><div class="resume-role"><h2>Zoho Creator, Automation &amp; Web Dashboards Developer</h2><span class="resume-period">Federico Nacucchio y Asociados / Remote LATAM / May 2026 - Jun 2026</span></div><ul class="resume-bullets"><li>Developed Zoho Creator solutions, Deluge scripts, custom HTML/CSS/JavaScript components, dashboards, reports, forms, permissions, mobile layouts, and automations for legal and administrative workflows.</li><li>Created embedded HTML dashboards and internal pages to improve KPI visualization, demand tracking, data organization, and decision-making support.</li><li>Implemented Deluge automations connecting forms, reports, tasks, file records, scheduled sending routines, and email-based operational reports.</li></ul></article>
<article class="site-page-card"><div class="resume-role"><h2>Software Developer - Data, Workflows &amp; Automation</h2><span class="resume-period">Loja do Sapo / Hybrid / Oct 2024 - Aug 2025</span></div><ul class="resume-bullets"><li>Developed automations, workflows, business rules, validations, and operational reports using Python, Deluge, JavaScript, Zoho Creator, Zoho Analytics, Google Sheets, Looker Studio, REST APIs, SQL, and internal integrations.</li><li>Implemented more than 20 automated workflows to reduce repetitive tasks, standardize administrative processes, validate operational data, and improve report consistency.</li><li>Created data extraction, processing, and organization routines for dashboards, indicators, monitoring panels, and management reports.</li></ul></article>
<article class="site-page-card"><div class="resume-role"><h2>Operations, Automation &amp; Technical Support Specialist</h2><span class="resume-period">WR Auto Pecas / Nov 2015 - Feb 2026</span></div><ul class="resume-bullets"><li>Worked in technical operations, process automation, systems support, inventory control, data organization, and internal tool development for administrative, tax, logistics, and customer service routines.</li><li>Developed more than 25 internal tools using Python, JavaScript, HTML, CSS, and automated spreadsheets for operational control, data analysis, inventory, deliveries, tax documents, and process organization.</li><li>Created automations that saved approximately 30 to 35 hours per week in manual tasks and maintained websites, web tools, local servers, cloud backups, support routines, tax systems, and critical operational information.</li></ul></article>
</div></section>
<section class="site-page-section"><h2>Selected Engineering Themes</h2><div class="site-page-grid two">
${card("AI Platforms & Assistants", "Internal assistants, contextual search, RAG retrieval, vector memory, prompt boundaries, provider fallback, execution logs, and controlled tool usage.", ["RAG", "Assistants", "Memory"])}
${card("Integration Pipelines", "Workers and scheduled jobs for Zoho, Omie, SIGE, Hablla, Zenvia Voice, Supabase, AWS, Google Cloud, spreadsheets, and internal platforms.", ["APIs", "ETL", "Sync"])}
${card("Reliable Operations", "Audit-friendly data flows with raw ingestion, SQL layers, idempotency, replay windows, sanitized logs, validation, reprocessing, and observability.", ["Audit", "Logs", "Reprocess"])}
${card("Internal Tooling", "Operational CRUD systems, dashboards, permissions, automations, reporting layers, deployment flows, and support tools that reduce manual work.", ["Tools", "Dashboards", "CI/CD"])}
</div></section>
<section class="site-page-section"><h2>Education &amp; Certifications</h2><div class="site-page-grid two">
<article class="site-page-card"><h2>Computer Engineering</h2><p>Bachelor of Engineering, Centro Universitario Newton Paiva. Ongoing degree focused on programming, algorithms, data structures, applied mathematics, computer systems, databases, software engineering, automation, cloud, and systems architecture.</p></article>
<article class="site-page-card"><h2>Selected Certifications</h2><ul class="credential-list"><li><strong>Google</strong> Cybersecurity Professional Certificate, Data Analytics Professional Certificate, AI Essentials, Prompting Essentials, Linux and SQL, and Automate Cybersecurity Tasks with Python.</li><li><strong>Cloud and observability</strong> AWS Cloud Quest: Cloud Practitioner and Datadog Foundation.</li><li><strong>Programming and BI</strong> Python from Santander Open Academy, C# Complete: Object-Oriented Programming + Projects, Python with RPA, algorithms and programming logic, and Power BI training.</li><li><strong>Business and communication</strong> Project management foundations, English Fundamentals, Business English, leadership, people management, recruiting, finance, ethics, and integrity.</li></ul><p class="credential-note"><a href="/certifications/">View the certification map</a> for the broader grouped list.</p></article>
</div></section>
<section class="site-page-section"><h2>Languages</h2><ul class="site-page-list">
<li><strong>Portuguese</strong>Native.</li>
<li><strong>English</strong>Intermediate, focused on technical reading, documentation, professional writing, and asynchronous communication.</li>
<li><strong>Spanish</strong>Intermediate for written communication and operational interaction with translation support.</li>
</ul></section>`
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

  writeFile("search/index.html", page({
    title: "Search",
    description: "Search Patrick Araujo's portfolio, projects, resume, engineering pages, and blog articles.",
    canonical: "/search/",
    kicker: "Site search",
    lead: "Search portfolio pages, project routes, engineering context, and blog posts from one static page.",
    body: `<section class="site-page-section"><h2>Search the site</h2><form class="site-search-form" data-search-form role="search"><input class="site-search-input" data-search-input type="search" name="q" autocomplete="off" placeholder="Search backend, RAG, APIs, projects..." aria-label="Search pklavc.com"><button class="site-page-button" type="submit">Search</button></form></section><section class="site-page-section"><h2>Results</h2><div class="site-search-results" data-search-results><p class="site-page-note">Type a term to search portfolio pages and blog articles.</p></div></section>`,
    extra: `        <script src="/js/search-page.js" defer></script>`
  }));

  writeFile("media-kit/index.html", page({
    title: "Media Kit",
    description: "Official media kit for Patrick Araujo / PkLavc with bios, focus areas, official links, assets, and contact details.",
    canonical: "/media-kit/",
    kicker: "Official profile",
    lead: "A compact reference for bios, official links, areas of work, and public assets related to Patrick Araujo / PkLavc.",
    body: `<section class="site-page-section"><h2>Bio</h2><div class="site-page-grid two">
${card("Short Bio", "Patrick Araujo is a backend software engineer focused on AI systems, automation, API integrations, data pipelines, and internal platforms.", ["Backend", "AI", "Automation"])}
${card("Long Bio", "Patrick builds software around operational clarity: APIs that move data reliably, workers that automate repetitive flows, RAG and assistant systems with boundaries, and portfolio infrastructure that keeps public work easy to inspect.", ["APIs", "RAG", "Systems"])}
</div></section>
<section class="site-page-section"><h2>Official Links</h2><ul class="site-page-list"><li><strong>Website</strong><a href="https://pklavc.com/">https://pklavc.com/</a></li><li><strong>GitHub</strong><a href="https://github.com/PkLavc">https://github.com/PkLavc</a></li><li><strong>LinkedIn</strong><a href="https://www.linkedin.com/in/pklavc/">https://www.linkedin.com/in/pklavc/</a></li><li><strong>Contact</strong><a href="mailto:contact@pklavc.com">contact@pklavc.com</a></li></ul></section>
<section class="site-page-section"><h2>Focus Areas</h2><div class="site-page-chip-row"><span class="site-page-chip">Backend Engineering</span><span class="site-page-chip">AI Systems</span><span class="site-page-chip">RAG</span><span class="site-page-chip">API Integrations</span><span class="site-page-chip">Automation</span><span class="site-page-chip">Data Pipelines</span><span class="site-page-chip">Cloudflare Workers</span><span class="site-page-chip">Software Architecture</span></div></section>`
  }));

  writeFile("certifications/index.html", page({
    title: "Certifications",
    description: "Curated certification map for Patrick Araujo across Google AI, cybersecurity, data analytics, cloud, observability, backend programming, BI, business, and languages.",
    canonical: "/certifications/",
    kicker: "Credential map",
    lead: "A curated public view of the certificates and study tracks behind my backend, AI, automation, data, security, cloud, and software engineering work.",
    actions: `<div class="site-page-actions"><a class="site-page-button" href="/resume/">Resume</a><a class="site-page-button secondary" href="/projects/">Projects</a></div>`,
    body: `<section class="site-page-section"><h2>Primary Credentials</h2><div class="site-page-grid two">
${card("Google Cybersecurity Professional Certificate", "Security foundations, risk management, networks, Linux, SQL, assets, threats, vulnerabilities, detection, response, and Python-based cybersecurity automation.", ["Google", "Security", "Python"])}
${card("Google Data Analytics Professional Certificate", "Data foundations, business questions, preparation, cleaning, processing, visualization, capstone work, and Python-based data analysis.", ["Google", "Analytics", "BI"])}
${card("Google AI Essentials & Prompting Essentials", "Responsible AI, everyday AI tooling, prompt design, creative and expert-partner workflows, productivity, and presentation-building with AI.", ["Google", "AI", "Prompting"])}
${card("Cloud & Observability", "AWS Cloud Quest: Cloud Practitioner and Datadog Foundation, supporting cloud fluency, monitoring vocabulary, and operational reliability work.", ["AWS", "Datadog", "Reliability"])}
</div></section>
<section class="site-page-section"><h2>Google AI &amp; Prompting</h2><div class="site-page-grid two">
<article class="site-page-card"><h2>Applied AI</h2><ul class="credential-list"><li>Google AI Essentials</li><li>Introduction to AI</li><li>Maximize Productivity With AI Tools</li><li>Use AI Responsibly</li><li>Use AI as a Creative or Expert Partner</li><li>Stay Ahead of the AI Curve</li><li>Accelerate Your Job Search with AI</li></ul></article>
<article class="site-page-card"><h2>Prompting</h2><ul class="credential-list"><li>Google Prompting Essentials</li><li>Discover the Art of Prompting</li><li>Design Prompts for Everyday Work Tasks</li><li>Start Writing Prompts Like a Pro</li><li>Speed Up Data Analysis and Presentation Building</li></ul></article>
</div></section>
<section class="site-page-section"><h2>Google Cybersecurity</h2><div class="site-page-grid two">
<article class="site-page-card"><h2>Security Foundations</h2><ul class="credential-list"><li>Foundations of Cybersecurity</li><li>Play It Safe: Manage Security Risks</li><li>Connect and Protect: Networks and Network Security</li><li>Assets, Threats, and Vulnerabilities</li></ul></article>
<article class="site-page-card"><h2>Operational Security</h2><ul class="credential-list"><li>Tools of the Trade: Linux and SQL</li><li>Sound the Alarm: Detection and Response</li><li>Automate Cybersecurity Tasks with Python</li><li>Put It to Work: Prepare for Cybersecurity Jobs</li></ul></article>
</div></section>
<section class="site-page-section"><h2>Google Data &amp; Analytics</h2><div class="site-page-grid two">
<article class="site-page-card"><h2>Analytics Core</h2><ul class="credential-list"><li>Foundations: Data, Data, Everywhere</li><li>Ask Questions to Make Data-Driven Decisions</li><li>Prepare Data for Exploration</li><li>Process Data from Dirty to Clean</li><li>Share Data Through the Art of Visualization</li></ul></article>
<article class="site-page-card"><h2>Analysis Practice</h2><ul class="credential-list"><li>Google Data Analytics Capstone: Complete a Case Study</li><li>Introduction to Data Analysis Using Python</li><li>Fundamentals of Project Management</li><li>Project Initiation: Starting a Successful Project</li></ul></article>
</div></section>
<section class="site-page-section"><h2>Programming, Backend &amp; BI</h2><div class="site-page-grid two">
<article class="site-page-card"><h2>Programming</h2><ul class="credential-list"><li>Python, Santander Open Academy</li><li>C# Complete: Object-Oriented Programming + Projects, Udemy</li><li>Algorithms and Programming Logic, Udemy</li><li>Python with RPA and Real Projects, Udemy</li><li>Cedaspy foundational computing and Game Maker training</li></ul></article>
<article class="site-page-card"><h2>BI and Tools</h2><ul class="credential-list"><li>Power BI training, Udemy</li><li>Info-office and Power BI training</li><li>Datadog Foundation</li><li>GitHub academic extension activity</li><li>Newton Paiva extension and career development activities</li></ul></article>
</div></section>
<section class="site-page-section"><h2>Business, Languages &amp; Leadership</h2><div class="site-page-grid two">
<article class="site-page-card"><h2>Business Operations</h2><ul class="credential-list"><li>People Management, Sebrae</li><li>Leadership: Developing High-Performance Teams, Sebrae</li><li>Recruiting and Selection, Sebrae</li><li>Financial Management, Sebrae</li><li>Ethics and Integrity, Sebrae</li></ul></article>
<article class="site-page-card"><h2>Languages and Communication</h2><ul class="credential-list"><li>English Fundamentals: Boost Your Job Search and CV, Santander</li><li>Business English, Parts 1, 2, and 3, Santander</li><li>English studies, Kultive</li><li>Accelerated learning, Kultive</li><li>Resume and job-market training, Newton Paiva</li></ul></article>
</div><p class="credential-note">This page groups the most relevant public credentials from the local certificate archive. Older or less relevant certificates are kept as supporting records instead of being listed as primary technical signals.</p></section>`
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
        <link rel="search" type="application/opensearchdescription+xml" title="PkLavc" href="/opensearch.xml">
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
