import mongoose from "mongoose";
const schema = mongoose.Schema;
const signupSchema = new schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	pass: {
		type: String,
		required: true
	}

})

export const jobseekerSignupModel = mongoose.model('Jobseeker', signupSchema);
