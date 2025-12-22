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
	cnam: String,
	companyaddress: String,
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
	phone: String,
	companyIntro: String



})