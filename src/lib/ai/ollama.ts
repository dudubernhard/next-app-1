import type { LLMProvider } from './types';
import { ollamaChat } from '@/app/chat/ollamaClient';
import type { ChatMessage } from '@/app/chat/chatStore';

export class OllamaIntegration implements LLMProvider {
  readonly name = 'ollama';

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    // Format the chat history as a single prompt string
    const prompt =
      messages
        .map((msg) => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`)
        .join('\n') + '\nBot:';
    const res = await ollamaChat({ prompt });
    return res.response;
  }
}
