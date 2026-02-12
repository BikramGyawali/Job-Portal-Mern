
import api from "../utils/axiosInstance"

export const postJobService = async (jobData) => {
	try {
		const response = await api.post("/job/create", jobData);
		console.log(response);
		
		if (response.data?.status === 1) {
			return {
				success: true,
				job: response.data?.job
			}
		}
		return {
			success: false,
			error: response.data?.message
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

//pending jobs
export const getPendingJobsService = async () => {
	try {
		const response = await api.get("/job/pending");
		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data?.jobs
			}
		}
		return {
			success: false,
			error: response.data?.message
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

//approved jobs

export const getApprovedJobsService = async () => {
	try {
		const response = await api.get("/job/approved");
		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data?.jobs
			}
		}
		return {
			success: false,
			error: response.data?.message
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

//approve jobs by admin 

export const approvedJobsService = async (jobId) => {
	try {
		const response = await api.patch(`/job/approve/${jobId}`);
		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data?.job
			}
		}	
		return {
			success: false,
			error: response.data?.message
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}


//rejected job from admin 

export const rejectJobsService = async (jobId) => {
	try {
		const response = await api.delete(`/job/reject/${jobId}`);
		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data?.job
			}
		}
		return {
			success: false,
			error: response.data?.message
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}