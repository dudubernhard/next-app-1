import type { LLMProvider } from './types';
import { ollamaChat } from '@/app/chat/ollamaClient';

export class OllamaIntegration implements LLMProvider {
  readonly name = 'ollama';

  async sendMessage(message: string): Promise<string> {
    const res = await ollamaChat({ prompt: message });
    return res.response;
  }
}
