import React from 'react'
import DashTable from '../../../common/DashTable'
import { ApplicantBody, ApplicantHead } from '../../../../data/employers/DashboardData'

function Applicants() {
	return (
		<div>
			<DashTable headData={ApplicantHead} bodyData={ApplicantBody} title="Applicant " />
		</div>
	)
}

export default Applicants