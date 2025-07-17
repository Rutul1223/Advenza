import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma'; // Adjust to '@/generated/prisma' if custom output

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
      const decodedSession = decodeURIComponent(sessionCookie);
      sessionData = JSON.parse(decodedSession);
    } catch (parseError) {
      console.error('Session parsing error:', parseError);
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
    const [totalPackages, activeBookings, totalCustomers, revenueResult] = await Promise.all([
      prisma.travelPackage.count(),
      prisma.booking.count({
        where: { status: 'confirmed' }, // Adjust based on your schema
      }),
      prisma.customer.count(),
      prisma.booking.aggregate({
        _sum: { amount: true },
        where: { status: 'confirmed' }, // Adjust based on your schema
      }),
    ]);

    const revenue = revenueResult._sum.amount || 0;

    return NextResponse.json({
      totalPackages,
      activeBookings,
      totalCustomers,
      revenue,
    });
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
