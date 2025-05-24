import { LLMProvider, LLMModel } from './types';
import { OpenAIIntegration } from './openai';
import { OllamaIntegration } from './ollama';

export function getLLM(model: LLMModel): LLMProvider {
  switch (model) {
    case 'openai':
      return new OpenAIIntegration();
    case 'ollama':
      return new OllamaIntegration();
    // case 'claude':
    //   return new ClaudeIntegration();
    // case 'gemini':
    //   return new GeminiIntegration();
    default:
      throw new Error('Unsupported LLM model: ' + model);
  }
}
