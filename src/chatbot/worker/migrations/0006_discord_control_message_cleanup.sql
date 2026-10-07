CREATE TABLE IF NOT EXISTS discord_control_message_cleanup (
  conversation_id TEXT NOT NULL,
  message_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (conversation_id, message_id),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE INDEX IF NOT EXISTS idx_discord_control_cleanup_conversation
  ON discord_control_message_cleanup(conversation_id);
