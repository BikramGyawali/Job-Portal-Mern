import React, { useContext } from 'react'
import DashTable from '../../../common/DashTable'
import { JobData, JobHeads } from '../../../../data/admin/Dashboarddata'
import { JobPostContext } from '../../../../context/JobPostContext'

function ApprovePostJobs() {
	const { jobs } = useContext(JobPostContext)
	console.log(jobs);

	const handleApprove = (row) => {
		console.log(row);

	}
	const handleReject = (row) => {
		console.log(row);

	}
	const handleView = (row) => {
		console.log(row);

	}
	const actionHandler = {
		approve: handleApprove,
		reject: handleReject,
		view: handleView

	}
	const ActionsData = {
		approve: "approve",
		reject: "reject",
		view: "view"
	}
	const tranformedJobs = jobs.filter(job => !job.isApproved).map((job, index) => ({
		"S.N": index + 1,
		"Company Name": job.companyName,
		"Job Title": job.jobTitle,
		"Experience": job.experience,
		Actions: ["view", "approve", "reject"],
		_id: job._id,
		fullData: job

	}))


	return (
		<div>
			<DashTable headData={JobHeads} bodyData={tranformedJobs} title={"Job Post"} actionHandler={actionHandler} />
		</div>
	)
}

export default ApprovePostJobs