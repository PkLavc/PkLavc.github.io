import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatbotRoot = path.resolve(__dirname, "..");
const architecture = path.resolve(chatbotRoot, "docs", "architecture-overview.md");
const out = path.resolve(chatbotRoot, "artifacts", "architecture.generated.md");

const source = fs.existsSync(architecture)
  ? fs.readFileSync(architecture, "utf8")
  : [
    "# Architecture Overview",
    "",
    "Source file missing: docs/architecture-overview.md.",
    "Create this file to include a full architecture summary in generated artifacts.",
  ].join("\n");

if (!fs.existsSync(architecture)) {
  console.warn("architecture-overview.md not found, using fallback content");
}

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
