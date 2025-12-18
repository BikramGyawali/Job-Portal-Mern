import express from "express";
import { Router } from "express";
import jobseekerSignup from "../../controllers/Jobseeker/jobseekerController";
// app.use(express.json());

Router.post("/signup",jobseekerSignup)