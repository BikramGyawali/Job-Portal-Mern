import { hash } from "bcrypt";
import mongoose from "mongoose";
import { jobseekerSignupModel } from "../../models/jobseeker/jobseekerSignup.model";
// import bcrypt from
const jobseekerSignup = async (req, res, next) => {
	try {
		const { email, cpass, pass } = req.body.data;
		brcypt.hash(cpass, 10).then(async hash => {
			await jobseekerSignupModel.create({ email, pass, cpass: hash })
			res.status(200).send({
				status: 1,
				message: "Data insert Sucessfully",

			})
		})

	} catch (error) {
		res.status(400).send({
			status: 0,
			message: "Validation failed",
			errorMessage: err.message,
		});
	}
}

export default jobseekerSignup