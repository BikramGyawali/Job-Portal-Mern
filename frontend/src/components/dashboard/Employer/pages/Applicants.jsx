import React from 'react'
import DashTable from '../../../common/DashTable'
import { ApplicantBody, ApplicantHead } from '../../../../data/employers/DashboardData'
import { useState } from 'react'
import { useEffect } from 'react'
import { getApplicants } from '../../../../services/jobService'
import useViewApplicants from '../../../../hooks/useViewApplicants'
import { useParams } from 'react-router-dom'
import { ViewProfileModal } from '../../../common/ViewProfileModal'

function Applicants() {
	const { jobId } = useParams()
	console.log(jobId);

	if (!jobId) return null;

	// const [applicants, setApplicants] = useState([])
	





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
			<DashTable headData={ApplicantHead} bodyData={ApplicantBody} title="Applicant " actionHandler={actionHandler} />

		</div>
	)
}

export default Applicants