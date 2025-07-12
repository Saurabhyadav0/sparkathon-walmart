import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: { recommendation: 'DONATED' },
  });

  return NextResponse.json(updated);
}
