import mongoose from "mongoose";
const schema = mongoose.Schema;
const postJob = new schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true

	},
	jobTitle: {
		type: String,
		required: true
	},
	openings: Number,
	mainCategory: {
		type: String,
		required: true
	},
	subCategory: String,
	postingDate: {
		type: Date,
		required: true
	},
	postingPeriod: {
		type: String,
		required: true
	},
	jobLevel: {
		type: String,
		required: true
	},
	desiredCandidate: String,
	educationLevel: String,
	experience: String,
	district: String,
	municipality: String,
	location: String,
	salaryCurrency: String,
	salaryPeriod: String,
	salaryRange: String,
	license: String,
	vehicle:String,
	skills: {
		type: [String],
		default: []
	},
	jobDescription: {
		type: String,
		required: true
	},
	jobSpecification: {
		type: String,
		required: true
	},
	isApproved: {
		type: Boolean,
		default: true
	},
	approvalDate: Date,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true })
export const PostJob = mongoose.model("PostJob", postJob)