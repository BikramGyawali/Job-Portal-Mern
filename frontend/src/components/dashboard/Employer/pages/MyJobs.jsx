import React, { useContext, useEffect, useState } from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableBody, MyJobsTableHead } from '../../../../data/employers/DashboardData'
import { EMyJobs } from '../../../../services/jobService'
import { ProfileContext } from '../../../../context/ProfileContext'
import RejectionReasonView from '../../../common/RejectionReasonView'

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


					const postedDate = new Date(job.postingDate);
					const formattedDate = postedDate.toISOString().split("T")[0];


					const periodDays = parseInt(job.postingPeriod);

					const expiryDate = new Date(postedDate);
					expiryDate.setDate(expiryDate.getDate() + periodDays);

					const today = new Date();
					const diffTime = expiryDate - today;
					const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
						"Applicant":job.applicant,
						"View All / Reason": job.status === "rejected"
							? <RejectionReasonView reason={job.rejectionReason} />
							: null,
						"Status": statusLabel,
						"Actions": ["edit", "delete"]
					};
				});

				setJobs(transformjobs);
			}
		};

		fetchJobs();
	}, [profile]);
	console.log(jobs);

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