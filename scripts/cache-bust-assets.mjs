import crypto from "node:crypto";
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
const SITE_DIRECTORIES = new Set(["about", "blog", "collections", "css", "js", "projects", "stacks"]);
const ROOT_CONTENT_FILES = new Set(["404.html", "index.html"]);
const VERSION_PARAM = "v";
const ASSET_PATTERN =
  /(["'])([^"'\\<>]*?\.(?:avif|css|gif|ico|jpe?g|js|json|mjs|png|svg|webmanifest|webp)(?:\?[^"'\\<>]*)?(?:#[^"'\\<>]*)?)\1/gi;
const CSS_URL_PATTERN =
  /url\(\s*(["']?)([^"')\s]+?\.(?:avif|gif|ico|jpe?g|png|svg|webp)(?:\?[^"')\s]*)?(?:#[^"')\s]*)?)\1\s*\)/gi;

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function isInsideRoot(filePath) {
  const relative = path.relative(ROOT, filePath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
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

  const topLevelDirectory = relative.split("/")[0];
  return SITE_DIRECTORIES.has(topLevelDirectory);
}

function hashFile(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").slice(0, 10);
}

function resolveExistingPathCaseInsensitive(candidatePath) {
  const absoluteCandidate = path.resolve(candidatePath);
  if (!isInsideRoot(absoluteCandidate)) {
    return null;
  }

  const relativeSegments = path.relative(ROOT, absoluteCandidate).split(path.sep).filter(Boolean);
  let current = ROOT;
  const actualSegments = [];

  for (const segment of relativeSegments) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return null;
    }

    const exact = entries.find((entry) => entry.name === segment);
    const insensitive = entries.find((entry) => entry.name.toLowerCase() === segment.toLowerCase());
    const match = exact || insensitive;
    if (!match) {
      return null;
    }

    actualSegments.push(match.name);
    current = path.join(current, match.name);
  }

  try {
    if (!fs.statSync(current).isFile()) {
      return null;
    }
  } catch {
    return null;
  }

  return {
    absolutePath: current,
    relativePath: actualSegments.join("/"),
  };
}

function splitResourceUrl(rawUrl) {
  const hashIndex = rawUrl.indexOf("#");
  const beforeHash = hashIndex === -1 ? rawUrl : rawUrl.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : rawUrl.slice(hashIndex);
  const queryIndex = beforeHash.indexOf("?");

  return {
    pathPart: queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex),
    query: queryIndex === -1 ? "" : beforeHash.slice(queryIndex + 1),
    hash,
  };
}

function decodePathPart(pathPart) {
  try {
    return decodeURI(pathPart);
  } catch {
    return pathPart;
  }
}

function hasAssetExtension(pathPart) {
  return ASSET_EXTENSIONS.has(path.extname(pathPart).toLowerCase());
}

function resolveLocalAsset(rawUrl, sourceFile) {
  if (
    !rawUrl ||
    rawUrl.startsWith("data:") ||
    rawUrl.startsWith("mailto:") ||
    rawUrl.startsWith("tel:") ||
    rawUrl.startsWith("#")
  ) {
    return null;
  }

  let mode = "relative";
  let origin = "";
  let resource = splitResourceUrl(rawUrl);

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

    mode = "absolute";
    origin = parsed.origin;
    resource = {
      pathPart: parsed.pathname,
      query: parsed.search.slice(1),
      hash: parsed.hash,
    };
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

    mode = "protocol-relative";
    origin = `//${parsed.host}`;
    resource = {
      pathPart: parsed.pathname,
      query: parsed.search.slice(1),
      hash: parsed.hash,
    };
  } else if (rawUrl.startsWith("/")) {
    mode = "root-relative";
  } else if (/^[a-z][a-z0-9+.-]*:/i.test(rawUrl)) {
    return null;
  }

  if (!hasAssetExtension(resource.pathPart)) {
    return null;
  }

  const decodedPath = decodePathPart(resource.pathPart);
  const candidatePath =
    mode === "relative"
      ? path.resolve(path.dirname(sourceFile), decodedPath)
      : path.resolve(ROOT, decodedPath.replace(/^\/+/, ""));
  const resolved = resolveExistingPathCaseInsensitive(candidatePath);

  if (!resolved) {
    return null;
  }

  return {
    ...resolved,
    hash: resource.hash,
    mode,
    origin,
    query: resource.query,
  };
}

function versionQuery(query, version) {
  const parts = query
    ? query
        .split("&")
        .filter(Boolean)
        .filter((part) => !part.toLowerCase().startsWith(`${VERSION_PARAM}=`) && part.toLowerCase() !== VERSION_PARAM)
    : [];

  parts.push(`${VERSION_PARAM}=${version}`);
  return `?${parts.join("&")}`;
}

function buildVersionedUrl(rawUrl, sourceFile, hashes) {
  const asset = resolveLocalAsset(rawUrl, sourceFile);
  if (!asset) {
    return rawUrl;
  }

  const version = hashes.get(asset.absolutePath) || hashFile(asset.absolutePath);
  let baseUrl;

  if (asset.mode === "absolute" || asset.mode === "protocol-relative") {
    baseUrl = `${asset.origin}/${asset.relativePath}`;
  } else if (asset.mode === "root-relative") {
    baseUrl = `/${asset.relativePath}`;
  } else {
    let relativePath = toPosix(path.relative(path.dirname(sourceFile), asset.absolutePath));
    if (rawUrl.startsWith("./") && relativePath && !relativePath.startsWith(".")) {
      relativePath = `./${relativePath}`;
    }
    baseUrl = relativePath || path.basename(asset.absolutePath);
  }

  return `${baseUrl}${versionQuery(asset.query, version)}${asset.hash}`;
}

function buildHashes(files) {
  const assetFiles = files.filter((file) => ASSET_EXTENSIONS.has(path.extname(file).toLowerCase()));
  return new Map(assetFiles.map((file) => [file, hashFile(file)]));
}

function versionContent(filePath, hashes) {
  const original = fs.readFileSync(filePath, "utf8");
  let updated = original.replace(ASSET_PATTERN, (match, quote, rawUrl) => {
    const versionedUrl = buildVersionedUrl(rawUrl, filePath, hashes);
    return `${quote}${versionedUrl}${quote}`;
  });

  updated = updated.replace(CSS_URL_PATTERN, (match, quote, rawUrl) => {
    const versionedUrl = buildVersionedUrl(rawUrl, filePath, hashes);
    return `url(${quote}${versionedUrl}${quote})`;
  });

  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    return true;
  }

  return false;
}

const allFiles = walk(ROOT);
const contentFiles = allFiles.filter(isSiteContentFile);
let passes = 0;
let changedFiles = new Set();

while (passes < 6) {
  passes += 1;
  const hashes = buildHashes(allFiles);
  let passChanged = false;

  for (const file of contentFiles) {
    if (versionContent(file, hashes)) {
      changedFiles.add(toPosix(path.relative(ROOT, file)));
      passChanged = true;
    }
  }

  if (!passChanged) {
    break;
  }
}

console.log(
  `Cache busting complete: ${changedFiles.size} file${changedFiles.size === 1 ? "" : "s"} updated in ${passes} pass${
    passes === 1 ? "" : "es"
  }.`,
);

if (changedFiles.size) {
  for (const file of [...changedFiles].sort()) {
    console.log(`- ${file}`);
  }
}
