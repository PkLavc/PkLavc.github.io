export const MANUAL_RAG_CONTEXT = [
  "Name: Patrick Araujo.",
  "Primary roles: Backend Software Engineer, API Integration Engineer, Solutions Architect.",
  "Website: https://pklavc.com",
  "About: https://pklavc.com/about/",
  "Projects: https://pklavc.com/projects/",
  "Blog: https://pklavc.com/blog/",
  "GitHub: https://github.com/PkLavc",
  "LinkedIn: https://www.linkedin.com/in/pklavc/",
  "Contact email: contact@pklavc.com",
  "Core stack: Python, Node.js, SQL, JavaScript, PostgreSQL, REST APIs, AWS, Google Cloud, Zoho, Deluge.",
  "Architecture focus: automation, API integrations, ETL pipelines, backend scalability, system design, integration governance.",
  "Measured impact: 8K-12K daily transactions, ~3 hours/day saved per analyst, ~40% faster processing, ~35-40% faster APIs.",
  "Companies: Loja do Sapo, iCaiu, WR Auto Pecas.",
  "Current public credential: Member of GitHub Developer Program.",
  "Education and credentials context is available on About page content and structured SEO metadata.",
];

export const MANUAL_RAG_SECTIONS: Array<{ key: string; keywords: string[]; content: string[] }> = [
  {
    key: "intro",
    keywords: ["who", "quem", "patrick", "pklavc", "about", "sobre", "profile", "perfil"],
    content: [
      "Patrick Araujo is a backend and integration-focused software engineer.",
      "He works on automation systems, API integrations, ETL/data pipelines, and scalable backend architecture.",
      "Portfolio: https://pklavc.com/about/",
    ],
  },
  {
    key: "experience",
    keywords: ["experience", "experiencia", "trabalho", "work", "career", "empresa", "companies"],
    content: [
      "Experience includes roles at Loja do Sapo, iCaiu, and WR Auto Pecas.",
      "Recent roles include Solutions Architect (Backend/Integration focus) and Systems Integration Architect.",
      "Details: https://pklavc.com/about/",
    ],
  },
  {
    key: "projects",
    keywords: ["project", "projeto", "github", "repo", "portfolio", "worker", "saas", "integration"],
    content: [
      "Projects cover Google Auth Worker, Zoho/Hablla/Zenvia/SIGE/Omie integration workers, multi-tenant SaaS backend, monorepo architecture, and security proxy systems.",
      "Projects list: https://pklavc.com/projects/",
      "GitHub profile: https://github.com/PkLavc",
    ],
  },
  {
    key: "blog",
    keywords: ["blog", "article", "artigo", "post", "conteudo", "content"],
    content: [
      "Blog topics include backend automation, multi-tenant SaaS, event-driven APIs, OAuth token management, ETL, monorepo backend architecture, and cloud deployment patterns.",
      "Blog: https://pklavc.com/blog/",
    ],
  },
  {
    key: "contact",
    keywords: ["contact", "contato", "email", "linkedin", "hire", "contratar", "github"],
    content: [
      "Contact: contact@pklavc.com",
      "LinkedIn: https://www.linkedin.com/in/pklavc/",
      "GitHub: https://github.com/PkLavc",
    ],
  },
  {
    key: "certificates",
    keywords: ["certificate", "certificates", "certificado", "certificados", "credential", "credentials", "course", "courses", "curso", "cursos", "education", "educacao", "educação", "formacao", "formação"],
    content: [
      "Publicly highlighted credential: Member of GitHub Developer Program.",
      "Education and impact context is available on the About page, including structured SEO data used by the assistant context layer.",
      "Reference page: https://pklavc.com/about/",
    ],
  },
];