
//pending profile 

import { EmployerProfile } from "../../models/employer/EmployerProfile.js";
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js";
import { User } from "../../models/LoginModel/SignupLogic.js"

//to get the user name from the jobseekersprofile

const addUserName = async (users) => {
	const usersArray = Array.isArray(users) ? users : [users];

	// console.log(users[0]._id);
	return Promise.all(
		usersArray.map(async (user) => {
			const profileModel =
				user.role === "employer"
					? EmployerProfile
					: JobseekerProfile;

			// try to find profile by userId first, fall back to email (handles old or inconsistent records)
			const profile = await profileModel
				.findOne({ $or: [{ userId: user._id }, { email: user.email }] })
				.lean();

			let name = user.email || "N/A";

			if (profile) {
				if (user.role === "employer") {
					name = profile.companyName || profile.cname || user.email;
				} else {
					const fullName = `${profile.fname ?? ""} ${profile.mname ?? ""} ${profile.sname ?? ""}`.trim();
					name = fullName || user.email;
				}
			}

			return {
				...user,
				name: name,
				profileData: profile
			};

		})
	);
};




export const getPendingProfile = async (req, res) => {
	try {
		const users = await User.find({
			role: { $in: ["employer", "jobseeker"] },
			approvalStatus: "pending"
		}).lean();

		const profiles = await addUserName(users);

		return res.status(200).json({
			status: 1,
			message: "Fetched all data",
			profiles
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 0,
			message: "Failed to fetch Data"
		});
	}
};



export const updateProfileStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const id = req.params.userId
		if (!["approve", "reject"].includes(status)) {
			return res.status(400).json({
				message: "Invalid Status"
			})
		}

		const user = await User.findById(id)
		if (!user) {
			return res.status(404).json({
				message: "No user Found"
			})
		}
		if (status === "approve") {
			const updatedUser = await User.findByIdAndUpdate(id, { approvalStatus: "approve" }, { new: true })
			return res.status(200).json({
				status: 1,

				message: "User Approved Successfully",
				user: {
					userId: updatedUser._id,
					email: updatedUser.email,
					approvalStatus: updatedUser.approvalStatus
				}
			})
		}
		if (status === "reject") {
			const profileModel = user?.role === "jobseeker" ? JobseekerProfile : EmployerProfile;

			const deletedProfile = await profileModel.findOneAndDelete({ userId: id })

			if (deletedProfile?.image) {
				const imagePath = path.join(
					process.cwd(),
					"public/uploads/images",
					path.basename(deletedProfile.image)
				)
				if (fs.existsSync(imagePath)) {
					fs.unlinkSync(imagePath)
					console.log("Delete image path:", imagePath)
				}
			}
			const updatedUser = await User.findByIdAndUpdate(id,
				{ approvalStatus: "reject", isprofileCompleted: false },

				{ new: true }

			)
			return res.status(200).json({
				status: 1,
				message: `Profile rejected successfully`,
				user: {
					userId: updatedUser._id,
					email: updatedUser.email,
					approvalStatus: updatedUser.approvalStatus
				}
			});
		}
	} catch (error) {
		console.log(error);

		res.status(500).json({
			status: 0,
			message: "failed to update the profile status"
		})
	}

}