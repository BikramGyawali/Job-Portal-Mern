import React, { useContext, useEffect, useState } from "react";
import logo from "../../../../assets/image/logo.png";
import { DashboardHeadData, jobData, JobListingData, ListingTitle } from "../../../../data/jobseekers/DashboardData";
import ButtonComp from "../../../common/ButtonComp";
import { useLocation } from "react-router-dom";
import { ProfileContext } from "../../../../context/ProfileContext";
import { JMyJobs } from "../../../../services/jobService";
import DashTable from "../../../common/DashTable";
import { JobPostContext } from "../../../../context/JobPostContext";
import useViewJob from "../../../../hooks/useViewJob";
import JobDetails from "../../../common/JobDetails";

function JobListing() {
	const [jobs, setJobs] = useState([])
	const { fetchMyJobs, myJobs, totalJobs } = useContext(JobPostContext)
	useEffect(() => {
		fetchMyJobs();
	}, [])
	useEffect(() => {
		if (myJobs?.length) {
			setJobs(myJobs)
		}
	}, [myJobs])
	const handleApplySuccess = (jobId) => {
		setJobs(prev =>
			prev.map(j =>
				(j._id === jobId || j.fullData?._id === jobId)
					? { ...j, alreadyApplied: true, fullData: { ...j.fullData, alreadyApplied: true } }
					: j
			)
		)
	}

	const { viewJob, handleView, closeView, handleApply, loading } = useViewJob(handleApplySuccess)



	const actionHandler = {
		view: handleView,
		apply: handleApply
	}
	return (
		<div>

			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={jobs} actionHandler={actionHandler} total={totalJobs} />
			{/* {viewJob && (
				<JobDetails onClose={closeView} job={viewJob} showApply={true} showClose={true} onApply={handleApply} loading={loading} />
			)
			} */}
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
