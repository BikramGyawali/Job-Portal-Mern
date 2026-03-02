import { Router } from "express";
import { LoginController, Signup } from "../controllers/User/UserController.js";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { EProfileController, getEProfile } from "../controllers/Profile/ProfileController.js";
import { uploadImage } from "../middlewares/multerMiddleware.js";
import { EMyJobs } from "../controllers/job/jobController.js";



const employerroutes = Router();

employerroutes.post("/signup", (req, res) => Signup(req, res, "employer"));
employerroutes.post("/login", (req, res) => LoginController(req, res, "employer"));
employerroutes.post("/profile", verifyAuth, uploadImage.single("image"), EProfileController)
employerroutes.get("/profile", verifyAuth, getEProfile)
employerroutes.get("/myjobs/:id", verifyAuth, EMyJobs)


employerroutes.get(
	"/dashboard",
	verifyAuth,
	verifyRole("employer"),
	(req, res) => {
		res.send("Employer Dashboard");
	}
);

export default employerroutes;
