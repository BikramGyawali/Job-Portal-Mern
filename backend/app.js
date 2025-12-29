import express, { json } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import path from 'path'
import { connectDB } from "./src/config/database.js";


import cookieParser from "cookie-parser";

import jobroutes from "./src/routes/jobRoutes.js";
import employerroutes from "./src/routes/employerRoutes.js";
import jobseekerroutes from "./src/routes/jobseekerRoutes.js";
import authrouter from "./src/routes/auth.routes.js";


dotenv.config();
const app = express();
app.use(cors({
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

connectDB();
app.use('/jobseeker', jobseekerroutes);
app.use("/employer", employerroutes);
app.use("/auth", authrouter)
app.use("job", jobroutes)
// serve uploaded files (images, cvs)
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// JSON error handler (ensures multer and other errors return JSON)
app.use((err, req, res, next) => {
	console.error(err);
	res.status(400).json({ status: 0, message: err.message || 'Server error' });
});

app.use((req, res) => {
	res.status(404).json({ status: 0, message: "Page not found" });
});

app.listen(PORT, () => {
	console.log(`Serving running at port number ${PORT}`);

})





