import express from "express";
import { Router } from "express";
import { LoginController, Signup } from "../../controllers/User/UserController.js";
import { verifyRole } from "../../middlewares/UserVerify/verifyMiddleware.js";
import { JProfileController } from "../../controllers/Profile/ProfileController.js";

const jobseekerroutes = Router();
jobseekerroutes.post("/signup", (req, res) => Signup(req, res, "jobseeker"));
jobseekerroutes.post("/login", (req, res,) => LoginController(req, res, "jobseeker"))
jobseekerroutes.post("/profile", JProfileController)
jobseekerroutes.get(
	"/dashboard",
	verifyRole("jobseeker"),
	(req, res) => {
		res.send("Jobseeker Dashboard");
	}
);

export default jobseekerroutes;