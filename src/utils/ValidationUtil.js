

export const ValidateUtil = (form) => {
	let valid = true;

	let error = {}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9]{10}$/;

	if (!form.fname) {
		error.fname = "First name is required";
		valid = false;
	} else if (typeof form.fname !== "string") {
		error.fname = "First name must be text";
		valid = false;
	}

	if (!form.sname) {
		error.sname = "Second name is required";
		valid = false;
	} else if (typeof form.sname !== "string") {
		error.sname = "Second name must be text";
		valid = false;
	}

	if (!form.email) {
		error.email = "Email is required";
		valid = false;
	} else if (!emailRegex.test(form.email)) {
		error.email = "Invalid email format";
		valid = false;
	}

	if (!form.phone) {
		error.phone = "Phone number is required";
		valid = false;
	} else if (!phoneRegex.test(form.phone)) {
		error.phone = "Phone must be 10 digits";
		valid = false;
	}

	if (!form.message) {
		error.message = "Message is required";
		valid = false;
	} else if (typeof form.message !== "string") {
		error.message = "Message must be text";
		valid = false;
	}

	return { valid, error };
};
