import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ reply: `Echo: ${message}` });
  } catch (error) {
    console.error('[API] error', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
