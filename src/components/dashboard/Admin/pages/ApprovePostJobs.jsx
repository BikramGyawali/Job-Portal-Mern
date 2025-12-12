import React from 'react'
import DashTable from '../../../common/DashTable'
import { JobData, JobHeads } from '../../../../data/admin/Dashboarddata'

function ApprovePostJobs() {
		const handleApprove = (row) => {
		console.log(row);

	}
	const handleReject = (row) => {
		console.log(row);

	}
	const handleView = (row) => {
		console.log(row);

	}
	const actionHandler = {
		approve: handleApprove,
		reject: handleReject,
		view: handleView

	}
  return (
	<div>
		<DashTable headData={JobHeads} bodyData={JobData} title={"Job Post"} actionHandler={actionHandler}/>
	</div>
  )
}

export default ApprovePostJobs