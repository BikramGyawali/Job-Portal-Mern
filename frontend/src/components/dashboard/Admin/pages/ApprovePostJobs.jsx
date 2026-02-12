import React, { useContext, useEffect, useState } from 'react'
import DashTable from '../../../common/DashTable'
import { JobData, JobHeads } from '../../../../data/admin/Dashboarddata'
import { JobPostContext } from '../../../../context/JobPostContext'
import { approvedJobsService, rejectJobsService } from '../../../../services/jobService'
import { ViewJobModal } from '../../../common/ViewModel'

function ApprovePostJobs() {
	const { pendingJobs, fetchPendingJobs } = useContext(JobPostContext)
	const [transformedJobs, setTransformedJobs] = useState([])
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [viewJob, setViewJob] = useState(null)
	useEffect(() => {
		fetchPendingJobs()
	}, [])

	useEffect(() => {
		const storeData = async () => {
			const transformed = await pendingJobs.filter(job => !job.isApproved).map((job, index) => ({
				// "S.N": index + 1,
				"Company Name": job.companyName,
				"Job Title": job.jobTitle,
				"Experience": job.experience,
				Actions: ["view", "approve", "reject"],
				_id: job._id,
				fullData: job

			}))
			setTransformedJobs(transformed)
		}
		storeData()
	}, [pendingJobs])
	// console.log(pendingJobs);

	const handleApprove = async (row) => {
		if (!window.confirm(`Approve job : ${row['Job Title']}?`)) return
		setLoading(true)
		try {
			const result = await approvedJobsService(row._id)
			if (result.success) {
				setMessage("Job Approve Successfully")
				setTransformedJobs(prev => prev.filter(j => j._id !== row._id))
				setTimeout(() => setMessage(""), 3000);
			}
			else {
				setMessage(`${result.error}`)
			}
		} catch (error) {
			setMessage(` Error: ${error.message}`)
		} finally {
			setLoading(false)
		}
	}
	const handleReject = async (row) => {
		setLoading(true)
		try {
			const result = await rejectJobsService(row._id)
			if (result.success) {
				setMessage("Job Rejected Successfully")
				setTransformedJobs(prev => prev.filter(j => j._id !== row._id))
				setTimeout(() => setMessage(""), 3000);
			}
			else {
				setMessage(`${result.error}`)
			}
		} catch (error) {
			setMessage(` Error: ${error.message}`)
		} finally {
			setLoading(false)
		}

	}
	const handleView = (row) => {
		setViewJob(row.fullData)
		// console.log(row);


	}
	const actionHandler = {
		approve: handleApprove,
		reject: handleReject,
		view: handleView

	}




	return (
		<div className="p-6">
			{/* Message */}
			{message && (
				<div
					className={`mb-4 p-4 rounded-lg text-center font-semibold ${message.includes('Approve')
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'
						}`}
				>
					{message}
				</div>
			)}


			<DashTable	
				headData={JobHeads}
				bodyData={transformedJobs}
				title={`Pending Jobs (${transformedJobs.length})`}
				actionHandler={actionHandler}
				isLoading={loading}

			/>
			{viewJob && (
				<ViewJobModal
					job={viewJob}
					onClose={() => setViewJob(null)}
				/>
			)}
		</div>
	)
}

export default ApprovePostJobs