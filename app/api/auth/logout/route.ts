export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(_req: NextRequest) {
	const res = NextResponse.json({ ok: true })
	// Clear auth cookie
	res.cookies.set('kw_auth', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
	})
	return res
}


