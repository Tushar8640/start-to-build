export async function sendMessage({
  content,
  conversationId,
  senderId,
  image = null,
  replyToId = null
}: {
  content: string;
  conversationId: number;
  senderId: number;
  image?: string | null;
  replyToId?: number | null;
}) {
  try {
    const res = await fetch('/api/chat/send-message', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        content,
        conversationId,
        senderId,
        image,
        replyToId
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return result;
    
  } catch (err) {
    console.error('Failed to send message:', err);
    throw err; // Re-throw to handle in the calling component
  }
}