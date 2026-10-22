import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { storeTelegramUsername, injectStoreTelegramLink, injectStoreTelegramInBlog } from "./inject-blog-store-telegram.mjs";

test("Store channel link uses only validated public Telegram usernames", () => {
  assert.equal(storeTelegramUsername("@PkLavcStore"), "PkLavcStore");
  assert.equal(storeTelegramUsername("https://t.me/PkLavcStore"), "PkLavcStore");
  assert.equal(storeTelegramUsername("@not a handle"), "");
  assert.equal(storeTelegramUsername("https://evil.test/PkLavcStore"), "");
});

test("EN/PT/ES article community section receives Store handle at build", () => {
  const html = '<section data-pklavc-community="true"><span data-store-telegram-channel="true"></span></section>';
  const updated = injectStoreTelegramLink(html, "@PkLavcStore");
  assert.match(updated, /https:\/\/t\.me\/PkLavcStore/);
  assert.match(updated, /Telegram Store/);
  assert.equal(injectStoreTelegramLink(updated, "@PkLavcStore"), updated);
});

test("All article categories/locales are updated; unrelated pages unchanged", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pklavc-social-"));
  try {
    for (const locale of ["en","pt","es"]) {
      for (const category of ["tech","games"]) {
        const folder = path.join(dir,"blog",locale,category,"example");
        fs.mkdirSync(folder,{recursive:true});
        fs.writeFileSync(path.join(folder,"index.html"),'<span data-store-telegram-channel="true"></span>');
      }
    }
    assert.equal(injectStoreTelegramInBlog(dir,"@PkLavcStore"),6);
    assert.equal(injectStoreTelegramInBlog(dir,"@PkLavcStore"),0);
    assert.equal(injectStoreTelegramInBlog(dir,"bad!"),0);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
