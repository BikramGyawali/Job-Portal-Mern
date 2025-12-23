import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const jwt_key = process.env.JWT_KEY;

export const verifyRole = (req, res, next) => {
	const token = req.cookies?.token;
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		req.user = jwt.verify(token, jwt_key);
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};

