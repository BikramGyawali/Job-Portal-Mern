import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const jwt_key = process.env.JWT_KEY;

export const verifyRole = (...allowedRoles) => {
	return (req, res, next) => {
		try {
			const token = req.cookies.token;

			if (!token) {
				return res.status(401).json({
					status: 0,
					message: "Unauthorized: No token",
				});
			}

			const decoded = jwt.verify(token, jwt_key);

			if (!allowedRoles.includes(decoded.role)) {
				return res.status(403).json({
					status: 0,
					message: "Forbidden: Access denied",
				});
			}

			req.user = decoded; 
			next();

		} catch (error) {
			return res.status(401).json({
				status: 0,
				message: "Invalid or expired token",
			});
		}
	};
};
