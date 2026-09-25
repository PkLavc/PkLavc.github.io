import type { Env } from "./index";
import { discordApi, postThreadMessage, updateControlMessage } from "./discord-conversations";

type DiscordInteraction = {
  type: number; id: string; token: string;
  member?: { user?: { id?: string } }; user?: { id?: string };
  channel_id?: string;
  data?: { custom_id?: string; components?: Array<{ components?: Array<{ custom_id?: string; value?: string }> }> };
};

export async function verifyDiscordSignature(rawBody: string, signature: string | null, timestamp: string | null, publicKey: string | undefined): Promise<boolean> {
  if (!signature || !timestamp || !publicKey || !/^[0-9a-f]{128}$/i.test(signature) || !/^[0-9a-f]{64}$/i.test(publicKey) || !/^\d{1,16}$/.test(timestamp)) return false;
  try {
    const key = await crypto.subtle.importKey("raw", hexToBytes(publicKey) as BufferSource, { name: "Ed25519" }, false, ["verify"]);
    return crypto.subtle.verify({ name: "Ed25519" }, key, hexToBytes(signature) as BufferSource, new TextEncoder().encode(timestamp + rawBody) as BufferSource);
  } catch { return false; }
}

export async function handleDiscordInteraction(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const raw = await request.text();
  const valid = await verifyDiscordSignature(raw, request.headers.get("X-Signature-Ed25519"), request.headers.get("X-Signature-Timestamp"), env.DISCORD_PUBLIC_KEY);
  if (!valid) return new Response("invalid request signature", { status: 401 });
  let interaction: DiscordInteraction;
  try { interaction = JSON.parse(raw) as DiscordInteraction; } catch { return new Response("invalid body", { status: 400 }); }
  if (interaction.type === 1) return Response.json({ type: 1 });
  if (interaction.type !== 3 && interaction.type !== 5) return Response.json({ type: 4, data: { content: "Interação não suportada.", flags: 64 } });
  const actorId = interaction.member?.user?.id || interaction.user?.id;
  if (!actorId || actorId !== env.DISCORD_OWNER_USER_ID) return Response.json({ type: 4, data: { content: "Você não tem autorização para esta ação.", flags: 64 } });
  const customId = interaction.data?.custom_id || "";
  const match = /^skylet:(assume|reply|return|close|reply_submit):([0-9a-f-]{36})$/i.exec(customId);
  if (!match) return Response.json({ type: 4, data: { content: "Ação inválida.", flags: 64 } });
  const [, action, conversationId] = match;
  const control = await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<any>();
  if (!control || control.discord_thread_id !== interaction.channel_id) return Response.json({ type: 4, data: { content: "Conversa não encontrada.", flags: 64 } });
  if (action === "reply") {
    return Response.json({ type: 9, data: { custom_id: `skylet:reply_submit:${conversationId}`, title: "Responder visitante", components: [{ type: 1, components: [{ type: 4, custom_id: "reply_text", label: "Sua resposta", style: 2, min_length: 1, max_length: 1800, required: true }] }] } });
  }
  if (action === "reply_submit") {
    const content = interaction.data?.components?.flatMap((row) => row.components || []).find((component) => component.custom_id === "reply_text")?.value?.trim();
    if (!content || control.status === "CLOSED") return Response.json({ type: 4, data: { content: "Esta conversa está encerrada.", flags: 64 } });
    ctx.waitUntil((async () => {
      const now = new Date().toISOString();
      const outcomes = await env.DB.batch([
        env.DB.prepare("UPDATE discord_conversations SET status = 'HUMAN', updated_at = ? WHERE conversation_id = ? AND status <> 'CLOSED'").bind(now, conversationId),
        env.DB.prepare("INSERT INTO messages (conversation_id, role, content, created_at) SELECT ?, 'human', ?, ? WHERE EXISTS (SELECT 1 FROM discord_conversations WHERE conversation_id = ? AND status = 'HUMAN')").bind(conversationId, content, now, conversationId),
        env.DB.prepare("UPDATE conversations SET updated_at = ? WHERE id = ? AND EXISTS (SELECT 1 FROM discord_conversations WHERE conversation_id = ? AND status = 'HUMAN')").bind(now, conversationId, conversationId),
      ]);
      if (!outcomes[1]?.meta.changes) return;
      await postThreadMessage(env, control.discord_thread_id, { content: `**Patrick:**\n${content}`, allowed_mentions: { parse: [] } });
      await updateControlMessage(env, { ...control, status: "HUMAN" }, true);
    })().catch(() => console.log(JSON.stringify({ level: "warn", event: "discord_human_reply_failed" }))));
    return Response.json({ type: 5, data: { flags: 64 } });
  }
  if (action === "assume" && control.status !== "AI") return Response.json({ type: 4, data: { content: "A conversa não está no estado IA.", flags: 64 } });
  if (action === "return" && control.status !== "HUMAN") return Response.json({ type: 4, data: { content: "A conversa não está em atendimento humano.", flags: 64 } });
  if (action === "close" && control.status === "CLOSED") return Response.json({ type: 4, data: { content: "A conversa já está encerrada.", flags: 64 } });
  const status = action === "assume" ? "HUMAN" : action === "return" ? "AI" : "CLOSED";
  ctx.waitUntil((async () => {
    await env.DB.prepare("UPDATE discord_conversations SET status = ?, updated_at = ? WHERE conversation_id = ?").bind(status, new Date().toISOString(), conversationId).run();
    await env.DB.prepare("INSERT INTO analytics_events (event_type, event_payload, created_at) VALUES ('discord_handoff', ?, ?)").bind(JSON.stringify({ conversation_id: conversationId, status }), new Date().toISOString()).run();
    await updateControlMessage(env, { ...control, status });
    if (status === "CLOSED") await discordApi(env, `/channels/${control.discord_thread_id}`, { method: "PATCH", body: JSON.stringify({ archived: true }) });
  })().catch(() => console.log(JSON.stringify({ level: "warn", event: "discord_handoff_update_failed" }))));
  return Response.json({ type: 6 });
}

function hexToBytes(value: string): Uint8Array { return Uint8Array.from(value.match(/.{2}/g) || [], (byte) => parseInt(byte, 16)); }
