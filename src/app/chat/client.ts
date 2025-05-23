export async function sendMessageToServer(
  message: string,
): Promise<string | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    if (data.reply) {
      return data.reply;
    }
    return null;
  } catch {
    return null;
  }
}
