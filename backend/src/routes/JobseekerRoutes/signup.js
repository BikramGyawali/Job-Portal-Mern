import express from "express";
import { Router } from "express";
import jobseekerSignup from "../../controllers/Jobseeker/jobseekerController.js";
// import jobseekerSignup from "../../controllers/Jobseeker/jobseekerController";
// app.use(express.json());
const jobseekerroutes = Router();
jobseekerroutes.post("/signup", jobseekerSignup)

export default jobseekerroutes;