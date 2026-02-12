import express from "express";
import { Router } from "express";
import { LoginController, Signup } from "../controllers/User/UserController.js";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { JProfileController, getJProfile } from "../controllers/Profile/ProfileController.js";
import { uploadImage, uploadCv } from "../middlewares/multerMiddleware.js";

const jobseekerroutes = Router();
jobseekerroutes.post("/signup", (req, res) => Signup(req, res, "jobseeker"));
jobseekerroutes.post("/login", (req, res,) => LoginController(req, res, "jobseeker"))
jobseekerroutes.post("/profile", verifyAuth, uploadImage.single('image'), JProfileController)
// the verufy auth hold the payload of user in req.user and form this we are getting the id also 
jobseekerroutes.get("/profile", verifyAuth, getJProfile)
// cv: upload and download
// jobseekerroutes.post("/profile/cv", verifyAuth, uploadCv.single('cv'), uploadJCV)
// jobseekerroutes.get("/profile/cv", verifyAuth, downloadJCV)
jobseekerroutes.get(
	"/dashboard",
	verifyRole("jobseeker"),
	(req, res) => {
		res.send("Jobseeker Dashboard");
	}
);

export default jobseekerroutes;