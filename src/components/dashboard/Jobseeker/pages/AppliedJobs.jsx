import React from 'react'

import { useNavigate } from 'react-router-dom'
import DashTable from '../../../common/DashTable';
import { DashboardBodyData, DashboardHeadData } from '../../../../data/jobseekers/DashboardData';



function AppliedJobs() {
	const navigate = useNavigate();
	const handleView = (row) => {
		// console.log("row", row);
		navigate('/jobseeker/job-listing', {
			state: {
				formApplied: true,
			}
		})

	}
	const actionHandler = {
		view: handleView
	}
	return (
		<div>
			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={DashboardBodyData} actionHandler={actionHandler} />
		</div>
	)
}

export default AppliedJobs