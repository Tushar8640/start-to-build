import { NextResponse } from 'next/server'
import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    await pusherServer.trigger('chat', 'message', { message })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUSHER ERROR]', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
