export const ValidateUtil = (form, fields = []) => {
	let valid = true;
	const error = {};

	// Regex patterns
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9]{10}$/; // adjust length if needed
	const textOnly = /^[A-Za-z\s]+$/; // allow letters and spaces
	const companyCheck = /^[A-Za-z0-9 .&-]+$/;

	// Get today's date for date validation
	const today = new Date().toISOString().split("T")[0];

	// Loop through each field
	fields.forEach(f => {
		const value = (form[f.name] || "").toString().trim();

		// 1️⃣ Required fields
		if (f.required && !value) {
			error[f.name] = `${f.label} is required`;
			valid = false;
			return; // skip further checks for this field
		}

		// 2️⃣ Text only validation
		if ((f.type === "text" || f.type === "textarea") && f.onlyLetters && value) {
			if (!textOnly.test(value)) {
				error[f.name] = `${f.label} must contain letters only`;
				valid = false;
			}
		}

		// 3️⃣ Email validation
		if (f.type === "email" && value && !emailRegex.test(value)) {
			error[f.name] = "Invalid email format";
			valid = false;
		}

		// 4️⃣ Phone validation
		if (f.name === "phone" && value && !phoneRegex.test(value)) {
			error[f.name] = "Phone must be 10 digits";
			valid = false;
		}

		// 5️⃣ Date validation (DOB or Start Date cannot be in future)
		if (f.type === "date" && value) {
			if ((f.name === "dob" || f.name === "sdate") && value > today) {
				error[f.name] = `${f.label} cannot be in the future`;
				valid = false;
			}
		}

		// 6️⃣ Message field
		if (f.name === "message") {
			if (!value) {
				error.message = "Message is required";
				valid = false;
			} else if (typeof form.message !== "string") {
				error.message = "Message must be text";
				valid = false;
			}
		}

		// 7️⃣ Password validation
		if (f.name === "pass") {
			if (!value) {
				error.pass = "Password is required";
				valid = false;
			} else if (value.length < 6) {
				error.pass = "Password must be at least 6 characters";
				valid = false;
			}
		}

		// 8️⃣ Confirm Password validation
		if (f.name === "cPass") {
			if (!value) {
				error.cPass = "Confirm password is required";
				valid = false;
			} else if (form.pass && value !== form.pass) {
				error.cPass = "Passwords do not match";
				valid = false;
			}
		}

		// 9️⃣ Company Name validation
		if (f.name === "company") {
			if (!value) {
				error.company = "Company name is required";
				valid = false;
			} else if (!companyCheck.test(value)) {
				error.company = "Company name can contain letters, numbers, spaces, . & -";
				valid = false;
			}
		}
	});

	return { valid, error };
};
