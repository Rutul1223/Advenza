// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Verify user credentials
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.type !== 'admin' || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session data
    const sessionData = { userId: user.id };
    const sessionString = JSON.stringify(sessionData);

    // Set session cookie without encoding it multiple times
    const response = NextResponse.json({ success: true });
    response.cookies.set('session', sessionString, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Example password verification (implement based on your setup)
async function verifyPassword(input: string, hashed: string): Promise<boolean> {
  // Replace with your actual password verification logic (e.g., bcrypt)
  return input === hashed; // Placeholder
}