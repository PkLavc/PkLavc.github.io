import { createHash } from "node:crypto";

if (process.argv.length > 2) {
  console.error("Read the password from stdin; do not pass it as a command-line argument.");
  process.exit(2);
}

let input = "";
for await (const chunk of process.stdin) input += chunk;
const password = input.replace(/[\r\n]+$/, "");
if (!password) {
  console.error("No password received on stdin.");
  process.exit(2);
}

process.stdout.write(`${createHash("sha256").update(password, "utf8").digest("hex")}\n`);
