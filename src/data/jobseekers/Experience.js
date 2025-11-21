export default Experience = [
	{
		name: "postion", label: "Postin", type: "text", required: true
	},
	{
		name: "orgname", label: "Organization Name", type: "text", required: true
	},
	{
		name: "industry", label: "Postin", type: "select",
		Option: ["Software Developer",
			"Digital Marketing Specialist",
			"Data Analyst",
			"Nurse / Medical Technician",
			"Sales & Business Development Executive"]
	},
	{
		name: "jlevel", label: "Job Level", type: "select", required: true, Option: ["Entry Level", "Junior Level", "Mid Level", "Senior Level"]
	},
	{
		name: "role", label: "Role and Responsibility", type: "textarea", required: true
	},
	{
		name: "sdate", label: "Start Date", type: "date", required: true
	},
	{
		name: "edate", label: "End Date", type: "date", required: true, disableIf: "cworking"
	},
	{
		name: "cworking", type: "checkbox", label: "I am currently working here"
	}

]