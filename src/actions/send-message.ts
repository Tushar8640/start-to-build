export async function sendMessage(message: string) {
  try {
    const res = await fetch('/api/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
    const result = await res.json()
    if (!result.success) throw new Error('Send failed')
  } catch (err) {
    console.error(err)
  }
}
