import React, { useContext, useEffect, useState } from 'react'
import DashTable from '../../../common/DashTable'
import { MyJobsTableBody, MyJobsTableHead } from '../../../../data/employers/DashboardData'
import { EMyJobs } from '../../../../services/jobService'
import { ProfileContext } from '../../../../context/ProfileContext'

function MyJobs() {
	const { profile } = useContext(ProfileContext)

	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const fetchJobs = async () => {
			if (!profile?._id) return;
			const response = await EMyJobs(profile._id);
			if (response?.success) {
				setJobs(response?.jobs);
				console.log(profile);
			}
		}
		fetchJobs()
	}, [profile])
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