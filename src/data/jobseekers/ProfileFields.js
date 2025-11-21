export const ProfileFields = [
	{ name: "image", label: "Change Photo", type: "file" },
	{ name: "fname", label: "First Name", type: "text", required: true },
	{ name: "mname", label: "Middle Name", type: "text" },
	{ name: "sname", label: "Last Name", type: "text", required: true },

	{ name: "currentDistrict", label: "Current District", type: "text", required: true },
	{ name: "currentMunicipality", label: "Current Municipality", type: "text", required: true },
	{ name: "currentCity", label: "City / Tole", type: "text" },

	{ name: "perDistrict", label: "Permanent District", type: "text" },
	{ name: "perMunicipality", label: "Permanent Municipality", type: "text" },
	{ name: "perCity", label: "Permanent City / Tole", type: "text" },

	{ name: "dob", label: "Date of Birth", type: "date", required: true },

	{ name: "phone", label: "Mobile Number", type: "text", required: true },

	{
		name: "license", label: "Do you have a License?", type: "select",
		options: ["Yes", "No"], required: true
	},
	{
		name: "vehicle", label: "Do you have a Vehicle?", type: "select",
		options: ["Yes", "No"], required: true
	},


	{ name: "jobType", label: "Preferred Job Type", type: "text" },

	{
		name: "gender", label: "Gender", type: "select",
		options: ["Male", "Female", "Other"], required: true
	},

	{
		name: "maritalStatus", label: "Marital Status", type: "select",
		options: ["Single", "Married", "Divorced"]
	},

	{
		name: "lookingFor", label: "Looking For", type: "select",
		options: ["Full Time", "Part Time"],
	},

	{ name: "salary", label: "Expected Salary", type: "text" },

	{ name: "about", label: "About You", type: "textarea" },
];
