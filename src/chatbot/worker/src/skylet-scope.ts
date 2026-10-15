/**
 * Skylet is the PkLavc site's assistant, not a general-purpose AI.
 * Keep out-of-scope requests and common site-navigation questions entirely
 * local, without Cloudflare Workers AI, Groq, OpenRouter, D1 or KV calls.
 */
type SkyletLanguage = "pt" | "en" | "es";
type QuickAnswer = { reply: string; reason: string };

export function skyletLanguage(text: string): SkyletLanguage {
  const value = String(text || "").toLowerCase();
  if (/\b(?:hola|gracias|quién|dónde|cuál|acerca de|sitio web|tienda|publicaciones|artículos|precios|misiones)\b/.test(value)) return "es";
  if (/\b(?:oi|olá|bom dia|boa noite|você|vc|qual|quais|quanto|onde|como|não|sobre|loja|postagem|artigo|matéria|projetos|visitantes|portfólio|preço|contato)\b/.test(value)) return "pt";
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

const OWNED = /\b(?:patrick(?:\s+(?:araujo|l\.?\s*araujo))?|pklavc|pklavc\.com|skylet|lavc systems|loja do sapo|i[cç]aiu|federico nacucchio)\b/i;
const SITE_CONTEXT = /\b(?:meu|minha|seu|sua|nosso|nossa|este|esta|aqui|nesse|neste|do|da|no|na|your|our|this|here|the|el|la|mi|mis)\s+(?:site|website|web|blog|loja|tienda|store|portfolio|portf[oó]lio|profile|perfil|projects?|projetos?|posts?|postagens?|publica[cç][oõ]es|articles?|artigos?|mat[eé]rias?|not[ií]cias?)\b/i;
const SITE_AREA = /\b(?:blog|loja|store|shop|tienda|portf[oó]lio|portfolio|projetos?|projects?|postagens?|publica[cç][oõ]es|artigos?|articles?|mat[eé]rias?|visitas?|visitantes?|visitors?|contato|contact|bio|redes sociais|social networks|social media|links?|newsletter)\b/i;
const GENERIC_SITE_BUILD = /^(?:como|how|qu[eé]|what|d[oó]nde|onde|teach me|ensine|me explique|explain)\b.{0,90}\b(?:criar|fazer|montar|desenvolver|construir|build|create|make|start|programar)\b.{0,80}\b(?:um|uma|a|an|my|un|una)?\s*(?:site|website|blog|store|shop|loja)\b/i;
const GENERIC_TECH = /^(?:o que [eé]|what is|explique|explain|como funciona|how does)\b.{0,70}\b(?:javascript|python|html|css|api|zoho|cloudflare|gta|rockstar)\b/i;
const GENERIC_OTHER = /\b(?:previs[aã]o do tempo|weather forecast|loteria|lottery|joke|piada|receita de bolo|cake recipe|quanto [eé] 2\s*\+|what is 2\s*\+)\b/i;

export function isSkyletSiteQuestion(text: string): boolean {
  const value = String(text || "").trim();
  if (!value) return false;
  if (OWNED.test(value)) return true;
  if (GENERIC_OTHER.test(value) || GENERIC_SITE_BUILD.test(value) || GENERIC_TECH.test(value)) return false;
  if (SITE_CONTEXT.test(value)) return true;
  // The chat is embedded in the website; short questions about site areas
  // need not repeat "PkLavc" (e.g. "Quais produtos tem na loja?").
  return SITE_AREA.test(value);
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
  const q = String(text || "").toLowerCase().trim();
  if (!q || !isSkyletSiteQuestion(q)) return null;
  const lang = skyletLanguage(text);
  // Static replies handle navigation/overview only. Questions about a
  // specific post, price, product, bug, article or service reach the AI.
  const navigation = /^(?:blog|store|shop|loja|tienda|contato|contact|projetos|projects|visitantes|visitors)$/i.test(q)
    || /\b(?:onde|d[oó]nde|where|link|url|acessar|acceso|access|encontrar|find|localizar|locate|entrar em contato|contatar|contact|como acessar|how to access|sobre a loja|about the store|sobre o blog|about the blog|what is on the blog)\b/i.test(q);
  const specific = /\b(?:pre[cç]o|price|cost|quanto custa|how much|últim|latest|recent|mat[eé]ria|artigo sobre|post sobre|postagem sobre|not[ií]cia sobre|detalhes|compare|comparar|como funciona|why|por que|problema|erro|bug|api|integr|quais produtos|which products|cupom|desconto|discount|guia|miss[aã]o|mission)\b/i.test(q);
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
  for (const [pattern, replies, reason] of choices) {
    if (pattern.test(q)) return { reply: replies[lang], reason };
  }
  return null;
}
