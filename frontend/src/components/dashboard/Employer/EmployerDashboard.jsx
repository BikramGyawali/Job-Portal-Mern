
// import React, { useState, useEffect, useContext } from 'react'
// import DashBoxCard from '../../common/DashBoxCard'
// import Applicants from './pages/Applicants'
// import Loading from '../../common/Loading'

// import { ProfileContext } from '../../../context/ProfileContext'
// import { EMyJobs, getAllApplicants } from '../../../services/jobService'

// function EmployerDashboard() {
// 	const { profile } = useContext(ProfileContext)
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [applicants, setApplicants] = useState(0)
// 	const [jobs, setJobs] = useState(0)

// 	useEffect(() => {
// 		const applicantNum = async () => {
// 			const res = await getAllApplicants()
// 			setApplicants(res.totalApplicants)
// 		}
// 		const totalMyJobs = async () => {
// 			const res = await EMyJobs(profile?._id);
// 			setJobs(res.totalJobs)
// 		}
// 		totalMyJobs()
// 		applicantNum()
// 	}, [])

// 	useEffect(() => {
// 		const timer = setTimeout(() => setIsLoading(false), 500)
// 		return () => clearTimeout(timer)

// 	}, [])

// 	const DashboardCardData = [{
// 		number: jobs || 0,
// 		content: "Total Job Posts",
// 		link: "/my-jobs"
// 	},
// 	{
// 		number: applicants || 0,
// 		content: "Total Applicants",
// 		link: "/applicants"
// 	}
// 	]
// 	if (isLoading) return <Loading message="Loading dashboard..." minHeight="min-h-screen" />

// 	return (
// 		<div>
// 			<div className='flex flex-col gap-5'>
// 				<DashBoxCard cardData={DashboardCardData} role="employer" />
// 				<Applicants />
// 			</div>
// 		</div>
// 	)
// }

// export default EmployerDashboard



import React, { useState, useEffect, useContext } from 'react'
import DashBoxCard from '../../common/DashBoxCard'
import Applicants from './pages/Applicants'
import Loading from '../../common/Loading'
import { ProfileContext } from '../../../context/ProfileContext'
import { EMyJobs, getAllApplicants } from '../../../services/jobService'
import api from '../../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

function EmployerDashboard() {
	const { profile } = useContext(ProfileContext)
	const [isLoading, setIsLoading] = useState(true)
	const [applicants, setApplicants] = useState(0)
	const [jobs, setJobs] = useState(0)
	const [isPremium, setIsPremium] = useState(false)
	const [premiumExpiresAt, setPremiumExpiresAt] = useState(null)
	const [showPopup, setShowPopup] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const applicantNum = async () => {
			const res = await getAllApplicants()
			setApplicants(res.totalApplicants)
		}
		const totalMyJobs = async () => {
			const res = await EMyJobs(profile?._id)
			setJobs(res.totalJobs)
		}
		const checkPremium = async () => {
			try {
				const { data } = await api.get("/payment/status")
				setIsPremium(data.isPremium)
				console.log(data);
				
				setPremiumExpiresAt(data.premiumExpiresAt)

				// Show popup only if not premium
				if (!data.isPremium) {
					setShowPopup(true)
				}
			} catch (err) {
				console.error("Premium check failed:", err)
			}
		}
		totalMyJobs()
		applicantNum()
		checkPremium()
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 500)
		return () => clearTimeout(timer)
	}, [])

	const daysLeft = isPremium && premiumExpiresAt
		? Math.ceil((new Date(premiumExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))
		: 0

	const DashboardCardData = [
		{ number: jobs || 0, content: "Total Job Posts", link: "/my-jobs" },
		{ number: applicants || 0, content: "Total Applicants", link: "/applicants" }
	]

	if (isLoading) return <Loading message="Loading dashboard..." minHeight="min-h-screen" />

	return (
		<div>
			{/* Premium Popup on load */}
			{showPopup && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
						<div className="text-5xl mb-3">⭐</div>
						<h2 className="text-2xl font-bold text-gray-800 mb-2">
							Unlock Premium Features
						</h2>
						<p className="text-gray-500 mb-4 text-sm">
							You are on the free plan. Upgrade to unlock AI Recruitment and more.
						</p>
						<ul className="text-left text-sm text-gray-600 bg-yellow-50 rounded-xl p-4 mb-6 space-y-1">
							<li>✓ AI Recruitment tools</li>
							<li>✓ Featured badge on job posts</li>
							<li>✓ Priority support</li>
						</ul>
						<div className="flex flex-col gap-3">
							<button
								onClick={() => { setShowPopup(false); navigate('/employer/premium') }}
								className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition"
							>
								⭐ Upgrade — NPR 999 / 30 days
							</button>
							<button
								onClick={() => setShowPopup(false)}
								className="w-full text-gray-400 hover:text-gray-600 text-sm underline"
							>
								Maybe later
							</button>
						</div>
					</div>
				</div>
			)}

			<div className='flex flex-col gap-5'>
				{/* Premium Status Banner */}
				{isPremium ? (
					<div className="flex items-center gap-3 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3">
						<span className="text-2xl">⭐</span>
						<div>
							<p className="text-yellow-700 font-semibold text-sm">Premium Active</p>
							<p className="text-yellow-500 text-xs">{daysLeft} days remaining</p>
						</div>
					</div>
				) : (
					<div className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3">
						<span className="text-2xl">🔒</span>
						<div>
							<p className="text-gray-600 font-semibold text-sm">Free Plan</p>
							<p className="text-gray-400 text-xs">Some features are locked</p>
						</div>
					</div>
				)}

				<DashBoxCard cardData={DashboardCardData} role="employer" />
				<Applicants />
			</div>
		</div>
	)
}

export default EmployerDashboard