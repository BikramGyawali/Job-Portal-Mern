import dotenv from "dotenv"
import jwt, { decode } from "jsonwebtoken"
import { User } from "../../models/LoginModel/SignupLogic.js";

dotenv.config();
const key = process.env.JWT_KEY;
export const currentUserService = async (req) => {
	const token = req.cookies?.token
	if (!token) {
		throw {
			status: 401,
			message: "Token  is missing"
		}
	}
	const decoded = jwt.verify(token, key);
	const user = await User.findById(decoded.id).select("-pass");
	if (!user) {
		throw {
			status: 401,
			message: "User doesnt exists"
		}
	}
	return {
		role: decode.role,
		user,
		isProfileCompleted: user.isProfileCompleted
	}
}