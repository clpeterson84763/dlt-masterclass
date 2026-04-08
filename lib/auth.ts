import bcrypt from 'bcryptjs';
import { getDb, initDb } from './db';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createUser(email: string, hashedPassword: string): { id: number; email: string; hasPaid: boolean } {
  initDb();
  const db = getDb();
  const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
  const result = stmt.run(email, hashedPassword);
  return { id: result.lastInsertRowid as number, email, hasPaid: false };
}

export function getUserByEmail(email: string): { id: number; email: string; password: string; hasPaid: boolean } | null {
  initDb();
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = stmt.get(email) as { id: number; email: string; password: string; hasPaid: number } | undefined;
  if (!user) return null;
  return { ...user, hasPaid: user.hasPaid === 1 };
}

export function markUserAsPaid(email: string): void {
  initDb();
  const db = getDb();
  const stmt = db.prepare('UPDATE users SET hasPaid = 1 WHERE email = ?');
  stmt.run(email);
}
