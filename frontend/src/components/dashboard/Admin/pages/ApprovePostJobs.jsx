import React, { useContext, useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { JobHeads } from '../../../../data/admin/Dashboarddata'
import { JobPostContext } from '../../../../context/JobPostContext'
import { approvedJobsService, rejectJobsService } from '../../../../services/jobService'
import JobDetails from '../../../common/JobDetails'
import RejectJobModal from '../../../common/RejectModal'
import useViewJob from '../../../../hooks/useViewJob'
import ConfirmModal from '../../../common/ConfirmModel'
import useConfirm from '../../../../hooks/useConfirm'
import { toast } from 'react-toastify'
import Loading from '../../../common/Loading'
import { useNavigate } from 'react-router-dom'
import { set } from 'mongoose'

function ApprovePostJobs() {
	const { pendingJobs, fetchPendingJobs } = useContext(JobPostContext)
	const [transformedJobs, setTransformedJobs] = useState([])
	const [loading, setLoading] = useState(false)
	const [rejectJobData, setRejectJobData] = useState(null)
	const { viewJob, closeView, handleView } = useViewJob()
	const { showConfirm, confirmProps } = useConfirm()
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true)
		const load = async () => {
			await fetchPendingJobs()
			setLoading(false)
		}
		load()
	}, [])

	useEffect(() => {
		const transformed = pendingJobs
			.filter(job => job.status === "pending")
			.map((job) => ({
				"Company Name": job.companyName,
				"Job Title": job.jobTitle,
				"Experience": job.experience,
				"Actions": ["view", "approve", "reject"],
				_id: job._id,
				fullData: job
			}))
		setTransformedJobs(transformed)
	}, [pendingJobs])

	const processApprove = useCallback(async (row) => {
		console.log(row._id);

		setLoading(true)
		try {
			const result = await approvedJobsService(row._id)
			if (result.success) {
				toast.success("Job approved successfully", {
					onClose: () => navigate("/admin", { replace: true })
				})
				await fetchPendingJobs()

			} else {
				toast.error(result.error || "Failed to approve job")
			}
		} catch (error) {
			toast.error(`Error: ${error.message}`)
		} finally {
			setLoading(false)
		}
	}, [fetchPendingJobs])

	const handleApprove = (row) => {
		showConfirm({
			title: "Approve Job",
			message: `Are you sure you want to approve "${row["Job Title"]}"?`,
			confirmText: "Yes, Approve",
			cancelText: "Cancel",
			type: "success",
			onConfirm: () => processApprove(row)
		})
	}

	const handleReject = (row) => {
		setRejectJobData(row.fullData)
	}
	const handleRejectSuccess = useCallback(async () => {
		setLoading(true);
		await fetchPendingJobs();
		setLoading(false)
	}, [fetchPendingJobs])
	const actionHandler = {
		approve: handleApprove,
		reject: handleReject,
		view: handleView
	}
	if (loading) {
		return <Loading message='Loading Post' />
	}
	return (
		<div className="p-6">
			<DashTable
				headData={JobHeads}
				bodyData={transformedJobs}
				title={`Pending Jobs (${transformedJobs.length})`}
				actionHandler={actionHandler}
				isLoading={loading}
			/>

			<ConfirmModal {...confirmProps} />

			{viewJob && (
				<JobDetails
					job={viewJob}
					showClose={true}
					onClose={closeView}
				/>
			)}

			{rejectJobData && (
				<RejectJobModal
					job={rejectJobData}
					onClose={() => setRejectJobData(null)}
					onSuccess={handleRejectSuccess}

				/>
			)}
		</div>
	)
}

export default ApprovePostJobs



