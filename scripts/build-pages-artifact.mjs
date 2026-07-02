import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".pages-dist");

const publicEntries = [
  "404.html",
  "ads.txt",
  "CNAME",
  "editorial-policy",
  "index.html",
  "privacy-policy",
  "robots.txt",
  "sitemap.xml",
  "terms-of-use",
  "about",
  "blog",
  "collections",
  "css",
  "es",
  "images",
  "js",
  "projects",
  "pt",
  "skyler-assistant",
  "stacks",
  "visitors",
];

const textExtensions = new Set([".html", ".css", ".js"]);
const assetExtensions = new Set([
  ".css",
  ".js",
  ".svg",
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".ico",
  ".json",
]);

const localAssetPattern =
  /(?<prefix>["'(=\s])(?<url>https:\/\/pklavc\.com\/[^"'\s<>?#)]+\.(?:css|js|svg|webp|png|jpg|jpeg|gif|ico|json)|(?:\/|\.\.?\/|[A-Za-z0-9_.-]+\/)[^"'\s<>?#)]+\.(?:css|js|svg|webp|png|jpg|jpeg|gif|ico|json))(\?v=(?<version>[A-Za-z0-9._-]+))?/gi;

const adsenseClientId = (process.env.ADSENSE_CLIENT_ID || "").trim();
const adsenseBlogSlotId = (process.env.ADSENSE_BLOG_SLOT_ID || "").trim();

function removeDirectory(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function copyEntry(source, target) {
  if (!fs.existsSync(source)) return;

  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const name of fs.readdirSync(source)) {
      if (name === "desktop.ini" || name === ".DS_Store" || name === "Thumbs.db") {
        continue;
      }
      copyEntry(path.join(source, name), path.join(target, name));
    }
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function walkFiles(dir) {
  const result = [];
  if (!fs.existsSync(dir)) return result;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath));
    } else if (entry.isFile()) {
      result.push(fullPath);
    }
  }

  return result;
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function getHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").slice(0, 10);
}

function resolveAsset(fromFile, rawUrl) {
  if (rawUrl.includes("*")) return null;

  let urlPath = rawUrl;
  if (urlPath.startsWith("https://pklavc.com/")) {
    urlPath = urlPath.replace("https://pklavc.com", "");
  }

  const cleanPath = urlPath.split("?")[0];
  let candidate;
  if (cleanPath.startsWith("/")) {
    candidate = path.join(outDir, cleanPath.slice(1));
  } else {
    candidate = path.resolve(path.dirname(fromFile), cleanPath);
  }

  if (!candidate.startsWith(outDir) || !fs.existsSync(candidate)) {
    return null;
  }

  const stat = fs.statSync(candidate);
  if (!stat.isFile() || !assetExtensions.has(path.extname(candidate).toLowerCase())) {
    return null;
  }

  return candidate;
}

function updateCacheBusting() {
  const hashCache = new Map();
  let updatedFiles = 0;
  let updatedRefs = 0;

  for (const file of walkFiles(outDir)) {
    if (!textExtensions.has(path.extname(file).toLowerCase())) continue;

    const original = fs.readFileSync(file, "utf8");
    const updated = original.replace(localAssetPattern, (match, ...args) => {
      const groups = args[args.length - 1];
      const rawUrl = groups.url;
      const asset = resolveAsset(file, rawUrl);
      if (!asset) return match;

      if (!hashCache.has(asset)) {
        hashCache.set(asset, getHash(asset));
      }

      const hash = hashCache.get(asset);
      const next = `${groups.prefix}${rawUrl}?v=${hash}`;
      if (next !== match) updatedRefs += 1;
      return next;
    });

    if (updated !== original) {
      fs.writeFileSync(file, updated);
      updatedFiles += 1;
    }
  }

  return { updatedFiles, updatedRefs, assets: hashCache.size };
}

function isBlogPost(file) {
  const relative = toPosixPath(path.relative(outDir, file));
  return /^(?:blog|pt\/blog|es\/blog)\/[^/]+\/index\.html$/.test(relative);
}

function injectAdsenseSupport() {
  if (!/^ca-pub-\d+$/.test(adsenseClientId)) {
    return { updatedFiles: 0, enabled: false };
  }

  let updatedFiles = 0;
  const config = JSON.stringify({
    clientId: adsenseClientId,
    blogSlotId: /^\d+$/.test(adsenseBlogSlotId) ? adsenseBlogSlotId : "",
  });

  for (const file of walkFiles(outDir)) {
    if (!isBlogPost(file)) continue;

    const original = fs.readFileSync(file, "utf8");
    if (original.includes("PKLAVC_ADSENSE_CONFIG") || !original.includes("</head>")) {
      continue;
    }

    const snippet = [
      `<meta name="google-adsense-account" content="${adsenseClientId}">`,
      `<script>window.PKLAVC_ADSENSE_CONFIG=${config};</script>`,
      `<script src="/js/blog-ads.js" defer></script>`,
      "",
    ].join("\n");
    const updated = original.replace("</head>", `${snippet}</head>`);
    fs.writeFileSync(file, updated);
    updatedFiles += 1;
  }

  return { updatedFiles, enabled: true };
}

function main() {
  removeDirectory(outDir);
  fs.mkdirSync(outDir, { recursive: true });

  for (const entry of publicEntries) {
    copyEntry(path.join(root, entry), path.join(outDir, entry));
  }

  const files = walkFiles(outDir);
  const totalBytes = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
  const adsenseStats = injectAdsenseSupport();
  const cacheStats = updateCacheBusting();
  const finalFiles = walkFiles(outDir);
  const finalBytes = finalFiles.reduce((sum, file) => sum + fs.statSync(file).size, 0);

  console.log(`Pages artifact: ${toPosixPath(outDir)}`);
  console.log(`Copied files: ${files.length}`);
  console.log(`Initial size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`AdSense blog support: ${adsenseStats.enabled ? `${adsenseStats.updatedFiles} blog post file(s)` : "disabled"}`);
  console.log(`Cache-busted files: ${cacheStats.updatedFiles}`);
  console.log(`Cache-busted refs: ${cacheStats.updatedRefs}`);
  console.log(`Referenced assets hashed: ${cacheStats.assets}`);
  console.log(`Final files: ${finalFiles.length}`);
  console.log(`Final size: ${(finalBytes / 1024 / 1024).toFixed(2)} MB`);
}

main();
