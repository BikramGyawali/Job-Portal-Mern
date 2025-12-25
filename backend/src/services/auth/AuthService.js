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
	return {
		status: 1,
		user: {
			id: user._id,
			role: user.role,
			user,
			isProfileCompleted: user.isProfileCompleted
		}
	}
}