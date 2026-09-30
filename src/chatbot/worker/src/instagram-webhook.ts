import type { Env } from "./index";
import { verifyInstagramSignature } from "./instagram-messaging";

export type InstagramInboundMessage = { accountId: string; senderId: string; messageId: string; text: string };
type InstagramWebhookPayload = { object?: string; entry?: Array<{ id?: string; messaging?: Array<{ sender?: { id?: string }; recipient?: { id?: string }; message?: { mid?: string; text?: string; is_echo?: boolean } }> }> };

export async function parseInstagramWebhook(request: Request, env: Env): Promise<{ response: Response } | { messages: InstagramInboundMessage[] }> {
  if (request.method === "GET") {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const verifyToken = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (!env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) return { response: new Response("Instagram webhook is not configured", { status: 503 }) };
    if (mode !== "subscribe" || !challenge || !constantTimeEqual(verifyToken || "", env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN)) {
      return { response: new Response("Forbidden", { status: 403 }) };
    }
    return { response: new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } }) };
  }

  if (request.method !== "POST") return { response: new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, POST" } }) };
  if (!env.INSTAGRAM_APP_SECRET) return { response: new Response("Instagram webhook is not configured", { status: 503 }) };
  const rawBody = await request.text();
  if (!await verifyInstagramSignature(rawBody, request.headers.get("X-Hub-Signature-256"), env.INSTAGRAM_APP_SECRET)) {
    return { response: new Response("Invalid webhook signature", { status: 401 }) };
  }

  let payload: InstagramWebhookPayload;
  try { payload = JSON.parse(rawBody) as InstagramWebhookPayload; }
  catch { return { response: new Response("Invalid JSON", { status: 400 }) }; }
  if (payload.object !== "instagram") return { messages: [] };

  const messages: InstagramInboundMessage[] = [];
  for (const entry of payload.entry || []) {
    for (const event of entry.messaging || []) {
      const senderId = event.sender?.id || "";
      const accountId = entry.id || event.recipient?.id || "";
      const messageId = event.message?.mid || "";
      const text = event.message?.text?.trim() || "";
      if (!senderId || !accountId || !messageId || !text || event.message?.is_echo) continue;
      messages.push({ accountId, senderId, messageId, text });
    }
  }
  return { messages };
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}
