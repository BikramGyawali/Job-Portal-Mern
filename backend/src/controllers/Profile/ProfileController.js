
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



// Jobseeker Profile
export const JProfileController = async (req, res) => {
	try {
		const userId = req.user.id;

		const exists = await JobseekerProfile.findOne({ userId });
		if (exists) {
			return res.status(409).json({ message: "Profile already exists" });
		}

		// create profile without image first
		const experience = req.body.experience ? JSON.parse(req.body.experience) : []; //parse conver the data to their orginal form as object
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
			userId: req.user.id
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

		const user = await User.findByIdAndUpdate(userId, {
			isProfileCompleted: true
		},
			{ new: true }
		);
		// clear authentication cookie so user returns to login and re-authenticates
		try {
			res.clearCookie("token", { httpOnly: true, sameSite: 'lax', secure: false });
		} catch (e) {
			// ignore
		}
		res.status(201).json({
			status: 1,
			message: "Profile created",
			isProfileCompleted: true,
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

		const user = await User.findByIdAndUpdate(userId, {
			isProfileCompleted: true
		},
			{ new: true }
		);		// clear authentication cookie so user returns to login and re-authenticates
		try {
			res.clearCookie("token", { httpOnly: true, sameSite: 'lax', secure: false });
		} catch (e) {
			// ignore
		}
		res.status(201).json({
			status: 1,
			message: "Profile created",
			isProfileCompleted: true,
			profile
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

