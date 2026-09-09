import assert from "node:assert/strict";
import test from "node:test";
import { configureCloudflareDiscovery } from "./configure-cloudflare-discovery.mjs";

const zone = { id: "a".repeat(32), name: "pklavc.com", status: "active", plan: { name: "Free" } };
function harness({ zones = [zone], before = { ai_bots_protection: "block", fight_mode: true, enable_js: true }, after, denied = false } = {}) {
  const calls = [];
  const lines = [];
  let updated = false;
  const fetchImpl = async (url, options) => {
    calls.push({ url, method: options.method, body: options.body });
    assert.equal(options.headers.Authorization, "Bearer test-token");
    assert.equal(options.redirect, "error");
    let result;
    if (url.includes("/zones?")) result = zones;
    else if (denied) return { ok: false, status: 403, json: async () => ({ success: false, errors: [{ code: 10000, message: "test-token must never be logged" }] }) };
    else if (options.method === "PUT") { updated = true; result = { ...before, ai_bots_protection: "disabled" }; }
    else result = updated ? (after ?? { ...before, ai_bots_protection: "disabled" }) : before;
    return { ok: true, status: 200, json: async () => ({ success: true, result }) };
  };
  const run = (apply = false) => configureCloudflareDiscovery({ token: "test-token", apply, fetchImpl, log: (line) => lines.push(line) });
  return { calls, lines, run };
}

test("audit never mutates Cloudflare and does not log the credential", async () => {
  const h = harness();
  const result = await h.run();
  assert.equal(result.aiBotsProtection, "block");
  assert.equal(h.calls.length, 2);
  assert.ok(h.calls.every((call) => call.method === "GET"));
  assert.ok(!h.lines.join("\n").includes("test-token"));
});

test("apply changes only the AI bot toggle and verifies other returned settings", async () => {
  const h = harness();
  const result = await h.run(true);
  const writes = h.calls.filter((call) => call.method !== "GET");
  assert.equal(writes.length, 1);
  assert.deepEqual(JSON.parse(writes[0].body), { ai_bots_protection: "disabled" });
  assert.equal(h.calls.at(-1).method, "GET");
  assert.equal(result.aiBotsProtection, "disabled");
  assert.equal(result.changes.length, 1);
});

test("already configured zones require no mutation", async () => {
  const h = harness({ before: { ai_bots_protection: "disabled", fight_mode: true } });
  assert.deepEqual((await h.run(true)).changes, []);
  assert.equal(h.calls.length, 2);
});

test("wrong, duplicate, and inactive zones fail before reading or changing settings", async () => {
  for (const zones of [[], [zone, zone], [{ ...zone, name: "example.com" }], [{ ...zone, status: "pending" }]]) {
    const h = harness({ zones });
    await assert.rejects(h.run(true), /No settings changed/);
    assert.equal(h.calls.length, 1);
  }
});

test("permission failures report the scope without exposing the API body", async () => {
  const h = harness({ denied: true });
  await assert.rejects(h.run(true), (error) => {
    assert.match(error.message, /HTTP 403.*10000.*Bot Management Read/);
    assert.ok(!error.message.includes("test-token"));
    return true;
  });
  assert.ok(h.calls.every((call) => call.method === "GET"));
});

test("unrecognized settings fail closed before mutation", async () => {
  const h = harness({ before: { fight_mode: true } });
  await assert.rejects(h.run(true), /No settings changed/);
  assert.ok(h.calls.every((call) => call.method === "GET"));
});

test("failed read-after-write and unrelated configuration changes are surfaced", async () => {
  const ignored = harness({ after: { ai_bots_protection: "block", fight_mode: true, enable_js: true } });
  await assert.rejects(ignored.run(true), /did not confirm/);
  const changed = harness({ after: { ai_bots_protection: "disabled", fight_mode: false, enable_js: true } });
  await assert.rejects(changed.run(true), /other Bot Management settings changing/);
});
