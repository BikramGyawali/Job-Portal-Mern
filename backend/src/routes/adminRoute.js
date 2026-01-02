import { Router } from "express";
import { LoginController } from "../controllers/User/UserController.js";
const adminRoutes = Router();
adminRoutes.post("/login", (req, res) => LoginController(req, res, "admin"));
export default adminRoutes;