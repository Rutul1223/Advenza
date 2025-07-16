import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    try {
      const visitor = await prisma.visitor.create({
        data: { name, email }
      });

      res.status(201).json(visitor);
    } catch (error) {
      res.status(500).json({ error: 'Error Subscribing' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
