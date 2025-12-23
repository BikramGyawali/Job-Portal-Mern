import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const jwt_key = process.env.JWT_KEY;

export const verifyRole = (...roles) => {
	return (req, res, next) => {
		console.log("Cookies:", req.cookies);

		const token = req.cookies?.token;
		if (!token) {
			return res.status(401).json({ message: "No token" });
		}

		const decoded = jwt.verify(token, jwt_key);
		console.log("Decoded:", decoded);

		if (!roles.includes(decoded.role)) {
			return res.status(403).json({ message: "Forbidden" });
		}

		next();
	};
};



export const verifyAuth = (req, res, next) => {
	const token = req.cookies?.token;
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		req.user = jwt.verify(token, jwt_key);
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};




