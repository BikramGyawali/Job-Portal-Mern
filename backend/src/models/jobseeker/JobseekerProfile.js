import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
	degree: String,
	fieldOfStudy: String,
	institution: String,
	university: String,
	gradingType: String,
	score: Number,
	sdate: Date,
	edate: Date
}, { _id: false });   // as we will add this schema to the 
// profile so we dont need any id but the mongodb give id so we will state false to id .

const experienceSchema = new mongoose.Schema({
	position: String,
	orgname: String,
	industry: String,
	jlevel: String,
	role: String,
	sdate: Date,
	edate: Date
}, { _id: false });

const trainingSchema = new mongoose.Schema({
	title: String,
	year: Number,
	institution: String
}, { _id: false });

const awardSchema = new mongoose.Schema({
	title: String,
	institution: String
}, { _id: false });

const socialSchema = new mongoose.Schema({
	name: String,
	url: String
}, { _id: false });

const referenceSchema = new mongoose.Schema({
	name: String,
	position: String,
	email: String,
	company: String
}, { _id: false });

const profileSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true
	},

	image: String,

	fname: String,
	mname: String,
	sname: String,
	email: {
		type: String,
		unique: true
	},
	currentDistrict: String,
	currentMunicipality: String,


	dob: Date,
	phone: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function (v) {
				return /^[0-9]{10}$/.test(v);
			},
			message: "Phone number must be exactly 10 "
		}
	},
	gender: String,
	maritalStatus: String,
	license: String,
	vehicle: String,
	jobType: String,
	lookingFor: String,
	// cv: String,

	about: String,

	skills: [String],
	languages: [{
		name: String,
		reading: String,
		writing: String,
		speaking: String
	}],

	education: [educationSchema],
	experience: [experienceSchema],
	trainings: [trainingSchema],
	awards: [awardSchema],
	socials: [socialSchema],
	references: [referenceSchema],



}, { timestamps: true });   //timestamp add extra two field as createdat and updatedat


export const JobseekerProfile = mongoose.model("JobseekerProfile", profileSchema);
