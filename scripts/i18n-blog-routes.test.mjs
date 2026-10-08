import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(ROOT, "js/i18n.js"), "utf8");

function i18n(pathname, languages = ["en"]) {
  const replacements = [];
  const window = {
    location: { pathname, search: "", hash: "", replace(value) { replacements.push(value); } },
    localStorage: { getItem() { return null; }, setItem() {} }
  };
  const document = { readyState: "loading", addEventListener() {} };
  vm.runInNewContext(source, { window, document, navigator: { languages } });
  return { routes: window.PkLavcI18n, replacements };
}

test("blog portal localizes to the language landing pages", () => {
  const { routes } = i18n("/blog/");
  assert.equal(routes.getLocalizedRoute("/blog/", "en"), "/blog/en/");
  assert.equal(routes.getLocalizedRoute("/blog/", "pt"), "/blog/pt/");
  assert.equal(routes.getLocalizedRoute("/blog/", "es"), "/blog/es/");
});

test("localized category and article routes keep language before category", () => {
  const { routes } = i18n("/blog/pt/tech/example/");
  assert.equal(routes.getEnglishRoute("/blog/pt/tech/example/"), "/blog/en/tech/example/");
  assert.equal(routes.getLocalizedRoute("/blog/pt/tech/example/", "en"), "/blog/en/tech/example/");
  assert.equal(routes.getLocalizedRoute("/blog/pt/tech/example/", "es"), "/blog/es/tech/example/");
});

test("blog portal redirects even English visitors to an explicit language index", () => {
  assert.deepEqual(i18n("/blog/", ["en-US"]).replacements, ["/blog/en/"]);
  assert.deepEqual(i18n("/blog/", ["pt-BR"]).replacements, ["/blog/pt/"]);
  assert.deepEqual(i18n("/blog/", ["es-ES"]).replacements, ["/blog/es/"]);
});
