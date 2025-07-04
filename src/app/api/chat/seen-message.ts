import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function markSeen(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, messageId } = req.body;
  try {
    const seen = await prisma.seenMessage.upsert({
      where: { userId_messageId: { userId, messageId } },
      update: {},
      create: { userId, messageId },
    });
    res.status(200).json(seen);
  } catch {
    res.status(500).json({ error: 'Failed to mark as seen' });
  }
}