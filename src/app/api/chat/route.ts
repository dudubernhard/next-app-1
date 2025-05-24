import { NextRequest, NextResponse } from 'next/server';
import { getLLM } from '@/lib/ai';
import type { LLMModel } from '@/lib/ai/types';

export async function POST(req: NextRequest) {
  try {
    const { messages, model = 'ollama' } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }
    const llm = getLLM(model as LLMModel);
    const reply = await llm.sendMessage(messages);
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
