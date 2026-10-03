import fs from "node:fs";
import path from "node:path";

const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const jsonSafe = value => JSON.stringify(value).replace(/</g, "\\u003c");

const copy = {
  en: {
    title: "Selected technology, gaming and partner offers",
    description: "Browse selected technology and gaming products from external retailers. Product availability, price, shipping and returns are handled by the destination store.",
    notice: "Affiliate disclosure: some outbound links may generate a commission for PkLavc at no additional cost to you."
  },
  pt: {
    title: "Tecnologia, games e ofertas selecionadas",
    description: "Veja produtos selecionados de tecnologia e games em lojas externas. Disponibilidade, preço, entrega, devolução e garantia são definidos pela loja de destino.",
    notice: "Aviso de afiliado: alguns links externos podem gerar comissão para o PkLavc sem custo adicional para você."
  },
  es: {
    title: "Tecnología, gaming y ofertas seleccionadas",
    description: "Explora productos seleccionados de tecnología y gaming en tiendas externas. Disponibilidad, precio, envío, devoluciones y garantía dependen de la tienda de destino.",
    notice: "Aviso de afiliado: algunos enlaces externos pueden generar una comisión para PkLavc sin costo adicional para ti."
  }
};

function formatMoney(product, locale) {
  const amount = Number(product.price);
  if (!Number.isFinite(amount)) return "";
  try {
    return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", {
      style: "currency",
      currency: product.currency || "BRL"
    }).format(amount);
  } catch { return `${amount.toFixed(2)} ${product.currency || ""}`; }
}

function prerenderCard(product, locale) {
  const price = formatMoney(product, locale);
  return `<article class="store-card" data-prerendered-product="${esc(product.id || "")}">
    <a class="store-image-wrap" href="${esc(product.url)}" target="_blank" rel="sponsored noopener noreferrer">
      <img class="store-image" src="${esc(product.picture)}" alt="${esc(product.name)}" width="600" height="600" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      ${product.badge ? `<span class="store-badge">${esc(product.badge)}</span>` : ""}
    </a>
    <div class="store-card-body">
      <div class="store-card-meta"><span>${esc(product.program || "")}</span><span>${esc(product.vendor || "")}</span></div>
      <h2>${esc(product.name)}</h2>
      ${product.description ? `<p class="store-description">${esc(product.description)}</p>` : ""}
      <div class="store-price-row"><strong>${esc(price)}</strong></div>
      <a class="store-cta" href="${esc(product.url)}" target="_blank" rel="sponsored noopener noreferrer">${locale === "pt" ? "Ver oferta" : locale === "es" ? "Ver oferta" : "View offer"}<span aria-hidden="true"> ↗</span></a>
    </div>
  </article>`;
}

export function enhanceStoreArtifact(root) {
  const catalogPath = path.join(root, "store", "products.json");
  if (!fs.existsSync(catalogPath)) return { pages: 0, products: 0 };
  const payload = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const products = Array.isArray(payload.products) ? payload.products.filter(p => p?.name && p?.url && p?.picture) : [];
  let pages = 0;
  for (const [locale, relative] of [["en","store/index.html"],["pt","store/pt/index.html"],["es","store/es/index.html"]]) {
    const file = path.join(root, relative);
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, "utf8");
    const canonical = locale === "en" ? "https://pklavc.com/store/" : `https://pklavc.com/store/${locale}/`;
    const seo = copy[locale];
    const intro = `<section class="store-intro" aria-labelledby="store-page-title"><p class="store-intro-kicker">PKLAVC STORE</p><h1 id="store-page-title">${esc(seo.title)}</h1><p>${esc(seo.description)}</p><small>${esc(seo.notice)}</small></section>`;
    if (!html.includes('class="store-intro"')) html = html.replace('<main class="store-main">', '<main class="store-main">' + intro);

    const cards = products.map(product => prerenderCard(product, locale)).join("");
    html = html.replace(/<section class="store-grid" id="store-products" data-store-grid data-columns="4">[\s\S]*?<\/section>/,
      `<section class="store-grid" id="store-products" data-store-grid data-columns="4">${cards}</section>`);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": canonical + "#webpage",
          url: canonical,
          name: seo.title + " | PkLavc Store",
          description: seo.description,
          inLanguage: locale === "pt" ? "pt-BR" : locale,
          isPartOf: {"@id":"https://pklavc.com/#website"},
          mainEntity: {"@id": canonical + "#products"}
        },
        {
          "@type": "ItemList",
          "@id": canonical + "#products",
          name: "PkLavc Store catalog",
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: product.url,
            image: product.picture
          }))
        }
      ]
    };
    const script = `<script type="application/ld+json" data-store-schema>${jsonSafe(schema)}</script>`;
    html = html.replace(/<script type="application\/ld\+json" data-store-schema>[\s\S]*?<\/script>\s*/g, "");
    html = html.replace("</head>", script + "\n</head>");
    fs.writeFileSync(file, html);
    pages += 1;
  }
  return { pages, products: products.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  console.log(enhanceStoreArtifact(process.argv[2] || ".pages-dist"));
}
