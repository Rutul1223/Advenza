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
      return NextResponse.json({ error: 'No cookies provided' }, { status: 401 });
    }

    const sessionToken = cookies
      .split('; ')
      .find(row => row.startsWith('session='))
      ?.split('=')[1];

    if (!sessionToken) {
      console.log('Session cookie not found');
      return NextResponse.json({ error: 'Session cookie not found' }, { status: 401 });
    }

    // Find session in database
    const session = await prisma.session.findFirst({
      where: { token: sessionToken, expiresAt: { gt: new Date() } },
      include: { user: true },
    });

    if (!session) {
      console.log('Session not found or expired');
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    if (session.user.type !== 'admin') {
      console.log('User is not an admin:', session.user);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
      return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}