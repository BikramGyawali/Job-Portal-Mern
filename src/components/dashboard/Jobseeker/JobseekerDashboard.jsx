import React from 'react'

import { DashboardBodyData, DashboardHeadData, JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'
import DashTable from '../../common/DashTable'
import { useNavigate } from 'react-router-dom'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {
	const navigate = useNavigate();
	const handleView = (row) => {
		// console.log("row", row);
		navigate('/jobseeker/job-listing')

	}
	const actionHandler = {
		view: handleView
	}
	return (
		<div>
			<DashBoxCard cardData={JDashboardCardData} />
			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={DashboardBodyData} actionHandler={actionHandler} />
		</div>
	)
}

export default JobseekerDashboard