import type { Env } from "./index";

export async function verifyInstagramSignature(rawBody: string, signature: string | null, appSecret?: string): Promise<boolean> {
  if (!appSecret || !signature || !/^sha256=[0-9a-f]{64}$/i.test(signature)) return false;
  try {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(appSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody)));
    const expected = `sha256=${Array.from(digest, byte => byte.toString(16).padStart(2, "0")).join("")}`;
    return constantTimeEqual(expected, signature.toLowerCase());
  } catch { return false; }
}

export async function deriveInstagramIdentity(appSecret: string, accountId: string, senderId: string): Promise<{ senderKey: string; visitorId: string; conversationId: string }> {
  const scope = `${accountId}:${senderId}`;
  const senderKey = await hmacHex(appSecret, `sender:${scope}`);
  const visitorId = await hmacUuid(appSecret, `visitor:${scope}`);
  const conversationId = await hmacUuid(appSecret, `conversation:${scope}`);
  return { senderKey, visitorId, conversationId };
}

export async function encryptInstagramRecipient(appSecret: string, recipientId: string): Promise<string> {
  const key = await encryptionKey(appSecret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(recipientId)));
  return toBase64(new Uint8Array([...iv, ...ciphertext]));
}

export async function decryptInstagramRecipient(appSecret: string, ciphertext: string): Promise<string> {
  const bytes = fromBase64(ciphertext);
  const key = await encryptionKey(appSecret);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes.slice(0, 12) }, key, bytes.slice(12));
  return new TextDecoder().decode(plaintext);
}

export async function sendInstagramMessage(env: Env, recipientId: string, accountId: string, content: string): Promise<void> {
  if (!env.INSTAGRAM_ACCESS_TOKEN) throw new Error("instagram_access_token_missing");
  const version = (env.INSTAGRAM_GRAPH_API_VERSION || "v26.0").replace(/^v?/, "v");
  const mode = env.INSTAGRAM_API_MODE || "instagram_login";
  const endpoint = mode === "facebook_login"
    ? `https://graph.facebook.com/${version}/${encodeURIComponent(accountId)}/messages`
    : `https://graph.instagram.com/${version}/me/messages`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.INSTAGRAM_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ recipient: { id: recipientId }, message: { text: content.slice(0, 2000) } }),
  });
  if (!response.ok) throw new Error(`instagram_send_http_${response.status}`);
}

export async function sendInstagramReplyForConversation(env: Env, conversationId: string, content: string): Promise<boolean> {
  if (!env.INSTAGRAM_APP_SECRET) return false;
  const mapping = await env.DB.prepare("SELECT account_id, recipient_id_cipher FROM instagram_conversations WHERE conversation_id = ?")
    .bind(conversationId).first<{ account_id: string; recipient_id_cipher: string }>();
  if (!mapping) return false;
  const recipientId = await decryptInstagramRecipient(env.INSTAGRAM_APP_SECRET, mapping.recipient_id_cipher);
  await sendInstagramMessage(env, recipientId, mapping.account_id, content);
  return true;
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
  return Array.from(digest, byte => byte.toString(16).padStart(2, "0")).join("");
}

async function hmacUuid(secret: string, value: string): Promise<string> {
  const bytes = await hmacHex(secret, value);
  const hex = `${bytes.slice(0, 12)}5${bytes.slice(13, 16)}${((parseInt(bytes[16], 16) & 0x3) | 0x8).toString(16)}${bytes.slice(17, 20)}${bytes.slice(20, 32)}`;
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

async function encryptionKey(secret: string): Promise<CryptoKey> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`skylet-instagram-recipient:v1:${secret}`));
  return crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["encrypt", "decrypt"]);
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), character => character.charCodeAt(0));
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}
