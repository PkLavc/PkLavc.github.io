import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatbotRoot = path.resolve(__dirname, "..");
const root = chatbotRoot;
const targets = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", "volumes", ".git"].includes(entry.name)) continue;
      walk(full);
      continue;
    }
    if (entry.name.endsWith(".json")) {
      targets.push(full);
    }
  }
}

walk(root);

let failed = 0;
for (const file of targets) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    failed += 1;
    console.error(`Invalid JSON: ${file}`);
    console.error(String(error));
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log(`Validated ${targets.length} JSON files.`);
