
import React, { useState, useEffect, useContext } from 'react'
import DashBoxCard from '../../common/DashBoxCard'
import Applicants from './pages/Applicants'
import Loading from '../../common/Loading'

import { ProfileContext } from '../../../context/ProfileContext'
import { EMyJobs, getAllApplicants } from '../../../services/jobService'

function EmployerDashboard() {
	const { profile } = useContext(ProfileContext)
	const [isLoading, setIsLoading] = useState(true)
	const [applicants, setApplicants] = useState(0)
	const [jobs, setJobs] = useState(0)
	console.log(profile?._id)
	useEffect(() => {
		const applicantNum = async () => {
			const res = await getAllApplicants()
			setApplicants(res.totalApplicants)
		}
		const totalMyJobs = async () => {
			const res = await EMyJobs(profile?._id);
			setJobs(res.totalJobs)
		}
		totalMyJobs()
		applicantNum()
	}, [])
	console.log(applicants);
	console.log(jobs);
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 500)
		return () => clearTimeout(timer)

	}, [])

	const DashboardCardData = [{
		number: jobs,
		content: "Total Job Posts",
		link: "/my-jobs"
	},
	{
		number: applicants,
		content: "Total Applicants",

		link: "/applicants"
	}
	]
	if (isLoading) return <Loading message="Loading dashboard..." minHeight="min-h-screen" />

	return (
		<div>
			<div className='flex flex-col gap-5'>
				<DashBoxCard cardData={DashboardCardData} role="employer" />
				<Applicants />
			</div>
		</div>
	)
}

export default EmployerDashboard