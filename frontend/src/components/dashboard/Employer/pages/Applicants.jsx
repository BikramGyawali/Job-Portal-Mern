import React from 'react'
import DashTable from '../../../common/DashTable'
import { ApplicantBody, ApplicantHead } from '../../../../data/employers/DashboardData'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllApplicants, getApplicants } from '../../../../services/jobService'
import useViewApplicants from '../../../../hooks/useViewApplicants'
import { useParams } from 'react-router-dom'
import { ViewProfileModal } from '../../../common/ViewProfileModal'

function Applicants() {
	const [applicants, setApplicants] = useState([]);
	const { viewApplicant, handleView, closeView } = useViewApplicants();

	useEffect(() => {
		const fetchAllApplicants = async () => {
			const res = await getAllApplicants();
			if (res?.success) {
				const applicants = res.jobs[0]?.jobs;
				const formatted = applicants.map((app, idx) => {
					console.log(app);
					const {
						// jobId: { jobTitle } = {},
						jobTitle,
						applications,

					} = app
					const { applicantProfile, appliedAt } = applications[0] || {}
					const { fname, email, sname, phone } = applicantProfile || {};
					return {
						"S.N": "",
						"Job Title": jobTitle || "N/A",
						"Applicant Name": fname ? `${fname} ${sname}` : "Deleted User",
						"Phone": phone || "N/A",
						"Email": email || "N/A",
						"Applied At": new Date(appliedAt).toLocaleDateString(),
						"Actions": ["view", "shortlist", "reject"],
						fullData: applicantProfile
					}
				})

				setApplicants(formatted)
			}
		}
		fetchAllApplicants()
	}, [])






	const handleShortList = (row) => {
		console.log("shortlisted", row);


	}
	const handleReject = (row) => {
		console.log("Reject", row);

	}
	const actionHandler = {
		view: handleView,
		shortlist: handleShortList,
		reject: handleReject
	}
	return (
		<div>
			<DashTable headData={ApplicantHead} bodyData={applicants} title="Applicant " actionHandler={actionHandler} />
			{
				viewApplicant && (
					<ViewProfileModal profile={viewApplicant} role="jobseeker" onClose={closeView} />
				)
			}
		</div>
	)
}

export default Applicants