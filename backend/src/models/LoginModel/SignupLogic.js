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
		select: false   // to unselect the pass while populate
	},
	role: {
		type: String,
		enum: ["jobseeker", "employer", "admin"],
		required: true,
	},
	isProfileCompleted: {
		type: Boolean,
		default: true
	},
	approvalStatus: {
		type: String,
		enum: ["approved", "pending", "rejected"],
		default: "approved",
		lowercase: true
	}
})
signupSchema.index({ approvalStatus: 1 })

export const User = mongoose.model('User', signupSchema);
