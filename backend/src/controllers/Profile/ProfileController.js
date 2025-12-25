
import express from "express"
import fs from "fs"
import path from "path"
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js"
import { EmployerProfile } from "../../models/employer/EmployerProfile.js"
import { User } from "../../models/LoginModel/SignupLogic.js"
const app = express()
app.use(express.json())

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
		const profile = await JobseekerProfile.create({
			...req.body,
			userId,
			image: null
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

		await User.findByIdAndUpdate(userId, {
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

		await User.findByIdAndUpdate(userId, {
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

