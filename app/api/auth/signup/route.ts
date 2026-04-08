import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createUser, getUserByEmail } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword);
    
    const userData = { id: user.id, email: user.email, isPaid: user.isPaid };
    const response = NextResponse.json({ success: true, user: userData });
    response.cookies.set('user', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}