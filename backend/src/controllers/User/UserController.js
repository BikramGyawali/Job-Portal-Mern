import express from "express";
import cookieParser from "cookie-parser";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { SignupModel } from "../../models/LoginModel/SignupLogic.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
app.use(express.json());
app.use(cookieParser());

const JWT_KEY = process.env.JWT_KEY;

export const Signup = async (req, res, role) => {
	try {
		const { email, pass } = req.body;
		console.log(req.body);


		const exists = await SignupModel.findOne({ email });
		if (exists) {
			return res.status(200).json({ status: 0, message: "Email already exists" });
		}


		const hashedPassword = await hash(pass, 10);
		const newUser = await SignupModel.create({ email, password: hashedPassword, role });

		res.status(200).json({
			status: 1,
			message: `Signup successful for ${role}`,
			user: { _id: newUser._id, email: newUser.email, role: newUser.role }
		});
	} catch (error) {
		res.status(400).json({ status: 0, message: "Signup failed", errorMessage: error.message });
	}

};

export const LoginController = async (req, res, type) => {
	try {
		const { email, pass } = req.body;

		const user = await SignupModel.findOne({ email, role: type });
		if (!user) {
			return res.status(404).json({ status: 0, message: "User not found" });
		}

		const isMatch = await compare(pass, user.password);
		if (!isMatch) {
			return res.status(401).json({ status: 0, message: "Invalid password" });
		}

		const token = jwt.sign({ email: user.email, role: user.role }, JWT_KEY, { expiresIn: "1d" });

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "strict",
		});

		res.status(200).json({
			status: 1,
			message: "Login successful",
			role: user.role,
			user: { _id: user._id, email: user.email }
		});
	} catch (error) {
		res.status(400).json({ status: 0, message: "Login failed", errorMessage: error.message });
	}
};
