import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chatbotRoot = path.resolve(__dirname, "..");
const input = path.resolve(chatbotRoot, "artifacts", "analytics-events.json");
const output = path.resolve(chatbotRoot, "artifacts", "analytics-batch-summary.json");
fs.mkdirSync(path.dirname(output), { recursive: true });

const events = fs.existsSync(input) ? JSON.parse(fs.readFileSync(input, "utf8")) : [];
const summary = {};
for (const event of events) {
  const key = event.event_type || "unknown";
  summary[key] = (summary[key] || 0) + 1;
}

const payload = {
  generated_at: new Date().toISOString(),
  total_events: events.length,
  by_event: summary,
};

fs.writeFileSync(output, JSON.stringify(payload, null, 2));
console.log("Analytics ETL completed.");
