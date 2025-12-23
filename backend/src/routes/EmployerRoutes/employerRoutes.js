import { Router } from "express";
import { LoginController, Signup } from "../../controllers/User/UserController.js";
import { verifyAuth, verifyRole } from "../../middlewares/UserVerify/verifyMiddleware.js";
import { EProfileController } from "../../controllers/Profile/ProfileController.js";
import { uploadImage } from "../../middlewares/multerMiddleware.js";

const employerroutes = Router();

employerroutes.post("/signup", (req, res) => Signup(req, res, "employer"));
employerroutes.post("/login", (req, res) => LoginController(req, res, "employer"));
employerroutes.post("/profile", verifyAuth, uploadImage.single("image"), EProfileController)
employerroutes.get(
	"/dashboard",
	verifyRole("employer"),
	(req, res) => {
		res.send("Employer Dashboard");
	}
);

export default employerroutes;
