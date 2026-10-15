/**
 * Skylet is the PkLavc site's assistant, not a general-purpose AI.
 * Keep out-of-scope requests and common site-navigation questions entirely
 * local, without Cloudflare Workers AI, Groq, OpenRouter, D1 or KV calls.
 */
type SkyletLanguage = "pt" | "en" | "es";
type QuickAnswer = { reply: string; reason: string };
export type SkyletConversationMessage = { role: "user" | "assistant"; content: string };

// Cap browser-provided context before using it for site-only follow-ups.
export function skyletClientHistory(raw: unknown): SkyletConversationMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(-12).filter(item => item && (item.role === "user" || item.role === "assistant")
    && typeof item.content === "string").map(item => ({
      role: item.role as "user" | "assistant",
      content: String(item.content).slice(0, 700).trim(),
    })).filter(item => !!item.content).slice(-8);
}

export function skyletContextFollowup(text: string, history: SkyletConversationMessage[]): boolean {
  if (!isSkyletShortFollowup(text)) return false;
  return history.filter(item => item.role === "user").slice(-3)
    .some(item => isSkyletSiteQuestion(item.content));
}

export function skyletContextLanguage(text: string, history: SkyletConversationMessage[], locale?: string): SkyletLanguage {
  const previous = [...history].reverse().find(item => item.role === "user");
  return skyletLanguage(text, previous ? skyletLanguage(previous.content, locale) : locale);
}


/** Local, limited fuzzy intent recognition for short Skylet-help questions.
 * Normalization handles accents, punctuation, common chat abbreviations and
 * single-character spelling errors. No exact user utterances are required.
 * High confidence only: longer ambiguous questions keep the site scope policy.
 */
function intentTokens(text: string): string[] {
  const normalized = String(text || "")
    .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
  const abbreviations: Record<string, string[]> = {
    oq: ["o", "que"], oque: ["o", "que"], oqe: ["o", "que"],
    q: ["que"], vc: ["voce"], vcs: ["voce"], c: ["voce"],
    pq: ["porque"], tb: ["tambem"], qt: ["quanto"],
  };
  return normalized.split(/\s+/).filter(Boolean).flatMap(token => abbreviations[token] || [token]).slice(0, 35);
}

function tokenDistance(a: string, b: string, limit: number): number {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    let smallest = next[0];
    for (let j = 1; j <= b.length; j++) {
      const value = Math.min(next[j - 1] + 1, previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      next.push(value);
      smallest = Math.min(smallest, value);
    }
    if (smallest > limit) return limit + 1;
    previous = next;
  }
  return previous[b.length];
}

function hasIntentWord(tokens: string[], dictionary: string[]): boolean {
  return tokens.some(token => dictionary.some(word => {
    if (token === word) return true;
    // One typo for short semantic words, two for longer words. Do not
    // approximate particles or 1-3 letter words to prevent false matches.
    const limit = word.length >= 8 && token.length >= 7 ? 2
      : word.length >= 4 && token.length >= 3 ? 1 : 0;
    return limit > 0 && tokenDistance(token, word, limit) <= limit;
  }));
}

export function isSkyletCapabilitiesQuestion(text: string): boolean {
  const tokens = intentTokens(text);
  if (!tokens.length || tokens.length > 14 || String(text).length > 110) return false;
  const has = (dictionary: string[]) => hasIntentWord(tokens, dictionary);
  // These refer to a real page/product/post, not a general capability query.
  if (has(["gta", "rockstar", "python", "receita", "bolo", "clima", "tempo",
    "matematica", "poema", "historia", "codigo", "musica", "produto", "produtos", "artigo", "artigos",
    "noticia", "noticias", "postagem", "postagens", "preco", "patrick",
    "projeto", "projetos", "loja", "site", "blog"])) return false;
  const ptAbility = has(["pode", "consegue", "sabe", "posso", "capaz"]);
  const ptAction = has(["falar", "fala", "responder", "responde", "ajudar",
    "ajuda", "fazer", "faz", "perguntar", "pergunto", "conversar"]);
  const enAbility = has(["can", "could", "able"]);
  const enAction = has(["talk", "speak", "answer", "help", "ask", "do"]);
  const esAbility = has(["puedes", "puede", "sabes", "puedo"]);
  const esAction = has(["hablar", "responder", "hacer", "ayudar", "preguntar"]);
  const questions = has(["que", "quais", "qual", "what", "which", "como",
    "how", "sobre", "about", "assuntos", "assunto", "topics", "temas", "ayuda"]);
  const addressed = has(["voce", "skylet", "you", "tu", "usted"]);
  const scopeNouns = has(["assunto", "assuntos", "temas", "topics", "questions",
    "perguntas", "duvidas", "capacidades", "abilities", "capabilities",
    "funcao", "funcoes", "function", "funciones", "funcion"]);
  return (
    (ptAbility && ptAction && (questions || addressed))
    || (enAbility && enAction && (questions || addressed))
    || (esAbility && esAction && (questions || addressed))
    || (addressed && questions && tokens.length <= 6
      && (ptAction || enAction || esAction || scopeNouns))
    || (scopeNouns && questions && (has(["responde", "falar", "talk", "answer",
        "perguntar", "ask", "preguntar", "hablar"]) || addressed))
  );
}

export function skyletCapabilitiesReply(text: string, preferred?: string): string {
  const language = skyletLanguage(text, preferred);
  if (language === "pt") {
    return "Posso ajudar com informações sobre Patrick Araujo e o PkLavc: projetos, experiência profissional, blog de Games e Tech, matérias publicadas, loja de afiliados e formas de contato. Pode perguntar sobre um produto, uma notícia ou um projeto específico. Para outros assuntos, não ofereço respostas.";
  }
  if (language === "es") {
    return "Puedo ayudarte con información sobre Patrick Araujo y PkLavc: proyectos, experiencia profesional, blog de Games y Tech, artículos publicados, tienda de afiliados y contacto. Puedes preguntar por un producto, noticia o proyecto específico. No respondo a temas ajenos al sitio.";
  }
  return "I can help with Patrick Araujo and PkLavc: projects, professional experience, Games and Tech articles, affiliate products and contact information. Ask me about a specific product, article or project. I don't answer unrelated questions.";
}

export function skyletLanguage(text: string, preferred?: string): SkyletLanguage {
  // Normalize accented letters before matching word boundaries; plain JS
  // \b considers é/á outside a word and mislabels Spanish/Portuguese replies.
  const value = String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (/\b(?:hola|gracias|quien|donde|cual|cuanto|que hora|acerca de|sitio web|tienda|publicaciones|articulos|precios|misiones|puedes|puedo|hablar|hacer|preguntar|respuestas|ejemplos|ejemplo|que hay)\b/.test(value)) return "es";
  if (/\b(?:oi|ola|bom dia|boa noite|voce|vc|vcs|qual|quais|quanto|onde|como|nao|sobre|loja|postagem|artigo|materia|projetos|visitantes|portfolio|preco|contato|falar|fala|responder|responde|pode|consegue|ajuda|oq|oque|oqe|exemplos|exemplo|detalhes|tambem|isso|diga|mostre|materias|outras|outro|outra|anterior)\b/.test(value)) return "pt";
  return preferred === "pt" || preferred === "es" ? preferred : "en";
}

export function exclusiveSiteReply(text: string, preferred?: string): string {
  const language = skyletLanguage(text, preferred);
  if (language === "pt") {
    return "A Skylet responde exclusivamente sobre Patrick, o site PkLavc, seus projetos, blog, publicações e loja. Para outros assuntos, utilize outro assistente.";
  }
  if (language === "es") {
    return "Skylet responde exclusivamente sobre Patrick, el sitio PkLavc, sus proyectos, blog, publicaciones y tienda. Para otros temas, utiliza otro asistente.";
  }
  return "Skylet answers only questions about Patrick, the PkLavc website, its projects, blog, posts and store. For other subjects, please use another assistant.";
}

export function skyletDailyLimitReply(text: string, preferred?: string): string {
  const language = skyletLanguage(text, preferred);
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
  if (isSkyletCapabilitiesQuestion(text)) return true;
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
  const words = intentTokens(value);
  if (words.length <= 6 && hasIntentWord(words, ["exemplos", "exemplo", "examples", "example", "ejemplos", "ejemplo"])) return true;
  // A new generic question beginning "como" or "what" is not a
  // follow-up. Only explicitly referential or short context-dependent
  // continuations may inherit the immediately previous site question.
  return /^(?:e\b|mas\b|isso\b|esse\b|essa\b|aquilo\b|ent[aã]o\b|mais\b|and\b|what about\b|but\b|also\b|how about\b|y\b|pero\b|e quanto custa\b|quanto custa\??$|how much\??$|onde fica\??$|como funciona\??$|where is it\??$|cu[aá]nto cuesta\??$)/i.test(value);
}

/** Context-specific example suggestions cost no model calls and no D1/KV operations. */
export function skyletContextQuickAnswer(
  text: string, history: SkyletConversationMessage[], preferred?: string,
): QuickAnswer | null {
  const words = intentTokens(text);
  if (words.length > 6 || !hasIntentWord(words, ["exemplos", "exemplo", "examples", "example", "ejemplos", "ejemplo"])
    || !skyletContextFollowup(text, history)) return null;
  const lastSite = [...history].reverse().find(item => item.role === "user" && isSkyletSiteQuestion(item.content));
  const topic = normalizedSkyletText(lastSite?.content || "");
  const lang = skyletContextLanguage(text, history, preferred);
  const examples = hasCanonical(topic, "store") ? {
    pt: "Exemplos: Quais produtos estão disponíveis na loja? Como funcionam os links de afiliados? Onde encontro os produtos de Games?",
    en: "Examples: Which products are available in the store? How do affiliate links work? Where are the gaming products?",
    es: "Ejemplos: ¿Qué productos hay en la tienda? ¿Cómo funcionan los enlaces de afiliados? ¿Dónde están los productos de videojuegos?",
  } : hasCanonical(topic, "blog") ? {
    pt: "Exemplos: Qual é a matéria mais recente de GTA 6? Onde encontro notícias de tecnologia? Pode resumir um artigo do blog?",
    en: "Examples: What is the latest GTA 6 article? Where are the technology articles? Can you summarize a blog post?",
    es: "Ejemplos: ¿Cuál es el artículo más reciente de GTA 6? ¿Dónde están las noticias de tecnología? ¿Puedes resumir un artículo del blog?",
  } : {
    pt: "Exemplos: Quais projetos Patrick desenvolveu? Qual é a experiência profissional dele? Quais são as últimas notícias de Games no blog? Como funciona a loja do PkLavc?",
    en: "Examples: Which projects has Patrick built? What is his professional experience? What are the latest Games articles? How does the PkLavc store work?",
    es: "Ejemplos: ¿Qué proyectos desarrolló Patrick? ¿Cuál es su experiencia profesional? ¿Cuáles son las últimas noticias de videojuegos? ¿Cómo funciona la tienda PkLavc?",
  };
  return { reply: examples[lang], reason: "faq:skylet_context_examples" };
}

export function skyletQuickAnswer(text: string, preferred?: string): QuickAnswer | null {
  const q = normalizedSkyletText(text);
  if (isSkyletCapabilitiesQuestion(text)) {
    return { reply: skyletCapabilitiesReply(text, preferred), reason: "faq:skylet_capabilities" };
  }
  if (!q || !isSkyletSiteQuestion(q)) return null;
  const lang = skyletLanguage(text, preferred);
  // Only stable navigation/overview replies are preprogrammed. Topic-specific
  // details, prices, posts and products are passed to the Cloudflare-first AI.
  const navigation = /^(?:blog|store|shop|loja|tienda|contato|contact|projetos|projects|visitantes|visitors)$/.test(q)
    || hasCanonical(q, "navigation") || /\b(?:sobre|about)\b/.test(q);
  const aboutOneArticle = /\b(?:sobre|about)\s+(?:(?:a|o|the|el|la|uma|um)\s+)?(?:materia|artigo|noticia|postagem|article|news|post)\b/.test(q);
  const specific = aboutOneArticle
    || /\b(?:quanto custa|how much|quais produtos|which products|artigo sobre|post sobre|postagem sobre|noticia sobre|como funciona|why|por que)\b/.test(q)
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
