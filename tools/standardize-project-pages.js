const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const projectsDir = path.join(repoRoot, 'projects');

function stripTags(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeJson(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of projectFolders) {
  const filePath = path.join(projectsDir, slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  const projectNameMatch = html.match(/<li><span aria-current="page">([\s\S]*?)<\/span><\/li>/);
  const projectName = projectNameMatch ? stripTags(projectNameMatch[1]) : slug;

  const firstTechMatch = html.match(/<div class="tech-tag">([\s\S]*?)<\/div>/);
  const primaryTech = firstTechMatch ? stripTags(firstTechMatch[1]) : 'Backend';

  const heroIntroMatch = html.match(/<section class="project-hero">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/section>/);
  const heroIntro = heroIntroMatch ? stripTags(heroIntroMatch[1]) : `${projectName} project documentation.`;

  let description = `${projectName} built with ${primaryTech}. ${heroIntro}`;
  if (description.length > 165) {
    description = description.slice(0, 162).trimEnd() + '...';
  }

  const strongH1 = `${projectName} | ${primaryTech}`;

  // Update/add title
  if (/<title>[\s\S]*?<\/title>/.test(html)) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${strongH1} Project | Patrick Araujo</title>`);
  } else {
    html = html.replace(/<meta name="author" content="[^"]*"\s*\/>/, (m) => `${m}\n    <title>${strongH1} Project | Patrick Araujo</title>`);
  }

  // Update meta descriptions/titles
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${strongH1} | Patrick Araujo">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${strongH1} | Patrick Araujo">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`);

  // Ensure H1 is strong with technology
  html = html.replace(/<section class="project-hero">([\s\S]*?)<h1>[\s\S]*?<\/h1>/, `<section class="project-hero">$1<h1>${strongH1}</h1>`);

  // Replace CreativeWork schema with Article schema
  html = html.replace(
    /<!-- JSON-LD Schema: CreativeWork -->[\s\S]*?<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<!-- JSON-LD Schema: Article -->\n    <script type="application/ld+json">\n    {\n        "@context": "https://schema.org",\n        "@type": "Article",\n        "headline": "${escapeJson(strongH1)}",\n        "description": "${escapeJson(description)}",\n        "author": {\n            "@type": "Person",\n            "name": "Patrick Araujo"\n        },\n        "mainEntityOfPage": "https://pklavc.github.io/projects/${slug}/index.html",\n        "url": "https://pklavc.github.io/projects/${slug}/index.html",\n        "keywords": "Patrick Araujo, Backend Software Engineer, ${escapeJson(primaryTech)}, ${escapeJson(projectName)}"\n    }\n    </script>`
  );

  // Extract full doc section first
  const fullDocMatch = html.match(/<section class="full-readme-section" aria-label="Full README">[\s\S]*?<\/section>/);
  const fullDocSection = fullDocMatch ? fullDocMatch[0] : '';

  // Remove duplicate sections and current full doc position
  html = html.replace(/\s*<section class="problem-solution">[\s\S]*?<\/section>/g, '\n');
  html = html.replace(/\s*<section class="impact-section">[\s\S]*?<\/section>/g, '\n');
  html = html.replace(/\s*<section class="full-readme-section" aria-label="Full README">[\s\S]*?<\/section>/g, '\n');

  // Insert full doc right after hero
  if (fullDocSection) {
    html = html.replace(/(<section class="project-hero">[\s\S]*?<\/section>)/, `$1\n\n            ${fullDocSection}`);
  }

  // Ensure breadcrumb exists at top of main
  if (!html.includes('class="breadcrumb-nav"')) {
    const breadcrumb = `            <nav aria-label="Breadcrumb" class="breadcrumb-nav">\n                <ol class="breadcrumb">\n                    <li><a href="/">Home</a></li>\n                    <li><a href="/projects.html">Projects</a></li>\n                    <li><span aria-current="page">${projectName}</span></li>\n                </ol>\n            </nav>`;
    html = html.replace(/<main role="main">/, `<main role="main">\n${breadcrumb}`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Standardized ${slug}`);
}

console.log('All project pages standardized.');
