import React from 'react'
import DashTable from '../../../common/DashTable'
import { DashboardBodyData, DashboardTableHeadData } from '../../../../data/admin/Dashboarddata'

function ApproveAccounts() {
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
			<DashTable headData={DashboardTableHeadData} bodyData={DashboardBodyData} title={"Application Listing"} actionHandler={actionHandler} />
		</div>
	)
}

export default ApproveAccounts