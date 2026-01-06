
//pending profile 

import { EmployerProfile } from "../../models/employer/EmployerProfile.js";
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js";
import { User } from "../../models/LoginModel/SignupLogic.js"

//to get the user name from the jobseekersprofile

const addUserName = async (users) => {
	const usersArray = Array.isArray(users) ? users : [users];

	const result = await Promise.all(
		usersArray.map(async (user) => {
			const profileModel =
				user.role === "employer"
					? EmployerProfile
					: JobseekerProfile;

			const profile = await profileModel
				.findOne({ userId: user._id })
				.lean();
			let name;

			if (user.role === "employer") {
				name = profile?.cname || user?.email || "N/A";
			} else {
				name = `${profile?.fname ?? ""} ${profile?.mname ?? ""} ${profile?.sname ?? ""}`.trim();
			}
			return {
				...user,
				Name: name
			};
		})
	);

	return result;
};



export const getPendingProfile = async (req, res) => {
	try {
		const users = await User.find(
			{
				role: { $in: ['employer', 'jobseeker'] }
				, approvalStatus: "pending"
			}

		).lean();
		const profileWithName = await addUserName(users);

		const profile = await Promise.all(
			profileWithName.map(async (user) => {
				const profileModel =
					user.role === "employer"
						? EmployerProfile
						: JobseekerProfile;

				const profileData = await profileModel.findOne({ userId: user._id }).lean();

				return {
					userId: user._id,
					email: user.email,
					name: user.Name,
					role: user.role,
					profileData: profileData,
					approvalStatus: user.approvalStatus
				}
			})
		)
		return res.status(200).json({
			status: 1,
			message: "Fetched all data",
			profiles: profile
		})

	} catch (error) {
		console.log(error);

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
		return res.status(200).json({
			status: 1,
			message: `Profile ${status} successfully`,
			user: {
				userId: user._id,
				email: user.email,
				approvalStatus: user.approvalStatus
			}
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			status: 0,
			message: "failed to update the profile status"
		})
	}

}