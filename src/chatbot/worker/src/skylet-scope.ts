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
  // Stable, multilingual answers avoid paid/free model quota. Never cache
  // mutable facts such as prices, hours, fresh news or product inventory here.
  if (/\b(?:visitantes|visitas|visitor|visitors|traffic|tr[aá]fego|visiteur|estad[ií]sticas|statistics|statistics|mapa|map)\b/i.test(text) &&
      /\b(?:site|pklavc|portfolio|portf[oó]lio|visitas|visitantes|visitor|visitors|tr[aá]fego|traffic|mapa|map)\b/i.test(text)) {
    return lang === "pt" ? "O mapa de visitas anônimas do site está em https://pklavc.com/pt/visitantes/ ."
      : lang === "es" ? "El mapa de visitas anónimas está en https://pklavc.com/es/visitantes/ ."
      : "The anonymous visitor map is at https://pklavc.com/visitors/ .";
  }
  if (/\b(?:onde|where|d[oó]nde|encontrar|find|visit|visitar|ver|see|abrir|open|link)\b/i.test(text)
      && /\b(?:projetos|projects|proyectos)\b/i.test(text)
      && !/\b(?:qual|which|what|como|how|sobre|about|descrever|describe)\b/i.test(text)) {
    return lang === "pt" ? "Os projetos estão disponíveis em https://pklavc.com/projects/ ."
      : lang === "es" ? "Los proyectos están en https://pklavc.com/projects/ ."
      : "The projects are listed at https://pklavc.com/projects/ .";
  }
  if (/\b(?:loja|store|tienda)\b/i.test(text) &&
      /\b(?:compra|comprar|buy|compras|adquirir|shopping|affiliate|afiliad)\w*/i.test(text) &&
      !/\b(?:pre[çc]o|price|valor|cost|devolu|return|garantia|warranty)\w*/i.test(text)) {
    return lang === "pt" ? "A loja do PkLavc reúne links de afiliado. Ao escolher um produto, a compra é feita na plataforma de destino: https://pklavc.com/store/ ."
      : lang === "es" ? "La tienda de PkLavc reúne enlaces de afiliados. La compra se realiza en la plataforma de destino: https://pklavc.com/store/ ."
      : "The PkLavc store lists affiliate offers. Purchases are completed on the merchant's website: https://pklavc.com/store/ .";
  }
  if (/\b(?:blog|games|gaming|tech|tecnologia|technology)\b/i.test(text)
      && /\b(?:onde|where|d[oó]nde|acess|access|link|encontrar|find|visit|visitar|entrar|open|abrir|ler|read|vejo|ver|see)\w*/i.test(text)) {
    return lang === "pt" ? "Você encontra Games e Tech no blog: https://pklavc.com/blog/ ."
      : lang === "es" ? "Encuentra Games y Tech en el blog: https://pklavc.com/blog/ ."
      : "Find Games and Tech on the blog: https://pklavc.com/blog/ .";
  }
  if (/\b(?:instagram|youtube|pinterest|tiktok|redes sociais|social media|social networks|redes sociales)\b/i.test(text)
      && /\b(?:onde|where|d[oó]nde|encontrar|find|link|seguir|follow|perfil|profile|acessar|visit|visitar|ver)\b/i.test(text)) {
    return lang === "pt" ? "Os canais e links oficiais do PkLavc estão no site https://pklavc.com/ ."
      : lang === "es" ? "Los canales oficiales de PkLavc están en https://pklavc.com/ ."
      : "Find the official PkLavc social channels at https://pklavc.com/ .";
  }
  return null;
}
