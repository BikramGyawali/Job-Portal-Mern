export const ValidateUtil = (form) => {
	let valid = true;
	let error = {};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9]{10}$/;
	const stringCheck = /^[A-Za-z]+$/;
	const companyCheck = /^[A-Za-z0-9 .&-]+$/


	// First Name
	if ('fname' in form) {
		if (!form.fname.trim()) {
			error.fname = "First name is required";
			valid = false;
		} else if (!stringCheck.test(form.fname)) {
			error.fname = "First name must be text";
			valid = false;
		}
	}

	// Second Name
	if ('sname' in form) {
		if (!form.sname.trim()) {
			error.sname = "Second name is required";
			valid = false;
		} else if (!stringCheck.test(form.sname)) {
			error.sname = "Second name must be text";
			valid = false;
		}
	}

	// Email
	if ('email' in form) {
		if (!form.email.trim()) {
			error.email = "Email is required";
			valid = false;
		} else if (!emailRegex.test(form.email)) {
			error.email = "Invalid email format";
			valid = false;
		}
	}

	// Phone
	if ('phone' in form) {
		if (!form.phone.trim()) {
			error.phone = "Phone number is required";
			valid = false;
		} else if (!phoneRegex.test(form.phone)) {
			error.phone = "Phone must be 10 digits";
			valid = false;
		}
	}

	// Message
	if ('message' in form) {
		if (!form.message.trim()) {
			error.message = "Message is required";
			valid = false;
		} else if (typeof form.message !== "string") {
			error.message = "Message must be text";
			valid = false;
		}
	}

	// Password
	if ('pass' in form) {
		if (!form.pass.trim()) {
			error.pass = "Password is required";
			valid = false;
		} else if (form.pass.length < 6) {
			error.pass = "Password must be at least 6 characters";
			valid = false;
		}
	}

	// Confirm Password
	if ('cPass' in form) {
		if (!form.cPass.trim()) {
			error.cPass = "Confirm password is required";
			valid = false;
		} else if (form.pass && form.cPass !== form.pass) {
			error.cPass = "Passwords do not match";
			valid = false;
		}
	}

	// Company Name
	if ('company' in form) {
		if (!form.company.trim()) {
			error.company = "Company name is required";
			valid = false;
		} else if (!companyCheck.test(form.company)) {
			error.company = "Company name can contain letters, numbers, spaces, . & -";
			valid = false;
		}
	}

	return { valid, error };
};
