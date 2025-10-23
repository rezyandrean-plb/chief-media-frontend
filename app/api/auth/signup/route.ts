export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'
import { sendSetPasswordEmail } from '@/lib/email'
import crypto from 'crypto'

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['client', 'vendor', 'organization', 'realtor']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role } = signupSchema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      // If already exists, reissue set-password if needed; always respond 200
      if (!existing.passwordHash) {
        const token = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60)
        await prisma.verificationToken.deleteMany({ where: { userId: existing.id, type: 'set_password' } })
        await prisma.verificationToken.create({ data: { token, userId: existing.id, expiresAt, type: 'set_password' } })
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const setPasswordUrl = `${baseUrl}/set-password?token=${token}`
        try {
          await sendSetPasswordEmail(existing.email, existing.name, setPasswordUrl)
        } catch (e) {
          console.warn('SendGrid error (existing user):', (e as any)?.response?.body || e)
        }
      }
      return NextResponse.json({ ok: true })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: '',
        role: (role as any) ?? 'client',
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })

    // Create verification token for setting password
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour
    await prisma.verificationToken.create({
      data: { token, userId: user.id, expiresAt, type: 'set_password' },
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const setPasswordUrl = `${baseUrl}/set-password?token=${token}`
    try {
      await sendSetPasswordEmail(user.email, user.name, setPasswordUrl)
    } catch (e) {
      console.warn('SendGrid error (new user):', (e as any)?.response?.body || e)
    }

    return NextResponse.json({ data: user }, { status: 201 })
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input', details: err.flatten() }, { status: 400 })
    }
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}




