

export const ValidateUtil = (form, fields = []) => {
	let valid = true;
	const error = {};

	// Regex patterns
	const patterns = {
		textareaPattern: /^[A-Za-z][A-Za-z0-9\s.,!?@#&()\-:;'"\/\n]*$/,
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		phone: /^(98|97|96)[0-9]{8}$/,
		text: /^[A-Za-z\s]+$/,
		pan: /^[0-9]{9}$/,
		officePhone: /^\d{10}$/,
		website: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
		social: /^(https?:\/\/)?(www\.)?(facebook|instagram|linkedin|pinterest|reddit|snapchat|tiktok|twitter|youtube)\.com(\/.*)?$/i,
	};

	const today = new Date().toISOString().split("T")[0];

	fields.forEach((f) => {
		const value = form[f.name]?.toString().trim() || "";

		//  REQUIRED
		if (f.required && !value) {
			error[f.name] = `${f.label} is required`;
			valid = false;
			return;
		}

		// Skip further checks if empty and not required
		if (!value) return;

		//  TEXT VALIDATION
		if (
			(f.type === "text") &&
			!patterns.text.test(value)
		) {
			error[f.name] = `${f.label} must contain only text`;
			valid = false;
		}
		// for text area 

		if (f.type === "textarea") {
			if (!patterns.textareaPattern.test(value)) {
				error[f.name] = `${f.label} must start with a letter and contain valid characters`
				valid = false
			}
			else if (value.length < 20) {
				error[f.name] = `${f.label} must be at least 20 characters`
				valid = false
			}
			else if (value.length > 2000) {
				error[f.name] = `${f.label} must not exceed 2000 characters`
				valid = false
			} else if (/(.)\1{9,}/.test(value)) {
				error[f.name] = `${f.label} contains invalid repeated characters`
				valid = false
			}
		}
		//  EMAIL
		if (f.type === "email" && !patterns.email.test(value)) {
			error[f.name] = "Invalid email format";
			valid = false;
		}

		//  PHONE
		if (f.name === "phone") {
			if (value.length !== 10) {
				error.phone = "Phone must be exactly 10 digits";
				valid = false;
			} else if (!patterns.phone.test(value)) {
				error.phone = "Phone must start with 96, 97, or 98";
				valid = false;
			}
		}

		//  DATE

		if ((f.name === "dob" || f.name === "sdate") && value > today) {
			error[f.name] = `${f.label} cannot be in the future`;
			valid = false;
		}


		//  NUMBER
		if (f.type === "number" && isNaN(value)) {
			error[f.name] = `${f.label} must be a number`;
			valid = false;
		} else if (value <= 0) {
			error[f.name] = `${f.label} must be greater than 0`;
			valid = false;
		}

		//  SELECT (MULTIPLE)
		if (f.type === "select" && f.multiple && form[f.name]?.length === 0) {
			error[f.name] = `Please select at least one ${f.label}`;
			valid = false;
		}

		//  PASSWORD
		if (f.name === "pass") {
			if (value.length < 6) {
				error.pass = "Password must be at least 6 characters";
				valid = false;
			}
		}

		//  CONFIRM PASSWORD
		if (f.name === "cPass") {
			if (value !== form.pass) {
				error.cPass = "Passwords do not match";
				valid = false;
			}
		}

		// . SOCIAL LINK
		if (f.name === "socialUrl" && !patterns.social.test(value)) {
			error[f.name] = "Invalid social media link";
			valid = false;
		}

		// . PAN CARD
		if (f.name === "panCard" && !patterns.pan.test(value)) {
			error[f.name] = "Invalid PAN format";
			valid = false;
		}

		// // . OFFICE PHONE
		if (f.name === "officePhone" && value && !patterns.officePhone.test(value)) {
			error[f.name] = " office phone must have 10 digits";
			valid = false;
		}

		// . WEBSITE
		if (f.name === "companyWebsite" && !patterns.website.test(value)) {
			error[f.name] = "Invalid website format";
			valid = false;
		}
	});

	// . GRADING (CUSTOM LOGIC OUTSIDE LOOP)
	if (form.gradingType === "CGPA") {
		const gpa = parseFloat(form.score);
		if (isNaN(gpa) || gpa <= 0 || gpa > 4) {
			error.score = "CGPA must be between 0.1 and 4.0";
			valid = false;
		}
	}

	if (form.gradingType === "Percentage") {
		const percent = parseFloat(form.score);
		if (isNaN(percent) || percent <= 0 || percent > 100) {
			error.score = "Percentage must be between 1 and 100";
			valid = false;
		}
	}

	return { valid, error };
};