import express from "express";
import { Router } from "express";
import { LoginController, Signup } from "../../controllers/User/UserController.js";

const jobseekerroutes = Router();
jobseekerroutes.post("/signup", (req, res) => Signup(req, res, "jobseeker"));
jobseekerroutes.post("/login", (req, res,) => LoginController(req, res, "jobseeker"))

export default jobseekerroutes;