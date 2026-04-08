import bcrypt from 'bcryptjs';
import { createUser as dbCreateUser, getUserByEmail, markUserAsPaid, initDb } from './db';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(email: string, hashedPassword: string) {
  const user = await dbCreateUser(email, hashedPassword);
  return { id: user.id, email: user.email, isPaid: user.isPaid };
}

export async function getUserByEmailAuth(email: string) {
  return await getUserByEmail(email);
}

export async function markUserAsPaidAuth(email: string) {
  await markUserAsPaid(email);
}