// db.js
import Database from 'better-sqlite3';

const db = new Database('./bmw.sqlite', { verbose: null });

// Base schema (now includes phone + whatsapp)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  model TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  location TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);
`);

// --- lightweight migrations in case the table existed without new cols ---
try {
  const hasPhone = db.prepare(
    "SELECT 1 FROM pragma_table_info('contacts') WHERE name='phone'"
  ).get();
  if (!hasPhone) db.exec("ALTER TABLE contacts ADD COLUMN phone TEXT");

  const hasWhatsapp = db.prepare(
    "SELECT 1 FROM pragma_table_info('contacts') WHERE name='whatsapp'"
  ).get();
  if (!hasWhatsapp) db.exec("ALTER TABLE contacts ADD COLUMN whatsapp TEXT");
} catch (e) {
  console.error('Migration error:', e);
}

export default db;
