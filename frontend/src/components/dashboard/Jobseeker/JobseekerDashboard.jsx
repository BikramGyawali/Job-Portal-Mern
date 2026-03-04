import React, { useContext, useEffect, useState } from 'react'

import { DashboardBodyData, DashboardHeadData, JDashboardCardData } from '../../../data/jobseekers/DashboardData'
import DashBoxCard from '../../common/DashBoxCard'
import DashTable from '../../common/DashTable'
import { useNavigate } from 'react-router-dom'
import { JMyJobs } from '../../../services/jobService'
import { ProfileContext } from '../../../context/ProfileContext'
// import { DashboardCardData } from '../../../data/jobseeker/DashboardCardData'

function JobseekerDashboard() {
	const { profile } = useContext(ProfileContext)
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const fetchJob = async () => {
			if (!profile?._id) return;
			const response = await JMyJobs();
			if (response.success) {
				setJobs(response?.jobs)
				console.log(response);

			}
		}
		fetchJob()
	}, [profile])
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
			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={jobs} actionHandler={actionHandler} />
		</div>
	)
}

export default JobseekerDashboard