import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");

function i18n(pathname) {
  const window = {
    location: { pathname, search: "", hash: "", replace() {} },
    localStorage: { getItem() { return null; }, setItem() {} }
  };
  const document = { readyState: "loading", addEventListener() {} };
  vm.runInNewContext(source, { window, document, navigator: { languages: ["en"] } });
  return window.PkLavcI18n;
}

test("English blog root localizes to the existing PT-BR and Spanish institutional routes", () => {
  const routes = i18n("/blog/");
  assert.equal(routes.getLocalizedRoute("/blog/", "pt"), "/pt/blog/");
  assert.equal(routes.getLocalizedRoute("/blog/", "es"), "/es/blog/");
});

test("localized blog roots map back to the English root and never expose /blog/en/", () => {
  const routes = i18n("/pt/blog/");
  assert.equal(routes.getEnglishRoute("/pt/blog/"), "/blog/");
  assert.equal(routes.getLocalizedRoute("/pt/blog/", "en"), "/blog/");
  assert.equal(routes.getLocalizedRoute("/pt/blog/", "es"), "/es/blog/");
  assert.notEqual(routes.getLocalizedRoute("/blog/", "en"), "/blog/en/");
});
