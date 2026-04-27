import React from 'react'
import { useContext } from 'react'
import { JobPostContext } from '../context/JobPostContext'
import { CardComp } from '../components/common/CardComp'
import { useEffect } from 'react'
import Loading from '../components/common/Loading'
import { calculateJobDates } from '../utils/JobDataUtils'
import { useState } from 'react'


function JobList() {
	const { jobs, loading, fetchApprovedJobs } = useContext(JobPostContext)
	const [newJobs, setNewJobs] = useState([])
	useEffect(() => {
		fetchApprovedJobs();

	}, [])  // run every time when home page is open
	const transformedJobs = jobs.map((job) => {
		const { remainingDays } = calculateJobDates(
			job.postingDate,
			job.postingPeriod
		)

		return {
			"_id": job._id,
			"jobTitle": job.jobTitle,
			"district": job.district,
			"expiredIn": remainingDays > 0 ? `${remainingDays}` : "Expired",
           "desiredCandidate":job.desiredCandidate,
		   "experience":job.experience
		}
	})
	// setNewJobs(transformedJobs)
	if (loading) return <Loading message='Loading...' minHeight='min-h-[100px]' />
	return (
		<div className=' grid gap-4 p-6 md:grid-cols-4 sm:grid-cols-2 '>
			{transformedJobs.map((job, i) => (
				<CardComp key={i} job={job} />
			))}
		</div>
	)
}

export default JobList