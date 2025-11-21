export const JAddDetails = [
	{
		section: "Skills",
		type: "tags", // input type can be tag input
		data: ["Accounting", "Team Management", "Digital Marketing"], // initial values
	},
	{
		section: "Languages",
		type: "language",
		data: [
			{
				name: "Nepali",
				reading: "Good",
				writing: "Good",
				speaking: "Good",
			},
			{
				name: "English",
				reading: "Excellent",
				writing: "Good",
				speaking: "Excellent",
			},
		],
	},
	{
		section: "Training",
		type: "training",
		data: [
			{
				title: "React Advanced Training",
				year: 2025,
				institution: "ABC Institute",
			},
		],
	},
	{
		section: "Awards/Certification",
		type: "awards",
		data: [
			{
				title: "Certified Scrum Master",
				institution: "Scrum Alliance",
			},
		],
	},
	{
		section: "Social Network",
		type: "social",
		data: [
			{
				name: "LinkedIn",
				url: "https://linkedin.com/in/username",
			},
			{
				name: "GitHub",
				url: "https://github.com/username",
			},
		],
	},
	{
		section: "Reference",
		type: "reference",
		data: [
			{
				name: "John Doe",
				position: "Manager",
				email: "john@example.com",
				company: "ABC Corp",
			},
		],
	},
];
