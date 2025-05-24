import type { ChatMessage } from '@/app/chat/chatStore';

export interface LLMProvider {
  /**
   * Sends a message history to the LLM and returns its response
   * @param messages The user's message history to send to the LLM
   * @returns Promise<string> The LLM's response
   */
  sendMessage(messages: ChatMessage[]): Promise<string>;
  readonly name: string;
}

export type LLMModel = 'openai' | 'ollama' | 'claude' | 'gemini';
