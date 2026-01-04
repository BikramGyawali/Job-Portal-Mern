import { Router } from "express";
import { LoginController } from "../controllers/User/UserController.js";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { getPendingProfile } from "../controllers/Profile/ProfileApproval.js";
const adminRoutes = Router();
adminRoutes.post("/login", (req, res) => LoginController(req, res, "admin"));
adminRoutes.get("/pending-profile", verifyAuth, verifyRole("admin"), getPendingProfile)
export default adminRoutes;