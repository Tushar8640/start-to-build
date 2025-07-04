import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getMessages(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const { conversationId, cursor, limit = 20 } = req.query;
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: Number(conversationId) },
      take: Number(limit),
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: Number(cursor) } }),
      orderBy: { createdAt: 'desc' },
      include: { sender: true, replyTo: true },
    });
    res.status(200).json(messages);
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
}