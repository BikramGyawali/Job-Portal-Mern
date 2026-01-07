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
		// validate: {
		// 	validator: function (v) {
		// 		return /^[0-9]{10}$/.test(v);
		// 	},
		// 	message: "Phone number must be exactly 10 "
		// }
	},
	companyIntro: String



})

// employerProfileSchema.pre("save", function (next) {
// 	if (this.phone) {
// 		this.phone =
// 			this.phone.replace(/\D/g, "")
// 	}
// 	if (this.panCard) {
// 		this.panCard =
// 			this.panCard.trim().toUpperCase()
// 	}
// 	next()
// })
export const EmployerProfile = mongoose.model("EmployerProfile", employerProfileSchema)