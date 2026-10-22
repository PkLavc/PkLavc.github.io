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
      <a class="store-cta" href="${esc(product.url)}" target="_blank" rel="sponsored noopener noreferrer">${locale === "pt" ? "Ver oferta" : locale === "es" ? "Ver oferta" : "View offer"}<span aria-hidden="true"> ↗︎</span></a>
    </div>
  </article>`;
}


/**
 * Social crawlers do not execute Store JS or read the ?product= selection.
 * Give each catalog item a real static HTML URL whose server-delivered head
 * contains the current product image/title. Humans continue to the Store.
 */
function renderProductSharePage(product, locale) {
  const id = String(product.id);
  const prefix = locale === "en" ? "/store/" : `/store/${locale}/`;
  const shareUrl = `https://pklavc.com${prefix}product/${encodeURIComponent(id)}/`;
  const storeUrl = `https://pklavc.com${prefix}?product=${encodeURIComponent(id)}`;
  const title = String(product.name).replace(/\s+/g, " ").trim().slice(0, 160);
  const description = [formatMoney(product, locale), String(product.description || "").replace(/\s+/g, " ").trim().slice(0, 190)]
    .filter(Boolean).join(" — ") || copy[locale].description;
  const imageUrl = new URL(product.picture).href;
  const lang = locale === "pt" ? "pt-BR" : locale;
  const redirect = JSON.stringify(storeUrl).replace(/</g, "\\u003c");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <title>${esc(title)} | PkLavc Store</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(shareUrl)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="PkLavc Store">
  <meta property="og:url" content="${esc(shareUrl)}">
  <meta property="og:title" content="${esc(title)} | PkLavc Store">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${esc(imageUrl)}">
  <meta property="og:image:secure_url" content="${esc(imageUrl)}">
  <meta property="og:image:alt" content="${esc(title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)} | PkLavc Store">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(imageUrl)}">
</head>
<body>
  <main>
    <h1>${esc(title)}</h1>
    <p>${esc(description)}</p>
    <p><a href="${esc(storeUrl)}">View this product on PkLavc Store</a></p>
    <img src="${esc(imageUrl)}" alt="${esc(title)}" width="480" loading="lazy" referrerpolicy="no-referrer">
  </main>
  <script>window.location.replace(${redirect});</script>
</body>
</html>
`;
}

export function generateProductSharePages(root, products) {
  let generated = 0;
  const validId = /^[A-Za-z0-9_-]{3,80}$/;
  for (const product of products) {
    const id = String(product.id || "");
    if (!validId.test(id) || !product.name || !product.picture) continue;
    try {
      if (new URL(product.picture).protocol !== "https:") continue;
    } catch { continue; }
    for (const locale of ["en", "pt", "es"]) {
      const prefix = locale === "en" ? path.join("store", "product") : path.join("store", locale, "product");
      const directory = path.join(root, prefix, id);
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(path.join(directory, "index.html"), renderProductSharePage(product, locale));
      generated += 1;
    }
  }
  return generated;
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
    html = html.replace(/<section class="store-intro"[\s\S]*?<\/section>\s*/g, "");

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
  const sharePages = generateProductSharePages(root, products);
  return { pages, products: products.length, sharePages };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  console.log(enhanceStoreArtifact(process.argv[2] || ".pages-dist"));
}
