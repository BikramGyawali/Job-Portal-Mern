import React, { useContext, useEffect, useState } from 'react'

import { DashboardBodyData, DashboardHeadData, JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'
import DashTable from '../../common/DashTable'
import { useNavigate } from 'react-router-dom'
import { JMyJobs } from '../../../services/jobService'
import { ProfileContext } from '../../../context/ProfileContext'
import { JobPostContext } from '../../../context/JobPostContext'
import useViewJob from '../../../hooks/useViewJob'
import JobDetails from '../../common/JobDetails'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {

	const { fetchMyJobs, myJobs } = useContext(JobPostContext)
	const { viewJob, closeView, handleView, handleApply, loading } = useViewJob()
	useEffect(() => {
		fetchMyJobs();
	}, [])
	const actionHandler = {
		view: handleView,
		apply: handleApply
	}
	console.log(myJobs);

	return (
		<div>
			<DashBoxCard cardData={JDashboardCardData} />
			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={myJobs} actionHandler={actionHandler} />
			{viewJob && (
				<JobDetails job={viewJob} showClose={true} showApply={true} onClose={closeView} onApply={handleApply} loading={loading} />
			)}
		</div>
	)
}

export default JobseekerDashboard