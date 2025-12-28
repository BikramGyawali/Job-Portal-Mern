
import express from "express"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js"
import { EmployerProfile } from "../../models/employer/EmployerProfile.js"
import { User } from "../../models/LoginModel/SignupLogic.js"
const app = express()
app.use(express.json())
dotenv.config();
// Helper to write image buffer to disk and return filename
const saveImageBuffer = async (file) => {
	if (!file || !file.buffer) return null;
	const safeName = file.originalname.replace(/\s+/g, "-")  //replace space with -
	const fileName = `${Date.now()}-${safeName}`
	const uploadDir = path.join(process.cwd(), "public/uploads/images") //cwd->current workin directory
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true })
	}
	const filePath = path.join(uploadDir, fileName)
	await fs.promises.writeFile(filePath, file.buffer)
	return fileName
}

const validateEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Jobseeker Profile - create
export const JProfileController = async (req, res) => {
	try {
		const userId = req.user.id;
		const { email, phone } = req.body;

		if (!email || !validateEmail(email)) return res.status(400).json({ status: 0, message: "Valid email is required" });
		// check email uniqueness across users (allow same user)
		const emailExists = await JobseekerProfile.findOne({ email });
		if (emailExists) return res.status(409).json({ status: 0, message: "Email already exists" });

		// check phone uniqueness in profiles
		if (phone) {
			const phoneExists = await JobseekerProfile.findOne({ phone });
			if (phoneExists) return res.status(409).json({ status: 0, message: "Phone number already exists" });
		}

		// create profile without image first
		const experience = req.body.experience ? JSON.parse(req.body.experience) : [];
		const education = req.body.education ? JSON.parse(req.body.education) : [];
		const trainings = req.body.trainings ? JSON.parse(req.body.trainings) : [];
		const skills = req.body.skills ? JSON.parse(req.body.skills) : [];
		const languages = req.body.languages ? JSON.parse(req.body.languages) : [];
		const socials = req.body.socials ? JSON.parse(req.body.socials) : [];
		const awards = req.body.awards ? JSON.parse(req.body.awards) : [];
		const references = req.body.references ? JSON.parse(req.body.references) : [];

		const profile = await JobseekerProfile.create({
			...req.body,
			experience,
			education,
			trainings,
			skills,
			languages,
			socials,
			awards,
			references,
			userId
		});

		// save image to disk only after profile is created
		if (req.file) {
			try {
				const savedFileName = await saveImageBuffer(req.file)
				if (savedFileName) {
					profile.image = savedFileName
					await profile.save()
				}
			} catch (e) {
				// log and continue
				console.error("Failed to save image", e)
			}
		}

		// update user email if changed (keep user signed in and return updated user)
		// if (email && (await User.findById(userId)).email !== email) {
		// 	await User.findByIdAndUpdate(userId, { email });
		// }

		const user = await User.findByIdAndUpdate(userId, {
			isProfileCompleted: true
		},
			{ new: true }
		);
		try {
			res.clearCookies("token", {
				httpOnly: true,
				sameSite: "lax",
				secure: false
			})
		} catch (error) {

		}
		res.status(201).json({
			status: 1,
			message: "Profile created",
			isProfileCompleted: true,
			profile,
			user: { _id: user._id, email: user.email, role: user.role }
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
}

// Employer Profile - create
export const EProfileController = async (req, res) => {
	try {
		const userId = req.user.id;
		const { email, phone } = req.body;

		if (!email || !validateEmail(email)) return res.status(400).json({ status: 0, message: "Valid email is required" });
		// check email uniqueness across users (allow same user)
		const emailExists = await EmployerProfile.findOne({ email });
		if (emailExists) return res.status(409).json({ status: 0, message: "Email already exists" });

		// check phone uniqueness optionally
		if (phone) {
			const phoneExists = await EmployerProfile.findOne({ phone });
			if (phoneExists) return res.status(409).json({ status: 0, message: "Phone number already exists" });
		}

		const profile = await EmployerProfile.create({
			...req.body,
			userId,
			image: null
		});

		if (req.file) {
			try {
				const savedFileName = await saveImageBuffer(req.file)
				if (savedFileName) {
					profile.image = savedFileName
					await profile.save()
				}
			} catch (e) {
				console.error("Failed to save image", e)
			}
		}

		// update user email if changed
		// if (email && (await User.findById(userId)).email !== email) {
		// 	await User.findByIdAndUpdate(userId, { email });
		// }

		const user = await User.findByIdAndUpdate(userId, {
			isProfileCompleted: true
		},
			{ new: true }
		);
		try {
			res.clearCookies("token", {
				httpOnly: true,
				sameSite: "lax",
				secure: false
			})
		} catch (error) {

		}
		res.status(201).json({
			status: 1,
			message: "Profile created",
			isProfileCompleted: true,
			profile,
			user: { _id: user._id, email: user.email, role: user.role }
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
};

// GET Jobseeker Profile
export const getJProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const profile = await JobseekerProfile.findOne({ userId }).lean();
		if (!profile) return res.status(404).json({ status: 0, message: "Profile not found" });
		res.status(200).json({ status: 1, profile });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
}

// GET Employer Profile
export const getEProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const profile = await EmployerProfile.findOne({ userId }).lean();
		if (!profile) return res.status(404).json({ status: 0, message: "Profile not found" });
		res.status(200).json({ status: 1, profile });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
}

// Upload CV (jobseeker)
export const uploadJCV = async (req, res) => {
	try {
		const userId = req.user.id;
		if (!req.file) return res.status(400).json({ status: 0, message: "No CV uploaded" });
		const profile = await JobseekerProfile.findOne({ userId });
		if (!profile) return res.status(404).json({ status: 0, message: "Profile not found" });
		profile.cv = req.file.filename;
		await profile.save();
		res.status(200).json({ status: 1, message: "CV uploaded", cv: profile.cv });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
}

// Download CV (jobseeker)
export const downloadJCV = async (req, res) => {
	try {
		const userId = req.user.id;
		const profile = await JobseekerProfile.findOne({ userId });
		if (!profile || !profile.cv) return res.status(404).json({ status: 0, message: "CV not found" });
		const cvPath = path.join(process.cwd(), "public/uploads/cvs", profile.cv);
		if (!fs.existsSync(cvPath)) return res.status(404).json({ status: 0, message: "CV file missing" });
		res.download(cvPath, `${profile.fname || 'resume'}.pdf`);
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
}
