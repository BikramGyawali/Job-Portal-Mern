export const ValidateUtil = (form, fields = []) => {
	let valid = true;
	const error = {};

	// Regex patterns
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^[0-9]{10}$/; // adjust length if needed
	const textOnly = /^[A-Za-z\s]+$/; // allow letters and spaces
	const panCardCheck = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
	const officePhoneCheck = /^\d{2}-\d{7}$/;
	const websiteCheck = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;


	// Get today's date for date validation
	const today = new Date().toISOString().split("T")[0];

	// Loop through each field
	fields.forEach(f => {
		const value = form[f.name]?.toString().trim() || "";



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

		// district
		if ('currentDistrict' in form && form.currentDistrict?.trim() && !textOnly.test(form.currentDistrict)) {
			error.currentDistrict = "District Name must be text";
			valid = false;
		}
		//municipality
		if ('currentMunicipality' in form && form.currentMunicipality?.trim() && !textOnly.test(form.currentMunicipality)) {
			error.currentMunicipality = "Municipality Name must be text";
			valid = false;
		}
		if ('currentCity' in form && form.currentCity?.trim() && !textOnly.test(form.currentCity)) {
			error.currentCity = " City Name must be text";
			valid = false;
		}
		if ('perCity' in form && form.perCity?.trim() && !textOnly.test(form.perCity)) {
			error.perCity = " City Name must be text";
			valid = false;
		}
		if ('perDistrict' in form && form.perDistrict?.trim() && !textOnly.test(form.perDistrict)) {
			error.perDistrict = " District Name must be text";
			valid = false;
		}
		if ('perMunicipality' in form && form.perMunicipality?.trim() && !textOnly.test(form.perMunicipality)) {
			error.perMunicipality = " Municipality Name must be text";
			valid = false;
		}

		//
		if ('position' in form && form.position?.trim() && !textOnly.test(form.position)) {
			error.position = " Position must be text";
			valid = false;
		}
		if ('institution' in form && form.institution?.trim() && !textOnly.test(form.institution)) {
			error.institution = " Institution/College Name must be text";
			valid = false;
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

		if (f.name === 'companyWebsite' && value && !websiteCheck.test(value)) {
			error[f.name] = "Invalid webiste format";
			valid = false;
		}
		//company address
		if ('companyaddress' in form && form.companyaddress?.trim() && !textOnly.test(form.companyaddress)) {
			error.companyaddress = "Company Address must be text";
			valid = false;
		}
		//for dashboard jobtitle 
		if ('jobTitle' in form && form.jobTitle?.trim() && !textOnly.test(form.jobTitle)) {
			error.jobTitle = "Job Title must be text";
			valid = false;
		}

	});
	//grade validation
	// Grading validation
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
