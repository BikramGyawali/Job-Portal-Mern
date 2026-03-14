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
	const { fetchMyJobs, myJobs, totalJobs } = useContext(JobPostContext)
	const { viewJob, handleView, closeView, handleApply, loading } = useViewJob()
	useEffect(() => {
		fetchMyJobs();
	}, [])



	const actionHandler = {
		view: handleView,
		apply: handleApply
	}
	return (
		<div>

			<DashTable title="Job Listing" headData={DashboardHeadData} bodyData={myJobs} actionHandler={actionHandler} total={totalJobs} />
			{viewJob && (
				<JobDetails onClose={closeView} job={viewJob} showApply={true} showClose={true} onApply={handleApply} loading={loading} />
			)
			}
		</div>

	);
}

export default JobListing;
