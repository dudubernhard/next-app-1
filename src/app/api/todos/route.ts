import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const todo = await prisma.todo.create({
      data: { title },
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    if (typeof id !== 'number' || typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid id or completed value' },
        { status: 400 },
      );
    }
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (typeof id !== 'number') {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    await prisma.todo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 },
    );
  }
}
