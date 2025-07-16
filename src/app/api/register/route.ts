import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@/generated/prisma'; // or '@prisma/client' if default

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, contact, password } = await req.json();

    if (!name || !email || !contact || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
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
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
