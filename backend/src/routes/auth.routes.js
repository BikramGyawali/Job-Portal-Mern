import { Router } from "express";
import { verifyAuth } from "../middlewares/UserVerify/verifyMiddleware.js";
import { getCurrentUser } from "../controllers/auth/AuthController.js";

const isProduction = process.env.NODE_ENV === "production"
const authrouter = Router();
authrouter.get("/me", verifyAuth, getCurrentUser)
// logout: clear token cookie
authrouter.post("/logout", (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			sameSite: isProduction ? "none" : "lax",
			secure: isProduction,
			path: "/"
		})
		res.status(200).json({ status: 1, message: "Logged out successfully" })
	} catch (e) {
		return res.status(500).json({ status: 0, message: e.message });
	}
});
export default authrouter