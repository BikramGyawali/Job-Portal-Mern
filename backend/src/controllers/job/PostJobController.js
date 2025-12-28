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