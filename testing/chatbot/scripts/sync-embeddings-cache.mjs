import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatbotRoot = path.resolve(__dirname, "..");
const inFile = path.resolve(chatbotRoot, "artifacts", "embeddings.json");
const outFile = path.resolve(chatbotRoot, "artifacts", "embeddings-kv-seed.json");

if (!fs.existsSync(inFile)) {
  console.error("embeddings.json not found. Run embeddings:offline first.");
  process.exit(1);
}

const parsed = JSON.parse(fs.readFileSync(inFile, "utf8"));
const items = Array.isArray(parsed.items) ? parsed.items : [];

const kvSeed = items.map((item) => {
  const source = String(item.input_text || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2500);
  const keyHash = crypto.createHash("sha256").update(`emb:${source}`).digest("hex");
  return {
    key: `embedding:${keyHash}`,
    value: JSON.stringify(item.embedding || []),
  };
});

fs.writeFileSync(
  outFile,
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      count: kvSeed.length,
      items: kvSeed,
    },
    null,
    2,
  ),
);

console.log(`Prepared ${kvSeed.length} KV embedding seed records.`);
