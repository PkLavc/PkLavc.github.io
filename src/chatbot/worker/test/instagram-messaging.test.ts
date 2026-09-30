import { afterEach, describe, expect, it, vi } from "vitest";
import { deriveInstagramIdentity, decryptInstagramRecipient, encryptInstagramRecipient, sendInstagramMessage, verifyInstagramSignature } from "../src/instagram-messaging";
import { parseInstagramWebhook } from "../src/instagram-webhook";

const appSecret = "test-app-secret-never-real";
const env = { INSTAGRAM_WEBHOOK_VERIFY_TOKEN: "test-verify-token", INSTAGRAM_APP_SECRET: appSecret } as never;

async function signature(body: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(appSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body)));
  return `sha256=${Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("")}`;
}

afterEach(() => vi.unstubAllGlobals());

describe("Instagram webhook and messaging", () => {
  it("answers the Meta GET handshake only for the configured verify token", async () => {
    const valid = await parseInstagramWebhook(new Request("https://api.pklavc.com/webhook/instagram?hub.mode=subscribe&hub.verify_token=test-verify-token&hub.challenge=abc123"), env);
    expect("response" in valid && valid.response.status).toBe(200);
    expect("response" in valid && await valid.response.text()).toBe("abc123");

    const invalid = await parseInstagramWebhook(new Request("https://api.pklavc.com/webhook/instagram?hub.mode=subscribe&hub.verify_token=nope&hub.challenge=abc123"), env);
    expect("response" in invalid && invalid.response.status).toBe(403);
  });

  it("accepts a signed DM and ignores an echo from the account itself", async () => {
    const body = JSON.stringify({ object: "instagram", entry: [{ id: "account", messaging: [
      { sender: { id: "visitor" }, recipient: { id: "account" }, message: { mid: "mid-1", text: "Olá" } },
      { sender: { id: "account" }, recipient: { id: "visitor" }, message: { mid: "mid-2", text: "Resposta", is_echo: true } },
    ] }] });
    const parsed = await parseInstagramWebhook(new Request("https://api.pklavc.com/webhook/instagram", { method: "POST", body, headers: { "X-Hub-Signature-256": await signature(body) } }), env);
    expect("messages" in parsed && parsed.messages).toEqual([{ accountId: "account", senderId: "visitor", messageId: "mid-1", text: "Olá" }]);

    const rejected = await parseInstagramWebhook(new Request("https://api.pklavc.com/webhook/instagram", { method: "POST", body, headers: { "X-Hub-Signature-256": "sha256=" + "0".repeat(64) } }), env);
    expect("response" in rejected && rejected.response.status).toBe(401);
  });

  it("derives stable, private identities and encrypts the recipient id", async () => {
    const first = await deriveInstagramIdentity(appSecret, "account", "visitor");
    expect(await deriveInstagramIdentity(appSecret, "account", "visitor")).toEqual(first);
    expect(await deriveInstagramIdentity(appSecret, "account", "another-visitor")).not.toEqual(first);
    const ciphertext = await encryptInstagramRecipient(appSecret, "visitor");
    expect(ciphertext).not.toContain("visitor");
    expect(await decryptInstagramRecipient(appSecret, ciphertext)).toBe("visitor");
  });

  it("sends replies through Instagram Login's official messaging endpoint", async () => {
    const fetchMock = vi.fn(async (..._args: Parameters<typeof fetch>) => Response.json({ recipient_id: "visitor", message_id: "sent" }));
    vi.stubGlobal("fetch", fetchMock);
    await sendInstagramMessage({ INSTAGRAM_ACCESS_TOKEN: "test-token", INSTAGRAM_API_MODE: "instagram_login", INSTAGRAM_GRAPH_API_VERSION: "v26.0" } as never, "visitor", "account", "Reply");
    expect(fetchMock).toHaveBeenCalledWith("https://graph.instagram.com/v26.0/me/messages", expect.objectContaining({
      method: "POST",
      headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
    }));
    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual({ recipient: { id: "visitor" }, message: { text: "Reply" } });
  });

  it("verifies the HMAC signature over the exact raw request body", async () => {
    const body = "{\"event\":true}";
    expect(await verifyInstagramSignature(body, await signature(body), appSecret)).toBe(true);
    expect(await verifyInstagramSignature(body + " ", await signature(body), appSecret)).toBe(false);
  });
});
