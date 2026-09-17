import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import path from 'path'
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/database.js";
import jobroutes from "./src/routes/jobRoutes.js";
import employerroutes from "./src/routes/employerRoutes.js";
import jobseekerroutes from "./src/routes/jobseekerRoutes.js";
import authrouter from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/adminRoute.js";
import { upload } from "./src/config/cloudinary.js";
import paymentroutes from "./src/routes/paymentRoutes.js";

dotenv.config();

const app = express();

const corsConfig = {
	origin: [
		"https://hamrojob.onrender.com",
		"https://hamrojob.bikramgyawali.com.np",
		"http://localhost:5173"
	],
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"]
}


app.options("*", cors(corsConfig))
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3000;
connectDB();

// Routes
app.use('/jobseeker', jobseekerroutes);
app.use("/employer", employerroutes);
app.use("/admin", adminRoutes)
app.use("/auth", authrouter)
app.use("/job", jobroutes)
app.use("api/payment", paymentroutes)
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));
//for cloudinary

app.post("/uploadimage", upload.single('image'), (req, res) => {
	const imageurl = req.file.path;
	res.json({
		image: imageurl
	})
})

// Error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(400).json({ status: 0, message: err.message || 'Server error' });
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({ status: 0, message: "Page not found" });
});

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});

export default app;