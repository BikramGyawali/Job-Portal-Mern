import dotenv from "dotenv"
import jwt, { decode } from "jsonwebtoken"
import { User } from "../../models/LoginModel/SignupLogic.js";


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
	let profile = null;
	if (user.role === 'jobseeker') {
		import("../../models/jobseeker/JobseekerProfile.js");
		profile = await (await import("../../models/jobseeker/JobseekerProfile.js")).JobseekerProfile.findOne({ userId: user._id }).lean();
	} else if (user.role === 'employer') {
		profile = await (await import("../../models/employer/EmployerProfile.js")).EmployerProfile.findOne({ userId: user._id }).lean();
	}

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