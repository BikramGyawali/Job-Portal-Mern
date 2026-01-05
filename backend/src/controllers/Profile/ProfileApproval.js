
//pending profile 

import { EmployerProfile } from "../../models/employer/EmployerProfile.js";
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js";
import { User } from "../../models/LoginModel/SignupLogic.js"

//to get the user name from the jobseekersprofile

const addUserName = async (users) => {
	const profileData = users.role === "employer" ? EmployerProfile : JobseekerProfile
	const usersArray = Array.isArray(users) ? users : [users];
	const result = await Promise.all(
		usersArray.map(async (user) => {
			const profile = await profileData.findOne(
				{
					userId: user.userId._id
				}
			).lean();
			return {
				...user,
				Name: `${profile?.fname} ${profile?.mname} ${profile?.sname} || ${profile?.cname}`
			}
		})
	)
	return result(users) ? users : users[0];
}


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
				const profileWithName = await addUserName(users);
				return {
					userId: user._id,
					email: user.email,
					role: user.role,
					profile: profileWithName
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


export const updateProfileStatus = async (req, res) => {
	try {
		const { status } = req.body;

		if (!["approve", "reject"].includes(status)) {
			return res.status(400).json({
				message: "Invalid Status"
			})
		}

		const user = await User.findByIdAndUpdate(
			req.params.userId,
			{ approvalStatus: status },
			{ new: true }
		)
		if (!user) {
			return res.status(404).json({
				message: "No user Found"
			})
		}
		res.status(200).json({
			status: 1,
			message: `Profile ${status} Successfully`
		})
	} catch (error) {
		res.status(500).josn({
			status: 0,
			message: "failed to update the profile status"
		})
	}

}