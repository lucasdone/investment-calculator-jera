import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const items = await prisma.simulation.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, createdAt: true },
  })

  return NextResponse.json(items)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // validação mínima (sem Zod)
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const payload = body?.payload
    if (payload === undefined) {
      return NextResponse.json({ error: 'payload is required' }, { status: 400 })
    }

    const created = await prisma.simulation.create({
      data: { name, payload },
      select: { id: true, name: true, createdAt: true },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }
}
