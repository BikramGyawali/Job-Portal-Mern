import React from 'react'
import { useContext } from 'react'
import { JobPostContext } from '../context/JobPostContext'
import { CardComp } from '../components/common/CardComp'
import { useEffect } from 'react'


function JobList() {
	const { jobs, loading, fetchApprovedJobs } = useContext(JobPostContext)
	useEffect(() => {
		fetchApprovedJobs();

	}, [])  // run every time when home page is open


	if (loading) return <p>Loading......</p>
	return (
		<div className=' grid gap-4 p-6 md:grid-cols-4 sm:grid-cols-2'>
			{jobs.map((job, i) => (
				<CardComp key={i} job={job} />
			))}
		</div>
	)
}

export default JobList