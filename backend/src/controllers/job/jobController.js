// import { EmployerProfile } from "../../models/employer/EmployerProfile";
import { PostJob } from "../../models/employer/PostJob.js";

export const PostJobController = async (req, res) => {
	try {
		const userId = req.user.id;

		const jobCreate = await PostJob.create({
			...req.body,
			userId,
			isApproved: false
		})

		return res.status(200).json({
			status: 1,
			message: "Job Created successfully",

			job: {
				_id: jobCreate._id,
				jobTitle: jobCreate.jobTitle,
				createdAt: jobCreate.createdAt
			},
			user: {
				userId: userId,
				email: req.user.email
			}
		})
	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to create Job",
			errorMessage: error?.message
		})
	}
}


//for getting all approved job for home page 

export const approvedJob = async (req, res) => {
	try {
		const jobs = await PostJob.find({ isApproved: true }).populate('userId', 'email role').sort({ createdAt: -1 }).lean() //using the useid i will get the email and role
		if (jobs.length === 0) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs area avaiable to fetch"
			})
		}
		return res.status(200).json({
			status: 1,
			message: "Fetached all jobs",
			jobs: jobs
		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to fetch approved jobs"
		})
	}


}

//for getting pending jobs for the admin

export const pendingJob = async (req, res) => {
	try {
		const jobs = await PostJob.find({ isApproved: false }).populate('userId', 'email role').sort({ createdAt: -1 }).lean() //using the useid i will get the email and role
		if (jobs.length === 0) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs area avaiable to fetch"
			})
		}
		return res.status(200).json({
			status: 1,
			message: "Fetached all jobs",
			jobs: jobs
		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to fetch approved jobs"
		})
	}


}

//get approved jobs for admin 

export const approve = async (req, res) => {
	try {
		const job = await PostJob.findByIdAndUpdate(
			req.params.id,
			{
				isApproved: true,
				approvalDate: Date.now()
			},
			{ new: true }
		)
		if (!job) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs area avaiable "
			})
		}
		return res.status(200).json({
			status: 1,
			message: "Approved Jobs Successfully",
			job: job
		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to  approved jobs"
		})
	}
}


//reject jobs for admin 
export const rejectJob = async (req, res) => {
	try {
		const job = await PostJob.findByIdAndDelete(
			req.params.id,
		)
		if (!job) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs area avaiable "
			})
		}
		return res.status(200).json({
			status: 1,
			message: "Rejected Jobs Successfully",
			job: job
		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to  reject jobs"
		})
	}
}