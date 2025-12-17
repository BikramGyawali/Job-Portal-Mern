import React from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableBody, MyJobsTableHead } from '../../../../data/employers/DashboardData'

function MyJobs() {
	const handleEdit = (row) => {
		console.log("Edit", row);
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
			<DashTable headData={MyJobsTableHead} bodyData={MyJobsTableBody} title="My Jobs" actionHandler={actionHandler} />
		</div>
	)
}

export default MyJobs