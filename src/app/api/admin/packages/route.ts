// src/app/api/admin/packages/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const packages = await prisma.travelPackage.findMany();
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { message: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data); // Log incoming data
    const newPackage = await prisma.travelPackage.create({
      data: data,
    });
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error: any) {
    console.error('Error creating package:', {
      message: error.message,
      stack: error.stack,
      code: error.code, // Prisma-specific error code
      meta: error.meta, // Additional error details from Prisma
    });
    return NextResponse.json(
      { message: 'Failed to create package', error: error.message },
      { status: 500 }
    );
  }
}