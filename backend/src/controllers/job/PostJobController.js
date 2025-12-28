import { EmployerProfile } from "../../models/employer/EmployerProfile";
import { PostJob } from "../../models/employer/PostJob";

export const PostJobController = async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await EmployerProfile.findOne({ userId })
		const jobCreate = await PostJob.create({
			...req.body,
			userId
		})

		return res.status(200).json({
			status: 1,
			message: "Job Created successfully",
			jobCreate,
			userInfo: {
				userId: jobCreate._id,
				email: jobCreate._id

			}
		})
	} catch (error) {

	}
}