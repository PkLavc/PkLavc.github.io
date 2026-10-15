/** Deterministic, multilingual public Skylet scope gate.
 * Site questions can use the chat model; general-purpose questions cannot.
 * Never interpret a prompt claiming new instructions as an authorization.
 */
export type SiteLanguage = "pt" | "en" | "es";

export function siteLanguage(input: string): SiteLanguage {
  if (/\b(você|voce|vc|qual|quais|onde|como|sobre|loja|site|artigo|artigos|matéria|materia|postagem|notícia|noticia|meu|minha|projetos|preço|preco|contato|trabalho|trabalha|portfólio|portfolio)\b/i.test(input)) return "pt";
  if (/\b(hola|dónde|sobre|tienda|artículo|articulos|proyectos|precio|contacto|publicación|noticias|sitio)\b/i.test(input)) return "es";
  return "en";
}

const SITE_TERMS = /\b(?:patrick(?:\s+(?:araujo|l\s+araujo))?|pklavc|skylet|pklavc\.com|blog|(?:meu|seu|este|o|the|your|this|mi|tu|el)\s+(?:site|s[ií]tio|website|portfolio|portf[oó]lio)|(?:do|da|no|na|of|on|from|del)\s+(?:site|blog|portf[oó]lio)|loja|store|products?|produtos?|afiliados?|postagens?|publica[çc][oõ]es?|not[ií]cias?|mat[eé]rias?|artigos?|articles?|posts?|projects?|projetos?|proyectos?|certifica[çc][oõ]es?|certifications?|curr[ií]culo|resume|contato|contact|instagram|pinterest|youtube|tiktok|rockstar|gta(?:\s*(?:6|vi|online))?|codepulse|cipher\s*gate|aegis\s*sentinel|lavc\s*systems|raw\s*api|zoho\s+(?:creator|integration)|whatsapp\s+catalog)\b/i;
const INVALID_GENERAL = /(?:como\s+(?:programar|cozinhar|fazer\s+(?:um\s+)?bolo)|write\s+me\s+(?:an?\s+)?essay|solve\s+(?:this|my)\s+(?:math|homework)|(?:quanto|what)\s+(?:é|is)\s+(?:pi|π)|(?:weather|previs[aã]o\s+do\s+tempo)|(?:capital\s+of|capital\s+de))\b/i;
const FOLLOW_UP = /^(?:e\b|and\b|and what|what about|mas\b|but\b|isso\b|this\b|it\b|that\b|ele\b|ela\b|deles\b|mais\b|more\b|tamb[eé]m\b|also\b|por que\b|why\b|qual\b|quais\b|which\b|quanto\b|how much\b|onde\b|where\b|pode\b|can\b)/i;
const GREETING = /^(?:(?:oi|ol[aá]|hello|hi|hey|hola|bom dia|boa tarde|boa noite)[!.,?\s]*)$/i;

export function skyletSiteScope(input: string, previousUserMessage = ""): boolean {
  const text = input.normalize("NFKC").trim().slice(0, 1400);
  if (!text) return false;
  if (GREETING.test(text)) return true;
  if (INVALID_GENERAL.test(text)) return false;
  if (SITE_TERMS.test(text)) return true;
  // Short natural follow-ups may inherit an earlier on-site question. A new
  // unrelated standalone question must never inherit unlimited LLM access.
  return text.length <= 75 && FOLLOW_UP.test(text)
    && SITE_TERMS.test(previousUserMessage) && !INVALID_GENERAL.test(previousUserMessage);
}

export function offSiteReply(input: string): string {
  const lang = siteLanguage(input);
  if (lang === "pt") return "A Skylet responde exclusivamente sobre Patrick Araujo e o conteúdo do PkLavc: site, blog, notícias, projetos e loja. Pergunte sobre um desses assuntos.";
  if (lang === "es") return "Skylet responde exclusivamente sobre Patrick Araujo y el contenido de PkLavc: sitio, blog, noticias, proyectos y tienda. Pregunta sobre uno de estos temas.";
  return "Skylet answers only questions about Patrick Araujo and PkLavc: the website, blog, news, projects and store. Please ask about one of these topics.";
}

export function siteBudgetReply(input: string): string {
  const lang = siteLanguage(input);
  if (lang === "pt") return "O limite diário de respostas por IA da Skylet foi atingido para preservar os recursos do PkLavc. As páginas, notícias e links continuam disponíveis no site.";
  if (lang === "es") return "Se alcanzó el límite diario de IA de Skylet para proteger los recursos de PkLavc. Las páginas, noticias y enlaces siguen disponibles.";
  return "Skylet's daily AI answer limit was reached to protect PkLavc resources. The site's pages, news and links remain available.";
}

export function siteFaq(input: string): string | null {
  const text = input.normalize("NFKC").toLowerCase().trim();
  const lang = siteLanguage(input);
  if (/^(?:onde|where|d[oó]nde|como|how)\b/.test(text) &&
      /\b(?:ver|ler|find|read|encontrar|veo|leer)\b/.test(text) &&
      /\b(?:not[ií]cias?|mat[eé]rias?|artigos?|posts?|blog|articles?)\b/.test(text)) {
    return lang === "pt"
      ? "As notícias de Games e Tech estão em https://pklavc.com/blog/ ."
      : lang === "es"
        ? "Las noticias de Games y Tech están en https://pklavc.com/blog/ ."
        : "Games and Tech articles are at https://pklavc.com/blog/ .";
  }
  if (/\b(?:onde|where|d[oó]nde|link|acessar|encontrar|find|visit|visitar)\b/.test(text)
      && /\b(?:loja|store|tienda)\b/.test(text)
      && !/\b(?:produto|product|pre[çc]o|price|pedido|order)\b/.test(text)) {
    return lang === "pt" ? "A loja de produtos afiliados está em https://pklavc.com/store/ ."
      : lang === "es" ? "La tienda de productos afiliados está en https://pklavc.com/store/ ."
      : "The affiliate store is at https://pklavc.com/store/ .";
  }
  if (/^(?:como|where|how|d[oó]nde)\b/.test(text) &&
      /\b(?:contat|contact|falar|reach|mensagem|mensaje)\w*/.test(text)) {
    return lang === "pt" ? "Você encontra os canais de contato em https://pklavc.com/ ."
      : lang === "es" ? "Los canales de contacto están en https://pklavc.com/ ."
      : "Contact details are available at https://pklavc.com/ .";
  }
  return null;
}
