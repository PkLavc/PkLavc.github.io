import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openRouterKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_EMBED_MODEL || "text-embedding-3-small";

const chatbotRoot = path.resolve(__dirname, "..");
const inFile = path.resolve(chatbotRoot, "artifacts", "docs-sync.json");
const outFile = path.resolve(chatbotRoot, "artifacts", "embeddings.json");

if (!fs.existsSync(inFile)) {
  console.error("docs-sync.json not found. Run sync-documents first.");
  process.exit(1);
}

const docs = JSON.parse(fs.readFileSync(inFile, "utf8")).docs || [];

function deterministicEmbedding(text, size = 128) {
  const vec = Array.from({ length: size }, () => 0);
  for (let i = 0; i < text.length; i += 1) vec[i % size] += (text.charCodeAt(i) % 17) / 17;
  const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

async function embedRemote(text) {
  const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openRouterKey}`,
      "HTTP-Referer": "https://pklavc.com",
      "X-Title": "PKLAVC Embeddings Pipeline"
    },
    body: JSON.stringify({ model, input: text.slice(0, 3000) })
  });
  if (!response.ok) throw new Error(`Embedding HTTP ${response.status}`);
  const data = await response.json();
  return data?.data?.[0]?.embedding || deterministicEmbedding(text);
}

const output = [];
for (const doc of docs) {
  const chunk = String(doc.content || "").slice(0, 6000);
  let embedding;
  if (openRouterKey) {
    try {
      embedding = await embedRemote(chunk);
    } catch {
      embedding = deterministicEmbedding(chunk);
    }
  } else {
    embedding = deterministicEmbedding(chunk);
  }

  output.push({
    name: doc.name,
    input_text: chunk.slice(0, 2500),
    embedding,
    generated_at: new Date().toISOString(),
  });
}

fs.writeFileSync(outFile, JSON.stringify({ model, count: output.length, items: output }, null, 2));
console.log(`Generated embeddings for ${output.length} docs.`);
