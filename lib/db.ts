// Simple in-memory user store (temporary, will lose data on redeploy)
const users: any[] = [];

export async function createUser(email: string, hashedPassword: string) {
  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    isPaid: false,
    createdAt: new Date(),
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

export async function initDb() {
  // Nothing to init
}