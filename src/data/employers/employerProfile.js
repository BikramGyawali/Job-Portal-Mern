export const employerProfile = [
	{
		label: "Company Logo",
		name: "image",
		type: "file",
		required: false
	},

	{
		label: "Company Name",
		name: "fname",
		type: "text",
		required: true,
		placeholder: "Enter your Company name"
	},

	{
		label: "Company Address",
		name: "sname",
		type: "text",
		required: true,
		placeholder: "enter your company address"
	},
	{
		label: "PAN card ",
		name: "panCard",
		type: "text",
		required: true,
		placeholder: "615801553"
	},

	{
		label: "Office Phone Number",
		name: "officePhone",
		type: "text",
		required: true,
		placeholder: "01-4000000"
	},

	{
		label: "Industry",
		name: "industry",
		type: "select",
		required: true,
		options: [
			"IT & Software",
			"Education",
			"Finance",
			"E-commerce",
			"Marketing",
			"Telecommunication",
			"Agriculture",
			"Construction",
			"Hospitality",
			"Other"
		]
	},

	{
		label: "Company Size",
		name: "companySize",
		type: "select",
		required: true,
		options: ["Small", "Medium", "Large"]
	},

	{
		label: "Company Website",
		name: "companyWebsite",
		type: "text",
		required: false,
		placeholder: "https://yourcompany.com"
	},

	{
		label: "Facebook Page Link",
		name: "facebookLink",
		type: "text",
		required: false,
		placeholder: "https://facebook.com/yourpage"
	},

	{
		label: "Contact Person Full Name",
		name: "fname",
		type: "text",
		required: true,
		placeholder: "Enter Contact Person full name"
	},

	{
		label: "Mobile Number",
		name: "phone",
		type: "text",
		required: true,
		placeholder: "9745989898"
	},

	{
		label: "Company Short Intro",
		name: "companyIntro",
		type: "textarea",
		required: true,
		placeholder: "Write a short introduction about your company"
	}
];
