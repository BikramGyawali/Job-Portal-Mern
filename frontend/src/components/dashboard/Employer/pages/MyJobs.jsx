import React, { useContext, useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableHead } from '../../../../data/employers/DashboardData'
import { deleteJobPost, editJobs, EMyJobs } from '../../../../services/jobService'
import { ProfileContext } from '../../../../context/ProfileContext'
import RejectionReasonView from '../../../common/RejectionReasonView'
import { calculateJobDates } from '../../../../utils/JobDataUtils'
import ViewApplicant from '../../../common/ViewApplicant'
import useConfirm from '../../../../hooks/useConfirm'
import { toast } from 'react-toastify'
import ConfirmModal from '../../../common/ConfirmModel'


import PostJobForm from '../PostJobForm'
import Loading from '../../../common/Loading'

function MyJobs() {
	const { profile } = useContext(ProfileContext)
	const [jobs, setJobs] = useState([])
	const [showModel, setShowModel] = useState(false);
	const [selectedJob, setSelectJob] = useState(null)
	const { showConfirm, confirmProps } = useConfirm()
	const [loading, setLoading] = useState(true)
	const [totalJobs, setTotalJobs] = useState(0)
	const fetchJobs = useCallback(async () => {
		if (!profile?._id) {
			setLoading(false)
			return
		}
		setLoading(true)
		try {
			const response = await EMyJobs(profile._id)
			if (response?.success) {
				setJobs(response.jobs)
				setTotalJobs(response.totalJobs)
			}
		} finally {

			setLoading(false)
		}
	}, [profile?._id])

	useEffect(() => {
		fetchJobs()
	}, [fetchJobs])
	//function to update applicant count
	const handleApplicantCountUpdate = useCallback((jobId) => {
		setJobs(prev =>
			prev.map(job =>
				job._id === jobId
					? { ...job, applicationCount: Math.max(0, job.applicationCount - 1) }
					: job
			)
		)
	}, [])


	const handleEdit = async (row) => {
		const jobData = jobs.find(job => job._id === row._id);
		setSelectJob(jobData);
		setShowModel(true)

	}
	const handleDelete = (row) => {

		// const result 
		showConfirm({
			title: `Delete "${row["Job Title"]}"`,
			message: `Are you sure to delete "${row["Job Title"]}"  Post Permanently`,
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
				setJobs(prev => prev.filter(job => job._id !== row._id))
				setTotalJobs(prev => Math.max(0, prev - 1))
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

	// console.log(totalJobs);
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
	if (loading) { return <Loading message='My Jobs...' minHeight='min-h-[400px]' /> }
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
			{showModel && (
				<div className="fixed inset-0 bg-black/40 flex justify-end items-center z-50">
					<div className="bg-white p-6 m-4 rounded-xl w-[1000px] max-h-[95vh] overflow-y-auto">
						<PostJobForm
							mode='edit'
							initialData={selectedJob}
							onSuccess={(updatedJob) => {
								setJobs(prev =>
									prev.map(j => j._id === updatedJob._id ? updatedJob : j)
								);
								setShowModel(false);
							}}
							close={() => setShowModel(false)}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default MyJobs