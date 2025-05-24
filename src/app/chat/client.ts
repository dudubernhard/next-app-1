export type LLMModel = 'openai' | 'ollama';
import type { ChatMessage } from './chatStore';

export async function sendMessageToServer(
  messages: ChatMessage[],
  model: LLMModel = 'ollama',
): Promise<string | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model }),
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
