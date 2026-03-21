import React, { useEffect, useState } from 'react'

import { JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'

import JobListing from './pages/JobListing'
import Loading from '../../common/Loading'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 300);
		return () => clearTimeout(timer)
	})
	if (loading) return <Loading />

	return (
		<div>
			<DashBoxCard cardData={JDashboardCardData} />

			<JobListing />
		</div>
	)
}

export default JobseekerDashboard