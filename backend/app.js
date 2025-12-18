import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import { jobseekerSignupModel } from "./src/models/jobseeker/jobseekerSignup.model.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();
app.post("/test", async (req, res) => {
	try {
		const user = new jobseekerSignupModel({
			email: "test@example.com",
			pass: "123456",
			cpass: "123456"
		});
		await user.save();
		res.send("User created and DB should now exist!");
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.listen(PORT, () => {
	console.log(`Serving running at port number ${PORT}`);

})





