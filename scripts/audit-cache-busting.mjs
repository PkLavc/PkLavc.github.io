import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_HOSTS = new Set(["pklavc.com", "www.pklavc.com", "pklavc.github.io"]);
const ASSET_EXTENSIONS = new Set([
  ".avif",
  ".css",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".mjs",
  ".png",
  ".svg",
  ".webmanifest",
  ".webp",
]);
const CONTENT_EXTENSIONS = new Set([".css", ".html", ".js"]);
const SITE_DIRECTORIES = new Set(["about", "blog", "collections", "css", "es", "js", "projects", "pt", "skyler-assistant", "stacks"]);
const ROOT_CONTENT_FILES = new Set(["404.html", "index.html"]);
const ASSET_PATTERN =
  /(["'])([^"'\\<>]*?\.(?:avif|css|gif|ico|jpe?g|js|json|mjs|png|svg|webmanifest|webp)(?:\?[^"'\\<>]*)?(?:#[^"'\\<>]*)?)\1/gi;
const CSS_URL_PATTERN =
  /url\(\s*(["']?)([^"')\s]+?\.(?:avif|gif|ico|jpe?g|png|svg|webp)(?:\?[^"')\s]*)?(?:#[^"')\s]*)?)\1\s*\)/gi;

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function isSiteContentFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (!CONTENT_EXTENSIONS.has(extension)) {
    return false;
  }

  const relative = toPosix(path.relative(ROOT, filePath));
  if (ROOT_CONTENT_FILES.has(relative)) {
    return true;
  }

  return SITE_DIRECTORIES.has(relative.split("/")[0]);
}

function isUrlLikeAsset(rawUrl) {
  return (
    rawUrl.startsWith("/") ||
    rawUrl.startsWith("./") ||
    rawUrl.startsWith("../") ||
    rawUrl.startsWith("//") ||
    /^https?:\/\//i.test(rawUrl) ||
    rawUrl.includes("/")
  );
}

function hasAssetExtension(pathPart) {
  return ASSET_EXTENSIONS.has(path.extname(pathPart).toLowerCase());
}

function splitResourceUrl(rawUrl) {
  const hashIndex = rawUrl.indexOf("#");
  const beforeHash = hashIndex === -1 ? rawUrl : rawUrl.slice(0, hashIndex);
  const queryIndex = beforeHash.indexOf("?");

  return {
    pathPart: queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex),
  };
}

function isInsideRoot(filePath) {
  const relative = path.relative(ROOT, filePath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function resolveExistingPathCaseInsensitive(candidatePath) {
  const absoluteCandidate = path.resolve(candidatePath);
  if (!isInsideRoot(absoluteCandidate)) {
    return false;
  }

  const relativeSegments = path.relative(ROOT, absoluteCandidate).split(path.sep).filter(Boolean);
  let current = ROOT;

  for (const segment of relativeSegments) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return false;
    }

    const match =
      entries.find((entry) => entry.name === segment) ||
      entries.find((entry) => entry.name.toLowerCase() === segment.toLowerCase());
    if (!match) {
      return false;
    }

    current = path.join(current, match.name);
  }

  try {
    return fs.statSync(current).isFile();
  } catch {
    return false;
  }
}

function resolveLocalAsset(rawUrl, sourceFile) {
  if (
    !rawUrl ||
    rawUrl.startsWith("data:") ||
    rawUrl.startsWith("mailto:") ||
    rawUrl.startsWith("tel:") ||
    rawUrl.startsWith("#") ||
    !isUrlLikeAsset(rawUrl)
  ) {
    return null;
  }

  let resource = splitResourceUrl(rawUrl);
  let candidatePath;

  if (/^https?:\/\//i.test(rawUrl)) {
    let parsed;
    try {
      parsed = new URL(rawUrl);
    } catch {
      return null;
    }

    if (!PUBLIC_HOSTS.has(parsed.hostname.toLowerCase())) {
      return null;
    }

    resource = splitResourceUrl(parsed.pathname + parsed.search + parsed.hash);
    candidatePath = path.resolve(ROOT, resource.pathPart.replace(/^\/+/, ""));
  } else if (rawUrl.startsWith("//")) {
    let parsed;
    try {
      parsed = new URL(`https:${rawUrl}`);
    } catch {
      return null;
    }

    if (!PUBLIC_HOSTS.has(parsed.hostname.toLowerCase())) {
      return null;
    }

    resource = splitResourceUrl(parsed.pathname + parsed.search + parsed.hash);
    candidatePath = path.resolve(ROOT, resource.pathPart.replace(/^\/+/, ""));
  } else if (rawUrl.startsWith("/")) {
    candidatePath = path.resolve(ROOT, resource.pathPart.replace(/^\/+/, ""));
  } else if (/^[a-z][a-z0-9+.-]*:/i.test(rawUrl)) {
    return null;
  } else {
    candidatePath = path.resolve(path.dirname(sourceFile), resource.pathPart);
  }

  if (!hasAssetExtension(resource.pathPart)) {
    return null;
  }

  return {
    exists: resolveExistingPathCaseInsensitive(candidatePath),
  };
}

function collectAssets(text) {
  const assets = [];

  for (const match of text.matchAll(ASSET_PATTERN)) {
    assets.push(match[2]);
  }

  for (const match of text.matchAll(CSS_URL_PATTERN)) {
    assets.push(match[2]);
  }

  return [...new Set(assets)];
}

const unversioned = [];
const broken = [];

for (const filePath of walk(ROOT).filter(isSiteContentFile)) {
  const relativeFile = toPosix(path.relative(ROOT, filePath));
  const text = fs.readFileSync(filePath, "utf8");

  for (const rawUrl of collectAssets(text)) {
    const asset = resolveLocalAsset(rawUrl, filePath);
    if (!asset) {
      continue;
    }

    if (!asset.exists) {
      broken.push(`${relativeFile}: ${rawUrl}`);
      continue;
    }

    if (!/[?&]v=/.test(rawUrl)) {
      unversioned.push(`${relativeFile}: ${rawUrl}`);
    }
  }
}

if (broken.length || unversioned.length) {
  if (broken.length) {
    console.error("Broken local asset references:");
    for (const item of broken) {
      console.error(`- ${item}`);
    }
  }

  if (unversioned.length) {
    console.error("Unversioned local asset references:");
    for (const item of unversioned) {
      console.error(`- ${item}`);
    }
  }

  process.exit(1);
}

console.log("Cache busting audit passed: all local site asset references are versioned.");
