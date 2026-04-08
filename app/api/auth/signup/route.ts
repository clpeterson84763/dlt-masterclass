import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createUser, getUserByEmail } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = createUser(email, hashedPassword);

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, hasPaid: user.hasPaid } });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
