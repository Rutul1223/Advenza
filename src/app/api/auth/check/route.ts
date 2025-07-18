import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

interface SessionCheckResponse {
  user?: { name: string; email: string };
  error?: string;
}

export async function GET(req: NextRequest) {
  try {
    // Retrieve session token from cookie
    const sessionToken = req.cookies.get('session')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No session token provided' } as SessionCheckResponse,
        { status: 401 }
      );
    }

    // Validate session token
    const session = await prisma.session.findFirst({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Invalid or expired session' } as SessionCheckResponse,
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: { name: session.user.name, email: session.user.email },
      } as SessionCheckResponse,
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Session check error:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: 'Internal server error' } as SessionCheckResponse,
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}