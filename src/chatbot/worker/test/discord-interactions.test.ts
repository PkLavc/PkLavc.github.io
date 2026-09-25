import { afterAll, describe, expect, it } from "vitest";
import { handleDiscordInteraction, verifyDiscordSignature } from "../src/discord-interactions";

const keyPairPromise = crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
const timestamp = "1780000000";
async function signedRequest(body: string, publicKeyHex: string, privateKey: CryptoKey, overrides: Record<string, string> = {}) {
  const signature = new Uint8Array(await crypto.subtle.sign({ name: "Ed25519" }, privateKey, new TextEncoder().encode(timestamp + body)));
  const hex = Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return new Request("https://api.pklavc.com/discord/interactions", { method: "POST", body, headers: { "X-Signature-Timestamp": timestamp, "X-Signature-Ed25519": hex, ...overrides } });
}
function toHex(bytes: ArrayBuffer) { return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join(""); }
const envWith = (publicKey: string, patch: Record<string, unknown> = {}) => ({ DISCORD_PUBLIC_KEY: publicKey, DISCORD_OWNER_USER_ID: "owner", DB: {} as never, ...patch } as never);

describe("Discord interactions", () => {
  it("accepts a correctly signed Discord PING and returns PONG", async () => {
    const keys = await keyPairPromise;
    const body = JSON.stringify({ type: 1 });
    const request = await signedRequest(body, "", keys.privateKey);
    const response = await handleDiscordInteraction(request, envWith(toHex(await crypto.subtle.exportKey("raw", keys.publicKey))), { waitUntil() {} } as never);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ type: 1 });
  });

  it("rejects an invalid signature, a changed body, and missing signature headers", async () => {
    const keys = await keyPairPromise;
    const publicKey = toHex(await crypto.subtle.exportKey("raw", keys.publicKey));
    const body = JSON.stringify({ type: 1 });
    const valid = await signedRequest(body, publicKey, keys.privateKey);
    expect(await verifyDiscordSignature(body, valid.headers.get("X-Signature-Ed25519"), timestamp, publicKey)).toBe(true);
    expect(await verifyDiscordSignature(body, "00".repeat(64), timestamp, publicKey)).toBe(false);
    expect(await verifyDiscordSignature(`${body} `, valid.headers.get("X-Signature-Ed25519"), timestamp, publicKey)).toBe(false);
    expect(await verifyDiscordSignature(body, null, null, publicKey)).toBe(false);
  });

  it.each(["assume", "reply", "return", "close"]) ("denies a non-owner attempting %s without touching storage", async (action) => {
    const keys = await keyPairPromise;
    const publicKey = toHex(await crypto.subtle.exportKey("raw", keys.publicKey));
    const body = JSON.stringify({ type: 2, member: { user: { id: "intruder" } }, data: { custom_id: `skylet:${action}:12345678-1234-1234-1234-123456789012` } });
    const request = await signedRequest(body, publicKey, keys.privateKey);
    const response = await handleDiscordInteraction(request, envWith(publicKey), { waitUntil() {} } as never);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ type: 4, data: { flags: 64 } });
  });
});
