import { Router } from "express";
import { getCurrentUser } from "../../controllers/auth/AuthController.js";

const authrouter = Router();
authrouter.get("/me", getCurrentUser)
export default authrouter