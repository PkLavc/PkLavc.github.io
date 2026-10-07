ALTER TABLE discord_conversations ADD COLUMN mirror_lock_token TEXT;
ALTER TABLE discord_conversations ADD COLUMN mirror_lock_until TEXT;

CREATE TABLE discord_message_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id TEXT NOT NULL,
  author TEXT NOT NULL CHECK (author IN ('Visitante', 'Skylet')),
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent')),
  created_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE INDEX idx_discord_message_queue_pending
  ON discord_message_queue(conversation_id, status, id);
