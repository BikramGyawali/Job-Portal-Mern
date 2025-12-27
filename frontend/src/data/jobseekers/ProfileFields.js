export const ProfileFields = [
	{ name: "image", label: "Profile Photo", type: "file", required: true },

	{
		name: "fname",
		label: "First Name",
		type: "text",
		required: true,
		placeholder: "Enter your first name"
	},

	{
		name: "mname",
		label: "Middle Name",
		type: "text",
		placeholder: "Enter your middle name (optional)"
	},

	{
		name: "sname",
		label: "Last Name",
		type: "text",
		required: true,
		placeholder: "Enter your last name"
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
		placeholder: "abc@gmail.com"
	},
	{
		name: "currentDistrict",
		label: "Current District",
		type: "text",
		required: true,
		placeholder: "Eg. Kathmandu"
	},

	{
		name: "currentMunicipality",
		label: "Current Municipality",
		type: "text",
		required: true,
		placeholder: "Eg. Kathmandu Metropolitan City"
	},

	{
		name: "currentCity",
		label: "City / Tole",
		type: "text",
		placeholder: "Eg. Baneshwor"
	},

	{
		name: "perDistrict",
		label: "Permanent District",
		type: "text",
		placeholder: "Eg. Lalitpur"
	},

	{
		name: "perMunicipality",
		label: "Permanent Municipality",
		type: "text",
		placeholder: "Eg. Godawari Municipality"
	},

	{
		name: "perCity",
		label: "Permanent City / Tole",
		type: "text",
		placeholder: "Eg. Imadol"
	},

	{
		name: "dob",
		label: "Date of Birth",
		type: "date",
		required: true
	},

	{
		name: "phone",
		label: "Mobile Number",
		type: "text",
		required: true,
		placeholder: "Eg. 9812345678"
	},

	{
		name: "license",
		label: "Do you have a License?",
		type: "select",
		options: ["Yes", "No"],
		required: true
	},

	{
		name: "vehicle",
		label: "Do you have a Vehicle?",
		type: "select",
		options: ["Yes", "No"],
		required: true
	},

	{
		name: "jobType",
		label: "Preferred Job Type",
		type: "text",
		placeholder: "Eg. Delivery, Receptionist, Accountant"
	},

	{
		name: "gender",
		label: "Gender",
		type: "select",
		options: ["Male", "Female", "Other"],
		required: true
	},

	{
		name: "maritalStatus",
		label: "Marital Status",
		type: "select",
		options: ["Single", "Married", "Divorced"]
	},

	{
		name: "lookingFor",
		label: "Looking For",
		type: "select",
		options: ["Full Time", "Part Time"]
	},

	// {
	// 	name: "salary",
	// 	label: "Expected Salary",
	// 	type: "text",
	// 	placeholder: "Eg. 25000"
	// },

	{
		name: "about",
		label: "About You",
		type: "textarea",
		placeholder: "Write a short bio about yourself"
	}
];
