import { Router } from "express";
import { getCurrentUser } from "../../controllers/auth/AuthController.js";
import { verifyAuth } from "../../middlewares/UserVerify/verifyMiddleware.js";

const authrouter = Router();
authrouter.get("/me", verifyAuth, getCurrentUser)
// logout: clear token cookie
authrouter.post("/logout", (req, res) => {
	try {
		res.clearCookie("token", { httpOnly: true, sameSite: 'lax', secure: false });
		return res.status(200).json({ status: 1, message: "Logged out" });
	} catch (e) {
		return res.status(500).json({ status: 0, message: e.message });
	}
});
export default authrouter