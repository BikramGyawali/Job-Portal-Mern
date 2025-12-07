import React from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableBody, MyJobsTableHead } from '../../../../data/employers/DashboardData'

function MyJobs() {
	return (
		<div>
			<DashTable headData={MyJobsTableHead} bodyData={MyJobsTableBody} title="My Jobs" />
		</div>
	)
}

export default MyJobs