import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatbotRoot = path.resolve(__dirname, "..");
const architecture = path.resolve(chatbotRoot, "docs", "architecture-overview.md");
const out = path.resolve(chatbotRoot, "artifacts", "architecture.generated.md");

if (!fs.existsSync(architecture)) {
  console.error("architecture-overview.md not found");
  process.exit(1);
}

const source = fs.readFileSync(architecture, "utf8");
const generated = [
  "# Generated Architecture Snapshot",
  "",
  `Generated at: ${new Date().toISOString()}`,
  "",
  source,
].join("\n");

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, generated);
console.log("Generated docs snapshot.");
