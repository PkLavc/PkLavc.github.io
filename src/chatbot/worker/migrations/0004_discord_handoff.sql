CREATE TABLE IF NOT EXISTS discord_conversations (
  conversation_id TEXT PRIMARY KEY,
  discord_thread_id TEXT,
  control_message_id TEXT,
  status TEXT NOT NULL DEFAULT 'AI' CHECK (status IN ('AI', 'HUMAN', 'CLOSED')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE TABLE IF NOT EXISTS discord_mirrored_messages (
  event_key TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  discord_message_id TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_discord_messages_conversation
  ON discord_mirrored_messages(conversation_id);
