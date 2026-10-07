CREATE TABLE instagram_conversations (
  sender_key TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  recipient_id_cipher TEXT NOT NULL,
  processing_lock_token TEXT,
  processing_lock_until TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE TABLE instagram_inbox_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_key TEXT NOT NULL UNIQUE,
  sender_key TEXT NOT NULL,
  content TEXT NOT NULL,
  response_content TEXT,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'reply_pending', 'sent')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (sender_key) REFERENCES instagram_conversations(sender_key)
);

CREATE INDEX idx_instagram_inbox_queue_pending
  ON instagram_inbox_queue(sender_key, status, id);
