import type { Env } from "./index";

export type HandoffStatus = "AI" | "HUMAN" | "CLOSED";
type Control = { conversation_id: string; discord_thread_id: string | null; control_message_id: string | null; status: HandoffStatus };

export async function getConversationControl(env: Env, conversationId: string, userId: number): Promise<Control | null> {
  if (!conversationId) return null;
  const owned = await env.DB.prepare("SELECT id FROM conversations WHERE id = ? AND user_id = ?").bind(conversationId, userId).first();
  if (!owned) return null;
  return await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<Control>() || {
    conversation_id: conversationId, discord_thread_id: null, control_message_id: null, status: "AI",
  };
}

export async function enqueueDiscordMessage(env: Env, conversationId: string, author: "Visitante" | "Skylet", content: string): Promise<void> {
  if (!content.trim()) return;
  const now = new Date().toISOString();
  await env.DB.prepare("INSERT OR IGNORE INTO discord_conversations (conversation_id, status, created_at, updated_at) VALUES (?, 'AI', ?, ?)")
    .bind(conversationId, now, now).run();
  await env.DB.prepare("INSERT INTO discord_message_queue (conversation_id, author, content, status, created_at) VALUES (?, ?, ?, 'queued', ?)")
    .bind(conversationId, author, content, now).run();
}

export async function drainDiscordMessageQueue(env: Env, conversationId: string): Promise<void> {
  if (!env.DISCORD_BOT_TOKEN || !env.DISCORD_CHANNEL_ID) return;
  const lockToken = crypto.randomUUID();
  const now = new Date();
  const nowIso = now.toISOString();
  const lockUntil = new Date(now.getTime() + 120_000).toISOString();
  const lock = await env.DB.prepare("UPDATE discord_conversations SET mirror_lock_token = ?, mirror_lock_until = ? WHERE conversation_id = ? AND (mirror_lock_until IS NULL OR mirror_lock_until < ?)")
    .bind(lockToken, lockUntil, conversationId, nowIso).run();
  if (!lock.meta.changes) return;

  let failed = false;
  try {
    for (let count = 0; count < 100; count += 1) {
      const item = await env.DB.prepare("SELECT id, author, content FROM discord_message_queue WHERE conversation_id = ? AND status = 'queued' ORDER BY id LIMIT 1")
        .bind(conversationId).first<{ id: number; author: "Visitante" | "Skylet"; content: string }>();
      if (!item) break;
      const sent = await mirrorDiscordMessage(env, conversationId, item.author, item.content, `queue:${item.id}`);
      if (!sent) { failed = true; break; }
      await env.DB.prepare("UPDATE discord_message_queue SET status = 'sent' WHERE id = ? AND status = 'queued'").bind(item.id).run();
    }
  } finally {
    await env.DB.prepare("UPDATE discord_conversations SET mirror_lock_token = NULL, mirror_lock_until = NULL WHERE conversation_id = ? AND mirror_lock_token = ?")
      .bind(conversationId, lockToken).run();
  }

  if (!failed) {
    const pending = await env.DB.prepare("SELECT id FROM discord_message_queue WHERE conversation_id = ? AND status = 'queued' ORDER BY id LIMIT 1").bind(conversationId).first();
    if (pending) await drainDiscordMessageQueue(env, conversationId);
  }
}

export async function mirrorDiscordMessage(env: Env, conversationId: string, author: string, content: string, eventKeyOverride?: string): Promise<boolean> {
  if (!env.DISCORD_BOT_TOKEN || !env.DISCORD_CHANNEL_ID || !content.trim()) return false;
  let claimedEventKey: string | null = null;
  try {
    let row = await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<Control>();
    if (!row) {
      const now = new Date().toISOString();
      await env.DB.prepare("INSERT OR IGNORE INTO discord_conversations (conversation_id, status, created_at, updated_at) VALUES (?, 'AI', ?, ?)").bind(conversationId, now, now).run();
      row = await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<Control>();
    }
    if (!row) return false;
    if (!row.discord_thread_id) {
      const claim = await env.DB.prepare("UPDATE discord_conversations SET discord_thread_id = 'pending', updated_at = ? WHERE conversation_id = ? AND discord_thread_id IS NULL")
        .bind(new Date().toISOString(), conversationId).run();
      if (claim.meta.changes) {
        try {
          const created = await discordApi(env, `/channels/${env.DISCORD_CHANNEL_ID}/threads`, {
            method: "POST", body: JSON.stringify({ name: `site-chat-${conversationId.slice(0, 8)}`, type: 11, auto_archive_duration: 1440, message: { content: "Nova conversa Skylet" } }),
          });
          if (!created?.id) return false;
          await env.DB.prepare("UPDATE discord_conversations SET discord_thread_id = ?, updated_at = ? WHERE conversation_id = ? AND discord_thread_id = 'pending'")
            .bind(created.id, new Date().toISOString(), conversationId).run();
        } catch (error) {
          await env.DB.prepare("UPDATE discord_conversations SET discord_thread_id = NULL WHERE conversation_id = ? AND discord_thread_id = 'pending'").bind(conversationId).run();
          throw error;
        }
      } else {
        for (let attempt = 0; attempt < 20; attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          row = await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<Control>() || row;
          if (row.discord_thread_id && row.discord_thread_id !== "pending") break;
        }
      }
      row = await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<Control>() || row;
    }
    if (!row.discord_thread_id || row.discord_thread_id === "pending") return false;
    const messageId = eventKeyOverride ? null : await env.DB.prepare("SELECT id FROM messages WHERE conversation_id = ? AND role = ? AND content = ? ORDER BY id DESC LIMIT 1")
      .bind(conversationId, author === "Skylet" ? "assistant" : "user", content).first<{ id: number }>();
    const eventKey = eventKeyOverride || `${conversationId}:${author}:${messageId?.id ?? content.slice(0, 100)}`;
    const inserted = await env.DB.prepare("INSERT OR IGNORE INTO discord_mirrored_messages (event_key, conversation_id, created_at) VALUES (?, ?, ?)").bind(eventKey, conversationId, new Date().toISOString()).run();
    if (!inserted.meta.changes) return true;
    claimedEventKey = eventKey;
    await discordApi(env, `/channels/${row.discord_thread_id}/messages`, { method: "POST", body: JSON.stringify({ content: `**${author}:**\n${content}`.slice(0, 2000), allowed_mentions: { parse: [] } }) });
    claimedEventKey = null;
    await updateControlMessage(env, row);
    return true;
  } catch (error) {
    if (claimedEventKey) await env.DB.prepare("DELETE FROM discord_mirrored_messages WHERE event_key = ?").bind(claimedEventKey).run().catch(() => undefined);
    console.log(JSON.stringify({ level: "warn", event: "discord_mirror_failed", reason: error instanceof Error ? error.name : "unknown" }));
    return false;
  }
}

export async function discordApi(env: Env, path: string, init: RequestInit = {}): Promise<any> {
  const response = await fetch(`https://discord.com/api/v10${path}`, {
    ...init,
    signal: init.signal || AbortSignal.timeout(15_000),
    headers: { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!response.ok) throw new Error(`discord_http_${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}

export async function updateControlMessage(env: Env, control: Control): Promise<void> {
  if (!control.discord_thread_id) return;
  const labels: Record<HandoffStatus, string> = { AI: "Estado: IA", HUMAN: "Estado: Atendimento humano", CLOSED: "Estado: Encerrado" };
  const components = control.status === "CLOSED" ? [] : [{ type: 1, components: [
    { type: 2, style: 1, label: "Assumir", custom_id: `skylet:assume:${control.conversation_id}`, disabled: control.status === "HUMAN" },
    { type: 2, style: 2, label: "Responder", custom_id: `skylet:reply:${control.conversation_id}`, disabled: false },
    { type: 2, style: 2, label: "Devolver para IA", custom_id: `skylet:return:${control.conversation_id}`, disabled: control.status !== "HUMAN" },
    { type: 2, style: 4, label: "Encerrar", custom_id: `skylet:close:${control.conversation_id}` },
  ] }];
  const body = { content: labels[control.status], components, allowed_mentions: { parse: [] } };
  if (control.control_message_id && control.control_message_id !== "pending") {
    await discordApi(env, `/channels/${control.discord_thread_id}/messages/${control.control_message_id}`, { method: "PATCH", body: JSON.stringify(body) });
  } else {
    const claim = await env.DB.prepare("UPDATE discord_conversations SET control_message_id = 'pending' WHERE conversation_id = ? AND control_message_id IS NULL").bind(control.conversation_id).run();
    if (claim.meta.changes) {
      try {
        const result = await discordApi(env, `/channels/${control.discord_thread_id}/messages`, { method: "POST", body: JSON.stringify(body) });
        await env.DB.prepare("UPDATE discord_conversations SET control_message_id = ?, updated_at = ? WHERE conversation_id = ? AND control_message_id = 'pending'")
          .bind(result.id, new Date().toISOString(), control.conversation_id).run();
      } catch (error) {
        await env.DB.prepare("UPDATE discord_conversations SET control_message_id = NULL WHERE conversation_id = ? AND control_message_id = 'pending'").bind(control.conversation_id).run();
        throw error;
      }
    } else {
      const latest = await env.DB.prepare("SELECT control_message_id FROM discord_conversations WHERE conversation_id = ?").bind(control.conversation_id).first<{ control_message_id: string | null }>();
      if (latest?.control_message_id && latest.control_message_id !== "pending") {
        await discordApi(env, `/channels/${control.discord_thread_id}/messages/${latest.control_message_id}`, { method: "PATCH", body: JSON.stringify(body) });
      }
    }
  }
}
