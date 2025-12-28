import dotenv from "dotenv"
import jwt, { decode } from "jsonwebtoken"
import { User } from "../../models/LoginModel/SignupLogic.js";
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js";
import { EmployerProfile } from "../../models/employer/EmployerProfile.js";

export const currentUserService = async (req) => {

	if (!req.user || !req.user.id) {
		throw {
			status: 401,
			message: "Token  is missing"
		}
	}

	const user = await User.findById(req.user.id).select("-pass");
	if (!user) {
		throw {
			status: 401,
			message: "User doesnt exists"
		}
	}
	// fetch profile for display name/email if exists

	const profileModel = user.role === "jobseeker" ? JobseekerProfile : EmployerProfile;
	const profile = await profileModel.findOne({ userId: user._id }).lean();

	return {
		status: 1,
		role: user.role,
		isProfileCompleted: user.isProfileCompleted,
		user: {
			id: user._id,
			email: user.email,
			name: profile ? (profile.fname || profile.cname) : null
		}
	}
}