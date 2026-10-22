import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const pages = {
  en: {path:"connect/index.html",canonical:"https://pklavc.com/connect/",lang:'en'},
  pt: {path:"pt/connect/index.html",canonical:"https://pklavc.com/pt/connect/",lang:'pt-BR'},
  es: {path:"es/connect/index.html",canonical:"https://pklavc.com/es/connect/",lang:'es'},
};
const urls = [
 "https://t.me/PkLavcTech","https://t.me/PkLavcGames","https://t.me/PkLavcStore",
 "https://discord.gg/zder5EZRK","https://www.youtube.com/@PkLavc",
 "https://www.instagram.com/pklavc/","https://www.tiktok.com/@pklavc",
 "https://www.threads.com/@pklavc",
 "https://bsky.app/profile/did:plc:ga7prbakfu23cnmjuto6v6m3",
 "https://mastodon.social/@PkLavc","https://www.pinterest.com/pklavc/",
 "https://www.linkedin.com/in/pklavc/","https://dev.to/pklavc",
 "https://github.com/PkLavc","https://github.com/sponsors/PkLavc",
 "mailto:contact@pklavc.com",
];
for(const [locale,p] of Object.entries(pages)){
 test('Connect '+locale+' has full destinations, profile, SEO and correct language switcher',()=>{
  const html=fs.readFileSync(p.path,'utf8');
  assert.ok(html.includes('<html lang="'+p.lang+'">'));
  assert.ok(html.includes('<link rel="canonical" href="'+p.canonical+'">'));
  assert.match(html,/<meta property="og:title"/);
  assert.match(html,/<img class="avatar"/);
  assert.match(html,/<button type="button" class="share" data-share/);
  assert.match(html,/<link rel="stylesheet" href="\/connect\/style.css">/);
  for(const url of urls)assert.ok(html.includes('href="'+url+'"'),locale+' missing '+url);
  for(const lang of Object.values(pages))assert.ok(html.includes('href="'+lang.canonical+'"'),locale+' missing alternate '+lang.canonical);
  for(const localPath of ["/connect/","/pt/connect/","/es/connect/"])assert.ok(html.includes('href="'+localPath+'"'));
  assert.ok((html.match(/class="link-card(?: primary)?"/g)||[]).length >= 20);
  assert.ok(!html.includes('href="https://linktr.ee/'),"Linktree must not be a destination");
 });
}
test("Public website build copies Connect pages",()=>{
 const source=fs.readFileSync("scripts/build-pages-artifact.mjs","utf8");
 assert.match(source,/"connect"/);
});
test("Share action and styles have valid files",()=>{
 assert.ok(fs.statSync("connect/style.css").size>3000);
 assert.ok(fs.statSync("connect/connect.js").size>150);
});
