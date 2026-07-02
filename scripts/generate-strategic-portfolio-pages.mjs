import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TODAY = "2026-06-30";
const assetVersionCache = new Map();

function assetUrl(relativePath) {
  const normalizedPath = relativePath.replace(/^\/+/, "");
  let version = assetVersionCache.get(normalizedPath);
  if (!version) {
    const filePath = path.join(ROOT, normalizedPath);
    version = crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").slice(0, 10);
    assetVersionCache.set(normalizedPath, version);
  }

  return `/${normalizedPath}?v=${version}`;
}

function absoluteAssetUrl(relativePath) {
  return `https://pklavc.com${assetUrl(relativePath)}`;
}

const locales = {
  en: {
    lang: "en",
    prefix: "",
    home: "/",
    about: "/about/",
    projects: "/projects/",
    blog: "/blog/",
    localeOg: "en_US",
    homeLabel: "Home",
    aboutLabel: "About",
    projectsLabel: "Projects",
    blogLabel: "Blog",
    contactLabel: "Contact",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    emailLabel: "Email",
    footerSponsor: "Sponsor me",
    readArticle: "Read article",
    viewProject: "View project",
    viewProjects: "View projects",
    viewRole: "View role page",
    published: "Published June 30, 2026",
    minutes: "7 min read",
    roleExplorerKicker: "Explore by role",
    roleExplorerTitle: "Projects by hiring focus",
    roleExplorerText: "Use these curated pages to review the same portfolio through the lens of backend, AI, LLM/RAG, API integration, and automation roles.",
    caseTitle: "Case Study Summary",
    caseProblem: "Problem",
    caseSolution: "Solution",
    caseStack: "Stack",
    caseArchitecture: "Architecture",
    caseImpact: "Result or impact",
    caseDemonstrates: "What this project demonstrates",
    caseRoles: "Roles this project applies to"
  },
  pt: {
    lang: "pt-BR",
    prefix: "/pt",
    home: "/pt/",
    about: "/pt/sobre/",
    projects: "/pt/projetos/",
    blog: "/pt/blog/",
    localeOg: "pt_BR",
    homeLabel: "Início",
    aboutLabel: "Sobre",
    projectsLabel: "Projetos",
    blogLabel: "Blog",
    contactLabel: "Contato",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    emailLabel: "E-mail",
    footerSponsor: "Apoiar no GitHub",
    readArticle: "Ler artigo",
    viewProject: "Ver projeto",
    viewProjects: "Ver projetos",
    viewRole: "Ver página por cargo",
    published: "Publicado em 30 de junho de 2026",
    minutes: "7 min de leitura",
    roleExplorerKicker: "Explore por tipo de vaga",
    roleExplorerTitle: "Projetos por área",
    roleExplorerText: "Use estas páginas de curadoria para revisar o mesmo portfólio pelo ângulo de backend, IA, LLM/RAG, integração de APIs e automação.",
    caseTitle: "Resumo do case",
    caseProblem: "Problema",
    caseSolution: "Solução",
    caseStack: "Stack",
    caseArchitecture: "Arquitetura",
    caseImpact: "Resultado ou impacto",
    caseDemonstrates: "O que este projeto demonstra",
    caseRoles: "Cargos aos quais o projeto se aplica"
  },
  es: {
    lang: "es",
    prefix: "/es",
    home: "/es/",
    about: "/es/sobre/",
    projects: "/es/proyectos/",
    blog: "/es/blog/",
    localeOg: "es_ES",
    homeLabel: "Inicio",
    aboutLabel: "Sobre",
    projectsLabel: "Proyectos",
    blogLabel: "Blog",
    contactLabel: "Contacto",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    emailLabel: "Correo",
    footerSponsor: "Apoyar en GitHub",
    readArticle: "Leer artículo",
    viewProject: "Ver proyecto",
    viewProjects: "Ver proyectos",
    viewRole: "Ver página por rol",
    published: "Publicado el 30 de junio de 2026",
    minutes: "7 min de lectura",
    roleExplorerKicker: "Explora por tipo de vacante",
    roleExplorerTitle: "Proyectos por área",
    roleExplorerText: "Usa estas páginas de curaduría para revisar el mismo portafolio desde backend, IA, LLM/RAG, integración de APIs y automatización.",
    caseTitle: "Resumen del caso",
    caseProblem: "Problema",
    caseSolution: "Solución",
    caseStack: "Stack",
    caseArchitecture: "Arquitectura",
    caseImpact: "Resultado o impacto",
    caseDemonstrates: "Qué demuestra este proyecto",
    caseRoles: "Roles a los que aplica este proyecto"
  }
};

const roleSlugs = {
  "backend-python": { en: "backend-python", pt: "backend-python", es: "backend-python" },
  "ai-engineer": { en: "ai-engineer", pt: "engenheiro-ia", es: "ingeniero-ia" },
  "llm-rag": { en: "llm-rag", pt: "llm-rag", es: "llm-rag" },
  "api-integrations": { en: "api-integrations", pt: "integracoes-api", es: "integraciones-api" },
  "python-automation": { en: "python-automation", pt: "automacao-python", es: "automatizacion-python" }
};

const projects = {
  "lavc-systems": {
    repo: "PkLavc/vale-develop-analytics-2026",
    stack: "Python, FastAPI, React, WebSocket, Ollama, LangGraph, ChromaDB",
    roles: "Backend Python, AI Engineer, LLM/RAG Engineer, Python Automation, Backend Software Engineer",
    category: { en: "AI Platform", pt: "Plataforma de IA", es: "Plataforma de IA" },
    title: {
      en: "AI Kanban with RAG and agents using FastAPI",
      pt: "Kanban com IA, RAG e agentes usando FastAPI",
      es: "Kanban con IA, RAG y agentes usando FastAPI"
    },
    summary: {
      en: "Internal platform with Python/FastAPI, React, WebSocket, RAG, vector memory, agents, and local LLMs for task orchestration and operational visibility.",
      pt: "Plataforma interna com Python/FastAPI, React, WebSocket, RAG, memória vetorial, agentes e LLMs locais para orquestração de tarefas e visibilidade operacional.",
      es: "Plataforma interna con Python/FastAPI, React, WebSocket, RAG, memoria vectorial, agentes y LLMs locales para orquestación de tareas y visibilidad operativa."
    }
  },
  "skyler-assistant": {
    stack: "Cloudflare Workers, JavaScript, manual RAG, LLM fallback, Web Speech API",
    roles: "AI Engineer, LLM/RAG Engineer, Backend Software Engineer",
    category: { en: "AI Assistant", pt: "Assistente de IA", es: "Asistente de IA" },
    title: {
      en: "AI assistant with RAG for portfolio and contextual search",
      pt: "Assistente IA com RAG para portfólio e consulta contextual",
      es: "Asistente IA con RAG para portafolio y consulta contextual"
    },
    summary: {
      en: "Multilingual assistant with Cloudflare Workers, manual RAG, provider fallback, and contextual answers about experience, projects, and stack.",
      pt: "Assistente multilíngue com Cloudflare Workers, RAG manual, fallback de LLM e consulta sobre experiência, projetos e stack.",
      es: "Asistente multilingüe con Cloudflare Workers, RAG manual, fallback de LLM y consulta sobre experiencia, proyectos y stack."
    }
  },
  "codepulse-monorepo": {
    repo: "PkLavc/codepulse-monorepo",
    stack: "Node.js, JavaScript, HTML, CSS, Playwright, Render",
    roles: "Backend Software Engineer, AI Engineer, Integration Engineer",
    category: { en: "Developer Tooling", pt: "Ferramentas de desenvolvimento", es: "Herramientas de desarrollo" },
    title: {
      en: "CodePulse monorepo for online IDE and backend execution workflows",
      pt: "Monorepo CodePulse para IDE online e fluxos backend de execução",
      es: "Monorepo CodePulse para IDE online y flujos backend de ejecución"
    },
    summary: {
      en: "Online IDE architecture with a Node.js backend, CI-oriented structure, and Playwright coverage for a browser-based developer workflow.",
      pt: "Arquitetura de IDE online com backend Node.js, estrutura orientada a CI e cobertura Playwright para fluxo de desenvolvimento no navegador.",
      es: "Arquitectura de IDE online con backend Node.js, estructura orientada a CI y cobertura Playwright para un flujo de desarrollo en navegador."
    }
  },
  "raw-api-ingestion-pipeline": {
    repo: "operacoesicaiu/icaiu-data",
    stack: "Node.js, GitHub Actions, Supabase, PostgreSQL, SQL, REST APIs",
    roles: "API Integration Engineer, Data/ETL Engineer, Python Automation, Backend Software Engineer",
    category: { en: "Data Engineering", pt: "Engenharia de Dados", es: "Ingeniería de Datos" },
    title: {
      en: "API Integration Pipeline with SQL, Supabase and GitHub Actions",
      pt: "Pipeline de Integração de APIs com SQL, Supabase e GitHub Actions",
      es: "Pipeline de integración de APIs con SQL, Supabase y GitHub Actions"
    },
    summary: {
      en: "Collection, normalization, and storage of operational API data from external providers for reproducible reporting and SQL analysis.",
      pt: "Coleta, normalização e armazenamento de dados operacionais vindos de APIs externas para relatórios e análises reproduzíveis.",
      es: "Recopilación, normalización y almacenamiento de datos operativos provenientes de APIs externas para reportes y análisis reproducibles."
    }
  },
  "google-auth-worker": {
    repo: "operacoesicaiu/worker-google-auth",
    stack: "JavaScript, GitHub Actions, OAuth, Google APIs",
    roles: "API Integration Engineer, Backend Software Engineer, Python Automation",
    category: { en: "OAuth Worker", pt: "Worker OAuth", es: "Worker OAuth" },
    title: {
      en: "Google OAuth worker for secure integration dispatch",
      pt: "Worker OAuth Google para disparo seguro de integrações",
      es: "Worker OAuth Google para despacho seguro de integraciones"
    },
    summary: {
      en: "Credential orchestration layer that issues Google access tokens and dispatches downstream integration jobs without duplicating auth logic.",
      pt: "Camada de orquestração de credenciais que emite tokens Google e dispara jobs de integração sem duplicar lógica de autenticação.",
      es: "Capa de orquestación de credenciales que emite tokens Google y dispara jobs de integración sin duplicar lógica de autenticación."
    }
  },
  "zoho-integration-worker": {
    repo: "operacoesicaiu/worker-zoho-integration",
    stack: "JavaScript, GitHub Actions, Zoho Creator, Google Sheets, REST APIs",
    roles: "API Integration Engineer, Python Automation, Data/ETL Engineer",
    category: { en: "ETL Worker", pt: "Worker ETL", es: "Worker ETL" },
    title: {
      en: "Zoho Creator integration worker for operational reports",
      pt: "Worker de Integração Zoho Creator para Relatórios Operacionais",
      es: "Worker de integración Zoho Creator para reportes operativos"
    },
    summary: {
      en: "Zoho Creator data extraction, field normalization, and publication of structured operational datasets for reporting workflows.",
      pt: "Extração de dados do Zoho Creator, normalização de campos e publicação de datasets operacionais estruturados para relatórios.",
      es: "Extracción de datos de Zoho Creator, normalización de campos y publicación de datasets operativos estructurados para reportes."
    }
  },
  "omie-integration-worker": {
    repo: "lojadosapo/worker-omie-auth",
    stack: "JavaScript, GitHub Actions, Omie ERP, Google Sheets, REST APIs",
    roles: "API Integration Engineer, Python Automation, Data/ETL Engineer",
    category: { en: "ERP Integration", pt: "Integração ERP", es: "Integración ERP" },
    title: {
      en: "Omie ERP integration for financial and operational data",
      pt: "Integração Omie ERP para Dados Financeiros e Operacionais",
      es: "Integración Omie ERP para datos financieros y operativos"
    },
    summary: {
      en: "ERP integration connecting Omie sales and product APIs to reporting and operational flows.",
      pt: "Integração ERP conectando APIs de vendas e produtos da Omie a relatórios e fluxos operacionais.",
      es: "Integración ERP que conecta APIs de ventas y productos de Omie con reportes y flujos operativos."
    }
  },
  "sige-integration-worker": {
    repo: "operacoesicaiu/worker-sige-auth",
    stack: "JavaScript, GitHub Actions, SIGE ERP, Google Sheets, REST APIs",
    roles: "API Integration Engineer, Python Automation, Data/ETL Engineer",
    category: { en: "ERP Integration", pt: "Integração ERP", es: "Integración ERP" },
    title: {
      en: "SIGE ERP integration for financial and operational flows",
      pt: "Integração SIGE ERP para Fluxos Financeiros e Operacionais",
      es: "Integración SIGE ERP para flujos financieros y operativos"
    },
    summary: {
      en: "Synchronization logic that extracts SIGE ERP orders, transforms billing fields, and prepares consolidated datasets.",
      pt: "Lógica de sincronização que extrai pedidos do SIGE ERP, transforma campos de faturamento e prepara datasets consolidados.",
      es: "Lógica de sincronización que extrae pedidos de SIGE ERP, transforma campos de facturación y prepara datasets consolidados."
    }
  },
  "hablla-integration-worker": {
    repo: "operacoesicaiu/worker-hablla-integration",
    stack: "JavaScript, GitHub Actions, Hablla API, Google Sheets, REST APIs",
    roles: "API Integration Engineer, Python Automation, Data/ETL Engineer",
    category: { en: "Operational Data", pt: "Dados Operacionais", es: "Datos Operativos" },
    title: {
      en: "Hablla integration worker for operational data",
      pt: "Worker de Integração Hablla para Dados Operacionais",
      es: "Worker de integración Hablla para datos operativos"
    },
    summary: {
      en: "Worker that aggregates Hablla records, deduplicates data, and exports clean datasets for operational reporting.",
      pt: "Worker que agrega registros da Hablla, deduplica dados e exporta datasets limpos para relatórios operacionais.",
      es: "Worker que agrega registros de Hablla, deduplica datos y exporta datasets limpios para reportes operativos."
    }
  },
  "zenvia-integration-worker": {
    repo: "operacoesicaiu/worker-zenvia-integration",
    stack: "JavaScript, GitHub Actions, Zenvia Voice, Google Sheets, REST APIs",
    roles: "API Integration Engineer, Python Automation, Data/ETL Engineer",
    category: { en: "Call Analytics", pt: "Dados de Chamadas", es: "Datos de llamadas" },
    title: {
      en: "Zenvia Voice integration worker for call data and dashboards",
      pt: "Worker de Integração Zenvia Voice para Dados de Chamadas e Dashboards",
      es: "Worker de integración Zenvia Voice para datos de llamadas y dashboards"
    },
    summary: {
      en: "Ingestion worker that filters Zenvia call records into analytics-ready datasets and dashboard feeds.",
      pt: "Worker de ingestão que filtra registros de chamadas Zenvia em datasets prontos para análise e dashboards.",
      es: "Worker de ingesta que filtra registros de llamadas Zenvia en datasets listos para análisis y dashboards."
    }
  },
  "multi-tenant-saas-platform": {
    repo: "PkLavc/saas-backend-platform",
    stack: "TypeScript, NestJS, PostgreSQL, Redis, BullMQ, RBAC",
    roles: "Backend Software Engineer, Backend Python-adjacent Architecture, Integration Engineer",
    category: { en: "SaaS Backend", pt: "Backend SaaS", es: "Backend SaaS" },
    title: {
      en: "Multi-tenant SaaS backend with NestJS, Postgres, RBAC and queues",
      pt: "Backend SaaS Multi-Tenant com NestJS, Postgres, RBAC e Filas",
      es: "Backend SaaS multi-tenant con NestJS, Postgres, RBAC y colas"
    },
    summary: {
      en: "SaaS backend design with row-level tenancy, RBAC, background jobs, and queue-based operational boundaries.",
      pt: "Design de backend SaaS com tenancy em nível de linha, RBAC, jobs em segundo plano e limites operacionais por filas.",
      es: "Diseño de backend SaaS con tenancy a nivel de fila, RBAC, jobs en segundo plano y límites operativos por colas."
    }
  },
  "event-driven-integration-service": {
    repo: "PkLavc/event-driven-integration-service",
    stack: "NestJS, BullMQ, OpenTelemetry, Webhooks, HMAC",
    roles: "Backend Software Engineer, API Integration Engineer",
    category: { en: "Event-Driven Service", pt: "Serviço Event-Driven", es: "Servicio event-driven" },
    title: {
      en: "Event-driven service with webhooks, queues and observability",
      pt: "Serviço Event-Driven com Webhooks, Filas e Observabilidade",
      es: "Servicio event-driven con webhooks, colas y observabilidad"
    },
    summary: {
      en: "Webhook processing architecture with HMAC validation, retry-aware queues, and tracing for integration reliability.",
      pt: "Arquitetura de processamento de webhooks com validação HMAC, filas com retry e tracing para confiabilidade de integrações.",
      es: "Arquitectura de procesamiento de webhooks con validación HMAC, colas con retry y tracing para confiabilidad de integraciones."
    }
  },
  "aegis-sentinel": {
    repo: "PkLavc/aegis-sentinel",
    stack: "Python, anomaly detection, automation workflows, observability",
    roles: "Backend Python, AI Engineer, Python Automation, Backend Software Engineer",
    category: { en: "SRE and AI", pt: "SRE e IA", es: "SRE e IA" },
    title: {
      en: "Anomaly detection and autonomous recovery system",
      pt: "Sistema de Detecção de Anomalias e Recuperação Autônoma",
      es: "Sistema de detección de anomalías y recuperación autónoma"
    },
    summary: {
      en: "Python automation system focused on anomaly detection, recovery workflows, and controlled escalation for backend reliability.",
      pt: "Sistema de automação Python focado em detecção de anomalias, fluxos de recuperação e escalonamento controlado para confiabilidade backend.",
      es: "Sistema de automatización Python enfocado en detección de anomalías, flujos de recuperación y escalamiento controlado para confiabilidad backend."
    }
  },
  "cipher-gate-proxy": {
    repo: "PkLavc/cipher-gate",
    stack: "Python, FastAPI, cryptography, AES-256, PII detection",
    roles: "Backend Python, Backend Software Engineer, API Security Engineer",
    category: { en: "API Security", pt: "Segurança de APIs", es: "Seguridad de APIs" },
    title: {
      en: "Zero-trust proxy for encryption, masking and API security",
      pt: "Proxy Zero-Trust para Criptografia, Mascaramento e Segurança de APIs",
      es: "Proxy zero-trust para cifrado, enmascaramiento y seguridad de APIs"
    },
    summary: {
      en: "Python proxy layer for field-level encryption, dynamic masking, PII detection, and safer API data boundaries.",
      pt: "Camada proxy em Python para criptografia em nível de campo, mascaramento dinâmico, detecção de PII e limites mais seguros para dados de APIs.",
      es: "Capa proxy en Python para cifrado a nivel de campo, enmascaramiento dinámico, detección de PII y límites más seguros para datos de APIs."
    }
  },
  "cloud-deployment-showcase": {
    repo: "PkLavc/cloud-deployment-showcase",
    stack: "Docker, Nginx, GitHub Actions, CI/CD, cloud deployment",
    roles: "Backend Software Engineer, Backend Python, Cloud Automation",
    category: { en: "Cloud Deployment", pt: "Deploy Cloud", es: "Deploy Cloud" },
    title: {
      en: "Cloud infrastructure with Docker, Nginx, CI/CD and automated deploy",
      pt: "Infraestrutura Cloud com Docker, Nginx, CI/CD e Deploy Automatizado",
      es: "Infraestructura cloud con Docker, Nginx, CI/CD y deploy automatizado"
    },
    summary: {
      en: "Deployment showcase with container boundaries, Nginx routing, automated CI/CD, and operational deployment patterns.",
      pt: "Showcase de deploy com limites por containers, roteamento Nginx, CI/CD automatizado e padrões operacionais de implantação.",
      es: "Showcase de deploy con límites por contenedores, routing Nginx, CI/CD automatizado y patrones operativos de despliegue."
    }
  }
};

const roles = {
  "backend-python": {
    projects: ["lavc-systems", "raw-api-ingestion-pipeline", "aegis-sentinel", "cipher-gate-proxy", "cloud-deployment-showcase"],
    title: {
      en: "Backend Python Engineer Projects | FastAPI, APIs and Automation",
      pt: "Projetos Backend Python | FastAPI, APIs e Automação",
      es: "Proyectos Backend Python | FastAPI, APIs y automatización"
    },
    h1: {
      en: "Backend Python",
      pt: "Backend Python",
      es: "Backend Python"
    },
    description: {
      en: "Curated backend Python projects focused on FastAPI, REST APIs, PostgreSQL, SQL, automation, integrations, cloud deployment, GitHub Actions, internal systems, and reliability.",
      pt: "Curadoria de projetos Backend Python com foco em FastAPI, APIs REST, PostgreSQL, SQL, automação, integrações, cloud, GitHub Actions, sistemas internos e confiabilidade.",
      es: "Curaduría de proyectos Backend Python enfocados en FastAPI, APIs REST, PostgreSQL, SQL, automatización, integraciones, cloud, GitHub Actions, sistemas internos y confiabilidad."
    },
    technologies: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "SQL", "GitHub Actions", "Docker", "Cloud deployment", "Automation", "Observability"],
    focus: {
      en: "This page is designed for recruiters and technical leads evaluating backend ownership: API design, data persistence, automation boundaries, operational reliability, and deploy readiness.",
      pt: "Esta página é para recrutadores e tech leads avaliarem propriedade backend: design de APIs, persistência de dados, limites de automação, confiabilidade operacional e preparo para deploy.",
      es: "Esta página ayuda a reclutadores y tech leads a evaluar propiedad backend: diseño de APIs, persistencia de datos, límites de automatización, confiabilidad operativa y preparación para deploy."
    }
  },
  "ai-engineer": {
    projects: ["lavc-systems", "skyler-assistant", "codepulse-monorepo", "aegis-sentinel"],
    title: {
      en: "AI Engineer Python Projects | LLMs, Agents and Applied AI",
      pt: "Projetos AI Engineer Python | LLMs, Agentes e IA Aplicada",
      es: "Proyectos AI Engineer Python | LLMs, agentes e IA aplicada"
    },
    h1: {
      en: "AI Engineer",
      pt: "AI Engineer",
      es: "AI Engineer"
    },
    description: {
      en: "Applied AI projects covering LLMs, agents, RAG, vector memory, AI automation, internal assistants, and backend systems that support AI in production-oriented contexts.",
      pt: "Projetos de IA aplicada cobrindo LLMs, agentes, RAG, memória vetorial, automação com IA, assistentes internos e backend para IA em contextos orientados a produção.",
      es: "Proyectos de IA aplicada que cubren LLMs, agentes, RAG, memoria vectorial, automatización con IA, asistentes internos y backend para IA en contextos orientados a producción."
    },
    technologies: ["Python", "FastAPI", "LLMs", "Ollama", "LangGraph", "ChromaDB", "RAG", "Vector memory", "Cloudflare Workers", "WebSocket"],
    focus: {
      en: "The evidence here emphasizes applied AI as a system design problem: permissions, context, memory, task boundaries, observability, and human-readable operation.",
      pt: "A evidência aqui trata IA aplicada como problema de design de sistemas: permissões, contexto, memória, limites de tarefa, observabilidade e operação legível por humanos.",
      es: "La evidencia aquí trata la IA aplicada como un problema de diseño de sistemas: permisos, contexto, memoria, límites de tarea, observabilidad y operación legible por humanos."
    }
  },
  "llm-rag": {
    projects: ["lavc-systems", "skyler-assistant", "codepulse-monorepo"],
    title: {
      en: "LLM and RAG Engineer Projects | Ollama, LangGraph and ChromaDB",
      pt: "Projetos LLM e RAG | Ollama, LangGraph e ChromaDB",
      es: "Proyectos LLM y RAG | Ollama, LangGraph y ChromaDB"
    },
    h1: {
      en: "LLM / RAG Engineer",
      pt: "LLM / RAG Engineer",
      es: "LLM / RAG Engineer"
    },
    description: {
      en: "Projects focused on RAG, local and cloud LLM usage, Ollama, LangGraph, ChromaDB, prompt boundaries, context retrieval, vector memory, and contextual search.",
      pt: "Projetos focados em RAG, LLMs locais e cloud, Ollama, LangGraph, ChromaDB, limites de prompt, recuperação de contexto, memória vetorial e consulta contextual.",
      es: "Proyectos enfocados en RAG, LLMs locales y cloud, Ollama, LangGraph, ChromaDB, límites de prompt, recuperación de contexto, memoria vectorial y consulta contextual."
    },
    technologies: ["RAG", "LLMs", "Ollama", "LangGraph", "ChromaDB", "Embeddings", "Prompt design", "Context retrieval", "Vector memory", "Cloudflare Workers"],
    focus: {
      en: "These projects show how RAG work depends on retrieval quality, permission boundaries, fallback behavior, and clear separation between generated text and deterministic system actions.",
      pt: "Estes projetos mostram que RAG depende de qualidade de recuperação, limites de permissão, comportamento de fallback e separação clara entre texto gerado e ações determinísticas do sistema.",
      es: "Estos proyectos muestran que RAG depende de calidad de recuperación, límites de permiso, fallback y separación clara entre texto generado y acciones determinísticas del sistema."
    }
  },
  "api-integrations": {
    projects: ["raw-api-ingestion-pipeline", "google-auth-worker", "zoho-integration-worker", "hablla-integration-worker", "zenvia-integration-worker", "sige-integration-worker", "omie-integration-worker"],
    title: {
      en: "API Integration Engineer Projects | ETL, Webhooks, SQL and Automation",
      pt: "Projetos de Integração de APIs | ETL, Webhooks, SQL e Automação",
      es: "Proyectos de integración de APIs | ETL, webhooks, SQL y automatización"
    },
    h1: {
      en: "API Integration Engineer",
      pt: "Integração de APIs",
      es: "Integración de APIs"
    },
    description: {
      en: "Integration projects focused on APIs, webhooks, ETL, GitHub Actions, Zoho, Hablla, Zenvia, SIGE, Omie, Google Sheets, Supabase, SQL, idempotency, and operational data.",
      pt: "Projetos de integração com foco em APIs, webhooks, ETL, GitHub Actions, Zoho, Hablla, Zenvia, SIGE, Omie, Google Sheets, Supabase, SQL, idempotência e dados operacionais.",
      es: "Proyectos de integración enfocados en APIs, webhooks, ETL, GitHub Actions, Zoho, Hablla, Zenvia, SIGE, Omie, Google Sheets, Supabase, SQL, idempotencia y datos operativos."
    },
    technologies: ["REST APIs", "Webhooks", "ETL", "GitHub Actions", "Supabase", "PostgreSQL", "SQL", "OAuth", "Google Sheets", "Idempotency"],
    focus: {
      en: "This area is intentionally practical: credentials, retries, collection windows, raw payload retention, normalized reporting datasets, and operational auditability.",
      pt: "Esta área é prática por desenho: credenciais, retries, janelas de coleta, retenção de payload bruto, datasets normalizados para relatórios e auditabilidade operacional.",
      es: "Esta área es práctica por diseño: credenciales, retries, ventanas de recopilación, retención de payload bruto, datasets normalizados para reportes y auditabilidad operativa."
    }
  },
  "python-automation": {
    projects: ["raw-api-ingestion-pipeline", "zoho-integration-worker", "sige-integration-worker", "omie-integration-worker", "lavc-systems", "aegis-sentinel"],
    title: {
      en: "Python Automation Projects | Internal Tools, Jobs and Reliability",
      pt: "Projetos de Automação Python | Jobs, Rotinas e Confiabilidade",
      es: "Proyectos de automatización Python | Jobs, rutinas y confiabilidad"
    },
    h1: {
      en: "Python Automation",
      pt: "Automação Python",
      es: "Automatización Python"
    },
    description: {
      en: "Automation projects focused on internal routines, process automation, pipelines, scheduled jobs, operational backend work, and reliability-oriented execution.",
      pt: "Projetos de automação focados em rotinas internas, automação de processos, pipelines, jobs agendados, backend operacional e execução orientada à confiabilidade.",
      es: "Proyectos de automatización enfocados en rutinas internas, automatización de procesos, pipelines, jobs programados, backend operativo y ejecución orientada a confiabilidad."
    },
    technologies: ["Python", "Automation", "Scheduled jobs", "Pipelines", "ETL", "GitHub Actions", "SQL", "Operational reports", "Internal tools", "Reliability"],
    focus: {
      en: "The common thread is reducing manual operational work through repeatable jobs, observable pipelines, controlled failure handling, and reusable backend routines.",
      pt: "O fio condutor é reduzir trabalho operacional manual com jobs repetíveis, pipelines observáveis, tratamento controlado de falhas e rotinas backend reutilizáveis.",
      es: "El hilo conductor es reducir trabajo operativo manual con jobs repetibles, pipelines observables, manejo controlado de fallas y rutinas backend reutilizables."
    }
  }
};

const blogPosts = [
  {
    slug: "ai-kanban-fastapi-rag-agents",
    role: "ai-engineer",
    project: "lavc-systems",
    category: { en: "AI Platform", pt: "Plataforma de IA", es: "Plataforma de IA" },
    title: {
      en: "How I built an AI Kanban platform with FastAPI, RAG and agents",
      pt: "Como criei uma plataforma Kanban com IA usando FastAPI, RAG e agentes",
      es: "Cómo construí una plataforma Kanban con IA usando FastAPI, RAG y agentes"
    },
    description: {
      en: "Architecture notes from Lavc Systems: FastAPI backend, React UI, local LLMs, RAG, vector memory, agents, WebSocket observability, and task orchestration.",
      pt: "Notas de arquitetura do Lavc Systems: backend FastAPI, UI React, LLMs locais, RAG, memória vetorial, agentes, observabilidade WebSocket e orquestração de tarefas.",
      es: "Notas de arquitectura de Lavc Systems: backend FastAPI, UI React, LLMs locales, RAG, memoria vectorial, agentes, observabilidad WebSocket y orquestación de tareas."
    },
    sections: {
      en: [
        ["The product boundary", "The platform is not a chatbot attached to a board. The Kanban is the operational surface and the agent system is the execution layer behind it. Tasks, logs, context, and status updates must stay connected so the user can understand what the system is doing."],
        ["FastAPI as the control plane", "FastAPI owns the API boundary, task creation, agent calls, document access, and WebSocket events. This keeps model calls, memory access, and UI state behind explicit backend routes instead of spreading orchestration logic into the frontend."],
        ["RAG and memory", "RAG is useful only when retrieval is scoped and auditable. Lavc Systems separates structured records in SQLite from semantic retrieval in ChromaDB, then uses local embeddings and Ollama so internal context can remain on the machine."],
        ["What this demonstrates", "The project demonstrates applied AI engineering, backend design, local LLM orchestration, task observability, and a practical boundary between generated suggestions and system actions."]
      ],
      pt: [
        ["O limite do produto", "A plataforma não é um chatbot acoplado a um quadro. O Kanban é a superfície operacional e o sistema de agentes é a camada de execução por trás dele. Tarefas, logs, contexto e status precisam ficar conectados para o usuário entender o que o sistema está fazendo."],
        ["FastAPI como plano de controle", "O FastAPI concentra a fronteira de API, criação de tarefas, chamadas de agentes, acesso a documentos e eventos WebSocket. Isso mantém chamadas de modelo, memória e estado de UI atrás de rotas explícitas de backend."],
        ["RAG e memória", "RAG só é útil quando a recuperação é bem delimitada e auditável. O Lavc Systems separa registros estruturados em SQLite da busca semântica no ChromaDB, usando embeddings locais e Ollama para manter contexto interno na máquina."],
        ["O que isso demonstra", "O projeto demonstra engenharia de IA aplicada, design backend, orquestração com LLM local, observabilidade de tarefas e separação prática entre sugestões geradas e ações do sistema."]
      ],
      es: [
        ["El límite del producto", "La plataforma no es un chatbot pegado a un tablero. El Kanban es la superficie operativa y el sistema de agentes es la capa de ejecución detrás. Tareas, logs, contexto y estado deben quedar conectados para que el usuario entienda qué hace el sistema."],
        ["FastAPI como plano de control", "FastAPI concentra la frontera de API, creación de tareas, llamadas a agentes, acceso a documentos y eventos WebSocket. Esto mantiene modelo, memoria y estado de UI detrás de rutas explícitas de backend."],
        ["RAG y memoria", "RAG solo es útil cuando la recuperación está delimitada y es auditable. Lavc Systems separa registros estructurados en SQLite de búsqueda semántica en ChromaDB, usando embeddings locales y Ollama para mantener contexto interno en la máquina."],
        ["Qué demuestra", "El proyecto demuestra ingeniería de IA aplicada, diseño backend, orquestación con LLM local, observabilidad de tareas y separación práctica entre sugerencias generadas y acciones del sistema."]
      ]
    }
  },
  {
    slug: "api-integrations-python-sql-github-actions",
    role: "api-integrations",
    project: "raw-api-ingestion-pipeline",
    category: { en: "API Integration", pt: "Integração de APIs", es: "Integración de APIs" },
    title: {
      en: "How I structure API integrations with Python, SQL and GitHub Actions",
      pt: "Como estruturo integrações de APIs com Python, SQL e GitHub Actions",
      es: "Cómo estructuro integraciones de APIs con Python, SQL y GitHub Actions"
    },
    description: {
      en: "A concise pattern for API integrations: credential boundary, raw ingestion, idempotent identifiers, scheduled jobs, SQL modeling, and operational reporting.",
      pt: "Um padrão conciso para integrações de APIs: fronteira de credenciais, ingestão bruta, identificadores idempotentes, jobs agendados, modelagem SQL e relatórios operacionais.",
      es: "Un patrón conciso para integraciones de APIs: frontera de credenciales, ingesta bruta, identificadores idempotentes, jobs programados, modelado SQL y reportes operativos."
    },
    sections: {
      en: [
        ["Start with the boundary", "An integration should have one clear place for credentials, one place for provider calls, and one place for downstream modeling. Mixing these concerns makes retries and audits harder."],
        ["Keep raw payloads", "The raw layer preserves provider responses before business rules change them. SQL views and modeled tables can evolve without losing the original shape of the API response."],
        ["Use idempotent IDs", "Repeated collection windows are normal. External IDs, upserts, and controlled logs let a job replay without duplicating records or hiding partial failures."],
        ["Why GitHub Actions fits", "For lightweight scheduled ingestion, GitHub Actions gives history, manual dispatch, secret storage, and predictable execution without maintaining a permanent worker."]
      ],
      pt: [
        ["Comece pela fronteira", "Uma integração deve ter um lugar claro para credenciais, um para chamadas ao provedor e outro para modelagem downstream. Misturar essas responsabilidades dificulta retries e auditoria."],
        ["Preserve payloads brutos", "A camada raw guarda respostas do provedor antes que regras de negócio as transformem. Views SQL e tabelas modeladas podem evoluir sem perder o formato original da API."],
        ["Use IDs idempotentes", "Janelas repetidas de coleta são normais. IDs externos, upserts e logs controlados permitem replay sem duplicar registros ou esconder falhas parciais."],
        ["Por que GitHub Actions funciona", "Para ingestão leve e agendada, GitHub Actions oferece histórico, execução manual, secrets e previsibilidade sem manter um worker permanente."]
      ],
      es: [
        ["Empieza por la frontera", "Una integración debe tener un lugar claro para credenciales, uno para llamadas al proveedor y otro para modelado downstream. Mezclar responsabilidades complica retries y auditoría."],
        ["Preserva payloads brutos", "La capa raw guarda respuestas del proveedor antes de que reglas de negocio las transformen. Views SQL y tablas modeladas pueden evolucionar sin perder la forma original de la API."],
        ["Usa IDs idempotentes", "Las ventanas repetidas de recopilación son normales. IDs externos, upserts y logs controlados permiten replay sin duplicar registros ni ocultar fallas parciales."],
        ["Por qué GitHub Actions encaja", "Para ingesta ligera y programada, GitHub Actions ofrece historial, ejecución manual, secrets y previsibilidad sin mantener un worker permanente."]
      ]
    }
  },
  {
    slug: "llms-internal-systems-critical-decisions",
    role: "llm-rag",
    project: "skyler-assistant",
    category: { en: "LLM Systems", pt: "Sistemas com LLM", es: "Sistemas con LLM" },
    title: {
      en: "How I use LLMs in internal systems without letting AI control critical decisions",
      pt: "Como uso LLMs em sistemas internos sem deixar a IA tomar decisões críticas",
      es: "Cómo uso LLMs en sistemas internos sin dejar que la IA controle decisiones críticas"
    },
    description: {
      en: "LLMs can summarize, retrieve, draft, and suggest, but critical actions need policy, permissions, audit trails, and deterministic execution paths.",
      pt: "LLMs podem resumir, recuperar contexto, redigir e sugerir, mas ações críticas precisam de política, permissões, auditoria e caminhos determinísticos de execução.",
      es: "Los LLMs pueden resumir, recuperar contexto, redactar y sugerir, pero acciones críticas necesitan política, permisos, auditoría y caminos determinísticos de ejecución."
    },
    sections: {
      en: [
        ["LLM output is a proposal", "The model can help interpret context, draft a response, or explain options. It should not silently approve financial, security, or operational actions."],
        ["Tools need permissions", "Every tool call should have scope, allowed inputs, logging, and a human-readable reason. The system boundary matters more than the model prompt."],
        ["RAG needs source discipline", "Context retrieval should expose where information came from and what it can support. A confident answer without traceable context is not enough for internal workflows."],
        ["Human control stays explicit", "The strongest design pattern is simple: AI accelerates preparation, humans approve high-impact changes, and deterministic services execute the approved action."]
      ],
      pt: [
        ["Saída de LLM é proposta", "O modelo pode ajudar a interpretar contexto, redigir resposta ou explicar opções. Ele não deve aprovar silenciosamente ações financeiras, de segurança ou operacionais."],
        ["Ferramentas precisam de permissão", "Toda chamada de ferramenta precisa de escopo, entradas permitidas, logging e motivo legível. A fronteira do sistema importa mais que o prompt do modelo."],
        ["RAG precisa de disciplina de fonte", "A recuperação de contexto deve mostrar de onde a informação veio e o que ela sustenta. Resposta confiante sem contexto rastreável não basta em fluxos internos."],
        ["Controle humano continua explícito", "O padrão mais forte é simples: IA acelera preparação, humanos aprovam mudanças de alto impacto e serviços determinísticos executam a ação aprovada."]
      ],
      es: [
        ["La salida del LLM es una propuesta", "El modelo puede ayudar a interpretar contexto, redactar una respuesta o explicar opciones. No debe aprobar en silencio acciones financieras, de seguridad u operativas."],
        ["Las herramientas necesitan permisos", "Cada llamada de herramienta necesita alcance, entradas permitidas, logging y una razón legible. La frontera del sistema importa más que el prompt del modelo."],
        ["RAG necesita disciplina de fuentes", "La recuperación de contexto debe mostrar de dónde vino la información y qué sostiene. Una respuesta segura sin contexto rastreable no basta en flujos internos."],
        ["El control humano sigue explícito", "El patrón más fuerte es simple: IA acelera preparación, humanos aprueban cambios de alto impacto y servicios determinísticos ejecutan la acción aprobada."]
      ]
    }
  },
  {
    slug: "fastapi-backends-logs-queues-traceability",
    role: "backend-python",
    project: "lavc-systems",
    category: { en: "Backend Engineering", pt: "Engenharia Backend", es: "Ingeniería Backend" },
    title: {
      en: "Building FastAPI backends with logs, queues and traceability",
      pt: "Como construir backends FastAPI com logs, filas e rastreabilidade",
      es: "Cómo construir backends FastAPI con logs, colas y trazabilidad"
    },
    description: {
      en: "FastAPI backends become easier to operate when requests, jobs, queues, task state, and logs are designed as one traceable workflow.",
      pt: "Backends FastAPI ficam mais fáceis de operar quando requests, jobs, filas, estado de tarefa e logs são desenhados como um fluxo rastreável.",
      es: "Los backends FastAPI son más operables cuando requests, jobs, colas, estado de tarea y logs se diseñan como un flujo rastreable."
    },
    sections: {
      en: [
        ["Routes are not the whole system", "A route starts work; it should not hide the full lifecycle. For longer tasks, the API should create a durable record, enqueue work, and expose status."],
        ["Logs need structure", "Useful logs explain which task ran, which provider or subsystem was called, what failed, and what can be retried without leaking credentials or full payloads."],
        ["Queues create control", "A queue gives the backend a place to apply priority, backoff, retries, and cancellation. It also makes the UI easier to explain because state changes are explicit."],
        ["Traceability supports trust", "When the user can see request, job, logs, output, and next action, the backend becomes understandable instead of opaque."]
      ],
      pt: [
        ["Rotas não são o sistema inteiro", "Uma rota inicia trabalho; ela não deve esconder todo o ciclo de vida. Em tarefas longas, a API deve criar registro durável, enfileirar trabalho e expor status."],
        ["Logs precisam de estrutura", "Logs úteis explicam qual tarefa rodou, qual provedor ou subsistema foi chamado, o que falhou e o que pode ser tentado novamente sem vazar credenciais ou payloads completos."],
        ["Filas criam controle", "Uma fila dá ao backend um ponto para aplicar prioridade, backoff, retries e cancelamento. Também facilita explicar a UI porque mudanças de estado ficam explícitas."],
        ["Rastreabilidade sustenta confiança", "Quando o usuário enxerga request, job, logs, saída e próxima ação, o backend fica compreensível em vez de opaco."]
      ],
      es: [
        ["Las rutas no son todo el sistema", "Una ruta inicia trabajo; no debe ocultar todo el ciclo de vida. En tareas largas, la API debe crear un registro durable, encolar trabajo y exponer estado."],
        ["Los logs necesitan estructura", "Logs útiles explican qué tarea corrió, qué proveedor o subsistema fue llamado, qué falló y qué puede reintentarse sin filtrar credenciales o payloads completos."],
        ["Las colas crean control", "Una cola da al backend un punto para aplicar prioridad, backoff, retries y cancelación. También facilita explicar la UI porque los cambios de estado son explícitos."],
        ["La trazabilidad sostiene confianza", "Cuando el usuario ve request, job, logs, salida y siguiente acción, el backend se vuelve comprensible en lugar de opaco."]
      ]
    }
  },
  {
    slug: "operational-reports-apis-etl-sql",
    role: "python-automation",
    project: "raw-api-ingestion-pipeline",
    category: { en: "Data Automation", pt: "Automação de Dados", es: "Automatización de Datos" },
    title: {
      en: "Automating operational reports with APIs, ETL and SQL",
      pt: "Como automatizei relatórios operacionais com APIs, ETL e SQL",
      es: "Automatización de reportes operativos con APIs, ETL y SQL"
    },
    description: {
      en: "A practical reporting pipeline starts with reliable API collection, keeps raw data auditable, and moves business logic into SQL models that can evolve.",
      pt: "Um pipeline de relatórios começa com coleta confiável de APIs, mantém dados brutos auditáveis e leva regras de negócio para modelos SQL que podem evoluir.",
      es: "Un pipeline de reportes empieza con recopilación confiable de APIs, mantiene datos brutos auditables y lleva reglas de negocio a modelos SQL que pueden evolucionar."
    },
    sections: {
      en: [
        ["Reports fail upstream", "A dashboard is only as reliable as the collection layer behind it. Most reporting issues start with missing records, duplicated payloads, expired tokens, or unclear collection windows."],
        ["ETL should be replayable", "A job should be able to run again for the same window without changing the meaning of the dataset. This requires external IDs, upserts, and stored raw responses."],
        ["SQL is the modeling layer", "Once raw payloads are stored, SQL can express joins, filters, and operational definitions without calling the provider again."],
        ["Automation is reliability work", "The goal is not just saving manual effort. The stronger result is a repeatable process with logs, clear failure modes, and data that can be audited."]
      ],
      pt: [
        ["Relatórios falham antes do dashboard", "Um dashboard só é tão confiável quanto a camada de coleta por trás dele. Muitos problemas começam com registros ausentes, payloads duplicados, tokens expirados ou janelas de coleta mal definidas."],
        ["ETL deve aceitar replay", "Um job precisa poder rodar de novo para a mesma janela sem mudar o significado do dataset. Isso exige IDs externos, upserts e respostas brutas armazenadas."],
        ["SQL é a camada de modelagem", "Depois que os payloads brutos estão salvos, SQL expressa joins, filtros e definições operacionais sem chamar o provedor novamente."],
        ["Automação é trabalho de confiabilidade", "O objetivo não é apenas economizar esforço manual. O resultado mais forte é um processo repetível com logs, modos de falha claros e dados auditáveis."]
      ],
      es: [
        ["Los reportes fallan antes del dashboard", "Un dashboard es tan confiable como la capa de recopilación detrás. Muchos problemas empiezan con registros ausentes, payloads duplicados, tokens vencidos o ventanas mal definidas."],
        ["ETL debe aceptar replay", "Un job debe poder correr otra vez para la misma ventana sin cambiar el significado del dataset. Esto exige IDs externos, upserts y respuestas brutas almacenadas."],
        ["SQL es la capa de modelado", "Cuando los payloads brutos están guardados, SQL expresa joins, filtros y definiciones operativas sin llamar al proveedor otra vez."],
        ["Automatización es confiabilidad", "El objetivo no es solo ahorrar esfuerzo manual. El resultado más fuerte es un proceso repetible con logs, modos de falla claros y datos auditables."]
      ]
    }
  }
];

const blogPostExpansions = {
  "ai-kanban-fastapi-rag-agents": {
    en: [
      ["Why Kanban is a useful AI interface", "A Kanban board gives the agent workflow a concrete shape. Instead of asking a user to trust a hidden chain of prompts, each task can expose intent, current status, blockers, generated notes, and final output. That matters because AI work often fails in the middle, not only at the answer. A task can be waiting for retrieval, waiting for a tool result, blocked by missing context, or ready for human review. Modeling those states in the product turns agent behavior into something inspectable."],
      ["Designing agents as backend workers", "The safer pattern is to treat agents as backend workers with narrow responsibilities. A planning agent can break work down, a retrieval step can load context, and a synthesis step can prepare the response, but the API still owns persistence, permissions, logging, and state transitions. This keeps the model from becoming the application. It also makes testing easier, because the workflow can be exercised around inputs, outputs, events, and failure states instead of relying only on prompt snapshots."],
      ["Observability changes the user experience", "WebSocket updates are not only a technical convenience. They let the UI show what changed without forcing the user to refresh or guess whether the system is stuck. When logs, task state, and agent events move together, the product becomes calmer to operate. A user can see that retrieval finished, a model call is running, a validation step failed, or a final answer is waiting. That transparency is what makes an AI system feel like software rather than a black box."]
    ],
    pt: [
      ["Por que Kanban funciona como interface de IA", "Um quadro Kanban dá forma concreta ao fluxo dos agentes. Em vez de pedir que o usuário confie em uma cadeia invisível de prompts, cada tarefa pode mostrar intenção, status atual, bloqueios, notas geradas e saída final. Isso importa porque trabalhos com IA costumam falhar no meio do caminho, não apenas na resposta. Uma tarefa pode estar aguardando recuperação de contexto, resultado de ferramenta, informação ausente ou revisão humana. Modelar esses estados no produto torna o comportamento dos agentes inspecionável."],
      ["Agentes como workers de backend", "O padrão mais seguro é tratar agentes como workers de backend com responsabilidades estreitas. Um agente de planejamento pode quebrar o trabalho, uma etapa de recuperação pode carregar contexto e uma etapa de síntese pode preparar a resposta, mas a API continua responsável por persistência, permissões, logs e transições de estado. Assim o modelo não vira a aplicação inteira. Isso também facilita testes, porque o fluxo pode ser validado por entradas, saídas, eventos e falhas, não apenas por snapshots de prompt."],
      ["Observabilidade muda a experiência", "Atualizações via WebSocket não são só conveniência técnica. Elas permitem que a UI mostre o que mudou sem obrigar o usuário a atualizar a página ou adivinhar se o sistema travou. Quando logs, estado de tarefa e eventos de agentes caminham juntos, o produto fica mais tranquilo de operar. O usuário enxerga que a busca terminou, uma chamada de modelo está rodando, uma validação falhou ou uma resposta final está pronta. Essa transparência faz o sistema de IA parecer software de verdade, não uma caixa preta."]
    ],
    es: [
      ["Por qué Kanban funciona como interfaz de IA", "Un tablero Kanban da una forma concreta al flujo de agentes. En vez de pedir al usuario que confíe en una cadena invisible de prompts, cada tarea puede mostrar intención, estado actual, bloqueos, notas generadas y salida final. Eso importa porque los trabajos con IA suelen fallar en el medio, no solo en la respuesta. Una tarea puede estar esperando recuperación de contexto, resultado de herramienta, información faltante o revisión humana. Modelar esos estados vuelve inspeccionable el comportamiento de los agentes."],
      ["Agentes como workers de backend", "El patrón más seguro es tratar los agentes como workers de backend con responsabilidades estrechas. Un agente de planificación puede dividir el trabajo, una etapa de recuperación puede cargar contexto y una etapa de síntesis puede preparar la respuesta, pero la API sigue controlando persistencia, permisos, logs y transiciones de estado. Así el modelo no se convierte en toda la aplicación. También facilita pruebas, porque el flujo se valida por entradas, salidas, eventos y fallas, no solo por snapshots de prompt."],
      ["La observabilidad cambia la experiencia", "Las actualizaciones por WebSocket no son solo una comodidad técnica. Permiten que la UI muestre qué cambió sin obligar al usuario a refrescar o adivinar si el sistema quedó detenido. Cuando logs, estado de tarea y eventos de agentes avanzan juntos, el producto se vuelve más tranquilo de operar. El usuario ve que la recuperación terminó, una llamada al modelo está corriendo, una validación falló o una respuesta final está lista. Esa transparencia hace que el sistema de IA se sienta como software real, no como una caja negra."]
    ]
  },
  "api-integrations-python-sql-github-actions": {
    en: [
      ["Provider APIs are unstable contracts", "Even well documented APIs change behavior in small ways: optional fields disappear, rate limits move, pagination behaves differently, and tokens expire at awkward times. A good integration expects that drift. The code should isolate provider clients, normalize errors, record response metadata, and make it clear which part of the pipeline failed. That is the difference between a script that works today and an integration that can be maintained next month."],
      ["Scheduling needs operational memory", "A scheduled job needs more than a cron expression. It needs to remember which window it collected, which records were inserted, which records were skipped, and whether a retry is safe. GitHub Actions helps by giving run history and manual dispatch, but the pipeline itself still needs logs and idempotent storage. Without those pieces, a retry can create duplicates or hide the reason a report is incomplete."],
      ["SQL keeps business rules visible", "When the raw API response is saved first, business rules can move into SQL models where they are easier to inspect. Joins, filters, date windows, and status definitions become explicit instead of being buried inside Python transformations. This also makes stakeholder changes easier. If a report definition changes, the integration does not need to recollect every payload; the modeled layer can evolve from the same auditable source."]
    ],
    pt: [
      ["APIs de provedores são contratos instáveis", "Mesmo APIs bem documentadas mudam comportamento em detalhes pequenos: campos opcionais desaparecem, limites de taxa mudam, paginação se comporta de outro jeito e tokens expiram em horários ruins. Uma boa integração espera esse desvio. O código deve isolar clients do provedor, normalizar erros, registrar metadados de resposta e deixar claro qual parte do pipeline falhou. Essa é a diferença entre um script que funciona hoje e uma integração que pode ser mantida no mês seguinte."],
      ["Agendamento precisa de memória operacional", "Um job agendado precisa de mais do que uma expressão cron. Ele precisa lembrar qual janela coletou, quais registros inseriu, quais ignorou e se uma nova tentativa é segura. GitHub Actions ajuda com histórico de execução e disparo manual, mas o pipeline ainda precisa de logs e armazenamento idempotente. Sem isso, um retry pode criar duplicidade ou esconder o motivo de um relatório incompleto."],
      ["SQL deixa regras de negócio visíveis", "Quando a resposta bruta da API é salva primeiro, as regras de negócio podem ir para modelos SQL, onde ficam mais fáceis de inspecionar. Joins, filtros, janelas de data e definições de status ficam explícitos em vez de enterrados em transformações Python. Isso também facilita mudanças de regra. Se a definição de um relatório muda, a integração não precisa coletar todos os payloads de novo; a camada modelada evolui a partir da mesma fonte auditável."]
    ],
    es: [
      ["Las APIs de proveedores son contratos inestables", "Incluso APIs bien documentadas cambian en detalles pequeños: campos opcionales desaparecen, límites de tasa se mueven, la paginación se comporta distinto y los tokens vencen en malos momentos. Una buena integración espera ese desvío. El código debe aislar clientes del proveedor, normalizar errores, registrar metadatos de respuesta y dejar claro qué parte del pipeline falló. Esa es la diferencia entre un script que funciona hoy y una integración mantenible el mes siguiente."],
      ["La programación necesita memoria operativa", "Un job programado necesita más que una expresión cron. Debe recordar qué ventana recopiló, qué registros insertó, cuáles omitió y si un reintento es seguro. GitHub Actions ayuda con historial de ejecución y disparo manual, pero el pipeline todavía necesita logs y almacenamiento idempotente. Sin eso, un retry puede crear duplicados u ocultar la razón de un reporte incompleto."],
      ["SQL deja visibles las reglas de negocio", "Cuando la respuesta bruta de la API se guarda primero, las reglas de negocio pueden pasar a modelos SQL, donde son más fáciles de inspeccionar. Joins, filtros, ventanas de fecha y definiciones de estado quedan explícitos en vez de enterrados en transformaciones Python. Eso también facilita cambios de criterio. Si la definición de un reporte cambia, la integración no necesita recopilar todos los payloads otra vez; la capa modelada evoluciona desde la misma fuente auditable."]
    ]
  },
  "llms-internal-systems-critical-decisions": {
    en: [
      ["The model should not own authority", "Authority belongs to the application, not to the LLM. A model can classify an issue, summarize a document, or draft a recommendation, but the application must decide which tools exist, which inputs are allowed, who can approve an action, and what gets logged. This separation is what prevents prompt text from becoming a security boundary. The model helps with interpretation; deterministic services enforce policy."],
      ["Retrieval needs explicit context windows", "Internal systems usually contain mixed-quality information: old notes, current policies, incomplete tickets, and sensitive records. RAG should not dump all of that into a prompt. Retrieval needs filters, source labels, freshness signals, and a way to show the user what evidence supported the answer. When the system cannot find enough context, the correct behavior is to say that clearly instead of filling the gap with plausible language."],
      ["Approval flows are product design", "Human approval should be visible in the workflow, not hidden as an afterthought. A strong internal AI system shows the proposed action, the evidence, the affected records, and the reason a human is needed. Then it records who approved, when, and what exact deterministic operation was executed. This makes the system useful in real operations because people can trust the path from suggestion to action."]
    ],
    pt: [
      ["O modelo não deve ser dono da autoridade", "A autoridade pertence à aplicação, não ao LLM. Um modelo pode classificar um problema, resumir um documento ou rascunhar uma recomendação, mas a aplicação deve decidir quais ferramentas existem, quais entradas são permitidas, quem aprova uma ação e o que será registrado. Essa separação impede que texto de prompt vire fronteira de segurança. O modelo ajuda na interpretação; serviços determinísticos aplicam a política."],
      ["Recuperação precisa de janelas explícitas", "Sistemas internos costumam ter informação de qualidade mista: notas antigas, políticas atuais, tickets incompletos e registros sensíveis. RAG não deve despejar tudo isso em um prompt. A recuperação precisa de filtros, rótulos de fonte, sinais de frescor e uma forma de mostrar ao usuário quais evidências sustentaram a resposta. Quando o sistema não encontra contexto suficiente, o comportamento correto é dizer isso claramente, não preencher a lacuna com linguagem plausível."],
      ["Fluxos de aprovação são design de produto", "A aprovação humana deve estar visível no fluxo, não escondida como detalhe posterior. Um bom sistema interno com IA mostra a ação proposta, as evidências, os registros afetados e o motivo de uma pessoa ser necessária. Depois registra quem aprovou, quando aprovou e qual operação determinística foi executada. Isso torna o sistema útil em operações reais porque as pessoas conseguem confiar no caminho entre sugestão e ação."]
    ],
    es: [
      ["El modelo no debe poseer la autoridad", "La autoridad pertenece a la aplicación, no al LLM. Un modelo puede clasificar un problema, resumir un documento o redactar una recomendación, pero la aplicación debe decidir qué herramientas existen, qué entradas se permiten, quién aprueba una acción y qué se registra. Esa separación evita que el texto del prompt sea una frontera de seguridad. El modelo ayuda a interpretar; los servicios determinísticos aplican la política."],
      ["La recuperación necesita ventanas explícitas", "Los sistemas internos suelen contener información de calidad mixta: notas antiguas, políticas actuales, tickets incompletos y registros sensibles. RAG no debe volcar todo eso en un prompt. La recuperación necesita filtros, etiquetas de fuente, señales de frescura y una forma de mostrar al usuario qué evidencia sostuvo la respuesta. Cuando el sistema no encuentra contexto suficiente, el comportamiento correcto es decirlo claramente, no llenar el vacío con lenguaje plausible."],
      ["Los flujos de aprobación son diseño de producto", "La aprobación humana debe estar visible en el flujo, no escondida como un detalle posterior. Un buen sistema interno con IA muestra la acción propuesta, la evidencia, los registros afectados y la razón por la que una persona es necesaria. Luego registra quién aprobó, cuándo y qué operación determinística fue ejecutada. Eso hace que el sistema sea útil en operaciones reales porque las personas pueden confiar en el camino entre sugerencia y acción."]
    ]
  },
  "fastapi-backends-logs-queues-traceability": {
    en: [
      ["Traceability starts at request creation", "The first useful design decision is to create a stable identifier as soon as work enters the system. That identifier should follow the request, queue item, worker logs, provider calls, generated output, and final status. Without it, debugging becomes a search problem across unrelated logs. With it, the backend can answer simple operational questions: what started, what ran, what failed, what retried, and what the user can do next."],
      ["Queues make failures easier to reason about", "A queue is not only for scale. It gives the backend a controlled place to pause, retry, cancel, and prioritize work. If a provider is down, the system can back off. If a task is no longer relevant, it can be cancelled. If two jobs compete for the same resource, priority can be explicit. That control is difficult when every route tries to do long-running work synchronously."],
      ["Logs should be useful without being dangerous", "Operational logs should help a developer understand behavior without exposing credentials, private payloads, or full model prompts. The useful pattern is structured logging with task IDs, subsystem names, status codes, timing, and short error summaries. Sensitive data stays out of the log line, while enough context remains for diagnosis. This balance is especially important in systems that call third-party APIs or local AI services."]
    ],
    pt: [
      ["Rastreabilidade começa na criação do request", "A primeira decisão útil é criar um identificador estável assim que o trabalho entra no sistema. Esse identificador deve acompanhar request, item de fila, logs do worker, chamadas a provedores, saída gerada e status final. Sem isso, debug vira uma busca em logs desconectados. Com isso, o backend consegue responder perguntas operacionais simples: o que iniciou, o que rodou, o que falhou, o que tentou de novo e qual é a próxima ação do usuário."],
      ["Filas tornam falhas mais fáceis de entender", "Uma fila não serve apenas para escala. Ela dá ao backend um ponto controlado para pausar, tentar de novo, cancelar e priorizar trabalho. Se um provedor está fora, o sistema pode aplicar backoff. Se uma tarefa deixou de ser relevante, pode ser cancelada. Se dois jobs disputam o mesmo recurso, a prioridade fica explícita. Esse controle é difícil quando cada rota tenta executar trabalho longo de forma síncrona."],
      ["Logs devem ser úteis sem serem perigosos", "Logs operacionais devem ajudar um desenvolvedor a entender comportamento sem expor credenciais, payloads privados ou prompts completos. O padrão útil é logging estruturado com IDs de tarefa, nomes de subsistema, status codes, tempo de execução e resumos curtos de erro. Dados sensíveis ficam fora da linha de log, mas o contexto necessário para diagnóstico permanece. Esse equilíbrio é especialmente importante em sistemas que chamam APIs externas ou serviços locais de IA."]
    ],
    es: [
      ["La trazabilidad empieza al crear el request", "La primera decisión útil es crear un identificador estable cuando el trabajo entra al sistema. Ese identificador debe acompañar request, item de cola, logs del worker, llamadas a proveedores, salida generada y estado final. Sin eso, depurar se vuelve una búsqueda en logs desconectados. Con eso, el backend puede responder preguntas operativas simples: qué empezó, qué corrió, qué falló, qué se reintentó y cuál es la siguiente acción del usuario."],
      ["Las colas hacen las fallas más comprensibles", "Una cola no sirve solo para escala. Da al backend un punto controlado para pausar, reintentar, cancelar y priorizar trabajo. Si un proveedor está caído, el sistema puede aplicar backoff. Si una tarea ya no es relevante, puede cancelarse. Si dos jobs compiten por el mismo recurso, la prioridad queda explícita. Ese control es difícil cuando cada ruta intenta ejecutar trabajo largo de forma síncrona."],
      ["Los logs deben ser útiles sin ser peligrosos", "Los logs operativos deben ayudar a un desarrollador a entender comportamiento sin exponer credenciales, payloads privados o prompts completos. El patrón útil es logging estructurado con IDs de tarea, nombres de subsistema, códigos de estado, tiempos y resúmenes cortos de error. Los datos sensibles quedan fuera de la línea de log, pero se conserva contexto suficiente para diagnosticar. Ese equilibrio es especialmente importante en sistemas que llaman APIs externas o servicios locales de IA."]
    ]
  },
  "operational-reports-apis-etl-sql": {
    en: [
      ["A report is a contract, not a screenshot", "Operational reporting should be treated as a repeatable contract. The same input window should produce the same interpreted result, or the system should explain why it changed. This means the pipeline needs collection logs, raw payload storage, transformation rules, and clear definitions for business fields. A static dashboard can look finished while the underlying data path remains fragile. The engineering work is making the path explainable."],
      ["Reconciliation belongs in the pipeline", "Many report problems appear when totals do not match between a provider portal, an internal database, and a dashboard. The pipeline should include reconciliation checks that compare counts, totals, missing IDs, and date ranges. These checks do not need to be fancy to be valuable. Even a simple mismatch table can save hours because it points directly to the broken window or provider response instead of forcing manual inspection."],
      ["Automation should leave room for change", "Reports evolve because the business evolves. New statuses appear, old categories stop mattering, and managers ask different questions. A useful ETL design keeps collection separate from modeling so those changes do not require rewriting the whole pipeline. Python handles collection and repeatable jobs; SQL handles interpretation; the dashboard consumes a stable modeled surface. That separation keeps automation useful after the first version."]
    ],
    pt: [
      ["Relatório é contrato, não screenshot", "Relatórios operacionais devem ser tratados como um contrato repetível. A mesma janela de entrada deve produzir o mesmo resultado interpretado, ou o sistema deve explicar por que mudou. Isso significa que o pipeline precisa de logs de coleta, armazenamento de payload bruto, regras de transformação e definições claras para campos de negócio. Um dashboard estático pode parecer pronto enquanto o caminho dos dados continua frágil. O trabalho de engenharia é tornar esse caminho explicável."],
      ["Reconciliação pertence ao pipeline", "Muitos problemas de relatório aparecem quando totais não batem entre portal do provedor, banco interno e dashboard. O pipeline deve incluir checagens de reconciliação que comparam contagens, totais, IDs ausentes e janelas de data. Essas checagens não precisam ser sofisticadas para ter valor. Até uma tabela simples de divergências economiza horas porque aponta direto para a janela quebrada ou para a resposta do provedor que causou o problema."],
      ["Automação deve deixar espaço para mudança", "Relatórios evoluem porque o negócio evolui. Novos status aparecem, categorias antigas deixam de importar e gestores fazem outras perguntas. Um bom desenho de ETL separa coleta de modelagem para que essas mudanças não exijam reescrever todo o pipeline. Python cuida da coleta e dos jobs repetíveis; SQL cuida da interpretação; o dashboard consome uma superfície modelada estável. Essa separação mantém a automação útil depois da primeira versão."]
    ],
    es: [
      ["Un reporte es un contrato, no una captura", "Los reportes operativos deben tratarse como un contrato repetible. La misma ventana de entrada debe producir el mismo resultado interpretado, o el sistema debe explicar por qué cambió. Eso significa que el pipeline necesita logs de recopilación, almacenamiento de payload bruto, reglas de transformación y definiciones claras para campos de negocio. Un dashboard estático puede parecer terminado mientras la ruta de datos sigue frágil. El trabajo de ingeniería es hacer que esa ruta sea explicable."],
      ["La reconciliación pertenece al pipeline", "Muchos problemas de reporte aparecen cuando los totales no coinciden entre portal del proveedor, base interna y dashboard. El pipeline debe incluir verificaciones de reconciliación que comparen conteos, totales, IDs faltantes y rangos de fecha. Estas verificaciones no necesitan ser sofisticadas para ser valiosas. Incluso una tabla simple de diferencias ahorra horas porque apunta directamente a la ventana rota o a la respuesta del proveedor que causó el problema."],
      ["La automatización debe dejar espacio para cambios", "Los reportes evolucionan porque el negocio evoluciona. Aparecen nuevos estados, viejas categorías dejan de importar y los equipos hacen otras preguntas. Un buen diseño de ETL separa recopilación de modelado para que esos cambios no obliguen a reescribir todo el pipeline. Python maneja recopilación y jobs repetibles; SQL maneja interpretación; el dashboard consume una superficie modelada estable. Esa separación mantiene útil la automatización después de la primera versión."]
    ]
  }
};

const caseDetails = {
  "lavc-systems": {
    problem: {
      en: "Internal work, documents, agent tasks, and operational signals need one local environment instead of scattered prompts and files.",
      pt: "Trabalho interno, documentos, tarefas de agentes e sinais operacionais precisam de um ambiente local integrado, não de prompts e arquivos espalhados.",
      es: "Trabajo interno, documentos, tareas de agentes y señales operativas necesitan un entorno local integrado, no prompts y archivos dispersos."
    },
    solution: {
      en: "A FastAPI and React platform combines Kanban, local LLMs, RAG, vector memory, agent orchestration, scheduler, and WebSocket observability.",
      pt: "Uma plataforma FastAPI e React combina Kanban, LLMs locais, RAG, memória vetorial, orquestração de agentes, scheduler e observabilidade via WebSocket.",
      es: "Una plataforma FastAPI y React combina Kanban, LLMs locales, RAG, memoria vectorial, orquestación de agentes, scheduler y observabilidad vía WebSocket."
    }
  },
  "skyler-assistant": {
    problem: {
      en: "Visitors need fast answers about projects, stack, and experience without reading every portfolio page.",
      pt: "Visitantes precisam de respostas rápidas sobre projetos, stack e experiência sem ler todas as páginas do portfólio.",
      es: "Visitantes necesitan respuestas rápidas sobre proyectos, stack y experiencia sin leer todas las páginas del portafolio."
    },
    solution: {
      en: "A Cloudflare Worker assistant uses manual RAG, multilingual answer rules, fallback behavior, and constrained context about the portfolio.",
      pt: "Um assistente em Cloudflare Worker usa RAG manual, regras multilíngues de resposta, fallback e contexto controlado sobre o portfólio.",
      es: "Un asistente en Cloudflare Worker usa RAG manual, reglas multilingües de respuesta, fallback y contexto controlado sobre el portafolio."
    }
  },
  "raw-api-ingestion-pipeline": {
    problem: {
      en: "Operational reports depend on external APIs with changing payloads, scheduled windows, credentials, and replay needs.",
      pt: "Relatórios operacionais dependem de APIs externas com payloads variáveis, janelas agendadas, credenciais e necessidade de replay.",
      es: "Reportes operativos dependen de APIs externas con payloads variables, ventanas programadas, credenciales y necesidad de replay."
    },
    solution: {
      en: "Node.js workers and GitHub Actions collect API payloads into Supabase SQL raw tables with idempotent identifiers and replayable windows.",
      pt: "Workers Node.js e GitHub Actions coletam payloads em tabelas raw do Supabase SQL com identificadores idempotentes e janelas reproduzíveis.",
      es: "Workers Node.js y GitHub Actions recopilan payloads en tablas raw de Supabase SQL con identificadores idempotentes y ventanas reproducibles."
    }
  }
};

function defaultCase(projectKey) {
  const project = projects[projectKey];
  return {
    problem: {
      en: "The project addresses a backend or integration concern where manual handling, unclear boundaries, or weak observability would make operation harder.",
      pt: "O projeto trata um problema de backend ou integração em que execução manual, limites pouco claros ou baixa observabilidade dificultariam a operação.",
      es: "El proyecto trata un problema de backend o integración donde manejo manual, límites poco claros o baja observabilidad dificultarían la operación."
    },
    solution: {
      en: `The implementation uses ${project.stack} to create a clearer boundary for data, execution, security, and operational review.`,
      pt: `A implementação usa ${project.stack} para criar uma fronteira mais clara para dados, execução, segurança e revisão operacional.`,
      es: `La implementación usa ${project.stack} para crear una frontera más clara para datos, ejecución, seguridad y revisión operativa.`
    }
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toFilePath(route) {
  const clean = route.replace(/^\/|\/$/g, "");
  return path.join(ROOT, clean, "index.html");
}

function writePage(route, html) {
  const filePath = toFilePath(route);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, "utf8");
}

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function writeFile(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
}

function localizedRoute(localeKey, section, slug) {
  const locale = locales[localeKey];
  if (section === "projects") {
    return `${locale.projects}${slug}/`;
  }
  if (section === "blog") {
    return `${locale.blog}${slug}/`;
  }
  return `${locale.prefix}/${section}/${slug}/`;
}

function roleRoute(roleKey, localeKey) {
  return `${locales[localeKey].projects}${roleSlugs[roleKey][localeKey]}/`;
}

function projectRoute(projectKey, localeKey) {
  return `${locales[localeKey].projects}${projectKey}/`;
}

function blogRoute(slug, localeKey) {
  return `${locales[localeKey].blog}${slug}/`;
}

function nav(localeKey) {
  const locale = locales[localeKey];
  return `<div id="navigation-content" role="navigation" aria-label="${escapeHtml(locale.homeLabel)} navigation">
            <div class="logo"></div>
            <div class="navigation-links">
                <a href="${locale.home}" data-text="${escapeHtml(locale.homeLabel.toUpperCase())}" id="home-link">${escapeHtml(locale.homeLabel.toUpperCase())}</a>
                <a href="${locale.about}" data-text="${escapeHtml(locale.aboutLabel.toUpperCase())}" id="about-link">${escapeHtml(locale.aboutLabel.toUpperCase())}</a>
                <a href="${locale.projects}" data-text="${escapeHtml(locale.projectsLabel.toUpperCase())}" id="projects-link">${escapeHtml(locale.projectsLabel.toUpperCase())}</a>
                <a href="${locale.blog}" data-text="BLOG" id="blog-link">BLOG</a>
            </div>
        </div>
        <div id="navigation-bar">
            <div class="menubar">
                <span class="first-span"></span>
                <span class="second-span"></span>
                <span class="third-span"></span>
            </div>
        </div>`;
}

function footer(localeKey) {
  const locale = locales[localeKey];
  return `<footer class="footer-minimal">
        <div class="footer-container">
            <div class="footer-link-list" aria-label="Footer links">
                <a class="footer-link-pill" href="https://github.com/PkLavc" target="_blank" rel="noopener noreferrer">${locale.githubLabel}</a>
                <a class="footer-link-pill" href="https://www.linkedin.com/in/pklavc/" target="_blank" rel="noopener noreferrer">${locale.linkedinLabel}</a>
                <a class="footer-link-pill" href="mailto:contact@pklavc.com">${locale.emailLabel}</a>
            </div>
            <p>&copy; <span data-current-year></span> Patrick Araujo</p>
        </div>
    </footer>`;
}

function scripts() {
  return `<script>
        (function() {
            document.querySelectorAll('[data-current-year]').forEach(function(node) {
                node.textContent = String(new Date().getFullYear());
            });
        }());
    </script>
    <script src="${assetUrl("js/i18n.js")}" defer></script>
    <script src="${assetUrl("js/jquery.min.js")}" defer></script>
    <script src="${assetUrl("js/index.js")}" defer></script>`;
}

function headCommon({ localeKey, title, description, canonical, ogType = "website", article = false }) {
  const locale = locales[localeKey];
  const alternates = [
    `<link rel="alternate" href="${canonicalForRoute(canonical, "en")}" hreflang="en">`,
    `<link rel="alternate" href="${canonicalForRoute(canonical, "pt")}" hreflang="pt-BR">`,
    `<link rel="alternate" href="${canonicalForRoute(canonical, "es")}" hreflang="es">`,
    `<link rel="alternate" href="${canonicalForRoute(canonical, "en")}" hreflang="x-default">`
  ].join("\n    ");

  return `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Patrick Araujo">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    ${alternates}
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="${ogType}">
    ${article ? `<meta property="article:published_time" content="${TODAY}">\n    <meta property="article:modified_time" content="${TODAY}">\n    <meta property="article:author" content="Patrick Araujo">` : ""}
    <meta property="og:image" content="${absoluteAssetUrl("images/lavc.webp")}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Brand portrait of backend engineer and automation specialist Patrick Araujo">
    <meta property="og:site_name" content="Patrick Araujo">
    <meta property="og:locale" content="${locale.localeOg}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${absoluteAssetUrl("images/lavc.webp")}">
    <meta name="twitter:image:alt" content="Brand portrait of backend engineer and automation specialist Patrick Araujo">
    <meta name="twitter:site" content="@PkLavc">
    <meta name="twitter:creator" content="@PkLavc">
    <link rel="icon" type="image/svg+xml" href="${absoluteAssetUrl("images/favicon.svg")}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Monoton&family=Poppins:wght@500;600;700&family=Raleway:wght@300&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Monoton&family=Poppins:wght@500;600;700&family=Raleway:wght@300&display=swap"></noscript>
    <link rel="stylesheet" href="${assetUrl("css/global.css")}">
    <link rel="stylesheet" href="${assetUrl("css/blog.css")}">
    <link rel="stylesheet" href="${assetUrl("css/projects.css")}">`;
}

function canonicalForRoute(currentCanonical, targetLocale) {
  const url = new URL(currentCanonical);
  const parts = url.pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  const locale = locales[targetLocale];

  if (parts[0] === "pt" || parts[0] === "es") {
    parts.shift();
  }

  if (parts[0] === "projects" || parts[0] === "projetos" || parts[0] === "proyectos") {
    const slug = parts[1];
    const roleKey = Object.keys(roleSlugs).find((key) => Object.values(roleSlugs[key]).includes(slug));
    const finalSlug = roleKey ? roleSlugs[roleKey][targetLocale] : slug;
    return `https://pklavc.com${locale.projects}${finalSlug}/`;
  }

  if (parts[0] === "about" || parts[0] === "sobre") {
    return `https://pklavc.com${locale.about}`;
  }

  if (parts[0] === "blog") {
    return `https://pklavc.com${locale.blog}${parts[1] ? `${parts[1]}/` : ""}`;
  }

  return `https://pklavc.com${locale.home}`;
}

function schemaScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 8)}</script>`;
}

function renderRolePage(roleKey, localeKey) {
  const locale = locales[localeKey];
  const role = roles[roleKey];
  const route = roleRoute(roleKey, localeKey);
  const canonical = `https://pklavc.com${route}`;
  const title = role.title[localeKey];
  const description = role.description[localeKey];
  const roleMeta = {
    en: ["Remote roles", "Python", "Backend systems"],
    pt: ["Vagas remotas", "Python", "Sistemas backend"],
    es: ["Roles remotos", "Python", "Sistemas backend"]
  }[localeKey];
  const projectCards = role.projects.map((projectKey) => {
    const project = projects[projectKey];
    return `<article class="blog-related-card role-project-card">
        <h3><a href="${projectRoute(projectKey, localeKey)}">${escapeHtml(project.title[localeKey])}</a></h3>
        <p>${escapeHtml(project.summary[localeKey])}</p>
        <div class="blog-tag-row">
            ${project.stack.split(",").slice(0, 3).map((item) => `<span>${escapeHtml(item.trim())}</span>`).join("\n            ")}
        </div>
    </article>`;
  }).join("\n");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": title,
        "description": description,
        "url": canonical,
        "about": role.technologies,
        "mainEntity": role.projects.map((projectKey) => ({
          "@type": "CreativeWork",
          "name": projects[projectKey].title[localeKey],
          "url": `https://pklavc.com${projectRoute(projectKey, localeKey)}`,
          "description": projects[projectKey].summary[localeKey]
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": locale.homeLabel, "item": `https://pklavc.com${locale.home}` },
          { "@type": "ListItem", "position": 2, "name": locale.projectsLabel, "item": `https://pklavc.com${locale.projects}` },
          { "@type": "ListItem", "position": 3, "name": role.h1[localeKey], "item": canonical }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${locale.lang}">
<head>
    ${headCommon({ localeKey, title, description, canonical })}
    ${schemaScript(schema)}
</head>
<body class="blog-layout seo-layout">
    <div id="breaker"></div>
    <div id="breaker-two"></div>
    <div id="all">
        <div class="cursor"></div>
        ${nav(localeKey)}
        <main class="blog-shell" role="main">
            <div class="blog-columns role-page-columns">
                <div>
                    <article class="blog-post-hero">
                        <div class="blog-breadcrumb" aria-label="Breadcrumb">
                            <a href="${locale.home}">${locale.homeLabel}</a>
                            <span>/</span>
                            <a href="${locale.projects}">${locale.projectsLabel}</a>
                            <span>/</span>
                            <span aria-current="page">${escapeHtml(role.h1[localeKey])}</span>
                        </div>
                        <span class="blog-kicker">${escapeHtml(role.title[localeKey].split("|")[0].trim())}</span>
                        <h1>${escapeHtml(role.h1[localeKey])}</h1>
                        <p>${escapeHtml(description)}</p>
                        <div class="blog-post-meta">
                            ${roleMeta.map((label) => `<span>${escapeHtml(label)}</span>`).join("\n                            ")}
                        </div>
                    </article>
                    <section class="blog-section">
                        <h2>${localeKey === "en" ? "Professional focus" : localeKey === "pt" ? "Foco profissional" : "Foco profesional"}</h2>
                        <p>${escapeHtml(role.focus[localeKey])}</p>
                        <div class="role-tech-list">
                            ${role.technologies.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("\n                            ")}
                        </div>
                    </section>
                    <section class="blog-section">
                        <h2>${localeKey === "en" ? "Related projects" : localeKey === "pt" ? "Projetos relacionados" : "Proyectos relacionados"}</h2>
                        <div class="blog-related-grid">
                            ${projectCards}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>
    ${footer(localeKey)}
    ${scripts()}
</body>
</html>
`;
}

function renderBlogPost(post, localeKey) {
  const locale = locales[localeKey];
  const route = blogRoute(post.slug, localeKey);
  const canonical = `https://pklavc.com${route}`;
  const title = post.title[localeKey];
  const description = post.description[localeKey];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": absoluteAssetUrl("images/lavc.webp"),
        "datePublished": TODAY,
        "dateModified": TODAY,
        "author": { "@type": "Person", "name": "Patrick Araujo" },
        "publisher": { "@type": "Person", "name": "Patrick Araujo" },
        "mainEntityOfPage": canonical,
        "url": canonical,
        "keywords": [post.category.en, "Backend Engineering", "Python", "FastAPI", "API integrations", "LLM", "RAG"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": locale.homeLabel, "item": `https://pklavc.com${locale.home}` },
          { "@type": "ListItem", "position": 2, "name": locale.blogLabel, "item": `https://pklavc.com${locale.blog}` },
          { "@type": "ListItem", "position": 3, "name": title, "item": canonical }
        ]
      }
    ]
  };
  const relatedRole = roleRoute(post.role, localeKey);
  const relatedProject = projectRoute(post.project, localeKey);
  const otherPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const articleSections = [
    ...post.sections[localeKey],
    ...(blogPostExpansions[post.slug]?.[localeKey] || [])
  ];

  return `<!DOCTYPE html>
<html lang="${locale.lang}">
<head>
    ${headCommon({ localeKey, title, description, canonical, ogType: "article", article: true })}
    ${schemaScript(schema)}
</head>
<body class="blog-layout seo-layout">
    <div id="breaker"></div>
    <div id="breaker-two"></div>
    <div id="all">
        <div class="cursor"></div>
        ${nav(localeKey)}
        <main class="blog-shell" role="main">
            <div class="blog-columns">
                <div>
                    <article class="blog-post-hero">
                        <div class="blog-breadcrumb" aria-label="Breadcrumb">
                            <a href="${locale.home}">${locale.homeLabel}</a>
                            <span>/</span>
                            <a href="${locale.blog}">${locale.blogLabel}</a>
                            <span>/</span>
                            <span aria-current="page">${escapeHtml(title)}</span>
                        </div>
                        <span class="blog-kicker">${escapeHtml(post.category[localeKey])}</span>
                        <h1>${escapeHtml(title)}</h1>
                        <p>${escapeHtml(description)}</p>
                        <div class="blog-post-meta">
                            <span>${locale.published}</span>
                            <span>${locale.minutes}</span>
                            <span>${escapeHtml(post.category[localeKey])}</span>
                        </div>
                    </article>
                    <article class="blog-article">
                        ${articleSections.map(([heading, body]) => `<h2>${escapeHtml(heading)}</h2>\n                        <p>${escapeHtml(body)}</p>`).join("\n\n                        ")}
                        <div class="blog-callout">
                            ${localeKey === "en"
                              ? `Related project evidence: <a href="${relatedProject}">${escapeHtml(projects[post.project].title[localeKey])}</a>. Continue with the technical path at <a href="${relatedRole}">${escapeHtml(roles[post.role].h1[localeKey])}</a> or contact me directly.`
                              : localeKey === "pt"
                                ? `Evidência relacionada: <a href="${relatedProject}">${escapeHtml(projects[post.project].title[localeKey])}</a>. Continue pela trilha técnica em <a href="${relatedRole}">${escapeHtml(roles[post.role].h1[localeKey])}</a> ou entre em contato diretamente.`
                                : `Evidencia relacionada: <a href="${relatedProject}">${escapeHtml(projects[post.project].title[localeKey])}</a>. Continua por la ruta técnica en <a href="${relatedRole}">${escapeHtml(roles[post.role].h1[localeKey])}</a> o entra en contacto directamente.`}
                        </div>
                    </article>
                </div>
                <aside class="blog-article-grid">
                    <section class="blog-sidebar-card">
                        <h2>${localeKey === "en" ? "Continue exploring" : localeKey === "pt" ? "Continue explorando" : "Continúa explorando"}</h2>
                        <ul>
                            <li><a href="${relatedRole}">${escapeHtml(roles[post.role].h1[localeKey])}</a></li>
                            <li><a href="${relatedProject}">${escapeHtml(projects[post.project].title[localeKey])}</a></li>
                            <li><a href="mailto:contact@pklavc.com">${locale.contactLabel}</a></li>
                        </ul>
                    </section>
                    <section class="blog-sidebar-card">
                        <h2>${localeKey === "en" ? "Related posts" : localeKey === "pt" ? "Posts relacionados" : "Posts relacionados"}</h2>
                        <ul>
                            ${otherPosts.map((item) => `<li><a href="${blogRoute(item.slug, localeKey)}">${escapeHtml(item.title[localeKey])}</a></li>`).join("\n                            ")}
                        </ul>
                    </section>
                </aside>
            </div>
        </main>
    </div>
    ${footer(localeKey)}
    ${scripts()}
</body>
</html>
`;
}

function roleExplorer(localeKey) {
  const locale = locales[localeKey];
  const cards = Object.keys(roles).map((roleKey) => {
    const role = roles[roleKey];
    return `<article class="project-card project-role-card" role="article">
        <div class="project-header">
            <span class="project-category">${escapeHtml(locale.roleExplorerKicker)}</span>
            <span class="project-tech">${role.technologies.slice(0, 4).map(escapeHtml).join(" | ")}</span>
        </div>
        <h2><a href="${roleRoute(roleKey, localeKey)}">${escapeHtml(role.h1[localeKey])}</a></h2>
        <p>${escapeHtml(role.description[localeKey])}</p>
        <div class="project-features">
            ${role.technologies.slice(0, 3).map((tech) => `<span>${escapeHtml(tech)}</span>`).join("\n            ")}
        </div>
        <div class="project-actions">
            <a href="${roleRoute(roleKey, localeKey)}" class="project-link">${locale.viewRole}</a>
        </div>
    </article>`;
  }).join("\n");

  return `<!-- strategic-role-explorer:start -->
<section class="project-role-explorer" aria-label="${escapeHtml(locale.roleExplorerKicker)}">
    <div class="project-section-heading">
        <span>${escapeHtml(locale.roleExplorerKicker)}</span>
        <h2>${escapeHtml(locale.roleExplorerTitle)}</h2>
        <p>${escapeHtml(locale.roleExplorerText)}</p>
    </div>
    <div class="projects-grid role-card-grid">
        ${cards}
    </div>
</section>
<!-- strategic-role-explorer:end -->`;
}

function blogCards(localeKey) {
  const locale = locales[localeKey];
  return `<!-- strategic-blog-cards:start -->
${blogPosts.map((post) => `<article class="blog-card" role="article">
    <div class="blog-card-meta">
        <span>${escapeHtml(post.category[localeKey])}</span>
        <span>${locale.minutes}</span>
    </div>
    <h3><a href="${blogRoute(post.slug, localeKey)}">${escapeHtml(post.title[localeKey])}</a></h3>
    <p>${escapeHtml(post.description[localeKey])}</p>
    <div class="blog-tag-row">
        <span>Python</span>
        <span>FastAPI</span>
        <span>SEO portfolio</span>
    </div>
    <a class="blog-link" href="${blogRoute(post.slug, localeKey)}">${locale.readArticle}</a>
</article>`).join("\n")}
<!-- strategic-blog-cards:end -->`;
}

function aboutProjectCarousel(localeKey) {
  const locale = locales[localeKey];
  const labels = {
    en: {
      title: "Explore project paths",
      text: "Open curated entry points for AI systems, LLM/RAG, backend architecture, system integration, and Python automation.",
      action: "Open path"
    },
    pt: {
      title: "Explore trilhas de projetos",
      text: "Entre por recortes técnicos de IA, LLM/RAG, arquitetura backend, integrações e automação Python.",
      action: "Abrir trilha"
    },
    es: {
      title: "Explora rutas de proyectos",
      text: "Abre rutas para IA, LLM/RAG, arquitectura backend, integraciones y automatización Python.",
      action: "Abrir ruta"
    }
  }[localeKey];
  const roleOrder = ["ai-engineer", "backend-python", "llm-rag", "api-integrations", "python-automation"];
  const cards = roleOrder.map((roleKey, index) => {
    const role = roles[roleKey];
    return `<a class="about-project-carousel-card" href="${roleRoute(roleKey, localeKey)}" data-carousel-card="${index + 1}">
            <span>${escapeHtml(role.technologies.slice(0, 3).join(" | "))}</span>
            <strong>${escapeHtml(role.h1[localeKey])}</strong>
            <small>${escapeHtml(role.description[localeKey])}</small>
            <em>${escapeHtml(labels.action)}</em>
        </a>`;
  });
  const repeatedCards = cards.map((card) => card.replace("about-project-carousel-card", "about-project-carousel-card is-carousel-clone").replace("<a ", '<a aria-hidden="true" tabindex="-1" '));

  return `<!-- strategic-about-carousel:start -->
<section class="skills-section about-project-carousel-section" aria-labelledby="about-project-carousel-title">
    <div class="about-project-carousel-heading">
        <h2 id="about-project-carousel-title">${escapeHtml(labels.title)}</h2>
        <p>${escapeHtml(labels.text)}</p>
    </div>
    <div class="about-project-carousel" aria-label="${escapeHtml(labels.title)}">
        <div class="about-project-carousel-track">
        ${cards.join("\n        ")}
        ${repeatedCards.join("\n        ")}
        </div>
    </div>
</section>
<!-- strategic-about-carousel:end -->`;
}

function updateBetweenMarkers(content, start, end, replacement, fallbackNeedle) {
  if (content.includes(start) && content.includes(end)) {
    const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`);
    return content.replace(pattern, replacement);
  }

  return content.replace(fallbackNeedle, `${replacement}\n${fallbackNeedle}`);
}

function updateProjectIndex(localeKey, relativePath) {
  let content = readFile(relativePath);
  content = updateBetweenMarkers(
    content,
    "<!-- strategic-role-explorer:start -->",
    "<!-- strategic-role-explorer:end -->",
    roleExplorer(localeKey),
    '<div class="projects-grid">'
  );

  for (const [projectKey, project] of Object.entries(projects)) {
    const href = projectRoute(projectKey, localeKey);
    const hrefPattern = escapeRegExp(href);
    content = content.replace(
      new RegExp(`(<h2><a href="${hrefPattern}">)[\\s\\S]*?(</a></h2>)`),
      `$1${project.title[localeKey]}$2`
    );
    content = content.replace(
      new RegExp(`(href="${hrefPattern}">[\\s\\S]*?</a></h2>[\\s\\S]*?<p>)[\\s\\S]*?(</p>)`),
      `$1${project.summary[localeKey]}$2`
    );
  }

  writeFile(relativePath, content);
}

function updateBlogIndex(localeKey, relativePath) {
  let content = readFile(relativePath);
  content = updateBetweenMarkers(
    content,
    "<!-- strategic-blog-cards:start -->",
    "<!-- strategic-blog-cards:end -->",
    blogCards(localeKey),
    '<article class="blog-card" role="article">'
  );
  writeFile(relativePath, content);
}

function updateAboutPage(localeKey, relativePath) {
  let content = readFile(relativePath);
  content = updateBetweenMarkers(
    content,
    "<!-- strategic-about-carousel:start -->",
    "<!-- strategic-about-carousel:end -->",
    aboutProjectCarousel(localeKey),
    '<div class="skills-section contact-inquiries-section">'
  );
  writeFile(relativePath, content);
}

function caseSection(projectKey, localeKey) {
  const locale = locales[localeKey];
  const project = projects[projectKey];
  const detail = { ...defaultCase(projectKey), ...(caseDetails[projectKey] || {}) };
  const impact = {
    en: "Creates clearer technical evidence without claiming unsupported production metrics or external client outcomes.",
    pt: "Cria evidência técnica mais clara sem declarar métricas de produção ou resultados externos não comprovados.",
    es: "Crea evidencia técnica más clara sin declarar métricas de producción o resultados externos no comprobados."
  }[localeKey];
  const demonstrates = {
    en: `This project demonstrates practical experience with ${project.roles}, including ${project.stack}.`,
    pt: `Este projeto demonstra experiência aplicável a vagas de ${project.roles}, incluindo ${project.stack}.`,
    es: `Este proyecto demuestra experiencia aplicable a roles de ${project.roles}, incluyendo ${project.stack}.`
  }[localeKey];

  return `<!-- strategic-project-case:start -->
<section class="project-case-section" aria-label="${escapeHtml(locale.caseTitle)}">
    <div class="project-case-container">
        <h2>${escapeHtml(locale.caseTitle)}</h2>
        <div class="project-case-grid">
            <article>
                <h3>${escapeHtml(locale.caseProblem)}</h3>
                <p>${escapeHtml(detail.problem[localeKey])}</p>
            </article>
            <article>
                <h3>${escapeHtml(locale.caseSolution)}</h3>
                <p>${escapeHtml(detail.solution[localeKey])}</p>
            </article>
            <article>
                <h3>${escapeHtml(locale.caseStack)}</h3>
                <p>${escapeHtml(project.stack)}</p>
            </article>
            <article>
                <h3>${escapeHtml(locale.caseArchitecture)}</h3>
                <p>${escapeHtml(project.summary[localeKey])}</p>
            </article>
            <article>
                <h3>${escapeHtml(locale.caseImpact)}</h3>
                <p>${escapeHtml(impact)}</p>
            </article>
            <article>
                <h3>${escapeHtml(locale.caseDemonstrates)}</h3>
                <p>${escapeHtml(demonstrates)}</p>
            </article>
            <article class="project-case-wide">
                <h3>${escapeHtml(locale.caseRoles)}</h3>
                <p>${escapeHtml(project.roles)}</p>
            </article>
        </div>
    </div>
</section>
<!-- strategic-project-case:end -->`;
}

function updateProjectCase(projectKey, localeKey) {
  const route = projectRoute(projectKey, localeKey);
  const filePath = toFilePath(route);
  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  const replacement = caseSection(projectKey, localeKey);

  if (content.includes("<!-- strategic-project-case:start -->")) {
    content = updateBetweenMarkers(
      content,
      "<!-- strategic-project-case:start -->",
      "<!-- strategic-project-case:end -->",
      replacement,
      "<main"
    );
  } else {
    content = content.replace(/(<section class="project-hero"[\s\S]*?<\/section>)/, `$1\n\n${replacement}`);
  }

  fs.writeFileSync(filePath, content, "utf8");
}

function updateSitemap(newRoutes) {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");

  for (const route of newRoutes) {
    const loc = `https://pklavc.com${route}`;
    const block = [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      "    <changefreq>monthly</changefreq>",
      "    <priority>0.7</priority>",
      "  </url>"
    ].join("\n");

    if (xml.includes(`<loc>${loc}</loc>`)) {
      xml = xml.replace(
        new RegExp(`(<loc>${escapeRegExp(loc)}</loc>\\s*<lastmod>)([^<]+)(</lastmod>)`),
        `$1${TODAY}$3`
      );
    } else {
      xml = xml.replace("</urlset>", `${block}\n</urlset>`);
    }
  }

  fs.writeFileSync(sitemapPath, xml, "utf8");
}

const newRoutes = [];

for (const localeKey of Object.keys(locales)) {
  for (const roleKey of Object.keys(roles)) {
    const route = roleRoute(roleKey, localeKey);
    writePage(route, renderRolePage(roleKey, localeKey));
    newRoutes.push(route);
  }

  for (const post of blogPosts) {
    const route = blogRoute(post.slug, localeKey);
    writePage(route, renderBlogPost(post, localeKey));
    newRoutes.push(route);
  }
}

updateBlogIndex("en", "blog/index.html");
updateBlogIndex("pt", "pt/blog/index.html");
updateBlogIndex("es", "es/blog/index.html");

updateAboutPage("en", "about/index.html");
updateAboutPage("pt", "pt/sobre/index.html");
updateAboutPage("es", "es/sobre/index.html");

updateSitemap(newRoutes);

console.log(`Generated ${newRoutes.length} strategic pages and updated blog indexes, about pages, and sitemap.`);
