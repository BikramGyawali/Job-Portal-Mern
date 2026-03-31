import React, { useContext, useEffect, useState } from 'react'

import { JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'

import JobListing from './pages/JobListing'
import Loading from '../../common/Loading'
import { getAppliedJobs } from '../../../services/jobService'
import { JobPostContext } from '../../../context/JobPostContext'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {
	const { totalJobs } = useContext(JobPostContext)


	const [appliedJobs, setAppliedJobs] = useState(0)

	const [loading, setLoading] = useState(true)
	useEffect(() => {

		const totalAppliedJobs = async () => {
			setLoading(true)
			const res = await getAppliedJobs();
			setAppliedJobs(res?.totalApplied)
		}
		totalAppliedJobs()

	}, [])


	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 300);
		return () => clearTimeout(timer)
	})
	const dashboardCardData = [
		{
			number: appliedJobs,
			content: "Total Applied Jobs",
			link: "/applied-jobs"
		},
		{
			number: totalJobs || 0,
			content: "Total Matched Jobs",
			link: "/job-listing"
		}
	]
	if (loading) return <Loading />

	return (
		<div>
			<DashBoxCard cardData={dashboardCardData} role="jobseeker" />

			<JobListing />
		</div>
	)
}

export default JobseekerDashboard