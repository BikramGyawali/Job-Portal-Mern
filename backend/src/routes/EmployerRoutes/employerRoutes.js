import { Router } from "express";
import { LoginController, Signup } from "../../controllers/User/UserController.js";
import { verifyRole } from "../../middlewares/UserVerify/verifyMiddleware.js";

const employerroutes = Router();

employerroutes.post("/signup", (req, res) => Signup(req, res, "employer"));
employerroutes.post("/login", (req, res) => LoginController(req, res, "employer"));

employerroutes.get(
	"/dashboard",
	verifyRole("employer"),
	(req, res) => {
		res.send("Employer Dashboard");
	}
);

export default employerroutes;
