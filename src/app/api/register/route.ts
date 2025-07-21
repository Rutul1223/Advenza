import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Prisma, PrismaClient } from '@/generated/prisma'; // Adjust if using '@prisma/client'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, contact, password } = await req.json();

    // Validate input
    if (!name || !email || !contact || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate contact format (basic phone number check, e.g., 10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      return NextResponse.json({ error: 'Contact must be a 10-digit phone number' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        contact,
        password: hashedPassword,
        type: 'user',
      },
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
        type: true,
        createdAt: true,
      }, // Exclude password from response
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (err: unknown) {
    console.error('Register error:', err);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}