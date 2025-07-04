import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";

export default async function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { senderId, conversationId, content, image, replyToId } = req.body;
  try {
    const message = await prisma.message.create({
      data: {
        content,
        image,
        senderId,
        conversationId,
        replyToId,
      },
      include: {
        sender: true,
        replyTo: true,
      },
    });

    await pusherServer.trigger(`chat-${conversationId}`, 'new-message', message);
    res.status(200).json(message);
  } catch {
    res.status(500).json({ error: 'Error sending message' });
  }
}