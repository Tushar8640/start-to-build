import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function editMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end();
  const { messageId, content } = req.body;
  try {
    const updated = await prisma.message.update({
      where: { id: messageId },
      data: { content, editedAt: new Date() },
    });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to edit message' });
  }
}