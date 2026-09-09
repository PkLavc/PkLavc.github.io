// Compatibility entry point: source-code schema now shares the factual Pages normalizer.
// Pass a directory explicitly to normalize another static-site artifact.
import path from "node:path";
import { normalizeSeoDirectory } from "./normalize-seo.mjs";

const directory = path.resolve(process.argv[2] || ".pages-dist");
console.log(`SEO normalization: ${JSON.stringify(normalizeSeoDirectory(directory))}`);
