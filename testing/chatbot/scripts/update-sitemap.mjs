import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sitemapPath = path.resolve(__dirname, "..", "..", "..", "sitemap.xml");
let xml = fs.readFileSync(sitemapPath, "utf8");

const url = "https://pklavc.com/testing/";
if (!xml.includes(`<loc>${url}</loc>`)) {
  const block = [
    "  <url>",
    `    <loc>${url}</loc>`,
    `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
    "    <changefreq>monthly</changefreq>",
    "    <priority>0.3</priority>",
    "  </url>",
    "</urlset>"
  ].join("\n");
  xml = xml.replace("</urlset>", block);
} else {
  xml = xml.replace(
    /(<loc>https:\/\/pklavc\.com\/testing\/<\/loc>\s*<lastmod>)([^<]+)(<\/lastmod>)/,
    `$1${new Date().toISOString().slice(0, 10)}$3`
  );
}

fs.writeFileSync(sitemapPath, xml);
console.log("Sitemap updated.");
