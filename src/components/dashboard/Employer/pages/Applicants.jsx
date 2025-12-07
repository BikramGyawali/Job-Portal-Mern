import React from 'react'
import DashTable from '../../../common/DashTable'
import { ApplicantBody, ApplicantHead } from '../../../../data/employers/DashboardData'

function Applicants() {
	const handleViewApplicants = (row) => {
		console.log("view",row);

	}
	const handleShortList = (row) => {
		console.log("shortlisted", row);


	}
	const handleReject = (row) => {
		console.log("Reject", row);

	}
	const actionHandler = {
		view: handleViewApplicants,
		shortlist: handleShortList,
		reject: handleReject
	}
	return (
		<div>
			<DashTable headData={ApplicantHead} bodyData={ApplicantBody} title="Applicant " actionHandler={actionHandler} />
		</div>
	)
}

export default Applicants