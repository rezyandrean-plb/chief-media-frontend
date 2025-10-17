export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const schema = z.object({
	token: z.string().min(10),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { token, password } = schema.parse(body)

		const now = new Date()
		const v = await prisma.verificationToken.findUnique({ where: { token } })
		if (!v || v.type !== 'set_password' || v.usedAt || v.expiresAt < now) {
			return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
		}

		const user = await prisma.user.findUnique({ where: { id: v.userId } })
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		const passwordHash = await bcrypt.hash(password, 12)
		await prisma.$transaction([
			prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
			prisma.verificationToken.update({ where: { token }, data: { usedAt: now } }),
		])

		return NextResponse.json({ success: true })
	} catch (err: any) {
		if (err?.name === 'ZodError') {
			return NextResponse.json({ error: 'Invalid input', details: err.flatten() }, { status: 400 })
		}
		console.error('Set password error:', err)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
