import React, { useContext, useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableHead } from '../../../../data/employers/DashboardData'
import { deleteJobPost, EMyJobs } from '../../../../services/jobService'
import { ProfileContext } from '../../../../context/ProfileContext'
import RejectionReasonView from '../../../common/RejectionReasonView'
import { calculateJobDates } from '../../../../utils/JobDataUtils'
import ViewApplicant from '../../../common/ViewApplicant'
import useConfirm from '../../../../hooks/useConfirm'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../common/ConfirmModel'

function MyJobs() {
	const { profile } = useContext(ProfileContext)
	const [jobs, setJobs] = useState([])
	const { showConfirm, confirmProps } = useConfirm()
	const [totalJobs, setTotalJobs] = useState(0)
	const fetchJobs = useCallback(async () => {
		if (!profile?._id) return
		const response = await EMyJobs(profile._id)
		if (response?.success) {
			setJobs(response.jobs)
			setTotalJobs(response.totalJobs)
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
	const handleDelete = (row) => {
		const jobTitle = row.JobTitle
		// const result 
		showConfirm({
			title: "Delete Job",
			message: `Are you sure to delete ${jobTitle} Post`,
			confirmText: "Yes,Delete",
			type: "danger",
			onConfirm: () => processDelete(row)
		})
	}
	const processDelete = async (row) => {
		try {
			const result = await deleteJobPost(row._id);
			if (result.success) {
				toast.success(result?.message)
			} else {
				toast.error(result?.message)
			}
		} catch (error) {
			toast.error("Something Went Wrong")
		}
	}

	const actionHandler = {
		edit: handleEdit,
		delete: handleDelete
	}

	console.log(totalJobs);
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
				total={totalJobs}
			/>
			<ConfirmModal {...confirmProps} />
		</div>
	)
}

export default MyJobs