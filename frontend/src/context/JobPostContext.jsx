import { createContext, useEffect, useState } from "react";
import api from '../utils/axiosInstance'
import { getApprovedJobsService, getPendingJobsService, JMyJobs } from "../services/jobService";
import { calculateJobDates } from "../utils/JobDataUtils";
export const JobPostContext = createContext();

export const JobPostProvider = ({ children }) => {
	const [jobs, setJobs] = useState([])
	const [pendingJobs, setPendingJobs] = useState([])
	const [loading, setLoading] = useState(true)
	const [myJobs, setMyJobs] = useState([]);
	const fetchMyJobs = async () => {
		setLoading(true)
		try {
			const result = await JMyJobs()
			const jobs = result.jobs
			if (result.success) {
				// setMyJobs(result.jobs)
				const transformedJob = jobs.map((job, i) => {
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
						"Actions": ["view", "apply"]
					}
				})
				setMyJobs(transformedJob)
			}
		} catch (error) {
			console.log(error);

		}
		finally {
			setLoading(false)
		}
	}
	const fetchApprovedJobs = async () => {
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
	}
	const fetchPendingJobs = async () => {
		setLoading(true)
		try {
			const result = await getPendingJobsService();
			if (result.success) {
				setPendingJobs(result.jobs)
			}
		} catch (error) {
			console.error("failed to fecth data:" + error)
		}
		finally {
			setLoading(false)
		}
	}
	const addJob = (newJob) => {
		setJobs(prev => [newJob, ...prev])   // the new job will be at top and the previous array is also store by including the new job array in a single array
	}

	return (
		<JobPostContext.Provider value={{
			jobs, loading, fetchApprovedJobs, addJob, fetchPendingJobs, fetchMyJobs, myJobs,
			pendingJobs
		}}>
			{children}
		</JobPostContext.Provider>
	)
}

