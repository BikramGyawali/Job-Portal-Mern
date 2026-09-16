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
		select: false
	},
	role: {
		type: String,
		enum: ["jobseeker", "employer", "admin"],
		required: true,
	},
	isProfileCompleted: {
		type: Boolean,
		default: false
	},
	approvalStatus: {
		type: String,
		enum: ["approve", "pending", "reject"],
		default: "pending",
		lowercase: true
	},

	isPremium: {
		type: Boolean,
		default: false
	},
	premiumSince: {
		type: Date,
		default: null
	},
	premiumExpiresAt: {
		type: Date,
		default: null
	}
});

signupSchema.index({ approvalStatus: 1 });

export const User = mongoose.model('User', signupSchema);