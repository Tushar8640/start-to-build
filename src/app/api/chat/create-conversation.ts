import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function createConversation(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userIds, isGroup, title } = req.body;
  try {
    const conversation = await prisma.conversation.create({
      data: {
        isGroup,
        title,
        participants: {
          create: userIds.map((id: number) => ({ userId: id })),
        },
      },
      include: { participants: true },
    });
    res.status(200).json(conversation);
  } catch {
    res.status(500).json({ error: 'Error creating conversation' });
  }
}