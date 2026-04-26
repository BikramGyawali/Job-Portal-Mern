import React, { useContext, useEffect, useState } from "react";

import { DashboardHeadData, jobData, JobListingData, ListingTitle } from "../../../../data/jobseekers/DashboardData";

import DashTable from "../../../common/DashTable";
import { JobPostContext } from "../../../../context/JobPostContext";
import useViewJob from "../../../../hooks/useViewJob";
import JobDetails from "../../../common/JobDetails";
import Loading from "../../../common/Loading";

function JobListing() {
	const [jobs, setJobs] = useState([])
	const [pageLoading, setPageLoading] = useState(true)
	const { fetchMyJobs, myJobs, totalJobs, message, setTotalJobs } = useContext(JobPostContext)
	useEffect(() => {
		const load = async () => {
			setPageLoading(true)
			await fetchMyJobs();
			setPageLoading(false)
		}
		load()
	}, [])
	useEffect(() => {
		if (myJobs !== undefined) {
			setJobs(myJobs)
		}
	}, [myJobs])

	const handleApplySuccess = (jobId) => {
		setJobs(prev =>
			prev.filter(j =>
				j._id !== jobId && j.fullData?._id !== jobId
			)
		)
		setTotalJobs(prev => Math.max(0, prev - 1)

		)
	}

	const { viewJob, handleView, closeView, handleApply, loading } = useViewJob(handleApplySuccess)



	const actionHandler = {
		view: handleView,
		apply: handleApply
	}
	if (pageLoading) {
		return <Loading message="Loading Jobs.." />
	}
	return (
		<div>

			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={jobs} actionHandler={actionHandler} total={totalJobs} message={message} />
			{viewJob && (
				<JobDetails
					key={viewJob._id + viewJob.alreadyApplied}
					job={viewJob}
					showApply={true}
					showClose={true}
					onApply={() => handleApply(viewJob)}
					onClose={closeView}
					loading={loading}
				/>
			)}
		</div>

	);
}

export default JobListing;
