/**
 * Skylet is the PkLavc site's assistant, not a general-purpose AI.
 * Keep out-of-scope requests and common site-navigation questions entirely
 * local, without Cloudflare Workers AI, Groq, OpenRouter, D1 or KV calls.
 */
type SkyletLanguage = "pt" | "en" | "es";
type QuickAnswer = { reply: string; reason: string };

export function skyletLanguage(text: string): SkyletLanguage {
  const value = normalizedSkyletText(text);
  // Language detection also tolerates one-character errors in common cues.
  if (["hola", "gracias", "quien", "donde", "cual", "tienda", "articulos", "sitio"]
    .some(term => siteTokens(value).some(word => tokenMatches(word, term)))) return "es";
  if (["oi", "ola", "voce", "qual", "quais", "quanto", "onde", "como", "sobre",
    "loja", "postagem", "artigo", "materia", "projetos", "visitantes", "preco"]
    .some(term => siteTokens(value).some(word => tokenMatches(word, term)))) return "pt";
  return "en";
}

export function exclusiveSiteReply(text: string): string {
  const language = skyletLanguage(text);
  if (language === "pt") {
    return "A Skylet responde exclusivamente sobre Patrick, o site PkLavc, seus projetos, blog, publicações e loja. Para outros assuntos, utilize outro assistente.";
  }
  if (language === "es") {
    return "Skylet responde exclusivamente sobre Patrick, el sitio PkLavc, sus proyectos, blog, publicaciones y tienda. Para otros temas, utiliza otro asistente.";
  }
  return "Skylet answers only questions about Patrick, the PkLavc website, its projects, blog, posts and store. For other subjects, please use another assistant.";
}

export function skyletDailyLimitReply(text: string): string {
  const language = skyletLanguage(text);
  if (language === "pt") return "A consulta dinâmica da Skylet atingiu o limite diário de proteção. As páginas do site, blog e loja continuam disponíveis. Tente novamente amanhã.";
  if (language === "es") return "La consulta dinámica de Skylet alcanzó el límite diario de protección. El sitio, blog y tienda siguen disponibles. Inténtalo mañana.";
  return "Skylet has reached its daily dynamic-answer safety limit. The website, blog and store remain available. Try again tomorrow.";
}


/** One language-agnostic normalization pass plus bounded Damerau-Levenshtein.
 * Corrections are computed, never enumerated as extra spellings. Cost is
 * bounded by the number of words (max 60) and canonical terms (small).
 */
export function normalizedSkyletText(value: string): string {
  return String(value || "").slice(0, 1800).normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function typoDistance(left: string, right: string, max: number): number {
  if (Math.abs(left.length - right.length) > max) return max + 1;
  if (left === right) return 0;
  const rows: number[][] = [];
  for (let i = 0; i <= left.length; i++) {
    rows[i] = [i];
  }
  for (let j = 1; j <= right.length; j++) rows[0][j] = j;
  for (let i = 1; i <= left.length; i++) {
    let rowMin = max + 1;
    for (let j = 1; j <= right.length; j++) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      let value = Math.min(
        rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && left[i - 1] === right[j - 2] &&
          left[i - 2] === right[j - 1]) {
        value = Math.min(value, rows[i - 2][j - 2] + 1);
      }
      rows[i][j] = value;
      rowMin = Math.min(rowMin, value);
    }
    if (rowMin > max && i > right.length + max) return max + 1;
  }
  return rows[left.length][right.length];
}

const VOCABULARY = {
  owned: ["patrick", "pklavc", "skylet", "lavc", "icaiu"],
  blog: ["blog", "noticia", "noticias", "news", "artigo", "artigos", "articles",
    "article", "post", "posts", "postagem", "postagens", "materia", "materias",
    "publicacoes", "publicaciones", "publication", "publicacao"],
  store: ["loja", "lojas", "store", "shop", "tienda"],
  projects: ["projeto", "projetos", "projects", "project", "proyecto", "proyectos",
    "portfolio", "portafolio"],
  visitors: ["visitantes", "visitas", "visitors", "visitor", "traffic", "trafego"],
  contact: ["contato", "contact", "contacto", "email", "correo"],
  social: ["instagram", "youtube", "tiktok", "pinterest", "bluesky", "threads"],
  navigation: ["onde", "donde", "where", "link", "url", "acessar", "acceso",
    "access", "encontrar", "find", "localizar", "locate", "entrar",
    "contatar", "contact", "visit", "visitar", "ver", "see", "abrir", "open"],
  specific: ["preco", "precos", "price", "prices", "cost", "ultimo", "ultima",
    "latest", "recent", "detalhes", "details", "compare", "comparar", "problema",
    "erro", "bug", "api", "integracao", "integracion", "cupom", "discount",
    "desconto", "guia", "mission", "missao"],
} as const;

function siteTokens(text: string): string[] {
  return normalizedSkyletText(text).split(" ").filter(Boolean).slice(0, 60);
}
function tokenMatches(word: string, canonical: string): boolean {
  if (word === canonical) return true;
  // Small words are too ambiguous for typo correction. Long words may
  // contain one typo or a transposition; never fuzzy-match multiple changes.
  const allowance = canonical.length >= 4 ? 1 : 0;
  return allowance > 0 && Math.abs(word.length - canonical.length) <= allowance
    && typoDistance(word, canonical, allowance) <= allowance;
}
function hasCanonical(text: string, group: keyof typeof VOCABULARY): boolean {
  const words = siteTokens(text);
  return words.some(word => VOCABULARY[group].some(term => tokenMatches(word, term)));
}

const OWNED = /\b(?:patrick(?:\s+(?:araujo|l\.?\s*araujo))?|pklavc|pklavc\.com|skylet|lavc systems|loja do sapo|i[cç]aiu|federico nacucchio)\b/i;
const SITE_CONTEXT = /\b(?:meu|minha|seu|sua|nosso|nossa|este|esta|aqui|nesse|neste|do|da|no|na|your|our|this|here|the|el|la|mi|mis)\s+(?:site|website|web|blog|loja|tienda|store|portfolio|portf[oó]lio|profile|perfil|projects?|projetos?|posts?|postagens?|publica[cç][oõ]es|articles?|artigos?|mat[eé]rias?|not[ií]cias?)\b/i;
const SITE_AREA = /\b(?:blog|loja|store|shop|tienda|portf[oó]lio|portfolio|projetos?|projects?|postagens?|publica[cç][oõ]es|artigos?|articles?|mat[eé]rias?|visitas?|visitantes?|visitors?|contato|contact|bio|redes sociais|social networks|social media|links?|newsletter)\b/i;
const GENERIC_SITE_BUILD = /^(?:como|how|qu[eé]|what|d[oó]nde|onde|teach me|ensine|me explique|explain)\b.{0,90}\b(?:criar|fazer|montar|desenvolver|construir|build|create|make|start|programar)\b.{0,80}\b(?:um|uma|a|an|my|un|una)?\s*(?:site|website|blog|store|shop|loja)\b/i;
const GENERIC_TECH = /^(?:o que [eé]|what is|explique|explain|como funciona|how does)\b.{0,70}\b(?:javascript|python|html|css|api|zoho|cloudflare|gta|rockstar)\b/i;
const GENERIC_OTHER = /\b(?:previs[aã]o do tempo|weather forecast|loteria|lottery|joke|piada|receita de bolo|cake recipe|quanto [eé] 2\s*\+|what is 2\s*\+)\b/i;

export function isSkyletSiteQuestion(text: string): boolean {
  const value = normalizedSkyletText(text);
  if (!value) return false;
  if (OWNED.test(value) || hasCanonical(value, "owned")) return true;
  if (GENERIC_OTHER.test(value) || GENERIC_SITE_BUILD.test(value) || GENERIC_TECH.test(value)) return false;
  // A general request to build something remains unrelated even if the word
  // "blog" or "store" has a typo. Explicit PkLavc questions are allowed.
  if (/^(?:como|how|teach me|ensine|explain|explique)/.test(value)
    && /\b(?:criar|create|build|construir|make|fazer|programar)\b/.test(value)
    && /\b(?:um|uma|a|an|un|una|my)\s+\w+/.test(value)) return false;
  if (SITE_CONTEXT.test(value)) return true;
  return hasCanonical(value, "blog") || hasCanonical(value, "store")
    || hasCanonical(value, "projects") || hasCanonical(value, "visitors")
    || hasCanonical(value, "contact");
}

export function isSkyletShortFollowup(text: string): boolean {
  const value = String(text || "").trim().toLowerCase();
  if (value.length > 100 || GENERIC_OTHER.test(value)) return false;
  // A new generic question beginning "como" or "what" is not a
  // follow-up. Only explicitly referential or short context-dependent
  // continuations may inherit the immediately previous site question.
  return /^(?:e\b|mas\b|isso\b|esse\b|essa\b|aquilo\b|ent[aã]o\b|mais\b|and\b|what about\b|but\b|also\b|how about\b|y\b|pero\b|e quanto custa\b|quanto custa\??$|how much\??$|onde fica\??$|como funciona\??$|where is it\??$|cu[aá]nto cuesta\??$)/i.test(value);
}

export function skyletQuickAnswer(text: string): QuickAnswer | null {
  const q = normalizedSkyletText(text);
  if (!q || !isSkyletSiteQuestion(q)) return null;
  const lang = skyletLanguage(text);
  // Only stable navigation/overview replies are preprogrammed. Topic-specific
  // details, prices, posts and products are passed to the Cloudflare-first AI.
  const navigation = /^(?:blog|store|shop|loja|tienda|contato|contact|projetos|projects|visitantes|visitors)$/.test(q)
    || hasCanonical(q, "navigation") || /\b(?:sobre|about)\b/.test(q);
  const specific = /\b(?:quanto custa|how much|quais produtos|which products|artigo sobre|post sobre|postagem sobre|noticia sobre|como funciona|why|por que)\b/.test(q)
    || hasCanonical(q, "specific");
  if (!navigation || specific || q.length > 150) return null;
  const choices: Array<[RegExp, Record<SkyletLanguage, string>, string]> = [
    [/\b(?:blog|not[ií]cias|news|mat[eé]rias|posts?|postagens?|artigos?|articles?)\b/i, {
      pt: "O blog do PkLavc reúne notícias de Games/GTA e Tecnologia em inglês, português e espanhol: https://pklavc.com/blog/",
      en: "PkLavc publishes Games/GTA and Technology articles in English, Portuguese and Spanish: https://pklavc.com/blog/",
      es: "El blog de PkLavc publica artículos de Games/GTA y Tecnología en inglés, portugués y español: https://pklavc.com/blog/",
    }, "faq:blog"],
    [/\b(?:loja|store|shop|tienda)\b/i, {
      pt: "A loja do PkLavc apresenta produtos com links de afiliados; compras e entregas são feitas nas lojas parceiras: https://pklavc.com/store/",
      en: "The PkLavc store lists affiliate products; purchases and deliveries are handled by partner stores: https://pklavc.com/store/",
      es: "La tienda PkLavc reúne productos de afiliados; las compras y entregas son responsabilidad de las tiendas asociadas: https://pklavc.com/store/",
    }, "faq:store"],
    [/\b(?:contato|contact|email|e-mail|correo)\b/i, {
      pt: "Para entrar em contato pelo site: contact@pklavc.com.",
      en: "Contact through the site: contact@pklavc.com.",
      es: "Contacto a través del sitio: contact@pklavc.com.",
    }, "faq:contact"],
    [/\b(?:visitantes?|visitors?|visitas?)\b/i, {
      pt: "O mapa de visitantes anônimos e as origens de tráfego ficam em https://pklavc.com/pt/visitantes/.",
      en: "The anonymous visitor map and traffic sources are at https://pklavc.com/visitors/.",
      es: "El mapa de visitantes anónimos y fuentes de tráfico está en https://pklavc.com/es/visitantes/.",
    }, "faq:visitors"],
    [/\b(?:projetos?|projects?)\b/i, {
      pt: "Os projetos e exemplos técnicos do Patrick estão no portfólio: https://pklavc.com/.",
      en: "Patrick's software projects and technical examples are available at https://pklavc.com/.",
      es: "Los proyectos y ejemplos técnicos de Patrick están disponibles en https://pklavc.com/.",
    }, "faq:projects"],
  ];
  const categoryGroups: Array<keyof typeof VOCABULARY> = [
    "blog", "store", "contact", "visitors", "projects",
  ];
  for (let i = 0; i < choices.length; i++) {
    const [pattern, replies, reason] = choices[i];
    if (pattern.test(q) || hasCanonical(q, categoryGroups[i])) {
      return { reply: replies[lang], reason };
    }
  }
  return null;
}
