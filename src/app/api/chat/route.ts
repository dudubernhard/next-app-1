import { NextRequest, NextResponse } from 'next/server';
import { getLLM } from '@/lib/ai';
import type { LLMModel } from '@/lib/ai/types';

export async function POST(req: NextRequest) {
  try {
    const { message, model = 'openai' } = await req.json();
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }
    const llm = getLLM(model as LLMModel);
    const reply = await llm.sendMessage(message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[API] error', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
