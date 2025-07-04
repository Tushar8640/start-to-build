import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const { messageId } = req.body;
  try {
    const deleted = await prisma.message.update({
      where: { id: messageId },
      data: { isDeleted: true },
    });
    res.status(200).json(deleted);
  } catch {
    res.status(500).json({ error: 'Failed to delete message' });
  }
}