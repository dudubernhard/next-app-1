import { LLMProvider } from './types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIIntegration implements LLMProvider {
  readonly name = 'openai';

  async sendMessage(message: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: [{ role: 'user', content: message }],
      max_tokens: 256,
    });
    // Return the assistant's reply
    return response.choices[0]?.message?.content?.trim() || 'No response from OpenAI';
  }
}