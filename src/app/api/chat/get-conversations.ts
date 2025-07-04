import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function getConversations(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const userId = Number(req.query.userId);
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // last message only
          include: {
            sender: {
              select: { id: true, name: true, image: true },
            },
            replyTo: {
              select: { id: true, content: true },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}
