// src/app/api/admin/auth/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Extract the session cookie
    const cookies = request.headers.get('cookie');
    if (!cookies) {
      console.log('No cookies found in request');
      return NextResponse.json(
        { authenticated: false, error: 'No cookies provided' },
        { status: 401 }
      );
    }

    const sessionCookie = cookies
      .split('; ')
      .find(row => row.startsWith('session='))
      ?.split('=')[1];

    if (!sessionCookie) {
      console.log('Session cookie not found');
      return NextResponse.json(
        { authenticated: false, error: 'Session cookie not found' },
        { status: 401 }
      );
    }

    // Decode the session cookie, handling potential double-encoding
    let sessionData;
    try {
      let decodedSession = decodeURIComponent(sessionCookie);
      // Attempt to decode again if still encoded
      if (decodedSession.startsWith('%')) {
        decodedSession = decodeURIComponent(decodedSession);
      }
      console.log('Decoded session:', decodedSession); // Debugging
      sessionData = JSON.parse(decodedSession);
    } catch (parseError) {
      console.error('Session parsing error:', parseError);
      console.log('Raw session cookie:', sessionCookie); // Debugging
      return NextResponse.json(
        { authenticated: false, error: 'Invalid session data' },
        { status: 401 }
      );
    }

    // Verify session data has userId
    if (!sessionData.userId) {
      console.log('Session data missing userId:', sessionData);
      return NextResponse.json(
        { authenticated: false, error: 'Invalid session format' },
        { status: 401 }
      );
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: sessionData.userId },
    });

    if (!user || user.type !== 'admin') {
      console.log('User not found or not admin:', user);
      return NextResponse.json(
        { authenticated: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}