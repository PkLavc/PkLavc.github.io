import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatbotRoot = path.resolve(__dirname, "..");
const docsDir = path.resolve(chatbotRoot, "docs");
const outFile = path.resolve(chatbotRoot, "artifacts", "docs-sync.json");
fs.mkdirSync(path.dirname(outFile), { recursive: true });

const files = fs.existsSync(docsDir)
  ? fs.readdirSync(docsDir).filter((name) => /\.(md|txt|json)$/i.test(name))
  : [];

const docs = files.map((name) => {
  const full = path.join(docsDir, name);
  return {
    name,
    content: fs.readFileSync(full, "utf8"),
    updated_at: new Date().toISOString(),
  };
});

fs.writeFileSync(outFile, JSON.stringify({ docs, count: docs.length }, null, 2));
console.log(`Synced ${docs.length} documents.`);
