import { LLMProvider } from './types';
import OpenAI from 'openai';
import type { ChatMessage } from '@/app/chat/chatStore';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIIntegration implements LLMProvider {
  readonly name = 'openai';

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }
    // Convert ChatMessage[] to OpenAI chat format
    const openaiMessages = messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
      messages: openaiMessages,
      max_tokens: 256,
    });
    // Return the assistant's reply
    return (
      response.choices[0]?.message?.content?.trim() || 'No response from OpenAI'
    );
  }
}
