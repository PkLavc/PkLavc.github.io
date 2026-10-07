import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(root, "development", "index.html");
const source = fs.readFileSync(sourcePath, "utf8");
const site = "https://pklavc.com";

const routes = {
  en: { path: "/", file: "index.html", lang: "en", ogLocale: "en_US" },
  pt: { path: "/pt/", file: "pt/index.html", lang: "pt-BR", ogLocale: "pt_BR" },
  es: { path: "/es/", file: "es/index.html", lang: "es", ogLocale: "es_ES" }
};

const sharedExpertise = [
  "Python", "FastAPI", "Node.js", "TypeScript", "SQL", "JavaScript", "PostgreSQL",
  "REST APIs", "OAuth", "Webhooks", "AWS", "Google Cloud", "Cloudflare Workers",
  "Docker", "GitHub Actions", "Zoho Creator", "Deluge", "Applied AI", "RAG",
  "LLM integrations", "Vector memory", "Data pipelines", "ETL", "Workflow automation",
  "Systems integration"
];

const copy = {
  en: {
    title: "Patrick Araujo | Backend Engineer, AI & Systems Integration",
    description: "Patrick Araujo is a Backend Software Engineer building applied AI, API integrations, automation, data pipelines, and scalable operational systems.",
    socialDescription: "Backend engineer building applied AI systems, API integrations, workflow automation, data pipelines, and dependable operational software.",
    role: "Backend Software Engineer",
    hero: "I design <strong>backend systems, applied AI, automation, and API integrations</strong> for real operational environments &mdash; with traceable data flows, observable execution, and software that can keep evolving after deployment.",
    sectionSystems: "Systems",
    buildTitle: "What I build",
    buildIntro: "My work sits between backend engineering and day-to-day operations. I build software that connects platforms, moves data between systems, automates repetitive processes, and gives teams a clearer way to understand what is happening inside their workflows.",
    buildDetail: "The architecture changes with the problem, but the priorities stay consistent: clear boundaries, reproducible execution, controlled failure modes, useful logs, and enough context to maintain the system without treating production behavior as a black box.",
    platform: "Backend platforms",
    platformText: "FastAPI, Node.js, TypeScript, PostgreSQL, authentication, queues, caching, internal tools, and service boundaries built around operational requirements.",
    integration: "Systems integration",
    integrationText: "REST APIs, OAuth, webhooks, ERP and CRM connections, idempotent ingestion, synchronization workers, and replayable data pipelines.",
    ai: "Applied AI",
    aiText: "RAG, contextual assistants, multi-agent workflows, vector memory, controlled tool execution, fallback behavior, and observable AI processes.",
    automation: "Automation &amp; data",
    automationText: "Scheduled jobs, ETL, validation, reporting pipelines, dashboards, business rules, and workflows that replace repetitive manual operations.",
    sectionWork: "Work",
    workTitle: "Selected systems",
    workIntro: "The projects below are not isolated visual demos. They document implementation choices, data flows, system responsibilities, and the engineering constraints behind each build.",
    lavc: "Multi-agent orchestration, Kanban execution, RAG knowledge, vector memory, local models, and real-time observability.",
    pipeline: "Replayable ingestion across operational APIs with normalization, idempotent identifiers, SQL persistence, and scheduled execution.",
    autotrader: "Autonomous paper trading with Kronos-base forecasts, portfolio risk limits, simulated execution, and a public dashboard.",
    skylet: "A contextual assistant using Cloudflare infrastructure, manual RAG, multilingual conversation, sessions, caching, and provider fallback.",
    sectionWriting: "Writing",
    writingTitle: "Technical context",
    writingIntro: "The portfolio shows finished systems. The blog is where I expand the reasoning around them: backend patterns, APIs, automation, cloud infrastructure, developer tooling, applied AI, data workflows, and the practical decisions that appear while building and maintaining software.",
    notesTitle: "Engineering notes beyond the project page.",
    notesText: "Articles document implementation details, explain technologies in context, compare approaches, and keep a public record of what I am testing or improving. The goal is useful technical material, not a second copy of the resume.",
    openBlog: "Open the blog",
    coverage: "Coverage",
    coverageText: "Backend architecture<br>API integrations<br>Automation<br>Applied AI &amp; RAG<br>Cloud &amp; deployment<br>Data pipelines",
    sectionPatrick: "Patrick",
    aboutTitle: "About the engineer",
    aboutIntro: "I am Patrick Araujo, a Backend Software Engineer based in Belo Horizonte, Brazil. I work with backend platforms, internal systems, applied AI, integrations, data pipelines, automation, and cloud infrastructure. My professional work has involved systems used for operational, administrative, financial, inventory, reporting, and customer-service workflows.",
    aboutDetail: "This homepage is an overview. The About page contains the professional timeline and stack, Projects contains implementation-specific material, and Certifications documents training and continued technical development.",
    explore: "Explore the site",
    profile: "Profile / 01",
    about: "About",
    systems: "Systems / 02",
    projects: "Projects",
    writing: "Writing / 03",
    blog: "Blog",
    learning: "Learning / 04",
    certifications: "Certifications",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    editorial: "Editorial Policy",
    credits: "Credits",
    projectLinks: ["/projects/lavc-systems/", "/projects/api-integrations/", "/projects/autotrader/", "/projects/skylet-assistant/"],
    routeLinks: ["/about/", "/projects/", "/blog/", "/certifications/"]
  },
  pt: {
    title: "Patrick Araujo | Engenharia Backend, IA e Integra&ccedil;&otilde;es",
    description: "Patrick Araujo &eacute; Engenheiro de Software Backend e desenvolve IA aplicada, integra&ccedil;&otilde;es de API, automa&ccedil;&atilde;o, pipelines de dados e sistemas operacionais escal&aacute;veis.",
    socialDescription: "Engenheiro de backend criando sistemas de IA aplicada, integra&ccedil;&otilde;es de API, automa&ccedil;&atilde;o de fluxos, pipelines de dados e software operacional confi&aacute;vel.",
    role: "Engenheiro de Software Backend",
    hero: "Projeto <strong>sistemas backend, IA aplicada, automa&ccedil;&atilde;o e integra&ccedil;&otilde;es de API</strong> para ambientes operacionais reais &mdash; com fluxos de dados rastre&aacute;veis, execu&ccedil;&atilde;o observ&aacute;vel e software que continua evoluindo ap&oacute;s a implanta&ccedil;&atilde;o.",
    sectionSystems: "Sistemas",
    buildTitle: "O que eu construo",
    buildIntro: "Meu trabalho est&aacute; entre a engenharia de backend e a opera&ccedil;&atilde;o do dia a dia. Desenvolvo software que conecta plataformas, move dados entre sistemas, automatiza processos repetitivos e d&aacute; &agrave;s equipes uma vis&atilde;o mais clara dos seus fluxos de trabalho.",
    buildDetail: "A arquitetura muda com o problema, mas as prioridades permanecem: limites claros, execu&ccedil;&atilde;o reproduz&iacute;vel, falhas controladas, logs &uacute;teis e contexto suficiente para manter o sistema sem tratar a produ&ccedil;&atilde;o como uma caixa-preta.",
    platform: "Plataformas backend",
    platformText: "FastAPI, Node.js, TypeScript, PostgreSQL, autentica&ccedil;&atilde;o, filas, cache, ferramentas internas e limites de servi&ccedil;o orientados pelos requisitos operacionais.",
    integration: "Integra&ccedil;&atilde;o de sistemas",
    integrationText: "APIs REST, OAuth, webhooks, conex&otilde;es com ERP e CRM, ingest&atilde;o idempotente, workers de sincroniza&ccedil;&atilde;o e pipelines de dados reprocess&aacute;veis.",
    ai: "IA aplicada",
    aiText: "RAG, assistentes contextuais, fluxos multiagente, mem&oacute;ria vetorial, execu&ccedil;&atilde;o controlada de ferramentas, fallback e processos de IA observ&aacute;veis.",
    automation: "Automa&ccedil;&atilde;o e dados",
    automationText: "Tarefas agendadas, ETL, valida&ccedil;&atilde;o, pipelines de relat&oacute;rio, dashboards, regras de neg&oacute;cio e fluxos que substituem opera&ccedil;&otilde;es manuais repetitivas.",
    sectionWork: "Trabalho",
    workTitle: "Sistemas selecionados",
    workIntro: "Os projetos abaixo n&atilde;o s&atilde;o demonstra&ccedil;&otilde;es visuais isoladas. Eles documentam escolhas de implementa&ccedil;&atilde;o, fluxos de dados, responsabilidades do sistema e as restri&ccedil;&otilde;es de engenharia de cada constru&ccedil;&atilde;o.",
    lavc: "Orquestra&ccedil;&atilde;o multiagente, execu&ccedil;&atilde;o Kanban, conhecimento RAG, mem&oacute;ria vetorial, modelos locais e observabilidade em tempo real.",
    pipeline: "Ingest&atilde;o reprocess&aacute;vel de APIs operacionais com normaliza&ccedil;&atilde;o, identificadores idempotentes, persist&ecirc;ncia SQL e execu&ccedil;&atilde;o agendada.",
    autotrader: "Paper trading aut&ocirc;nomo com previs&otilde;es do Kronos-base, limites de risco da carteira, execu&ccedil;&atilde;o simulada e dashboard p&uacute;blico.",
    skylet: "Assistente contextual com infraestrutura Cloudflare, RAG manual, conversa multil&iacute;ngue, sess&otilde;es, cache e fallback de provedores.",
    sectionWriting: "Conte&uacute;do",
    writingTitle: "Contexto t&eacute;cnico",
    writingIntro: "O portf&oacute;lio mostra sistemas conclu&iacute;dos. No blog, aprofundo o racioc&iacute;nio por tr&aacute;s deles: padr&otilde;es backend, APIs, automa&ccedil;&atilde;o, infraestrutura em nuvem, ferramentas de desenvolvimento, IA aplicada, fluxos de dados e decis&otilde;es pr&aacute;ticas de constru&ccedil;&atilde;o e manuten&ccedil;&atilde;o de software.",
    notesTitle: "Notas de engenharia al&eacute;m da p&aacute;gina do projeto.",
    notesText: "Os artigos documentam detalhes de implementa&ccedil;&atilde;o, explicam tecnologias em contexto, comparam abordagens e mant&ecirc;m um registro p&uacute;blico do que estou testando ou aprimorando. O objetivo &eacute; material t&eacute;cnico &uacute;til, n&atilde;o uma segunda c&oacute;pia do curr&iacute;culo.",
    openBlog: "Abrir o blog",
    coverage: "Cobertura",
    coverageText: "Arquitetura backend<br>Integra&ccedil;&otilde;es de API<br>Automa&ccedil;&atilde;o<br>IA aplicada e RAG<br>Nuvem e implanta&ccedil;&atilde;o<br>Pipelines de dados",
    sectionPatrick: "Patrick",
    aboutTitle: "Sobre o engenheiro",
    aboutIntro: "Sou Patrick Araujo, Engenheiro de Software Backend baseado em Belo Horizonte, Brasil. Trabalho com plataformas backend, sistemas internos, IA aplicada, integra&ccedil;&otilde;es, pipelines de dados, automa&ccedil;&atilde;o e infraestrutura em nuvem. Minha atua&ccedil;&atilde;o profissional inclui sistemas operacionais, administrativos, financeiros, de invent&aacute;rio, relat&oacute;rios e atendimento ao cliente.",
    aboutDetail: "Esta p&aacute;gina inicial &eacute; uma vis&atilde;o geral. A p&aacute;gina Sobre traz a trajet&oacute;ria profissional e o stack, Projetos apresenta material espec&iacute;fico de implementa&ccedil;&atilde;o e Certifica&ccedil;&otilde;es documenta forma&ccedil;&atilde;o e desenvolvimento t&eacute;cnico cont&iacute;nuo.",
    explore: "Explorar o site",
    profile: "Perfil / 01",
    about: "Sobre",
    systems: "Sistemas / 02",
    projects: "Projetos",
    writing: "Conte&uacute;do / 03",
    blog: "Blog",
    learning: "Aprendizado / 04",
    certifications: "Certifica&ccedil;&otilde;es",
    privacy: "Pol&iacute;tica de Privacidade",
    terms: "Termos de Uso",
    editorial: "Pol&iacute;tica Editorial",
    credits: "Cr&eacute;ditos",
    projectLinks: ["/pt/projetos/lavc-systems/", "/pt/projetos/integracoes-api/", "/pt/projetos/autotrader/", "/pt/projetos/skylet-assistant/"],
    routeLinks: ["/pt/sobre/", "/pt/projetos/", "/pt/blog/", "/certifications/"]
  },
  es: {
    title: "Patrick Araujo | Ingenier&iacute;a Backend, IA e Integraciones",
    description: "Patrick Araujo es Ingeniero de Software Backend y desarrolla IA aplicada, integraciones de API, automatizaci&oacute;n, pipelines de datos y sistemas operativos escalables.",
    socialDescription: "Ingeniero backend que crea sistemas de IA aplicada, integraciones de API, automatizaci&oacute;n de flujos, pipelines de datos y software operativo confiable.",
    role: "Ingeniero de Software Backend",
    hero: "Dise&ntilde;o <strong>sistemas backend, IA aplicada, automatizaci&oacute;n e integraciones de API</strong> para entornos operativos reales &mdash; con flujos de datos trazables, ejecuci&oacute;n observable y software que puede seguir evolucionando tras la implementaci&oacute;n.",
    sectionSystems: "Sistemas",
    buildTitle: "Lo que construyo",
    buildIntro: "Mi trabajo se sit&uacute;a entre la ingenier&iacute;a backend y la operaci&oacute;n diaria. Creo software que conecta plataformas, mueve datos entre sistemas, automatiza procesos repetitivos y brinda a los equipos una visi&oacute;n m&aacute;s clara de sus flujos de trabajo.",
    buildDetail: "La arquitectura cambia con el problema, pero las prioridades se mantienen: l&iacute;mites claros, ejecuci&oacute;n reproducible, modos de fallo controlados, registros &uacute;tiles y contexto suficiente para mantener el sistema sin tratar la producci&oacute;n como una caja negra.",
    platform: "Plataformas backend",
    platformText: "FastAPI, Node.js, TypeScript, PostgreSQL, autenticaci&oacute;n, colas, cach&eacute;, herramientas internas y l&iacute;mites de servicio orientados a requisitos operativos.",
    integration: "Integraci&oacute;n de sistemas",
    integrationText: "APIs REST, OAuth, webhooks, conexiones con ERP y CRM, ingesta idempotente, workers de sincronizaci&oacute;n y pipelines de datos reprocesables.",
    ai: "IA aplicada",
    aiText: "RAG, asistentes contextuales, flujos multiagente, memoria vectorial, ejecuci&oacute;n controlada de herramientas, fallback y procesos de IA observables.",
    automation: "Automatizaci&oacute;n y datos",
    automationText: "Tareas programadas, ETL, validaci&oacute;n, pipelines de reportes, dashboards, reglas de negocio y flujos que sustituyen operaciones manuales repetitivas.",
    sectionWork: "Trabajo",
    workTitle: "Sistemas seleccionados",
    workIntro: "Los proyectos siguientes no son demostraciones visuales aisladas. Documentan decisiones de implementaci&oacute;n, flujos de datos, responsabilidades del sistema y las restricciones de ingenier&iacute;a detr&aacute;s de cada construcci&oacute;n.",
    lavc: "Orquestaci&oacute;n multiagente, ejecuci&oacute;n Kanban, conocimiento RAG, memoria vectorial, modelos locales y observabilidad en tiempo real.",
    pipeline: "Ingesta reprocesable de APIs operativas con normalizaci&oacute;n, identificadores idempotentes, persistencia SQL y ejecuci&oacute;n programada.",
    autotrader: "Paper trading aut&oacute;nomo con pron&oacute;sticos de Kronos-base, l&iacute;mites de riesgo de cartera, ejecuci&oacute;n simulada y dashboard p&uacute;blico.",
    skylet: "Asistente contextual con infraestructura Cloudflare, RAG manual, conversaci&oacute;n multiling&uuml;e, sesiones, cach&eacute; y fallback de proveedores.",
    sectionWriting: "Contenido",
    writingTitle: "Contexto t&eacute;cnico",
    writingIntro: "El portafolio muestra sistemas terminados. En el blog ampl&iacute;o el razonamiento detr&aacute;s de ellos: patrones backend, APIs, automatizaci&oacute;n, infraestructura cloud, herramientas de desarrollo, IA aplicada, flujos de datos y decisiones pr&aacute;cticas al construir y mantener software.",
    notesTitle: "Notas de ingenier&iacute;a m&aacute;s all&aacute; de la p&aacute;gina del proyecto.",
    notesText: "Los art&iacute;culos documentan detalles de implementaci&oacute;n, explican tecnolog&iacute;as en contexto, comparan enfoques y mantienen un registro p&uacute;blico de lo que estoy probando o mejorando. El objetivo es material t&eacute;cnico &uacute;til, no una segunda copia del curr&iacute;culum.",
    openBlog: "Abrir el blog",
    coverage: "Cobertura",
    coverageText: "Arquitectura backend<br>Integraciones de API<br>Automatizaci&oacute;n<br>IA aplicada y RAG<br>Nube y despliegue<br>Pipelines de datos",
    sectionPatrick: "Patrick",
    aboutTitle: "Sobre el ingeniero",
    aboutIntro: "Soy Patrick Araujo, Ingeniero de Software Backend radicado en Belo Horizonte, Brasil. Trabajo con plataformas backend, sistemas internos, IA aplicada, integraciones, pipelines de datos, automatizaci&oacute;n e infraestructura cloud. Mi experiencia profesional incluye sistemas operativos, administrativos, financieros, de inventario, reportes y atenci&oacute;n al cliente.",
    aboutDetail: "Esta p&aacute;gina de inicio es una visi&oacute;n general. La p&aacute;gina Sobre contiene la trayectoria profesional y el stack, Proyectos presenta material espec&iacute;fico de implementaci&oacute;n y Certificaciones documenta la formaci&oacute;n y el desarrollo t&eacute;cnico continuo.",
    explore: "Explorar el sitio",
    profile: "Perfil / 01",
    about: "Sobre",
    systems: "Sistemas / 02",
    projects: "Proyectos",
    writing: "Contenido / 03",
    blog: "Blog",
    learning: "Aprendizaje / 04",
    certifications: "Certificaciones",
    privacy: "Pol&iacute;tica de Privacidad",
    terms: "T&eacute;rminos de Uso",
    editorial: "Pol&iacute;tica Editorial",
    credits: "Cr&eacute;ditos",
    projectLinks: ["/es/proyectos/lavc-systems/", "/es/proyectos/integraciones-api/", "/es/proyectos/autotrader/", "/es/proyectos/skylet-assistant/"],
    routeLinks: ["/es/sobre/", "/es/proyectos/", "/es/blog/", "/certifications/"]
  }
};

const english = copy.en;

const htmlEntities = {
  amp: "&", aacute: "á", acirc: "â", agrave: "à", atilde: "ã", ccedil: "ç",
  eacute: "é", ecirc: "ê", iacute: "í", ntilde: "ñ", oacute: "ó", ocirc: "ô",
  otilde: "õ", uacute: "ú", uuml: "ü", mdash: "—"
};

function decodeHtml(value) {
  return String(value).replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, key) => {
    if (key[0] === "#") {
      const radix = key[1].toLowerCase() === "x" ? 16 : 10;
      const point = Number.parseInt(key.slice(radix === 16 ? 2 : 1), radix);
      return Number.isFinite(point) ? String.fromCodePoint(point) : entity;
    }
    return htmlEntities[key.toLowerCase()] || entity;
  });
}

function replaceRequired(html, from, to) {
  if (!html.includes(from)) throw new Error(`Template text not found: ${from.slice(0, 80)}`);
  return html.replaceAll(from, to);
}

function replaceHeroCopy(html, copyText) {
  const pattern = /(<p class="hero-description">)\s*[\s\S]*?\s*(<\/p>)/;
  if (!pattern.test(html)) throw new Error("Hero description was not found in the template");
  return html.replace(pattern, `$1\n                    ${copyText}\n                $2`);
}

function replaceHeroRole(html, role) {
  const pattern = /(<div class="hero-eyebrow" id="identity-label">)[\s\S]*?(<\/div>)/;
  if (!pattern.test(html)) throw new Error("Hero role was not found in the template");
  return html.replace(pattern, `$1${role}$2`);
}

function replaceWritingNotes(html, copyText) {
  const pattern = /(<div class="writing-main">[\s\S]*?<h3>[\s\S]*?<\/h3>\s*<p>)\s*[\s\S]*?(\s*<\/p>)/;
  if (!pattern.test(html)) throw new Error("Writing notes were not found in the template");
  return html.replace(pattern, `$1\n                                    ${copyText}\n                                </p>`);
}

function replaceWritingCoverage(html, copyText) {
  const pattern = /(<aside class="writing-side">[\s\S]*?<p>)\s*[\s\S]*?(<\/p>)/;
  if (!pattern.test(html)) throw new Error("Writing coverage was not found in the template");
  return html.replace(pattern, `$1${copyText}$2`);
}

function metadata(locale) {
  const route = routes[locale];
  const item = copy[locale];
  const canonical = `${site}${route.path}`;
  const alternates = Object.entries(routes).map(([key, target]) =>
    `    <link rel="alternate" href="${site}${target.path}" hreflang="${key === "pt" ? "pt-BR" : key}">`
  ).join("\n");
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site}/#website`, url: site + "/", name: "Patrick Araujo", alternateName: "PkLavc" },
      { "@type": "ProfilePage", "@id": `${canonical}#profile`, url: canonical, name: decodeHtml(item.title), description: decodeHtml(item.description), mainEntity: { "@id": `${site}/#person` }, inLanguage: route.lang },
      {
        "@type": "Person", "@id": `${site}/#person`, name: "Patrick Araujo", alternateName: "PkLavc", url: site + "/",
        image: `${site}/images/brand/lavc.webp?v=5e84850f26`, jobTitle: "Backend Software Engineer", homeLocation: { "@type": "Place", name: "Belo Horizonte, Minas Gerais, Brazil" },
        areaServed: ["Brazil", "Latin America", "United States", "Europe"],
        sameAs: ["https://github.com/PkLavc", "https://www.linkedin.com/in/pklavc/", "https://www.instagram.com/pklavc/", "https://www.youtube.com/@PkLavc"],
        knowsAbout: sharedExpertise,
        description: "Backend engineer focused on applied AI, systems integration, automation, data pipelines, and operational software."
      }
    ]
  };
  return `
    <link rel="canonical" href="${canonical}">
${alternates}
    <link rel="alternate" href="${site}/" hreflang="x-default">
    <meta property="og:title" content="${item.title}">
    <meta property="og:description" content="${item.socialDescription}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${site}/images/brand/lavc.webp?v=5e84850f26">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Patrick Araujo backend engineering portfolio">
    <meta property="og:site_name" content="Patrick Araujo">
    <meta property="og:locale" content="${route.ogLocale}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${item.title}">
    <meta name="twitter:description" content="${item.socialDescription}">
    <meta name="twitter:image" content="${site}/images/brand/lavc.webp?v=5e84850f26">
    <meta name="twitter:image:alt" content="Patrick Araujo backend engineering portfolio">
    <meta name="twitter:site" content="@PkLavc">
    <meta name="twitter:creator" content="@PkLavc">
    <meta name="geo.region" content="BR-MG">
    <meta name="geo.placename" content="Belo Horizonte, Minas Gerais, Brazil">
    <link rel="search" type="application/opensearchdescription+xml" title="PkLavc" href="/opensearch.xml">
    <script type="application/ld+json" id="home-profile-schema">${JSON.stringify(graph)}</script>`;
}

function localize(html, locale) {
  const item = copy[locale];
  const route = routes[locale];
  let out = html;
  out = replaceRequired(out, '<html lang="en">', `<html lang="${route.lang}">`);
  out = replaceRequired(out, '<meta name="author" content="PkLavc">', '<meta name="author" content="Patrick Araujo">');
  out = replaceRequired(out, '<title>Patrick Araujo | Backend Software Engineer</title>', `<title>${item.title}</title>`);
  out = replaceRequired(out, '<meta name="description" content="Patrick Araujo is a Backend Software Engineer building applied AI systems, backend platforms, API integrations, automations, and data pipelines.">', `<meta name="description" content="${item.description}">`);
  out = replaceRequired(out, '<meta name="robots" content="noindex, nofollow">', '<meta name="robots" content="index, follow">');
  out = replaceRequired(out, '<meta name="googlebot" content="noindex, nofollow">', '<meta name="googlebot" content="index, follow">');
  out = replaceRequired(out, '<div class="identity" id="identity" aria-label="Patrick Araujo">', '<h1 class="identity" id="identity" aria-label="Patrick Araujo">');
  out = replaceRequired(out, '                </div>\n\n                <p class="hero-description">', '                </h1>\n\n                <p class="hero-description">');

  const text = [
    ["Primary technical areas", locale === "pt" ? "Principais &aacute;reas t&eacute;cnicas" : locale === "es" ? "Principales &aacute;reas t&eacute;cnicas" : "Primary technical areas"],
    ["01 / Systems", `01 / ${item.sectionSystems}`], ["What I build", item.buildTitle], ["My work sits between backend engineering and day-to-day operations. I build software that connects platforms, moves data between systems, automates repetitive processes, and gives teams a clearer way to understand what is happening inside their workflows.", item.buildIntro],
    ["The architecture changes with the problem, but the priorities stay consistent: clear boundaries, reproducible execution, controlled failure modes, useful logs, and enough context to maintain the system without treating production behavior as a black box.", item.buildDetail],
    ["Backend platforms", item.platform], ["FastAPI, Node.js, TypeScript, PostgreSQL, authentication, queues, caching, internal tools, and service boundaries built around operational requirements.", item.platformText],
    ["Systems integration", item.integration], ["REST APIs, OAuth, webhooks, ERP and CRM connections, idempotent ingestion, synchronization workers, and replayable data pipelines.", item.integrationText],
    ["Applied AI", item.ai], ["RAG, contextual assistants, multi-agent workflows, vector memory, controlled tool execution, fallback behavior, and observable AI processes.", item.aiText],
    ["Automation &amp; data", item.automation], ["Scheduled jobs, ETL, validation, reporting pipelines, dashboards, business rules, and workflows that replace repetitive manual operations.", item.automationText],
    ["02 / Work", `02 / ${item.sectionWork}`], ["Selected systems", item.workTitle], ["The projects below are not isolated visual demos. They document implementation choices, data flows, system responsibilities, and the engineering constraints behind each build.", item.workIntro],
    ["Multi-agent orchestration, Kanban execution, RAG knowledge, vector memory, local models, and real-time observability.", item.lavc], ["Replayable ingestion across operational APIs with normalization, idempotent identifiers, SQL persistence, and scheduled execution.", item.pipeline], ["Autonomous paper trading with Kronos-base forecasts, portfolio risk limits, simulated execution, and a public dashboard.", item.autotrader], ["A contextual assistant using Cloudflare infrastructure, manual RAG, multilingual conversation, sessions, caching, and provider fallback.", item.skylet],
    ["03 / Writing", `03 / ${item.sectionWriting}`], ["Technical context", item.writingTitle], ["The portfolio shows finished systems. The blog is where I expand the reasoning around them: backend patterns, APIs, automation, cloud infrastructure, developer tooling, applied AI, data workflows, and the practical decisions that appear while building and maintaining software.", item.writingIntro],
    ["Engineering notes beyond the project page.", item.notesTitle], ["Open the blog", item.openBlog], ["Coverage", item.coverage],
    ["04 / Patrick", `04 / ${item.sectionPatrick}`], ["About the engineer", item.aboutTitle], ["I am Patrick Araujo, a Backend Software Engineer based in Belo Horizonte, Brazil. I work with backend platforms, internal systems, applied AI, integrations, data pipelines, automation, and cloud infrastructure. My professional work has involved systems used for operational, administrative, financial, inventory, reporting, and customer-service workflows.", item.aboutIntro], ["This homepage is intentionally an overview. The About page contains the full professional timeline and stack, Projects contains implementation-specific material, and Certifications documents training and continued technical development.", item.aboutDetail],
    ["Explore the site", item.explore], ["Profile / 01", item.profile], [">About<", `>${item.about}<`], ["Systems / 02", item.systems], [">Projects<", `>${item.projects}<`], ["Writing / 03", item.writing], ["Learning / 04", item.learning], [">Certifications<", `>${item.certifications}<`],
    [">Privacy Policy<", `>${item.privacy}<`], [">Terms of Use<", `>${item.terms}<`], [">Editorial Policy<", `>${item.editorial}<`], [">Credits<", `>${item.credits}<`]
  ];
  if (locale !== "en") {
    out = replaceHeroCopy(out, item.hero);
    out = replaceWritingNotes(out, item.notesText);
    out = replaceWritingCoverage(out, item.coverageText);
    for (const [from, to] of text) out = replaceRequired(out, from, to);
    out = replaceHeroRole(out, item.role);
  }

  const englishLinks = copy.en.projectLinks.concat(copy.en.routeLinks);
  const localizedLinks = item.projectLinks.concat(item.routeLinks);
  if (locale !== "en") for (let index = 0; index < englishLinks.length; index += 1) out = replaceRequired(out, `href="${englishLinks[index]}"`, `href="${localizedLinks[index]}"`);

  out = replaceRequired(out, '    <meta name="theme-color" content="#07090d">', `${metadata(locale)}\n    <meta name="theme-color" content="#07090d">`);

  return out;
}

for (const locale of Object.keys(routes)) {
  const target = path.join(root, routes[locale].file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, localize(source, locale), "utf8");
  console.log(`Wrote ${path.relative(root, target)}`);
}
