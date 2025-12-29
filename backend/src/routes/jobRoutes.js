import { Router } from "express";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { approve, approvedJob, pendingJob, PostJobController, rejectJob } from "../controllers/job/jobController.js";

const jobroutes = Router();

jobroutes.post("/create", verifyAuth, verifyRole("employer"), PostJobController);
jobroutes.get("/approved", approvedJob);
jobroutes.get("/pending", verifyAuth, verifyRole("admin"), pendingJob)
jobroutes.patch("/approve/:id", verifyAuth, verifyRole("admin"), approve)
jobroutes.delete("/reject/:id", verifyAuth, verifyRole("admin"), rejectJob)


export default jobroutes;