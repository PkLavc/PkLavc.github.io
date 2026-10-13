import { readFileSync } from "node:fs";
import { Script } from "node:vm";

const html = readFileSync(new URL("../../../../tiktok/index.html", import.meta.url), "utf8");
const code = html.match(/<script>([\s\S]*?)<\/script>/i)?.[1];
if (!code) throw new Error("TikTok review page inline script missing");
new Script(code, { filename: "tiktok/index.html:inline-script" });

for (const id of [
  "video", "videoPreview", "caption", "privacy", "comments", "duet", "stitch",
  "commercial", "ownBrand", "brandedContent", "brandChoices", "brandLabel",
  "musicTerms", "consent", "directPost", "draftUpload",
]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing audit UI control: ${id}`);
}

for (const required of [
  'privacy.value === "SELF_ONLY"',
  'brandedContent.disabled',
  'brand_content_toggle: commercial.checked && brandedContent.checked',
  'brand_organic_toggle: commercial.checked && ownBrand.checked',
  "Music Usage Confirmation",
  "Branded Content Policy",
  'commercial.checked && !commercialOk',
  "maxVideoDuration",
  "consent.checked",
  "unaudited_client_can_only_post_to_private_accounts",
  "the entire TikTok account must be Private",
  "payload.tiktok_error",
]) {
  if (!code.includes(required) && !html.includes(required)) {
    throw new Error(`Missing TikTok audit behavior: ${required}`);
  }
}

console.log("TikTok audit page syntax and required disclosure controls validated.");
