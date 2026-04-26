import React, { useState, useEffect, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import JobDetails from '../../../common/JobDetails'
import { getAppliedJobs } from '../../../../services/jobService'
import { toast } from 'react-toastify'
import Loading from '../../../common/Loading'
import useViewJob from '../../../../hooks/useViewJob'

const AppliedJobsHead = ["S.N", "Job Title", "Job Level", "Applied At", "Status", "Actions"]

function AppliedJobs() {
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)
	// const [selectedJob, setSelectedJob] = useState(null)
	const { viewJob, closeView, handleView } = useViewJob()
	const [totalApplied, setTotalApplied] = useState(0)
	const [message,setMessage]=useState(null)
	const fetchAppliedJobs = useCallback(async () => {
		try {
			setLoading(true)
			const res = await getAppliedJobs()

			if (!res.success) {
				setMessage ("No applications yet! Start exploring jobs and apply today.")

				return
			}
			setTotalApplied(res.totalApplied)
			const alljobs = res.jobs;


			const formatted = alljobs.map((application, index) => ({


				// "S.N": ,
				"Job Title": application.jobDetails?.jobTitle || "N/A",
				"Job Level": application.jobDetails?.jobLevel || "N/A",
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
			// toast.error("Failed to fetch applied jobs")
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchAppliedJobs()
	}, [fetchAppliedJobs])



	const actionHandler = {
		view: handleView
	}

	if (loading) {
		return <Loading message='Loading Page ...' />
	}

	return (
		<div>
			<DashTable
				title="Applied Jobs"
				headData={AppliedJobsHead}
				bodyData={jobs}
				actionHandler={actionHandler}
				total={totalApplied}
				message={message}

			/>

			{viewJob && (
				<JobDetails
					job={viewJob}
					showClose={true}
					onClose={closeView}
					onApply={false}
				/>
			)}
		</div>
	)
}

export default AppliedJobs