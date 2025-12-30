import React from 'react'
import { useContext } from 'react'
import { JobPostContext } from '../context/JobPostContext'
import { CardComp } from '../components/common/CardComp'


function JobList() {
	const { jobs, loading } = useContext(JobPostContext)
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