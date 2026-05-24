import express from "express";
import { Router } from "express";
import { LoginController, Signup } from "../controllers/User/UserController.js";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { JProfileController, editProfile, getJProfile } from "../controllers/Profile/ProfileController.js";
import { uploadImage } from "../middlewares/multerMiddleware.js";
import { appliedJob, JJobList } from "../controllers/job/jobController.js";
import { upload } from "../config/cloudinary.js";

const jobseekerroutes = Router();
jobseekerroutes.post("/signup", (req, res) => Signup(req, res, "jobseeker"));
jobseekerroutes.post("/login", (req, res,) => LoginController(req, res, "jobseeker"))
jobseekerroutes.post("/profile", verifyAuth, upload.single('image'), JProfileController)
// the verufy auth hold the payload of user in req.user and form this we are getting the id also 
jobseekerroutes.get("/profile", verifyAuth, getJProfile)
jobseekerroutes.get("/jjoblist", verifyAuth, verifyRole("jobseeker"), JJobList);
jobseekerroutes.get("/appliedjobs", verifyAuth, verifyRole("jobseeker"), appliedJob)
jobseekerroutes.patch("/editprofile", verifyAuth, upload.single('image'), editProfile)
jobseekerroutes.get(
	"/dashboard",
	verifyRole("jobseeker"),
	(req, res) => {
		res.send("Jobseeker Dashboard");
	}
);

export default jobseekerroutes;