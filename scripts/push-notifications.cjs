#!/usr/bin/env node
/* GitHub Actions sends encrypted Web Push directly; Cloudflare only stores subscriptions.
   Required: JWT_SECRET; dependency web-push installed into scripts/node_modules on runner.
   Never log subscription endpoints, authentication keys, or VAPID material. */
const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");
const webpush = require("web-push");
const API = (process.env.PUSH_API_URL || "https://api.pklavc.com").replace(/\/$/, "");
const SECRET = process.env.JWT_SECRET || "";
const DRY_RUN = process.env.PUSH_DRY_RUN === "true";
const MAX_RECIPIENTS = Math.min(100000, Math.max(200, Number(process.env.PUSH_MAX_RECIPIENTS_PER_RUN || 30000)));
const PARALLEL = 6;
const WAIT_MS = 90;

function sha(s) { return crypto.createHash("sha256").update(s).digest("hex"); }
function pause(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function authHeaders() {
  return { authorization: "Bearer " + sha("pklavc-webpush-admin:v1:" + SECRET) };
}
async function api(method, pathname, payload) {
  const response = await fetch(API + pathname, {
    method, headers: { ...authHeaders(), ...(payload ? { "content-type": "application/json" } : {}) },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
    signal: AbortSignal.timeout(20000),
  });
  let data;
  try { data = await response.json(); } catch { data = {}; }
  if (!response.ok) throw Error("Push API " + pathname + " HTTP " + response.status + ": " + (data.error || "unknown"));
  return data;
}
function seal(value) {
  const k = crypto.createHmac("sha256", SECRET).update("pklavc-vapid-encryption:v1").digest();
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", k, nonce);
  const data = Buffer.concat([cipher.update(value,"utf8"),cipher.final()]);
  return [nonce, cipher.getAuthTag(), data].map(x => x.toString("base64url")).join(".");
}
function unseal(value) {
  const [nonce, tag, data] = value.split(".").map(x => Buffer.from(x, "base64url"));
  if (!nonce || !tag || !data || nonce.length !== 12 || tag.length !== 16) throw Error("Invalid encrypted VAPID material");
  const k = crypto.createHmac("sha256", SECRET).update("pklavc-vapid-encryption:v1").digest();
  const decipher = crypto.createDecipheriv("aes-256-gcm", k, nonce);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}
async function vapid() {
  let config = await api("GET", "/push/admin/vapid");
  if (!config.configured) {
    if (DRY_RUN) { console.log("Web Push VAPID not initialized (dry run)."); return null; }
    const pair = webpush.generateVAPIDKeys();
    const result = await api("POST", "/push/admin/vapid", {
      publicKey: pair.publicKey, encryptedPrivateKey: seal(pair.privateKey),
    });
    console.log("VAPID initialized:", result.created);
    config = await api("GET", "/push/admin/vapid");
  }
  if (!config.configured) throw Error("VAPID initialization failed.");
  return { publicKey: config.publicKey, privateKey: unseal(config.encryptedPrivateKey) };
}
function localized(post, locale) {
  const detail = locale !== "en" ? post.localized?.[locale] : null;
  return {
    title: String(detail?.title || post.title || "PKLAVC").replace(/<[^>]*>/g,"").slice(0,108),
    body: String(detail?.description || post.description || "").replace(/<[^>]*>/g,"").slice(0,170),
    url: String(detail?.url || post.url || "/blog/"),
  };
}
function getBlogCandidates() {
  const items = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "blog", "posts.json"), "utf8"));
  const cutoff = Date.now() - 36 * 3600 * 1000;
  const output = [];
  for (const topic of ["tech", "games"]) {
    // Posts are published latest first; only the newest recent article can trigger this run.
    const post = items.find(p => String(p.blog_category).toLowerCase() === topic &&
      /^\d{4}-\d{2}-\d{2}$/.test(p.date) &&
      new Date(p.date + "T00:00:00Z").getTime() >= cutoff);
    if (post && /^\/blog\/en\/(tech|games)\//.test(post.url)) {
      output.push({ topic, url: post.url, templates: Object.fromEntries(
        ["en", "pt", "es"].map(lang => [lang, localized(post,lang)])
      ) });
    }
  }
  return output;
}
function getStoreCandidate() {
  const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "store", "products.json"),"utf8"));
  if (!catalog.updatedAt || Date.now() - Date.parse(catalog.updatedAt) > 36 * 3600 * 1000) return null;
  const candidates = (catalog.products || []).filter(p => p.available !== false && p.id &&
    Number(p.price) > 0 && Number(p.oldPrice) > Number(p.price) &&
    (Number(p.oldPrice) - Number(p.price)) / Number(p.oldPrice) >= 0.3);
  candidates.sort((a,b) => ((Number(b.oldPrice)-Number(b.price))/Number(b.oldPrice)) -
    ((Number(a.oldPrice)-Number(a.price))/Number(a.oldPrice)));
  if (!candidates.length) return null;
  const product = candidates[0];
  const url = "/store/?product=" + encodeURIComponent(product.id);
  const title = String(product.name).slice(0,105);
  const discount = Math.round(100 * (Number(product.oldPrice) - Number(product.price)) / Number(product.oldPrice));
  return {topic:"store", url, revision:String(product.price), templates:{
    en:{title:"PKLAVC Store: " + title,body:discount + "% off featured product",url},
    pt:{title:"PKLAVC Store: " + title,body:"Oferta em destaque: " + discount + "% de desconto",url:"/store/pt/?product=" + encodeURIComponent(product.id)},
    es:{title:"PKLAVC Store: " + title,body:"Oferta destacada: " + discount + "% de descuento",url:"/store/es/?product=" + encodeURIComponent(product.id)}
  }};
}
async function pushToOne(subscription, candidate, campaignId) {
  const local = candidate.templates[subscription.locale] || candidate.templates.en;
  const message = JSON.stringify({title:local.title,body:local.body,url:local.url,tag:campaignId});
  for(let attempt=0;attempt<3;attempt++) {
    try {
      await webpush.sendNotification({endpoint:subscription.endpoint,
        keys:{p256dh:subscription.p256dh,auth:subscription.auth}},message,{TTL:86400,urgency:"normal"});
      return { sent: 1 };
    } catch (error) {
      const code = Number(error.statusCode || 0);
      if (code === 404 || code === 410) return { invalid:subscription.endpoint_hash };
      if ((code === 429 || code >= 500) && attempt < 2) { await pause(1100 * 2**attempt); continue; }
      // Do not print URLs or subscription credentials.
      return { failed: 1, fatal:code===401 || code===403 };
    }
  }
  return { failed:1 };
}
async function deliver(candidate, pair, remaining) {
  const campaignId = sha(candidate.topic + "|" + candidate.url + "|" + (candidate.revision || ""));
  const state = await api("POST","/push/admin/campaign/start",{
    id:campaignId,topic:candidate.topic,url:candidate.url,
  });
  if (!state.accepted || state.status === "done") {
    console.log(candidate.topic, state.status === "done" ? "already sent" : state.reason);
    return 0;
  }
  webpush.setVapidDetails("mailto:contact@pklavc.com",pair.publicKey,pair.privateKey);
  let processed = 0, totalSent = 0, cursor = "";
  while (processed < remaining) {
    const query = new URLSearchParams({id:campaignId, ...(cursor ? {after:cursor}: {})});
    const data = await api("GET","/push/admin/subscribers?" + query);
    const list = (data.items || []).slice(0,remaining-processed);
    if (!list.length) {
      await api("POST","/push/admin/campaign/finish",{id:campaignId});
      console.log(candidate.topic, "finished; successful this run:",totalSent);
      return processed;
    }
    let position = 0;
    const results = [];
    await Promise.all(Array.from({length:Math.min(PARALLEL,list.length)}, async () => {
      while(position < list.length) {
        const sub = list[position++];
        results.push(await pushToOne(sub,candidate,campaignId));
        await pause(WAIT_MS);
      }
    }));
    const sent = results.reduce((s,r)=>s+(r.sent||0),0);
    const invalid = results.filter(r=>r.invalid).map(r=>r.invalid);
    const failed = results.filter(r=>r.failed).length;
    const next = list[list.length-1].endpoint_hash;
    await api("POST","/push/admin/campaign/progress",{id:campaignId,cursor:next,sent,invalid});
    processed += list.length; totalSent += sent; cursor = next;
    console.log(candidate.topic, "processed",processed,"sent",totalSent,"failed in batch",failed,"invalid removed",invalid.length);
    if (results.some(r=>r.fatal) || (failed >= 10 && failed > list.length / 2)) {
      throw Error("Push provider failures exceeded safe threshold; batch processing paused.");
    }
  }
  console.log(candidate.topic, "paused at per-run recipient budget; will resume next schedule.");
  return processed;
}
async function main() {
  if (!SECRET || SECRET.length < 20) throw Error("JWT_SECRET unavailable: fail closed.");
  const candidates = [...getBlogCandidates(),getStoreCandidate()].filter(Boolean);
  console.log("Selected topics:",candidates.map(c=>c.topic).join(", ") || "none");
  if (!candidates.length) return;
  if (DRY_RUN) { console.log("Dry run: no campaigns started and no messages sent."); return; }
  const pair = await vapid();
  let remaining = MAX_RECIPIENTS;
  for(const item of candidates) {
    if(remaining<=0) break;
    const used = await deliver(item,pair,remaining);
    remaining -= used;
  }
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
