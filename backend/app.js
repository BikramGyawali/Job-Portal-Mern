import express, { json } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { connectDB } from "./src/config/database.js";

import jobseekerroutes from "./src/routes/JobseekerRoutes/jobseekerRoutes.js";
import cookieParser from "cookie-parser";
import employerroutes from "./src/routes/EmployerRoutes/employerRoutes.js";

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
app.use("/employer", employerroutes)
app.use((req, res) => {
	res.send("401:Page not found");
})
app.listen(PORT, () => {
	console.log(`Serving running at port number ${PORT}`);

})





