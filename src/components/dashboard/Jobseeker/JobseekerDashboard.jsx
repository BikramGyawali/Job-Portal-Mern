import React from 'react'

import { JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {
	return (
		<div>
			<DashBoxCard cardData={JDashboardCardData} />
		</div>
	)
}

export default JobseekerDashboard