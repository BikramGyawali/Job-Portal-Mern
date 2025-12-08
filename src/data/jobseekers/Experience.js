export const Experience = [
	{ name: "position", label: "Position", type: "text", required: true },
	{ name: "orgname", label: "Organization Name", type: "text", required: true },
	{ name: "industry", label: "Industry", type: "select", options: ["Software Developer", "Digital Marketing Specialist", "Data Analyst", "Nurse / Medical Technician", "Sales & Business Development Executive"] },
	{ name: "jlevel", label: "Job Level", type: "select", options: ["Entry Level", "Junior Level", "Mid Level", "Senior Level"] },
	{ name: "role", label: "Role and Responsibility", type: "textarea", required: true },
	{ name: "sdate", label: "Start Date", type: "date", required: true },
	// { name: "cworking", label: "I am currently working here", nameCheckbox: "cworking", type: "checkbox" },
	{ name: "edate", label: "End Date", type: "date", required: false }
];
