import { Router } from "express";
import { getCurrentUser } from "../../controllers/auth/AuthController";

const authrouter = Router();
authrouter.get("/me", getCurrentUser)
export default authrouter