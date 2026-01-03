import { currentUserService } from "../../services/auth/AuthService.js"


export const getCurrentUser = async (req, res) => {
	try {
		const result = await currentUserService(req);
		console.log(result);
		
		return res.status(200).json(result);
	} catch (error) {
		return res.status(error.status || 401).json({
			status: 0,
			message: error.message || "Unauthorized"
		})
	}


}