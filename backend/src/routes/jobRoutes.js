import { Router } from "express";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { applyJob, approve, approvedJob, getApplicant, pendingJob, PostJobController, rejectJob } from "../controllers/job/jobController.js";

const jobroutes = Router();

jobroutes.post("/create", verifyAuth, verifyRole("employer"), PostJobController);
jobroutes.get("/approved", approvedJob);
jobroutes.get("/pending", verifyAuth, verifyRole("admin"), pendingJob)
jobroutes.patch("/approve/:id", verifyAuth, verifyRole("admin"), approve)
jobroutes.patch("/reject/:id", verifyAuth, verifyRole("admin"), rejectJob)
jobroutes.post("/apply/:id", verifyAuth, verifyRole("jobseeker"), applyJob)
jobroutes.get("/applicants/:id", verifyAuth, verifyRole("employer"), getApplicant)


export default jobroutes;