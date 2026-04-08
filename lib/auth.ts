import bcrypt from 'bcryptjs';
import { query, queryOne, execute } from './db';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(email: string, hashedPassword: string): Promise<{ id: number; email: string; isPaid: boolean }> {
  const result = await execute('users', {
    email,
    password: hashedPassword,
    isPaid: false,
  });
  return result[0] || { id: 0, email, isPaid: false };
}

export async function getUserByEmail(email: string): Promise<{ id: number; email: string; password: string; isPaid: boolean } | null> {
  const user = await queryOne('users', { email });
  return user || null;
}

export async function markUserAsPaid(email: string): Promise<void> {
  await execute('users', { isPaid: true }, 'PATCH');
}