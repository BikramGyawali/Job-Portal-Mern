import mongoose from "mongoose";

const schema = mongoose.schema;
const JobApplicationSchema = new schema({
	jobid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PostJob"
	},
	applicantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "JobseekerProfile"
	},
	status: {
		type: String,
		enum: ["pending", "shortlisted", "rejected"],
		default: "pending"
	},
	appliedAt: {
		type: Date,
		default: Date.now
	}
})

export const JobApplicationSche = mongoose.model("JobApplicationSchema", JobApplicationSche)