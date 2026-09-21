import React, { useState, useEffect } from 'react'
import Loading from '../../../common/Loading'
import api from '../../../../utils/axiosInstance'
import { Link } from 'react-router-dom'

const steps = [
	{

		title: "Post a Detailed Job",
		desc: "Write a clear job description with required skills, experience, and responsibilities. The more specific you are, the better candidates you attract."
	},
	{

		title: "AI Screens Applicants",
		desc: "Our AI engine automatically matches applicants based on their skills, experience, and profile completeness against your job requirements."
	},
	{

		title: "Review Ranked Candidates",
		desc: "Applicants are ranked by match score. You see the best fits first — saving hours of manual screening."
	},
	{

		title: "Download CVs Instantly",
		desc: "One-click download of system-generated CVs for any applicant directly from your dashboard."
	},
	{

		title: "Shortlist or Reject",
		desc: "Take action on applicants with a single click. Shortlisted candidates are notified automatically."
	}
]

const tips = [
	{ text: "Add specific skills when posting a job for better AI matching" },
	{ text: "Complete your company profile to attract more applicants" },
	{ text: "Respond to applicants within 48 hours for best results" },
	{ text: "Use clear job titles like 'React Developer' not just 'Developer'" },
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
				<div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-md w-full shadow-md hover:shadow-xl   transition-transform duration-500   hover:scale-101">
					<div className="text-6xl mb-4">🔒</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						AI Recruitment is Locked
					</h2>
					<p className="text-gray-500 mb-6">
						Upgrade to Premium to unlock AI Recruitment and all other features.
					</p>
					<div className="  rounded-xl p-4 mb-6 text-left bg-linear-to-r from-indigo-500 to-purple-500 text-white">
						<p className="text-white font-semibold text-sm mb-2">
							Premium includes:
						</p>
						<ul className="text-white text-sm space-y-1">
							<li>AI Recruitment tools</li>
							<li> Featured badge on job posts</li>
							<li> Priority support</li>
						</ul>
					</div>
					<button
						onClick={handlePayment}
						disabled={payLoading}
						className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-60 cursor-pointer"
					>
						{payLoading ? "Redirecting to eSewa..." : "🟢 Pay NPR 999 with eSewa"}
					</button>
					<p className="text-sm text-balck-400 mt-3">
						Secured by eSewa · Auto-expires after 30 days
					</p>
				</div>
			</div>
		)
	}

	// Unlocked state — actual content
	return (
		<div className="flex flex-col gap-6 p-4">

			{/* Header */}
			<div className="bg-linear-to-r from-blue-400 to-green-400 rounded-2xl p-6 text-white">
				<div className="flex items-center gap-3 mb-1">

					<h1 className="text-2xl font-bold">AI Recruitment</h1>
					<span className="bg-white text-yellow-500 text-xs font-bold px-2 py-1 rounded-full">
						Premium
					</span>
				</div>
				<p className="text-yellow-100 text-sm">
					Smart hiring tools to help you find the right talent faster in Nepal.
				</p>
			</div>

			{/* How It Works */}
			<section className="scroll-reveal rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md md:p-7">
				<div className="mb-6 flex items-start justify-between gap-4">
					<div>
						<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-500">
							Simple Process
						</p>

						<h2 className="text-xl font-bold text-gray-900">
							How AI Recruitment Works
						</h2>

						<p className="mt-1 text-sm text-gray-500">
							A simple workflow to help you move from job posting to candidate selection.
						</p>
					</div>


				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{steps.map((step, i) => (
						<div
							key={i}
							className="group relative rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:bg-indigo-50/50 hover:shadow-md cursor-pointer"
						>
							<div className="mb-4 flex items-center justify-between">


								<span className="text-sm font-bold text-gray-300 group-hover:text-indigo-400">
									0{i + 1}
								</span>
							</div>

							<h3 className="text-sm font-bold text-gray-800">
								{step.title}
							</h3>

							<p className="mt-2 text-sm leading-5 text-gray-500">
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Tips */}

			<section className="scroll-reveal rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md md:p-7">
				<div className="mb-6">
					<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-500">
						Hiring Tips
					</p>

					<h2 className="text-xl font-bold text-gray-900">
						Get Better Recruitment Results
					</h2>

					<p className="mt-1 text-sm text-gray-500">
						A few simple improvements can help you find more relevant candidates.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{tips.map((tip, i) => (
						<div
							key={i}
							className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-indigo-50 hover:shadow-sm"
						>
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-indigo-500 shadow-sm transition duration-300 group-hover:scale-110 group-hover:bg-indigo-100">
								0{i + 1}
							</div>

							<p className="pt-1 text-sm leading-5 text-gray-600 group-hover:text-indigo-700">
								{tip.text}
							</p>
						</div>
					))}
				</div>
			</section>
			{/* Quick Actions */}
			<div className="bg-white rounded-2xl shadow p-6">
				<h2 className="text-lg font-bold text-gray-800 mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<Link
						to="/employer/post-job"
						className="bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-xl transition text-sm">
						Post a New Job
					</Link>
					<Link
						to="/employer/applicants"
						className="bg-green-500 hover:bg-green-600 text-white text-center font-semibold py-3 rounded-xl transition text-sm"
					>
						View Applicants
					</Link>
					<Link
						to="/employer/my-jobs"
						className="bg-purple-500 hover:bg-purple-600 text-white text-center font-semibold py-3 rounded-xl transition text-sm"
					>
						My Job Posts
					</Link>
				</div>
			</div>

		</div >
	)
}

export default AIRecruitment