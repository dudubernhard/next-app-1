export interface LLMProvider {
  /**
   * Sends a message to the LLM and returns its response
   * @param message The user's message to send to the LLM
   * @returns Promise<string> The LLM's response
   */
  sendMessage(message: string): Promise<string>;
  readonly name: string;
}

export type LLMModel = 'openai' | 'ollama' | 'claude' | 'gemini';
