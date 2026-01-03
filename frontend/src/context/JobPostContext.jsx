import { createContext, useEffect, useState } from "react";
import api from '../utils/axiosInstance'
import { getApprovedJobsService, getPendingJobsService } from "../services/jobService";
export const JobPostContext = createContext();

export const JobPostProvider = ({ children }) => {
	const [jobs, setJobs] = useState([])
	const [pendingJobs, setPendingJobs] = useState([])
	const [loading, setLoading] = useState(true)


	const fetchApprovedJobs = async () => {
		setLoading(true)
		try {
			const result = await getApprovedJobsService();
			if (result.success) {
				setJobs(result.jobs)
			}
		} catch (error) {
			console.error("failed to fecth data:" + error)
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
			jobs, loading, fetchApprovedJobs, addJob, fetchPendingJobs,
			pendingJobs
		}}>
			{children}
		</JobPostContext.Provider>
	)
}

