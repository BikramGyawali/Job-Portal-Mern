import { createContext, useEffect, useState } from "react";

import { getApprovedJobsService, getPendingJobsService, JMyJobs } from "../services/jobService";
import { calculateJobDates } from "../utils/JobDataUtils";
import { useCallback } from "react";
export const JobPostContext = createContext();

export const JobPostProvider = ({ children }) => {
	const [jobs, setJobs] = useState([])
	const [pendingJobs, setPendingJobs] = useState([])
	const [loading, setLoading] = useState(true)
	const [myJobs, setMyJobs] = useState([]);
	const [totalJobs, setTotalJobs] = useState(0)
	const [message, setMessage] = useState(null)

	const fetchMyJobs = useCallback(async () => {
		setLoading(true)
		setMyJobs([]);
		setMessage(null)
		try {
			const result = await JMyJobs()
			const jobs = result.jobs
			setTotalJobs(result.totalJobs)
			if (result.success) {
				// setMyJobs(result.jobs)
				const transformedJob = jobs.map((job) => {
					const { remainingDays } = calculateJobDates(
						job.postingDate,
						job.postingPeriod
					)
					return {
						"Job Title": job.jobTitle,
						"Job Level": job.jobLevel,
						// "Posted At": formattedDate,
						"Location": job.district,
						"Remaining Days": remainingDays > 0 ? `${remainingDays} days` : "Expired",
						"Actions": ["view", "apply"],
						fullData: job
					}
				})
				setMyJobs(transformedJob)
			}
			if (!result.success) {
				setMessage("No jobs found based on your skills.Try updating your profile.")
			}
		} catch (error) {
			console.log(error);

		}
		finally {
			setLoading(false)
		}
	}, [])

	const fetchApprovedJobs = useCallback(async () => {
		setLoading(true)
		try {
			const result = await getApprovedJobsService();
			if (result.success) {
				setJobs(result.jobs)
			}
		} catch (error) {
			// console.error("failed to fecth data:" + error)
		}
		finally {
			setLoading(false)
		}
	}, [])
	const fetchPendingJobs = useCallback(async () => {
		setLoading(true)
		try {
			const result = await getPendingJobsService();
			if (result.success) {
				setPendingJobs(result.jobs)
			} else {
				setPendingJobs([])
				setMessage("No pending jobs to review")
			}
		} catch (error) {
			console.error("failed to fecth data:" + error)
			setPendingJobs([])
		}
		finally {
			setLoading(false)
		}
	}, [])
	const addJob = (newJob) => {
		setJobs(prev => [newJob, ...prev])   // the new job will be at top and the previous array is also store by including the new job array in a single array
	}

	return (
		<JobPostContext.Provider value={{
			jobs, loading, fetchApprovedJobs, addJob, fetchPendingJobs, fetchMyJobs, myJobs,
			pendingJobs, totalJobs, message, setTotalJobs
		}}>
			{children}
		</JobPostContext.Provider>
	)
}

