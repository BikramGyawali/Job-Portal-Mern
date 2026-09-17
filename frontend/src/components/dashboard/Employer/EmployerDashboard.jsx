
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
// import AIRecruitment from './pages/AIRecruitment'
import PremiumLock from './pages/PremiumLock'
import AIRecruitment from './pages/AiRecruitment'

function EmployerDashboard() {
	const { profile } = useContext(ProfileContext)
	const [isLoading, setIsLoading] = useState(true)
	const [applicants, setApplicants] = useState(0)
	const [jobs, setJobs] = useState(0)
	const [isPremium, setIsPremium] = useState(false)
	const [premiumExpiresAt, setPremiumExpiresAt] = useState(null)

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
				const { data } = await api.get("/api/payment/status")
				setIsPremium(data.isPremium)
				setPremiumExpiresAt(data.premiumExpiresAt)
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
			<div className='flex flex-col gap-5'>

				{/* Premium Status Banner — not clickable, just info */}
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

				{/* AI Recruitment — locked or unlocked based on premium */}
				<div>
					<p className="text-xl font-bold text-gray-700 mb-3">
						🤖 AI Recruitment
						{!isPremium && (
							<span className="ml-2 text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
								🔒 Premium
							</span>
						)}
					</p>
					{isPremium ? <AIRecruitment /> : <PremiumLock featureName="AI Recruitment" />}
				</div>

				<Applicants />
			</div>
		</div>
	)
}

export default EmployerDashboard