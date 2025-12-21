import mongoose, { Schema } from "mongoose";
const schema = mongoose.schema;
const JobseekerProfileSchema=new schema({
	userId:{
		id:mongoose.Types.ObjectId(),
		ref:"User"

	}
})