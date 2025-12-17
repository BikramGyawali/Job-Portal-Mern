import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
	console.log(`Serving running at port number ${PORT}`);

})





