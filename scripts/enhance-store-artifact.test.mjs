import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { enhanceStoreArtifact } from "./enhance-store-artifact.mjs";
import { normalizeSeoHtml } from "./normalize-seo.mjs";

test("build generates individual product Open Graph previews in all Store languages", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pklavc-product-og-"));
  try {
    const product = {
      id: "1005008315948753",
      name: 'WiFi  M.2 & NVME "adapter"',
      description: "Hardware for M.2 drives",
      picture: "https://example.com/items/nvme.jpg?size=large&v=2",
      price: 11.37,
      currency: "USD",
      url: "https://example.com/buy/nvme",
    };
    fs.mkdirSync(path.join(root, "store"), { recursive: true });
    fs.writeFileSync(path.join(root, "store", "products.json"), JSON.stringify({products: [
      product,
      { ...product, id: "../escape-attempt" },
      { ...product, id: "missing-image", picture: "http://example.com/image.png" },
    ]}));
    for (const locale of ["", "pt", "es"]) {
      const storeDir = path.join(root, "store", locale);
      fs.mkdirSync(storeDir, { recursive: true });
      fs.writeFileSync(path.join(storeDir, "index.html"), '<html><head></head><body><section class="store-grid" id="store-products" data-store-grid data-columns="4"></section></body></html>');
    }
    const stats = enhanceStoreArtifact(root);
    assert.equal(stats.sharePages, 3);
    for (const locale of ["", "pt", "es"]) {
      const file = path.join(root, "store", locale, "product", product.id, "index.html");
      const html = fs.readFileSync(file, "utf8");
      const prefix = locale ? `/store/${locale}/` : "/store/";
      assert.match(html, /property="og:image" content="https:\/\/example\.com\/items\/nvme\.jpg\?size=large&amp;v=2"/);
      assert.match(html, /property="og:title" content="WiFi M\.2 &amp; NVME &quot;adapter&quot; \| PkLavc Store"/);
      assert.ok(html.includes(`https://pklavc.com${prefix}product/${product.id}/`));
      assert.ok(html.includes(`https://pklavc.com${prefix}?product=${product.id}`));
      const normalized = normalizeSeoHtml(html, { directory: root, filename: file });
      assert.match(normalized, /property="og:site_name" content="PkLavc Store"/);
      assert.match(normalized, /name="robots" content="noindex, follow"/);
      assert.doesNotMatch(normalized, /og-default\.png/);
    }
    assert.equal(fs.existsSync(path.join(root, "store", "product", "missing-image")), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
