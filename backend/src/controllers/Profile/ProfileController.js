
import express from "express"
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js"
import { EmployerProfile } from "../../models/employer/EmployerProfile.js"
import { SignupModel } from "../../models/LoginModel/SignupLogic.js"
import fs from "fs"
import path from "path"
import { profile } from "console"
const app = express()
app.use(express.json())

// Jobseeker Profile
export const JProfileController = async (req, res) => {
	try {
		const data = req.body
		const { phone, userId } = data

		if (!userId) {
			return res.status(400).json({ status: 0, message: "User ID is required" })
		}

		const user = await SignupModel.findById(userId)
		if (!user) {
			return res.status(404).json({ status: 0, message: "User does not exist" })
		}

		const profileExists = await JobseekerProfile.findOne({ userId })
		if (profileExists) {
			return res.status(409).json({ status: 0, message: "User profile already exists" })
		}

		const phoneExists = await JobseekerProfile.findOne({ phone })
		if (phoneExists) {
			return res.status(409).json({ status: 0, message: "Phone number already exists" })
		}

		const newProfile = await JobseekerProfile.create({
			...data,
			image: null
		})
		let imagePath = null;
		if (req.file) {
			const uploadDir = path.join(process.cwd(), "public/uploads/images")
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true })

			}
			const fileName = `${Date.now()}.png`;
			imagePath = path.join(uploadDir, fileName)
			fs.writeFileSync(imagePath, req.file.buffer);

			newProfile.image = imagePath
			await newProfile.save();
		}
		await SignupModel.findByIdAndUpdate(userId, { isProfileCompleted: true })
		return res.status(201).json({
			status: 1,
			message: "Jobseeker profile created successfully",
			user: { _id: newProfile._id, name: newProfile.fname }
		})
	} catch (error) {
		if (uploadedFilePath) {
			fs.unlink(uploadedFilePath, (error) => {
				if (error) console.log("Image clean up fail");

			})
		}

		return res.status(500).json({ status: 0, message: "Cannot create profile", error: error.message })
	}
}

// Employer Profile
export const EProfileController = async (req, res) => {
	try {
		const data = req.body
		const { phone, userId, panCard } = data
		console.log("Body", data);
		console.log("file", req.file);


		if (!userId) {
			return res.status(400).json({ status: 0, message: "User ID is required" })
		}

		const user = await SignupModel.findById(userId)
		if (!user) {
			return res.status(404).json({ status: 0, message: "User does not exist" })
		}

		const profileExists = await EmployerProfile.findOne({ userId })
		if (profileExists) {
			return res.status(409).json({ status: 0, message: "User profile already exists" })
		}

		const phoneExists = await EmployerProfile.findOne({ phone })
		if (phoneExists) {
			return res.status(409).json({ status: 0, message: "Phone number already exists" })
		}

		const panExists = await EmployerProfile.findOne({ panCard })
		if (panExists) {
			return res.status(409).json({ status: 0, message: "PAN card already exists" })
		}
		//for image 
		const newProfile = await EmployerProfile.create(
			{
				...data,
				image: null
			}
		)
		let imagePath = null;
		if (req.file) {
			const uploadDir = path.join(process.cwd(), "public/uploads/images")
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true })

			}
			const fileName = `${Date.now()}.png`;
			imagePath = path.join(uploadDir, fileName)
			fs.writeFileSync(imagePath, req.file.buffer);

			newProfile.image = imagePath;
			await newProfile.save();
		}
		await SignupModel.findByIdAndUpdate(userId, { isProfileCompleted: true })
		return res.status(201).json({
			status: 1,
			message: "Employer profile created successfully",
			user: { _id: newProfile._id, name: newProfile.fname }
		})
	} catch (error) {

		return res.status(500).json({ status: 0, message: "Cannot create profile", error: error.message })
	}
}
