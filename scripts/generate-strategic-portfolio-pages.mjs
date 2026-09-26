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
  "skylet-assistant": {
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
    projects: ["lavc-systems", "skylet-assistant", "codepulse-monorepo", "aegis-sentinel"],
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
    projects: ["lavc-systems", "skylet-assistant", "codepulse-monorepo"],
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
    return locale.blog;
  }
  return `${locale.prefix}/${section}/${slug}/`;
}

function roleRoute(roleKey, localeKey) {
  return `${locales[localeKey].projects}${roleSlugs[roleKey][localeKey]}/`;
}

function projectRoute(projectKey, localeKey) {
  return `${locales[localeKey].projects}${projectKey}/`;
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

function headCommon({ localeKey, title, description, canonical, ogType = "website" }) {
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
    <meta property="og:image" content="${absoluteAssetUrl("images/brand/lavc.webp")}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Brand portrait of backend engineer and automation specialist Patrick Araujo">
    <meta property="og:site_name" content="Patrick Araujo">
    <meta property="og:locale" content="${locale.localeOg}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${absoluteAssetUrl("images/brand/lavc.webp")}">
    <meta name="twitter:image:alt" content="Brand portrait of backend engineer and automation specialist Patrick Araujo">
    <meta name="twitter:site" content="@PkLavc">
    <meta name="twitter:creator" content="@PkLavc">
    <link rel="icon" type="image/svg+xml" href="${absoluteAssetUrl("images/favicon.svg")}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Monoton&family=Poppins:wght@500;600;700&family=Raleway:wght@300&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Monoton&family=Poppins:wght@500;600;700&family=Raleway:wght@300&display=swap"></noscript>
    <link rel="stylesheet" href="${assetUrl("css/global.css")}">
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
    return `https://pklavc.com${locale.blog}`;
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

}

// Blog indexes are owned and deployed by PkLavc/blog. Do not recreate local copies.

updateAboutPage("en", "about/index.html");
updateAboutPage("pt", "pt/sobre/index.html");
updateAboutPage("es", "es/sobre/index.html");

updateSitemap(newRoutes);

console.log(`Generated ${newRoutes.length} strategic pages and updated about pages and sitemap.`);
