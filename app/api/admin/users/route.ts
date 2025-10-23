export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        passwordSet: true,
      },
    })

    return NextResponse.json({ data: users })
  } catch (err) {
    console.error('Admin users fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}





