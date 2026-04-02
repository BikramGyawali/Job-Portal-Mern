import mongoose from "mongoose";
const schema = mongoose.Schema
const employerProfileSchema = new schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true
	},
	image: String,
	companyName: String,
	companyaddress: String,
	email: {
		type: String,
		unique: true,
		required: true
	},
	panCard: {
		type: String,
		unique: true,
		required: true
	},
	officePhone: String,
	industry: String,
	companySize: String,
	companyWebsite: String,
	facebookLink: String,
	fname: String,
	phone: {
		type: String,

		required: true,

	},
	companyIntro: String



})


export const EmployerProfile = mongoose.model("EmployerProfile", employerProfileSchema)