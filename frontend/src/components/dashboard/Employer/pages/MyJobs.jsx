import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import DashTable from '../../../common/DashTable'
import { MyJobsTableHead } from '../../../../data/employers/DashboardData'
import { EMyJobs } from '../../../../services/jobService'
import { ProfileContext } from '../../../../context/ProfileContext'
import RejectionReasonView from '../../../common/RejectionReasonView'
import { calculateJobDates } from '../../../../utils/JobDataUtils'

import ViewApplicant from '../../../common/ViewApplicant';

function MyJobs() {
	const { profile } = useContext(ProfileContext)



	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const fetchJobs = async () => {
			if (!profile?._id) return;

			const response = await EMyJobs(profile._id);

			if (response?.success) {
				const jobs = response.jobs;


				const transformjobs = jobs.map((job, index) => {


					const { formattedDate, remainingDays } = calculateJobDates(
						job.postingDate,
						job.postingPeriod
					)
					let statusLabel;

					if (job.status === "approved") {
						statusLabel = "Active";
					} else if (job.status === "rejected") {
						statusLabel = "Rejected";
					} else {
						statusLabel = "Pending";
					}
					return {
						// "S.N": index + 1,
						"_id": job._id,
						"Job Title": job.jobTitle,
						"Posted at": formattedDate,
						"Expires In": remainingDays > 0 ? `${remainingDays} days` : "Expired",
						"Applicants": job.applicationCount
							> 0 ? `${job.applicationCount
							}` : "0",
						"View All / Reason": job.status === "rejected"
							? <RejectionReasonView reason={job.rejectionReason} />
							: job.applicationCount > 0 ? <ViewApplicant jobId={job._id} /> : null,
						"Status": statusLabel,
						"Actions": ["edit", "delete"]
					};
				});
				setJobs(transformjobs);
			}
		};

		fetchJobs();
	}, [profile]);
	// console.log(jobs);

	const handleEdit = (row) => {
		console.log(profile);
		// console.log("Edit", row);

	}
	const handleDelete = (row) => {
		console.log("Delete", row);

	}
	const actionHandler = {
		edit: handleEdit,
		delete: handleDelete
	}
	return (
		<div>
			<DashTable headData={MyJobsTableHead} bodyData={jobs} title="My Jobs" actionHandler={actionHandler} />

		</div>
	)
}

export default MyJobs