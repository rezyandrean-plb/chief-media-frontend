"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		marketing: false,
	})
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitting(true)
		setError(null)
		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.fullName,
					email: formData.email,
					role: 'client',
				}),
			})
			if (res.ok) {
				setSubmitted(true)
			} else {
				const data = await res.json().catch(() => ({}))
				setError(data?.error || 'Signup failed')
			}
		} catch (err) {
			setError('Network error')
		} finally {
			setSubmitting(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
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
						{/* decorative graphics omitted for brevity */}
					</svg>
				</div>
			</div>

			<div className="flex-1 flex items-center justify-center p-8 bg-[#FCEBDC]/30">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center space-y-3">
						<h1 className="text-3xl font-bold text-[#273F4F] text-slate-950">Sign up with email</h1>
						<p className="text-base text-slate-950">Join the professional media network</p>
					</div>

					{submitted ? (
						<div className="space-y-4 text-center">
							<p className="text-sm text-gray-700">Check your email for a link to set your password.</p>
							<Button onClick={() => router.push('/login')} className="w-full h-12 bg-[#F37521] text-white">
								Go to Login
							</Button>
						</div>
					) : (
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div className="space-y-3">
								<Label
									htmlFor="fullname"
									className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950"
								>
									Full Name
								</Label>
								<Input
									id="fullname"
									name="fullName"
									type="text"
									placeholder="Enter your full name"
									className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] text-base px-4 rounded-md shadow-none"
									value={formData.fullName}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="space-y-3">
								<Label
									htmlFor="email"
									className="text-sm font-semibold text-[#273F4F] uppercase tracking-wider text-slate-950"
								>
									Email Address
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="Enter your email address"
									className="h-14 border-2 border-gray-200 focus:border-[#F37521] focus:ring-[#F37521] text-base px-4 rounded-md shadow-none"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="flex items-start space-x-3 py-2">
								<input
									type="checkbox"
									id="marketing"
									name="marketing"
									className="mt-1 h-4 w-4 text-[#F37521] border-gray-300 rounded focus:ring-[#F37521]"
									checked={formData.marketing}
									onChange={handleInputChange}
								/>
								<label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed">
									Send me special offers, personalized recommendations, and learning tips.
								</label>
							</div>

							{error && <p className="text-sm text-red-600">{error}</p>}

							<Button
								type="submit"
								className="w-full h-14 bg-[#F37521] hover:bg-[#E06A1E] text-white font-semibold text-base hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 rounded-md shadow-none bg-secondary"
								disabled={submitting}
							>
								{submitting ? 'Submitting...' : 'Sign Up'}
							</Button>
						</form>
					)}

					<div className="text-center">
						<div className="relative mb-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-200"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-4 bg-[#FCEBDC]/30 text-gray-500 font-medium">Other sign up options</span>
							</div>
						</div>

						<div className="flex justify-center space-x-4">
							<Button
								variant="outline"
								size="sm"
								className="w-14 h-14 border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-700 transition-all duration-200 rounded-md border shadow-none"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24">
									<path
										fill="#4285F4"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="#34A853"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="#FBBC05"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="#EA4335"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="w-14 h-14 border-gray-200 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] bg-white text-[#1877F2] transition-all duration-200 rounded-md shadow-none border"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="w-14 h-14 border-gray-200 hover:bg-black hover:text-white hover:border-black bg-white text-black transition-all duration-200 rounded-md border shadow-none"
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.81.87.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
								</svg>
							</Button>
						</div>
					</div>

					<div className="text-center space-y-4 pt-4">
						<div className="text-xs text-gray-500 leading-relaxed">
							By signing up, you agree to our{" "}
							<Link href="/terms" className="text-[#F37521] hover:text-[#E06A1E] font-medium">
								Terms of Use
							</Link>{" "}
							and{" "}
							<Link href="/privacy" className="text-[#F37521] hover:text-[#E06A1E] font-medium">
								Privacy Policy
							</Link>
						</div>

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
