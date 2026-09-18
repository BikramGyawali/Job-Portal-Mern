import express from "express";
import {
	initiatePayment,
	verifyPayment,
	failedPayment,
	checkPremiumStatus,
	getAllPayments,

} from "../controllers/job/paymentController.js";

import {
	verifyAuth,
	verifyRole,
} from "../middlewares/UserVerify/verifyMiddleware.js";

const paymentroutes = express.Router();

// Employer routes — verifyAuth checks if logged in
paymentroutes.post("/initiate", verifyAuth, initiatePayment);
paymentroutes.get("/verify", verifyPayment);
paymentroutes.get("/failed", failedPayment);
paymentroutes.get("/status", verifyAuth, checkPremiumStatus);

// Admin routes — verifyRole("admin") checks role
paymentroutes.get("/all", verifyRole("admin"), getAllPayments);


export default paymentroutes;