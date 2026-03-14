import React, { useState, useEffect, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import JobDetails from '../../../common/JobDetails'
import { getAppliedJobs } from '../../../../services/jobService'
import { toast } from 'react-toastify'

const AppliedJobsHead = ["S.N", "Job Title", "Job Level", "Applied At", "Status", "Actions"]

function AppliedJobs() {
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedJob, setSelectedJob] = useState(null)

	const fetchAppliedJobs = useCallback(async () => {
		try {
			setLoading(true)
			const res = await getAppliedJobs()

			if (!res.success) {
				toast.error(res.message)
				return
			}
			const alljobs = res.jobs;
			console.log(alljobs);

			const formatted = alljobs.map((application, index) => ({


				// "S.N": ,
				"Job Title": application.jobDetails?.jobTitle || "N/A",
				"Job Level": application.jobDetails?.jlevel || "N/A",
				"Status": application.status || "pending",
				"Applied At": application.appliedAt ? new Date(application.appliedAt).toLocaleDateString("en-Us", {
					year: "numeric",
					month: "short",
					day: "numeric"
				}) : "N/A",
				"Actions": ["view"],
				fullData: application.jobDetails
			}))

			setJobs(formatted)

		} catch (error) {
			toast.error("Failed to fetch applied jobs")
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchAppliedJobs()
	}, [fetchAppliedJobs])

	const handleView = (row) => {
		if (!row?.fullData) {
			toast.error("Job data not found")
			return
		}
		setSelectedJob(row.fullData)
	}

	const closeView = () => setSelectedJob(null)

	const actionHandler = {
		view: handleView
	}

	if (loading) {
		return <div className="p-6 text-gray-500">Loading applied jobs...</div>
	}

	return (
		<div>
			<DashTable
				title="Applied Jobs"
				headData={AppliedJobsHead}
				bodyData={jobs}
				actionHandler={actionHandler}
			/>

			{selectedJob && (
				<JobDetails
					job={selectedJob}
					showClose={true}
					onClose={closeView}
					onApply={false}
				/>
			)}
		</div>
	)
}

export default AppliedJobs