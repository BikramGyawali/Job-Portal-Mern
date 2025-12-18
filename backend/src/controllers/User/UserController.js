import { compare, hash } from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken"
const app = express();
app.use(cookieParser());
import { SignupModel } from "../../models/LoginModel/SignupLogic.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
configDotenv();
const jwt_key = process.env.JWT_KEY
export const Signup = async (req, res, role) => {
	try {
		const { email, pass } = req.body;
		const exists = await SignupModel.findOne({ email: email });
		if (exists) {
			return res.status(409).send({
				status: 0,
				message: "Email Already Exists"
			})
		}
		const hashPassword = await hash(pass, 10)

		await SignupModel.create({ email, password: hashPassword, role });
		res.status(200).send({
			status: 1,
			message: `Data insert Sucessfully of ${role} `,

		})

	} catch (error) {
		res.status(400).send({
			status: 0,
			message: "Validation failed",
			errorMessage: error.message,
		});
	}
}

// login controller 
export const LoginController = async (req, res, type) => {
	try {
		const { email, pass } = req.body;

		const user = await SignupModel.findOne({ email, role: type });
		if (!user) {
			return res.status(404).json({
				status: 0,
				message: "User not found",
			});
		}

		const isMatch = await compare(pass, user.password);
		if (!isMatch) {
			return res.status(401).json({
				status: 0,
				message: "Invalid password",
			});
		}

		const token = jwt.sign(
			{ email: user.email, role: user.role },
			jwt_key,
			{ expiresIn: "1d" }
		);

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "strict",
		});

		res.status(200).json({
			status: 1,
			message: "Login successful",
			role: user.role,
		});

	} catch (error) {
		res.status(400).json({
			status: 0,
			message: error.message,
		});
	}
};
