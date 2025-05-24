export type OllamaChatRequest = {
  prompt: string;
  model?: string; // default to 'gemma3:4b' if not provided
};

export type OllamaChatResponse = {
  response: string;
};

export const ollamaChat = async ({
  prompt,
  model = 'gemma3:4b',
}: OllamaChatRequest): Promise<OllamaChatResponse> => {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!res.ok) {
    throw new Error('Ollama request failed');
  }

  const data = await res.json();
  return { response: data.response };
};
