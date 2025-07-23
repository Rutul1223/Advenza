// src/app/api/admin/packages/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const packageData = await prisma.travelPackage.findUnique({
      where: { id: Number(params.id) },
    });

    if (!packageData) {
      return NextResponse.json(
        { message: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(packageData);
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json(
      { message: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedPackage = await prisma.travelPackage.update({
      where: { id: Number(params.id) },
      data: data,
    });
    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json(
      { message: 'Failed to update package' },
      { status: 500 }
    );
  }
}