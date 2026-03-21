import express from "express";
import cookieParser from "cookie-parser";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/LoginModel/SignupLogic.js";
import { configDotenv } from "dotenv";

configDotenv();



const JWT_KEY = process.env.JWT_KEY;

export const Signup = async (req, res, role) => {
	try {
		const { email, pass } = req.body;



		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(200).json({ status: 0, message: "Email already exists" });
		}

		const hashedPassword = await hash(pass, 10);
		const newUser = await User.create({ email, password: hashedPassword, role, isProfileCompleted: false });
		const token = jwt.sign(
			{
				email: newUser.email,
				role: newUser.role,
				isProfileCompleted: newUser.isProfileCompleted,
				id: newUser._id
			},
			JWT_KEY,
			{ expiresIn: "1d" }
		);


		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "lax",
			secure: false,
			maxAge: 24 * 60 * 60 * 1000
		});
		return res.status(200).json({
			status: 1,
			message: `Signup successful for ${role}`,
			user: { _id: newUser._id, email: newUser.email, role: newUser.role }
		});

	} catch (error) {
		console.error("Signup error:", error);
		if (error.code === 11000) {
			return res.status(409).json({
				status: 0,
				message: "Email already exists",
				errorMessage: error.message
			});
		}

		return res.status(400).json({ status: 0, message: "Signup failed", errorMessage: error.message });
	}
};


export const LoginController = async (req, res, type) => {
	try {
		const { email, pass } = req.body;

		const user = await User.findOne({ email, role: type }).select("+password");
		if (!user) {
			return res.status(404).json({ status: 0, message: "User not found" });
		}

		if (type !== "admin" && user.approvalStatus !== "approve") {
			if (user.approvalStatus == "pending") {
				return res.status(403).json({ status: 0, message: "Your Profile is Under Admin View" });
			}
			else if (user.approvalStatus == "reject") {
				return res.status(403).json({ status: 0, message: "Your Profile has been rejected" });

			}
		}


		const isMatch = await compare(pass, user.password);
		if (!isMatch) {
			return res.status(401).json({ status: 0, message: "Invalid password" });
		}

		const token = jwt.sign({
			email: user.email,
			role: user.role,
			isProfileCompleted: user.isProfileCompleted,
			id: user._id
		}, JWT_KEY, { expiresIn: "1d" });

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "lax",
			secure: false,
			maxAge: 24 * 60 * 60 * 1000
		})
		res.status(200).json({
			status: 1,
			message: "Login successful",
			role: user.role,
			// token:token,
			isProfileCompleted: user.isProfileCompleted,
			user: { _id: user._id, email: user.email }
		});
	} catch (error) {
		res.status(400).json({ status: 0, message: "Login failed", errorMessage: error.message });
	}
};
