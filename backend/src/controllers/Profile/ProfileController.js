
import express from "express"
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js"
import { EmployerProfile } from "../../models/employer/EmployerProfile.js"
import { SignupModel } from "../../models/LoginModel/SignupLogic.js"
const app = express()
app.use(express.json())

// Jobseeker Profile
export const JProfileController = async (req, res) => {
	try {
		const userId = req.user.id;

		const exists = await JobseekerProfile.findOne({ userId });
		if (exists) {
			return res.status(409).json({ message: "Profile already exists" });
		}

		const profile = await JobseekerProfile.create({
			...req.body,
			userId,
			image: req.file?.filename || null
		});

		await SignupModel.findByIdAndUpdate(userId, {
			isProfileCompleted: true
		});

		res.status(201).json({
			status: 1,
			message: "Profile created",
			profile
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

// Employer Profile
export const EProfileController = async (req, res) => {
	try {
		const userId = req.user.id;

		const exists = await EmployerProfile.findOne({ userId });
		if (exists) {
			return res.status(409).json({ message: "Profile already exists" });
		}

		const profile = await EmployerProfile.create({
			...req.body,
			userId,
			image: req.file?.filename || null
		});

		await SignupModel.findByIdAndUpdate(userId, {
			isProfileCompleted: true
		});

		res.status(201).json({
			status: 1,
			message: "Profile created",
			profile
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

