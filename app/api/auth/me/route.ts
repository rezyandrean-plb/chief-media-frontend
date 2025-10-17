export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
	try {
		const token = request.cookies.get('kw_auth')?.value
		if (!token) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const secret = process.env.JWT_SECRET
		if (!secret) {
			return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
		}

		let payload: any
		try {
			payload = jwt.verify(token, secret)
		} catch {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const userId = typeof payload?.id === 'number' ? payload.id : parseInt(String(payload?.id), 10)
		if (!userId || Number.isNaN(userId)) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, email: true, name: true, role: true },
		})
		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		return NextResponse.json({ data: user })
	} catch (err) {
		console.error('ME endpoint error:', err)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}


