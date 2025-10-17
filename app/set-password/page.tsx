"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SetPasswordPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [token, setToken] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		const t = searchParams.get('token') || ''
		setToken(t)
	}, [searchParams])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitting(true)
		setError(null)
		try {
			const res = await fetch('/api/auth/set-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password, confirmPassword }),
			})
			if (res.ok) {
				setSuccess(true)
				setTimeout(() => router.push('/login'), 1200)
			} else {
				const data = await res.json().catch(() => ({}))
				setError(data?.error || 'Failed to set password')
			}
		} catch (_err) {
			setError('Network error')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="min-h-screen bg-white flex">
			<Link
				href="/"
				className="absolute top-6 left-6 z-20 inline-flex items-center text-sm rounded-lg px-3 py-2 text-[#273F4F] hover:bg-white/90 hover:text-[#273F4F] transition-all duration-200 group bg-white/80 border border-gray-300 shadow-sm"
			>
				<ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
				Back to Home
			</Link>

			<div className="flex-1 flex items-center justify-center bg-[#273F4F] p-8 relative overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute top-20 right-16 w-20 h-20 bg-[#F37521]/10 rounded-full blur-2xl"></div>
					<div className="absolute bottom-32 left-12 w-24 h-24 bg-[#03809C]/15 rounded-full blur-xl"></div>
					<div className="absolute top-1/2 left-10 w-16 h-16 bg-[#F2A16D]/20 rounded-full blur-xl"></div>
				</div>

				<div className="relative z-10 flex items-center justify-center">
					<svg width="400" height="300" viewBox="0 0 400 300" className="w-full max-w-md">
						<circle cx="200" cy="150" r="120" fill="#03809C" opacity="0.1" />
					</svg>
				</div>
			</div>

			<div className="flex-1 flex items-center justify-center p-8 bg-[#FCEBDC]/30">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center space-y-3">
						<h1 className="text-3xl font-bold text-[#273F4F] text-slate-950">Set your password</h1>
						<p className="text-base text-slate-950">Complete your signup</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-3">
							<Label htmlFor="password" className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950">
								New Password
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter new password"
								className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] text-base px-4 rounded-md shadow-none"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<div className="space-y-3">
							<Label htmlFor="confirmPassword" className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Re-enter new password"
								className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] text-base px-4 rounded-md shadow-none"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>

						{error && <p className="text-sm text-red-600">{error}</p>}
						{success && <p className="text-sm text-green-700">Password set! Redirecting…</p>}

						<Button type="submit" className="w-full h-14 bg-[#F37521] hover:bg-[#E06A1E] text-white font-semibold text-base rounded-md shadow-none" disabled={submitting || !token}>
							{submitting ? 'Saving…' : 'Set Password'}
						</Button>
					</form>

					<div className="text-center space-y-4 pt-4">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link href="/login" className="text-[#F37521] hover:text-[#E06A1E] font-semibold">
								Log in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
