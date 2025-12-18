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
	},
	role: {
		type: String,
		enum: ["jobseeker", "employer", "admin"],
		required: true,
	},

})

export const SignupModel = mongoose.model('User', signupSchema);
