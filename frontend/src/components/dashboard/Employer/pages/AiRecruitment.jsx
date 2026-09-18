import React, { useState, useEffect } from 'react'
import Loading from '../../../common/Loading'
import api from '../../../../utils/axiosInstance'
import { Link } from 'react-router-dom'

const steps = [
	{
		icon: "📋",
		title: "Post a Detailed Job",
		desc: "Write a clear job description with required skills, experience, and responsibilities. The more specific you are, the better candidates you attract."
	},
	{
		icon: "🤖",
		title: "AI Screens Applicants",
		desc: "Our AI engine automatically matches applicants based on their skills, experience, and profile completeness against your job requirements."
	},
	{
		icon: "📊",
		title: "Review Ranked Candidates",
		desc: "Applicants are ranked by match score. You see the best fits first — saving hours of manual screening."
	},
	{
		icon: "📄",
		title: "Download CVs Instantly",
		desc: "One-click download of system-generated CVs for any applicant directly from your dashboard."
	},
	{
		icon: "✅",
		title: "Shortlist or Reject",
		desc: "Take action on applicants with a single click. Shortlisted candidates are notified automatically."
	}
]

const tips = [
	{ icon: "💡", text: "Add specific skills when posting a job for better AI matching" },
	{ icon: "📝", text: "Complete your company profile to attract more applicants" },
	{ icon: "⚡", text: "Respond to applicants within 48 hours for best results" },
	{ icon: "🎯", text: "Use clear job titles like 'React Developer' not just 'Developer'" },
]

function AIRecruitment() {
	const [isPremium, setIsPremium] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [payLoading, setPayLoading] = useState(false)

	useEffect(() => {
		const check = async () => {
			try {
				const { data } = await api.get("/payment/status")
				setIsPremium(data.isPremium)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}
		check()
	}, [])

	const handlePayment = async () => {
		setPayLoading(true)
		try {
			const { data } = await api.post("/payment/initiate")

			const form = document.createElement("form")
			form.method = "POST"
			form.action = data.esewa_url

			const fields = { ...data }
			delete fields.esewa_url

			Object.entries(fields).forEach(([key, value]) => {
				const input = document.createElement("input")
				input.type = "hidden"
				input.name = key
				input.value = value
				form.appendChild(input)
			})

			document.body.appendChild(form)
			form.submit()
		} catch (err) {
			console.error("Payment error:", err)
			setPayLoading(false)
		}
	}

	if (isLoading) return <Loading />

	// Locked state
	if (!isPremium) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
					<div className="text-6xl mb-4">🔒</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						AI Recruitment is Locked
					</h2>
					<p className="text-gray-500 mb-6">
						Upgrade to Premium to unlock AI Recruitment and all other features.
					</p>
					<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
						<p className="text-yellow-700 font-semibold text-sm mb-2">
							⭐ Premium includes:
						</p>
						<ul className="text-yellow-600 text-sm space-y-1">
							<li>✓ AI Recruitment tools</li>
							<li>✓ Featured badge on job posts</li>
							<li>✓ Priority support</li>
						</ul>
					</div>
					<button
						onClick={handlePayment}
						disabled={payLoading}
						className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
					>
						{payLoading ? "Redirecting to eSewa..." : "🟢 Pay NPR 999 with eSewa"}
					</button>
					<p className="text-xs text-gray-400 mt-3">
						🔒 Secured by eSewa · Auto-expires after 30 days
					</p>
				</div>
			</div>
		)
	}

	// Unlocked state — actual content
	return (
		<div className="flex flex-col gap-6 p-4">

			{/* Header */}
			<div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 text-white">
				<div className="flex items-center gap-3 mb-1">
					<span className="text-3xl">🤖</span>
					<h1 className="text-2xl font-bold">AI Recruitment</h1>
					<span className="bg-white text-yellow-500 text-xs font-bold px-2 py-1 rounded-full">
						⭐ Premium
					</span>
				</div>
				<p className="text-yellow-100 text-sm">
					Smart hiring tools to help you find the right talent faster in Nepal.
				</p>
			</div>

			{/* How It Works */}
			<div className="bg-white rounded-2xl shadow p-6">
				<h2 className="text-lg font-bold text-gray-800 mb-4">
					🔄 How AI Recruitment Works
				</h2>
				<div className="flex flex-col gap-4">
					{steps.map((step, i) => (
						<div key={i} className="flex gap-4 items-start">
							<div className="bg-yellow-50 rounded-xl p-3 text-2xl flex-shrink-0">
								{step.icon}
							</div>
							<div>
								<p className="font-semibold text-gray-800 text-sm">
									Step {i + 1} — {step.title}
								</p>
								<p className="text-gray-500 text-sm mt-1">{step.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Tips */}
			<div className="bg-white rounded-2xl shadow p-6">
				<h2 className="text-lg font-bold text-gray-800 mb-4">
					💡 Tips to Get Better Results
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{tips.map((tip, i) => (
						<div
							key={i}
							className="flex items-start gap-3 bg-blue-50 rounded-xl p-3">
							<span className="text-xl">{tip.icon}</span>
							<p className="text-sm text-blue-700">{tip.text}</p>
						</div>
					))}
				</div>
			</div>

			{/* Quick Actions */}
			<div className="bg-white rounded-2xl shadow p-6">
				<h2 className="text-lg font-bold text-gray-800 mb-4">
					⚡ Quick Actions
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<Link
						to="/employer/post-job"
						className="bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-xl transition text-sm">
						📋 Post a New Job
					</Link>
					<Link
						href="/employer/applicants"
						className="bg-green-500 hover:bg-green-600 text-white text-center font-semibold py-3 rounded-xl transition text-sm"
					>
						👥 View Applicants
					</Link>
					<Link
						href="/employer/my-jobs"
						className="bg-purple-500 hover:bg-purple-600 text-white text-center font-semibold py-3 rounded-xl transition text-sm"
					>
						💼 My Job Posts
					</Link>
				</div>
			</div>

		</div>
	)
}

export default AIRecruitment