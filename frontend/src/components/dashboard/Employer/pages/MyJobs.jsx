import React, { useContext, useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableHead } from '../../../../data/employers/DashboardData'
import { EMyJobs } from '../../../../services/jobService'
import { ProfileContext } from '../../../../context/ProfileContext'
import RejectionReasonView from '../../../common/RejectionReasonView'
import { calculateJobDates } from '../../../../utils/JobDataUtils'
import ViewApplicant from '../../../common/ViewApplicant'

function MyJobs() {
	const { profile } = useContext(ProfileContext)
	const [jobs, setJobs] = useState([])

	const fetchJobs = useCallback(async () => {
		if (!profile?._id) return
		const response = await EMyJobs(profile._id)
		if (response?.success) {
			setJobs(response.jobs)
		}
	}, [profile?._id])

	useEffect(() => {
		fetchJobs()
	}, [fetchJobs])

	const handleApplicantCountUpdate = useCallback((jobId) => {
		setJobs(prev =>
			prev.map(job =>
				job._id === jobId
					? { ...job, applicationCount: Math.max(0, job.applicationCount - 1) }
					: job
			)
		)
	}, [])

	const handleEdit = (row) => console.log("Edit", row)
	const handleDelete = (row) => console.log("Delete", row)

	const actionHandler = {
		edit: handleEdit,
		delete: handleDelete
	}

	const transformJobs = jobs.map((job) => {
		const { formattedDate, remainingDays } = calculateJobDates(
			job.postingDate,
			job.postingPeriod
		)

		const statusLabel =
			job.status === "approved" ? "Active" :
				job.status === "rejected" ? "Rejected" :
					"Pending"

		return {
			"_id": job._id,
			"Job Title": job.jobTitle,
			"Posted at": formattedDate,
			"Expires In": remainingDays > 0 ? `${remainingDays} days` : "Expired",
			"Applicants": job.applicationCount > 0 ? `${job.applicationCount}` : "0",
			"View All / Reason": job.status === "rejected"
				? <RejectionReasonView reason={job.rejectionReason} />
				: job.applicationCount > 0
					? <ViewApplicant
						jobId={job._id}
						applicantCount={job.applicationCount}
						onCountUpdate={handleApplicantCountUpdate}
					/>
					: null,
			"Status": statusLabel,
			"Actions": ["edit", "delete"]
		}
	})

	return (
		<div>
			<DashTable
				headData={MyJobsTableHead}
				bodyData={transformJobs}
				title="My Jobs"
				actionHandler={actionHandler}
			/>
		</div>
	)
}

export default MyJobs