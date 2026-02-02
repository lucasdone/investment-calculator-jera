import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await prisma.simulation.findUnique({
    where: { id: params.id },
    select: { id: true, name: true, payload: true, createdAt: true },
  })

  if (!item) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  return NextResponse.json(item)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.simulation.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}
