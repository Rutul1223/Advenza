// src/app/api/admin/dashboard/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Extract session cookie
    const cookies = request.headers.get('cookie');
    if (!cookies) {
      console.log('No cookies found in request');
      return NextResponse.json(
        { error: 'No cookies provided' },
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
        { error: 'Session cookie not found' },
        { status: 401 }
      );
    }

    // Decode and parse session data
    let sessionData;
    try {
      let decodedSession = decodeURIComponent(sessionCookie);
      console.log('Initial decoded session:', decodedSession); // Debugging
      // Handle potential double-encoding
      while (decodedSession.startsWith('%')) {
        decodedSession = decodeURIComponent(decodedSession);
        console.log('Further decoded session:', decodedSession); // Debugging
      }
      sessionData = JSON.parse(decodedSession);
      console.log('Parsed session data:', sessionData); // Debugging
    } catch (parseError) {
      console.error('Session parsing error:', parseError);
      console.log('Raw session cookie:', sessionCookie); // Debugging
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 401 }
      );
    }

    // Verify session data has userId
    if (!sessionData.userId) {
      console.log('Session data missing userId:', sessionData);
      return NextResponse.json(
        { error: 'Invalid session format' },
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
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Compute dashboard statistics
    try {
      const totalCustomers = await prisma.user.count({
        where: { type: 'user' },
      });

      return NextResponse.json({
        totalPackages: 0,
        activeBookings: 0,
        totalCustomers,
        revenue: 0,
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { error: 'Failed to fetch customer data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}