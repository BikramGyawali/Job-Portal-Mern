
import axios from "axios";
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

export const rejectJobsService = async (jobId, reason) => {
	try {
		const response = await api.patch(`/job/reject/${jobId}`, {
			rejectionReason: reason
		});
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


// for job listing for the employers

export const EMyJobs = async () => {
	try {
		const response = await api.get(`/employer/myjobs`)
		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data.jobs[0].jobs,

				totalJobs: response.data.jobs[0].totalJobs
			}
		}
		return {
			success: false,
			message: response.data.message
		}

	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}


//jobseeker job list
export const JMyJobs = async () => {
	try {
		const response = await api.get(`/jobseeker/jjoblist`)
		// console.log(response);

		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data.jobs
			}
		}
		return {
			success: false,
			message: response.data.message
		}

	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}



//job apply 

export const applyJob = async (jobId) => {
	try {
		const response = await api.post(`/job/apply/${jobId}`)
		if (response.data?.status === 1) {
			return {
				success: true,
				message: "Job Applied Successfully",


			}
		}
		return {
			success: false,
			message: response.data?.message,
			jobs: response

		}


	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to apply Job"
		}
	}
}



//get all applicant 

export const getApplicants = async (jobId) => {
	try {
		const response = await api.get(`/job/applicants/${jobId}`);
		if (response.data?.status === 1) {
			return {
				success: true,
				message: "List of all applicants",
				applicants: response
			}
		}
		return {
			success: false,
			message: response.data?.message

		}
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to fetch applicants"
		}
	}
}


//get all applicants

// export const getAllApplicants = async () => {
// 	try {
// 		const response = await api.get(`/job/allapplicants`);
// 		if (response.data?.status === 1) {
// 			return {
// 				success: true,
// 				jobs: response.data?.jobs,
// 				message: response?.data?.message
// 			}
// 		}
// 		return {
// 			success: false,
// 			message: response.data?.message
// 		}
// 	} catch (error) {
// 		return {
// 			success: false,
// 			message: error?.response?.data?.message || "Failed to fetch applicants"
// 		}
// 	}
// }
export const getAllApplicants = async () => {
	try {
		const response = await api.get(`/job/allapplicants`)

		if (response.data?.status === 1) {
			return {
				success: true,
				jobs: response.data?.jobs,
				totalApplicants: response.data?.totalApplicants,
				message: response.data?.message
			}
		}

		return {
			success: false,
			message: response.data?.message
		}
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to fetch applicants"
		}
	}
}



//service for the shortlisted

export const shortlistApplicant = async (applicationId) => {
	try {
		const response = await api.patch(`/employer/shortlist/${applicationId}`)

		if (response.data?.status === 1) {
			return {
				success: true,
				message: response.data?.message,
				application: response.data?.application
			}
		}

		return {
			success: false,
			message: response.data?.message
		}

	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to shotlist"
		}
	}
}


// service for reject applicant 

export const rejectApplicant = async (applicationId) => {
	try {
		const res = await api.patch(`employer/rejectapplicant/${applicationId}`);
		if (res.data?.status === 1) {
			return {
				success: true,
				message: "Reject Applicant Successfully",
				application: res.data?.application
			}
		}
		return {
			success: false,
			message: res.data?.message
		}
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to shortlist"
		}
	}
}

// get applied jobs 
export const getAppliedJobs = async () => {
	try {
		const response = await api.get("/jobseeker/appliedjobs")

		if (response.data?.status === 1) {
			return {
				success: true,
				message: response.data.message,
				jobs: response.data.jobs,
				totalApplied: response.data.totalApplied
			}
		}

		return {
			success: false,
			message: response.data?.message || "No jobs found"
		}

	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to fetch applied jobs"
		}
	}
}

//delete job post 

export const deleteJobPost = async (jobId) => {
	try {
		const res = await api.delete(`/employer/deletejobpost/${jobId}`)
		if (res.data?.status === 1) {
			return {
				success: true,
				message: "Delete Job Successfully",
				job: res.data?.job
			}
		}
		return {
			success: false,
			message: res.data?.message
		}
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to fetch applied jobs"
		}
	}
}