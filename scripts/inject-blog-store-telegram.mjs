import fs from "node:fs";
import path from "node:path";

// The public channel name can be configured as an Actions variable or secret.
// The bot token never enters the Pages build or generated HTML.
export function storeTelegramUsername(value = "") {
  let input = String(value ?? "").trim();
  if (input.startsWith("https://t.me/")) input = input.slice("https://t.me/".length);
  input = input.replace(/^@/, "").replace(/\/$/, "");
  return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(input) ? input : "";
}

export function injectStoreTelegramLink(html, value) {
  const token = '<span data-store-telegram-channel="true"></span>';
  if (!html.includes(token)) return html;
  const username = storeTelegramUsername(value);
  if (!username) return html;
  const link = '<a class="blog-community-link" href="https://t.me/' + username +
    '" target="_blank" rel="noopener noreferrer">Telegram Store</a>';
  return html.replaceAll(token, link);
}

export function injectStoreTelegramInBlog(root, value) {
  const username = storeTelegramUsername(value);
  if (!username) return 0;
  let changed = 0;
  for (const locale of ["en", "pt", "es"]) {
    for (const category of ["tech", "games"]) {
      const folder = path.join(root, "blog", locale, category);
      if (!fs.existsSync(folder)) continue;
      for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const file = path.join(folder, entry.name, "index.html");
        if (!fs.existsSync(file)) continue;
        const html = fs.readFileSync(file, "utf8");
        const next = injectStoreTelegramLink(html, username);
        if (next !== html) {
          fs.writeFileSync(file, next);
          changed++;
        }
      }
    }
  }
  return changed;
}
