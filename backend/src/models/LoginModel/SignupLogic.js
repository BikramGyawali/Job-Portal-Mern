import mongoose from "mongoose";
const schema = mongoose.Schema;
const signupSchema = new schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
          select:false   // to unselect the pass while populate
	},
	role: {
		type: String,
		enum: ["jobseeker", "employer", "admin"],
		required: true,
	},

})

export const SignupModel = mongoose.model('User', signupSchema);
