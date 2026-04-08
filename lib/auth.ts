import bcrypt from 'bcryptjs';

// Simple in-memory store
const users: any[] = [];

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(email: string, hashedPassword: string) {
  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    isPaid: false,
  };
  users.push(user);
  return user;
}

export async function getUserByEmail(email: string) {
  return users.find(u => u.email === email) || null;
}

export async function markUserAsPaid(email: string) {
  const user = users.find(u => u.email === email);
  if (user) user.isPaid = true;
}