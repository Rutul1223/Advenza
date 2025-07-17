import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete existing user with the same email to avoid unique constraint errors
    await prisma.user.deleteMany({
      where: { email: 'rutul@gmail.com' },
    });
    console.log('Cleared existing user with email: rutul@gmail.com');

    // Create new user
    const hashedPassword = await bcrypt.hash('rutul123', 10);
    await prisma.user.create({
      data: {
        name: 'Rutul',
        email: 'rutul@gmail.com',
        contact: '1234567890',
        password: hashedPassword,
        type: 'admin',
      },
    });
    console.log('Admin user created');
  } catch (error) {
    console.error('Error seeding user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();