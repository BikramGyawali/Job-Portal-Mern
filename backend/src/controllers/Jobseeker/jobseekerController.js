import { hash } from "bcrypt";

import { jobseekerSignupModel } from "../../models/jobseeker/jobseekerSignup.model.js";
// import bcrypt from
const jobseekerSignup = async (req, res, next) => {
	try {
		const { email, pass } = req.body;
		const hashPassword = await hash(pass, 10)

		await jobseekerSignupModel.create({ email, hashPassword });
		res.status(200).send({
			status: 1,
			message: "Data insert Sucessfully",

		})

	} catch (error) {
		res.status(400).send({
			status: 0,
			message: "Validation failed",
			errorMessage: error.message,
		});
	}
}

export default jobseekerSignup