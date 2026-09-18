import crypto from "crypto";
import axios from "axios";
import { User } from "../../models/LoginModel/SignupLogic.js";
import { Payment } from "../../models/employer/Payment.js";

// ── ALL VALUES FROM .env ───────────────────────────────────
const ESEWA_MERCHANT_ID = process.env.ESEWA_MERCHANT_ID;
const ESEWA_SECRET = process.env.ESEWA_SECRET;
const ESEWA_PAYMENT_URL = process.env.ESEWA_PAYMENT_URL;
const ESEWA_STATUS_URL = process.env.ESEWA_STATUS_URL;
const FRONTEND_URL = "http://localhost:5173";
const BACKEND_URL = process.env.BACKEND_URL;
const PREMIUM_AMOUNT = Number(process.env.PREMIUM_AMOUNT);
const PREMIUM_DAYS = Number(process.env.PREMIUM_DAYS);

// ── SIGNATURE GENERATOR (as per eSewa docs) ───────────────
const generateSignature = (message) => {
	const hmac = crypto.createHmac("sha256", ESEWA_SECRET);
	hmac.update(message);
	return hmac.digest("base64");
};

// ── INITIATE PAYMENT ──────────────────────────────────────
export const initiatePayment = async (req, res) => {
	try {
		const employer = await User.findById(req.user.id);

		// Block if already premium and not expired
		if (employer.isPremium && employer.premiumExpiresAt > new Date()) {
			return res.status(400).json({
				message: "You already have an active premium plan.",
			});
		}

		const totalAmount = PREMIUM_AMOUNT;

		// eSewa transaction_uuid: alphanumeric + hyphen only, must be unique
		const transactionUUID = `hamrojob-${req.user.id}-${Date.now()}`;
		const productCode = ESEWA_MERCHANT_ID;

		// Save pending payment in DB before redirecting
		await Payment.create({
			employer: req.user.id,
			transactionUUID,
			amount: totalAmount,
			status: "pending",
		});

		// Signature string format is fixed by eSewa docs — do not change order
		const message = `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
		const signature = generateSignature(message);

		res.json({
			amount: totalAmount.toString(),
			tax_amount: "0",
			total_amount: totalAmount.toString(),
			transaction_uuid: transactionUUID,
			product_code: productCode,
			product_service_charge: "0",
			product_delivery_charge: "0",
			success_url: `${BACKEND_URL}/payment/verify`,
			failure_url: `${BACKEND_URL}/payment/failed`,
			signed_field_names: "total_amount,transaction_uuid,product_code",
			signature,
			esewa_url: ESEWA_PAYMENT_URL,
		});
	} catch (error) {
		console.error("initiatePayment error:", error);
		res.status(500).json({ message: "Payment initiation failed" });
	}
};

// ── VERIFY PAYMENT (eSewa redirects here after success) ───
export const verifyPayment = async (req, res) => {
	try {
		const { data } = req.query;

		if (!data) {
			return res.redirect(`${FRONTEND_URL}/payment/failed`);
		}

		// Decode base64 response from eSewa
		const decodedData = JSON.parse(
			Buffer.from(data, "base64").toString("utf-8")
		);

		const {
			transaction_uuid,
			transaction_code,
			status,
			signed_field_names,
			signature,
		} = decodedData;

		// Verify signature to confirm response is from eSewa and not tampered
		const fieldNames = signed_field_names.split(",");
		const message = fieldNames
			.map((f) => `${f}=${decodedData[f]}`)
			.join(",");
		const expectedSignature = generateSignature(message);

		if (expectedSignature !== signature) {
			await Payment.findOneAndUpdate(
				{ transactionUUID: transaction_uuid },
				{ status: "failed" }
			);
			return res.redirect(`${FRONTEND_URL}/payment/failed`);
		}

		if (status !== "COMPLETE") {
			await Payment.findOneAndUpdate(
				{ transactionUUID: transaction_uuid },
				{ status: "failed" }
			);
			return res.redirect(`${FRONTEND_URL}/payment/failed`);
		}

		// Double verify with eSewa status check API
		const statusCheck = await axios.get(ESEWA_STATUS_URL, {
			params: {
				product_code: ESEWA_MERCHANT_ID,
				total_amount: PREMIUM_AMOUNT,
				transaction_uuid,
			},
		});

		if (statusCheck.data.status !== "COMPLETE") {
			await Payment.findOneAndUpdate(
				{ transactionUUID: transaction_uuid },
				{ status: "failed" }
			);
			return res.redirect(`${FRONTEND_URL}/payment/failed`);
		}

		// Calculate premium expiry
		const paidAt = new Date();
		const expiresAt = new Date(
			paidAt.getTime() + PREMIUM_DAYS * 24 * 60 * 60 * 1000
		);

		// Update payment record to success
		const payment = await Payment.findOneAndUpdate(
			{ transactionUUID: transaction_uuid },
			{
				status: "success",
				transactionCode: transaction_code,
				paidAt,
				expiresAt,
			},
			{ new: true }
		);

		// Mark employer as premium with expiry date
		await User.findByIdAndUpdate(payment.employer, {
			isPremium: true,
			premiumSince: paidAt,
			premiumExpiresAt: expiresAt,
		});

		res.redirect(`${FRONTEND_URL}/payment/success`);
	} catch (error) {
		console.error("verifyPayment error:", error);
		res.redirect(`${FRONTEND_URL}/payment/failed`);
	}
};

// ── FAILED PAYMENT (eSewa redirects here on failure) ──────
export const failedPayment = async (req, res) => {
	try {
		const { data } = req.query;
		if (data) {
			const decodedData = JSON.parse(
				Buffer.from(data, "base64").toString("utf-8")
			);
			await Payment.findOneAndUpdate(
				{ transactionUUID: decodedData.transaction_uuid },
				{ status: "failed" }
			);
		}
		res.redirect(`${FRONTEND_URL}/payment/failed`);
	} catch (error) {
		console.error("failedPayment error:", error);
		res.redirect(`${FRONTEND_URL}/payment/failed`);
	}
};

// ── CHECK PREMIUM STATUS (called on employer dashboard load) ──
export const checkPremiumStatus = async (req, res) => {
	console.log(req.user.id);
	try {
		const employer = await User.findById(req.user.id).select(
			"isPremium premiumSince premiumExpiresAt"
		);


		if (!employer) {
			return res.status(404).json({
				message: "Employer not found",
			});
		}

		const isPremium = employer.isPremium === true;
		const premiumExpiresAt = employer.premiumExpiresAt;

		// Auto-expire if premium expiry date has passed
		if (
			isPremium &&
			premiumExpiresAt &&
			premiumExpiresAt < new Date()
		) {
			await User.findByIdAndUpdate(req.user.id, {
				isPremium: false,
				premiumSince: null,
				premiumExpiresAt: null,
			});

			return res.json({
				isPremium: false,
				expired: true,
				message: "Your premium plan has expired. Please renew.",
			});
		}

		return res.json({
			isPremium,
			premiumSince: employer.premiumSince,
			premiumExpiresAt,
			expired: false,
		});
	} catch (error) {
		console.error("checkPremiumStatus error:", error);
		return res.status(500).json({
			message: "Failed to check premium status",
			error: error.message,
		});
	}
};

// ── ADMIN: GET ALL PAYMENTS ───────────────────────────────
export const getAllPayments = async (req, res) => {
	try {
		const payments = await Payment.find()
			.populate("employer", "name email")
			.sort({ createdAt: -1 });

		const totalRevenue = payments
			.filter((p) => p.status === "success" && !p.grantedByAdmin)
			.reduce((sum, p) => sum + p.amount, 0);

		const premiumCount = await User.countDocuments({
			role: "employer",
			isPremium: true,
		});

		const freeCount = await User.countDocuments({
			role: "employer",
			isPremium: false,
		});

		res.json({ payments, totalRevenue, premiumCount, freeCount });
	} catch (error) {
		console.error("getAllPayments error:", error);
		res.status(500).json({ message: "Failed to fetch payments" });
	}
};
