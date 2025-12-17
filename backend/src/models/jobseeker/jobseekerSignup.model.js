import mongoose from "mongoose";
const schema = mongoose.Schema;
const signupSchema = new schema({
	email: {
		type: String,
		unique: true
	},
	pass: {
		type: String
	},
	cpass: {
		type: String
	}
})

export const jobseekerSignupModel = mongoose.model('Jobseeker', signupSchema);
