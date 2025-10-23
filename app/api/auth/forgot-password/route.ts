export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendForgotPasswordEmail } from '@/lib/email'
import crypto from 'crypto'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Always return success to prevent email enumeration
      return NextResponse.json({ success: true })
    }

    // Create verification token for password reset
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    // Delete any existing reset tokens for this user
    await prisma.verificationToken.deleteMany({ 
      where: { 
        userId: user.id, 
        type: 'reset_password' 
      } 
    })

    // Create new reset token
    await prisma.verificationToken.create({
      data: { 
        token, 
        userId: user.id, 
        expiresAt, 
        type: 'reset_password' 
      },
    })

    // Send password reset email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/set-password?token=${token}`
    
    try {
      await sendForgotPasswordEmail(user.email, user.name, resetUrl)
    } catch (e) {
      console.warn('SendGrid error (forgot password):', (e as any)?.response?.body || e)
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    console.error('Forgot password error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
