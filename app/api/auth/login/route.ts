export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional().default(false),
})

function setAuthCookie(res: NextResponse, token: string, rememberMe: boolean = false) {
  // Set cookie expiration based on remember me option
  const maxAge = rememberMe 
    ? 60 * 60 * 24 * 30 // 30 days for remember me
    : 60 * 60 * 24 * 7  // 7 days for normal login

  res.cookies.set('kw_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = loginSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    // Set JWT token expiration based on remember me option
    const tokenExpiration = rememberMe ? '30d' : '7d'
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
      expiresIn: tokenExpiration,
    })

    const res = NextResponse.json({
      data: { id: user.id, email: user.email, name: user.name, role: user.role },
    })
    setAuthCookie(res, token, rememberMe)
    return res
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })
    }
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}




