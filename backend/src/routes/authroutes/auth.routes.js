import { Router } from "express";
import { getCurrentUser } from "../../controllers/auth/AuthController.js";
import { verifyAuth } from "../../middlewares/UserVerify/verifyMiddleware.js";

const authrouter = Router();
authrouter.get("/me", verifyAuth, getCurrentUser)
export default authrouter