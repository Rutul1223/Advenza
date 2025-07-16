import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient(); // ✅ create an instance

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, contact } = body;

    if (!name || !email || !contact) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.subscriber.create({
      data: { name, email, contact },
    });

    return NextResponse.json(
      { message: 'Subscriber saved', subscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/subscriber error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
