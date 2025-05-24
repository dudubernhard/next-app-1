export type LLMModel = 'openai' | 'ollama';

export async function sendMessageToServer(
  message: string,
  model: LLMModel = 'ollama',
): Promise<string | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, model }),
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
