// for jobseeker Profile Controller
//pending profile 

import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile";
import { User } from "../../models/LoginModel/SignupLogic"

export const getPendingProfile = async (req, res) => {
	try {
		const users = await User.findOne(
			{
				role: { $in: ['employer', 'jobseker'] }, approvalStatus: "pending"
			}
		).lean();

		const profile = Promise.all(
			users.map(async (user) => {
				let profileData = null;
				if (user.role == "jobseeker") {
					profileData = await JobseekerProfile.findById(user._id).lean();
				}
				if (user.role == "employer") {
					profileData = await EmployerProfile.findById(user._id).lean();
				}

				return {
					userId: user._id,
					email: user.email,
					role: user.role,
					profile: profileData
				}
			})
		)
		res.status(200).json({
			status: 1,
			profile
		})

	} catch (error) {
		res.status(500).json({
			status: 0,
			message: "Failed to fetch Data"
		})
	}
}

//approve profile


//reject profile



//for Employers Profile 