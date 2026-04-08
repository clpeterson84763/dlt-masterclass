
import bcrypt from 'bcryptjs';
import { queryOne, execute, initDb } from './db';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(email: string, hashedPassword: string): Promise<{ id: number; email: string; isPaid: boolean }> {
  await initDb();
  const result = await queryOne(
    'INSERT INTO users (email, password, isPaid) VALUES ($1, $2, false) RETURNING id, email, isPaid',
    [email, hashedPassword]
  );
  return { id: result.id, email: result.email, isPaid: result.isPaid };
}

export async function getUserByEmail(email: string): Promise<{ id: number; email: string; password: string; isPaid: boolean } | null> {
  await initDb();
  const user = await queryOne(
    'SELECT id, email, password, isPaid FROM users WHERE email = $1',
    [email]
  );
  return user || null;
}

export async function markUserAsPaid(email: string): Promise<void> {
  await initDb();
  await execute(
    'UPDATE users SET isPaid = true WHERE email = $1',
    [email]
  );
}