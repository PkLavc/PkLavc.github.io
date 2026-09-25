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

export async function mirrorDiscordMessage(env: Env, conversationId: string, author: string, content: string, eventKeyOverride?: string, recoveryAttempt = false): Promise<boolean> {
  if (!env.DISCORD_BOT_TOKEN || !env.DISCORD_CHANNEL_ID || !content.trim()) return false;
  let claimedEventKey: string | null = null;
  let attemptedEventKey: string | null = null;
  let attemptedThreadId: string | null = null;
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
            method: "POST", body: JSON.stringify({ name: `site-chat-${conversationId.slice(0, 8)}`, type: 11, auto_archive_duration: 10080, message: { content: "Nova conversa Skylet" } }),
          });
          if (!created?.id) return false;
          if (!env.DISCORD_OWNER_USER_ID) throw new Error("discord_owner_not_configured");
          await discordApi(env, `/channels/${created.id}/thread-members/${env.DISCORD_OWNER_USER_ID}`, { method: "PUT" });
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
    attemptedEventKey = eventKey;
    const inserted = await env.DB.prepare("INSERT OR IGNORE INTO discord_mirrored_messages (event_key, conversation_id, created_at) VALUES (?, ?, ?)").bind(eventKey, conversationId, new Date().toISOString()).run();
    if (!inserted.meta.changes) return true;
    claimedEventKey = eventKey;
    attemptedThreadId = row.discord_thread_id;
    await postThreadMessage(env, row.discord_thread_id, { content: `**${author}:**\n${content}`.slice(0, 2000), allowed_mentions: { parse: [] } });
    claimedEventKey = null;
    await updateControlMessage(env, row);
    return true;
  } catch (error) {
    if (claimedEventKey) await env.DB.prepare("DELETE FROM discord_mirrored_messages WHERE event_key = ?").bind(claimedEventKey).run().catch(() => undefined);
    if (!recoveryAttempt && attemptedEventKey && attemptedThreadId && isUnknownChannel(error)) {
      await env.DB.prepare("DELETE FROM discord_mirrored_messages WHERE event_key = ?").bind(attemptedEventKey).run().catch(() => undefined);
      const reset = await env.DB.prepare("UPDATE discord_conversations SET discord_thread_id = NULL, control_message_id = NULL, updated_at = ? WHERE conversation_id = ? AND discord_thread_id = ?")
        .bind(new Date().toISOString(), conversationId, attemptedThreadId).run().catch(() => ({ meta: { changes: 0 } }));
      if (reset.meta.changes) return mirrorDiscordMessage(env, conversationId, author, content, eventKeyOverride, true);
    }
    console.log(JSON.stringify({ level: "warn", event: "discord_mirror_failed", reason: error instanceof Error ? error.name : "unknown" }));
    return false;
  }
}

export async function postThreadMessage(env: Env, threadId: string, body: Record<string, unknown>): Promise<void> {
  try {
    await discordApi(env, `/channels/${threadId}/messages`, { method: "POST", body: JSON.stringify(body) });
  } catch (error) {
    if (!(error instanceof DiscordApiError) || error.code !== 50083) throw error;
    await discordApi(env, `/channels/${threadId}`, { method: "PATCH", body: JSON.stringify({ archived: false }) });
    await discordApi(env, `/channels/${threadId}/messages`, { method: "POST", body: JSON.stringify(body) });
  }
}

function isUnknownChannel(error: unknown): boolean {
  return error instanceof DiscordApiError && error.status === 404 && (error.code === 10003 || /unknown channel/i.test(error.message));
}

class DiscordApiError extends Error {
  constructor(readonly status: number, readonly code: number | null, message: string) {
    super(message);
    this.name = "DiscordApiError";
  }
}

export async function discordApi(env: Env, path: string, init: RequestInit = {}): Promise<any> {
  const response = await fetch(`https://discord.com/api/v10${path}`, {
    ...init,
    signal: init.signal || AbortSignal.timeout(15_000),
    headers: { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!response.ok) {
    const text = await response.text();
    let code: number | null = null;
    let message = text || `discord_http_${response.status}`;
    try {
      const errorBody = JSON.parse(text) as { code?: number; message?: string };
      code = typeof errorBody.code === "number" ? errorBody.code : null;
      message = errorBody.message || message;
    } catch { /* Preserve non-JSON Discord response text for classification. */ }
    throw new DiscordApiError(response.status, code, message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function closeDiscordConversation(env: Env, conversationId: string): Promise<void> {
  const control = await env.DB.prepare("SELECT * FROM discord_conversations WHERE conversation_id = ?").bind(conversationId).first<Control>();
  if (!control) return;
  try {
    if (control.control_message_id && control.control_message_id !== "pending") await updateControlMessage(env, { ...control, status: "CLOSED" });
    if (control.discord_thread_id && control.discord_thread_id !== "pending") {
      await discordApi(env, `/channels/${control.discord_thread_id}`, { method: "PATCH", body: JSON.stringify({ archived: true }) });
    }
  } catch (error) {
    console.log(JSON.stringify({ level: "warn", event: "discord_conversation_close_failed", reason: error instanceof Error ? error.name : "unknown" }));
  }
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
