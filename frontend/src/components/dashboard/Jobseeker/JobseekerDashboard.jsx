import React from 'react'

import { JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'

import JobListing from './pages/JobListing'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {
	;

	return (
		<div>
			<DashBoxCard cardData={JDashboardCardData} />

			<JobListing />
		</div>
	)
}

export default JobseekerDashboard