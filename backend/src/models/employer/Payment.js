import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
	{
		employer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		transactionUUID: {
			type: String,
			required: true,
			unique: true,
		},
		transactionCode: {
			type: String,
			default: null,
		},
		amount: {
			type: Number,
			required: true,
			default: 999,
		},
		status: {
			type: String,
			enum: ["pending", "success", "failed"],
			default: "pending",
		},
		paidAt: {
			type: Date,
			default: null,
		},
		expiresAt: {
			type: Date,
			default: null, // set to paidAt + 30 days on success
		},
		grantedByAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);