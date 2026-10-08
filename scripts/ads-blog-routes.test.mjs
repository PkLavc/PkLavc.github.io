import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(ROOT, "ads/ads.js"), "utf8")
  .replace("var testPreview =", "window.__detectPageContext = detectPageContext; var testPreview =");

function detect(pathname) {
  const window = { location: { pathname }, PKLAVC_ADS_TEST_PREVIEW: false };
  vm.runInNewContext(source, { window, document: { documentElement: { lang: "en" } }, URL });
  return JSON.parse(JSON.stringify(window.__detectPageContext(pathname)));
}

test("advertising recognizes language-first category and article routes", () => {
  assert.deepEqual(detect("/blog/pt/"), { type: "blog-index", locale: "pt" });
  assert.deepEqual(detect("/blog/es/games/"), { type: "blog-index", locale: "es", category: "games" });
  assert.deepEqual(detect("/blog/en/tech/example/"), { type: "blog", locale: "en", category: "tech" });
  assert.deepEqual(detect("/blog/pt/games/example/"), { type: "blog", locale: "pt", category: "games" });
});
