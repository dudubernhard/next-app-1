import { LLMProvider } from './types';

export class OpenAIIntegration implements LLMProvider {
  readonly name = 'openai';

  async sendMessage(message: string): Promise<string> {
    // TODO: Replace with real OpenAI API call
    console.log('[OpenAI] Sending message:', message);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    return `OpenAI response to: ${message}`;
  }
}
