
import express from "express"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js"
import { EmployerProfile } from "../../models/employer/EmployerProfile.js"
import { User } from "../../models/LoginModel/SignupLogic.js"

const app = express()
app.use(express.json())
dotenv.config();
const JWT_KEY = process.env.JWT_KEY;
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
		// ensure authenticated user id is present
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ status: 0, message: "Unauthorized: missing user id" });

		const { email, phone } = req.body;

		// ensure there isn't already a profile for this user
		const existingProfile = await JobseekerProfile.findOne({ userId: userId });

		if (existingProfile) {
			return res.status(409).json({
				status: 0,
				message: "Jobseeker profile already exists"
			});
		}

		if (!email || !validateEmail(email)) return res.status(400).json({ status: 0, message: "Valid email is required" });

		// normalize email for case-insensitive comparison
		const normalizedEmail = email.trim().toLowerCase();
		// try to find a matching profile by email (any userId)
		let existingByEmail = await JobseekerProfile.findOne({ email: { $regex: `^${normalizedEmail}$`, $options: 'i' } });
		if (existingByEmail) {
			// if already linked to another user, reject
			if (existingByEmail.userId && existingByEmail.userId.toString() !== userId) {
				return res.status(409).json({ status: 0, message: "Email already exists" });
			}
		}

		// check phone uniqueness in profiles (exclude current user)
		if (phone) {
			const sanitizedPhone = phone.replace(/\D/g, "");
			let existingByPhone = await JobseekerProfile.findOne({ phone: sanitizedPhone });
			if (existingByPhone) {
				if (existingByPhone.userId && existingByPhone.userId.toString() !== userId) {
					return res.status(409).json({ status: 0, message: "Phone number already exists" });
				}
			}
			// ensure the body phone is sanitized before saving
			req.body.phone = sanitizedPhone;
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

		let profile;
		if (existingByEmail && !existingByEmail.userId) {
			// link unassociated profile to this user and update fields
			existingByEmail.set({
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
			profile = await existingByEmail.save();
		} else {
			profile = await JobseekerProfile.create({
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
		}

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
		try {
			const token = jwt.sign({
				email: user.email,
				role: user.role,
				isProfileCompleted: user.isProfileCompleted,
				id: user._id
			}, JWT_KEY, { expiresIn: "1d" });
			res.cookie("token", token, {
				httpOnly: true,
				sameSite: "lax",
				secure: false
			});
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
		// handle duplicate key errors from indexes
		if (err && err.code === 11000) {
			const dupKey = Object.keys(err.keyValue || {})[0];
			let message = "Duplicate value exists";
			if (dupKey === 'email') message = 'Email already exists';
			if (dupKey === 'phone') message = 'Phone number already exists';
			if (dupKey === 'userId') message = 'Profile for this user already exists';
			return res.status(409).json({ status: 0, message });
		}
		// handle mongoose validation errors
		if (err && err.name === 'ValidationError') {
			return res.status(400).json({ status: 0, message: err.message });
		}
		res.status(500).json({ status: 0, message: err.message });
	}
}

// Employer Profile - create
export const EProfileController = async (req, res) => {
	try {
		// ensure authenticated user id is present
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ status: 0, message: "Unauthorized: missing user id" });
		let { email, phone } = req.body;
		const existingProfile = await EmployerProfile.findOne({ userId: userId });

		if (existingProfile) {
			return res.status(409).json({
				status: 0,
				message: "Employer profile already exists"
			});
		}

		if (!email || !validateEmail(email)) return res.status(400).json({ status: 0, message: "Valid email is required" });

		// normalize email for case-insensitive comparison
		const normalizedEmail = email.trim().toLowerCase();
		let existingByEmail = await EmployerProfile.findOne({ email: { $regex: `^${normalizedEmail}$`, $options: 'i' } });
		if (existingByEmail) {
			if (existingByEmail.userId && existingByEmail.userId.toString() !== userId) {
				return res.status(409).json({ status: 0, message: "Email already exists" });
			}
		}

		// check phone uniqueness optionally (exclude current user)
		if (phone) {
			const sanitizedPhone = phone.replace(/\D/g, "");
			let existingByPhone = await EmployerProfile.findOne({ phone: sanitizedPhone });
			if (existingByPhone) {
				if (existingByPhone.userId && existingByPhone.userId.toString() !== userId) {
					return res.status(409).json({ status: 0, message: "Phone number already exists" });
				}
			}
			req.body.phone = sanitizedPhone;
		}

		const companyName = req.body.companyName || req.body.cname || null;

		let profile;
		if (existingByEmail && !existingByEmail.userId) {
			existingByEmail.set({
				...req.body,
				userId,
				image: null,
				companyName
			});
			profile = await existingByEmail.save();
		} else {
			profile = await EmployerProfile.create({
				...req.body,
				userId,
				image: null,
				companyName
			});
		}

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
		);
		try {
			const token = jwt.sign({
				email: user.email,
				role: user.role,
				isProfileCompleted: user.isProfileCompleted,
				id: user._id
			}, JWT_KEY, { expiresIn: "1d" });
			res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });
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
		if (err && err.code === 11000) {
			const dupKey = Object.keys(err.keyValue || {})[0];
			let message = "Duplicate value exists";
			if (dupKey === 'email') message = 'Email already exists';
			if (dupKey === 'phone') message = 'Phone number already exists';
			if (dupKey === 'userId') message = 'Profile for this user already exists';
			if (dupKey === "pancard") message = 'Pancard already exists'
			return res.status(409).json({ status: 0, message });
		}
		if (err && err.name === 'ValidationError') {
			return res.status(400).json({ status: 0, message: err.message });
		}
		res.status(500).json({ status: 0, message: err.message });
	}
};

// GET Jobseeker Profile
export const getJProfile = async (req, res) => {
	try {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ status: 0, message: "Unauthorized: missing user id" });
		const profile = await JobseekerProfile.findOne({ userId }).lean(); //lean() returns a JavaScript object instead of a Mongoose document.
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
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({ status: 0, message: "Unauthorized: missing user id" });
		const profile = await EmployerProfile.findOne({ userId }).lean();
		if (!profile) return res.status(404).json({ status: 0, message: "Profile not found" });
		res.status(200).json({ status: 1, profile });
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 0, message: err.message });
	}
}




// jobseeker edit profile



export const editProfile = async (req, res) => {
	try {
		const userId = req.user?.id;
		if (!userId) return res.status(401).json({
			status: 0,
			message: "Unauthorized: Token is missing"
		});

		// ✅ Check profile exists
		const profileExists = await JobseekerProfile.findOne({ userId });
		if (!profileExists) {
			return res.status(404).json({ status: 0, message: "No Profile found" });
		}

		const { email, phone } = req.body;

		if (email) {
			if (!validateEmail(email)) {
				return res.status(400).json({ status: 0, message: "Valid email is required" });
			}
			const normalizeEmail = email.trim().toLowerCase();
			const emailExists = await JobseekerProfile.findOne({
				email: { $regex: `^${normalizeEmail}$`, $options: "i" },
				userId: { $ne: userId }
			});
			if (emailExists) {
				return res.status(409).json({ status: 0, message: "Email already exists" });
			}
		}

		if (phone) {
			const sanitizedPhone = phone.replace(/\D/g, "");
			const phoneExists = await JobseekerProfile.findOne({
				phone: sanitizedPhone,
				userId: { $ne: userId }
			});
			if (phoneExists) {
				return res.status(409).json({ status: 0, message: "Phone number already exists" });
			}
			req.body.phone = sanitizedPhone;
		}

		// ✅ Destructure JSON string fields out of req.body
		const {
			experience,
			education,
			trainings,
			skills,
			languages,
			socials,
			awards,
			references,
			...restBody
		} = req.body;

		// ✅ Safely parse JSON fields
		const parseIfExists = (field) => {
			try {
				return field ? JSON.parse(field) : undefined;
			} catch {
				return undefined;
			}
		};

		const parsedFields = {};
		const parsed = {
			experience: parseIfExists(experience),
			education: parseIfExists(education),
			trainings: parseIfExists(trainings),
			skills: parseIfExists(skills),
			languages: parseIfExists(languages),
			socials: parseIfExists(socials),
			awards: parseIfExists(awards),
			references: parseIfExists(references),
		};

		// Only include defined parsed fields
		const cleanRestBody = {};
		Object.keys(restBody).forEach((key) => {
			if (restBody[key] !== undefined && restBody[key] !== null) {
				cleanRestBody[key] = restBody[key];  // ✅ keeps "" so it overwrites old value
			}
		});
		// ✅ Handle image — save new image first if uploaded
		let imageFileName = profileExists.image; // keep old image by default
		if (req.file) {
			try {
				if (profileExists.image) {
					const oldImagePath = path.join(process.cwd(), "public/uploads/images", profileExists.image);
					if (fs.existsSync(oldImagePath)) {
						fs.unlinkSync(oldImagePath);
					}
				}
				const savedFileName = await saveImageBuffer(req.file);
				if (savedFileName) imageFileName = savedFileName;
			} catch (e) {
				console.error("Failed to upload image", e);
			}
		}

		// findOneAndUpdate — updates ALL fields including previously empty ones
		const updatedProfile = await JobseekerProfile.findOneAndUpdate(
			{ userId },
			{
				$set: {
					...cleanRestBody,    //  includes empty strings
					...parsedFields,
					image: imageFileName
				}
			},
			{ new: true, runValidators: true }
		);

		return res.status(200).json({
			status: 1,
			message: "Profile updated successfully",
			profile: updatedProfile
		});

	} catch (err) {
		console.error(err);

		if (err.code === 11000) {
			const dupKey = Object.keys(err.keyValue || {})[0];
			let message = "Duplicate value exists";
			if (dupKey === "email") message = "Email already exists";
			if (dupKey === "phone") message = "Phone number already exists";
			return res.status(409).json({ status: 0, message });
		}

		if (err.name === "ValidationError") {
			return res.status(400).json({ status: 0, message: err.message });
		}

		return res.status(500).json({ status: 0, message: err.message });
	}
};