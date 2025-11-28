export const ValidateUtil = (form, fields = []) => {
	let valid = true;
	const error = {};

	// Regex patterns
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9]{10}$/; // adjust length if needed
	const textOnly = /^[A-Za-z\s]+$/; // allow letters and spaces
	const panCardCheck = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
	const officePhoneCheck = "^\d{2}-\d{7}$";
	const websiteCheck = "^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$";

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
		if ('fname' in form && form.fname?.trim() && !textOnly.test(form.fname)) {
			error.fname = "First name must be text";
			valid = false;
		}

		// Second Name
		if ('sname' in form && form.sname?.trim() && !textOnly.test(form.sname)) {
			error.sname = "Second name must be text";
			valid = false;
		}
		if ('mname' in form && form.mname?.trim() && !textOnly.test(form.mname)) {
			error.mname = "Middle name must be text";
			valid = false;
		}


		// 3️⃣ Email validation
		if (f.name === "email" && value && !emailRegex.test(value)) {
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
			if (typeof form.message !== "string") {
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

		//for empolyers

		if (f.name === 'panCard' && value && !panCardCheck.test(value)) {
			error[f.name] = "Invalid Pan card format";
			valid = false;
		}

		//office Phone

		if (f.name === 'officePhone' && value && !officePhoneCheck.test(value)) {
			error[f.name] = "Invalid format";
			valid = false;
		}

  if(f.name==='companyWebsite' && value && !websiteCheck.test(value)){
	error[f.name]="Invalid webiste format";
	valid=false;
  }

	});

	return { valid, error };
};
