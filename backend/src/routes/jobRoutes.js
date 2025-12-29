import { Router } from "express";
import { verifyAuth, verifyRole } from "../middlewares/UserVerify/verifyMiddleware.js";
import { approvedJob, PostJobController } from "../controllers/job/jobController.js";

const jobroutes = Router();

jobroutes.post("/create", verifyAuth, verifyRole("employer"), PostJobController);
jobroutes.get("/approved", approvedJob);


export default jobroutes;