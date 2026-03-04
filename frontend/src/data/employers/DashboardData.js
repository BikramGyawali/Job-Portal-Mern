export const DashboardCardData = [
	{
		number: "1",
		content: "Total"
	},
	{
		number: "20",
		content: "Active Jobs"
	},
	{
		number: "30",
		content: "Total Application"
	},
	{
		number: "69",
		content: "Shortlisted Application"
	}
]

export const DashboardTableHeadData = ["Name", "Position", "Date"];

export const DashboardTableBody = [
	{
		Name: "John Doe",
		Position: "Frontend Developer",
		Date: "2025-01-12",
	},
	{
		Name: "Sarah Smith",
		Position: "UI/UX Designer",
		Date: "2025-01-09",
	},
];


//for my jobs
export const MyJobsTableHead = ["S.N",
	"Job Title",
	"Posted at",
	"Expires In",
	// "Views",
	"Applicants",
	"Status",
	"Reason",

	// "Pending",
	// "In Review",
	// "Processed",
	"Actions"]

export const MyJobsTableBody = [{
	"S.N": 1,
	"Job Title": "Frontend Developer",
	"Posted at": "2025-01-12",
	"Expires n": "5 days",
	// "Views": 120,
	"Applicants": 18,
	// "Pending": 5,
	"Status": "Active",
	// "In Review": 8,
	// "Processed": 5,
	"Actions": ["edit", "delete"]
}]

//for applicant data
export const ApplicantHead = ["Applicant Name", "Email", "Phone", "Applied On", "Status", "Actions"]



export const ApplicantBody = [
	{
		"Applicant Name": "John Doe",
		"Email": "john@example.com",
		"Phone": "9801234567",
		"Applied On": "2025-12-01",
		"Status": "New",
		"Actions": ["view", "shortlist", "reject"],
	},

];











// for job creation
export const CreateJobsData = [

	// ----- BASIC JOB INFO -----

	{
		label: "Job Title",
		name: "jobTitle",
		type: "text",
		required: true,
	},
	{
		label: "Number of Openings",
		name: "openings",
		type: "number",
		required: false,
	},

	// ----- CATEGORY -----
	{
		label: "Choose Main Category",
		name: "mainCategory",
		type: "select",
		required: true,
		options: [
			"Information Technology",
			"Accounting / Finance",
			"Sales / Marketing",
			"Hospitality / Tourism",
			"Administrative / Management",
			"Customer Service",
			"Graphic Design / Creative",
			"Construction / Engineering",
			"Healthcare / Medical",
			"Education / Training",
			"Human Resources",
			"Banking / Insurance",
			"Operations / Logistics"
		],
	},
	{
		label: "Choose Sub Category",
		name: "subCategory",
		type: "select",
		required: false,
		options: [
			// IT
			"Frontend Developer",
			"Backend Developer",
			"Full Stack Developer",
			"Mobile App Developer",
			"UI/UX Designer",
			"QA / Tester",
			"DevOps Engineer",
			"IT Support",

			// Accounting
			"Accountant",
			"Audit Assistant",
			"Finance Officer",

			// Sales / Marketing
			"Digital Marketer",
			"Sales Executive",
			"Brand Manager",

			// Hospitality
			"Receptionist",
			"Cook / Chef",
			"Waiter/Waitress",
		],
	},

	// ----- DATES -----
	{
		label: "Posting Date",
		name: "postingDate",
		type: "date",
		required: true,
	},
	{
		label: "Posting Period",
		name: "postingPeriod",
		type: "select",
		required: true,
		options: ["7 Days", "15 Days", "30 Days", "45 Days"],
	},

	// ----- JOB DETAILS -----
	{
		label: "Job Level",
		name: "jobLevel",
		type: "select",
		required: true,
		options: ["Entry Level", "Mid Level", "Senior Level", "Top Level"],
	},
	{
		label: "Desired Candidate",
		name: "desiredCandidate",
		type: "select",
		required: false,
		options: ["Any Gender", "Male", "Female", "Other"],
	},
	{
		label: "Education Level",
		name: "educationLevel",
		type: "select",
		required: false,
		options: [
			"SLC/SEE",
			"Intermediate (+2)",
			"Bachelor's Degree",
			"Master's Degree",
			"PHD",
			"Other"
		],
	},
	{
		label: "Experience",
		name: "experience",
		type: "select",
		required: false,
		options: [
			"Fresher",
			"1 Year",
			"2 Years",
			"3+ Years",
			"5+ Years",
			"10+ Years",
		],
	},

	// ----- LOCATION -----
	{
		label: "District",
		name: "district",
		type: "select",
		required: false,
		options: [
			"Kathmandu",
			"Lalitpur",
			"Bhaktapur",
			"Pokhara",
			"Butwal",
			"Biratnagar",
			"Birgunj",
			"Nepalgunj",
			"Dharan",
			"Hetauda"
		],
	},
	{
		label: "Municipality",
		name: "municipality",
		type: "select",
		required: false,
		options: [
			"Kathmandu Metropolitan",
			"Lalitpur Metropolitan",
			"Bhaktapur Municipality",
			"Pokhara Metropolitan",
			"Biratnagar Metropolitan",
			"Birgunj Metropolitan"
		],
	},
	{
		label: "Specific Location",
		name: "location",
		type: "text",
		required: false,
	},

	// ----- SALARY -----
	{
		label: "Salary Currency",
		name: "salaryCurrency",
		type: "select",
		required: false,
		options: ["NPR", "USD", "INR"],
	},
	{
		label: "Salary Period",
		name: "salaryPeriod",
		type: "select",
		required: false,
		options: ["Monthly", "Yearly", "Hourly"],
	},
	{
		label: "Salary Range",
		name: "salaryRange",
		type: "select",
		required: false,
		options: [
			"Below 20,000",
			"20,000 - 40,000",
			"40,000 - 60,000",
			"60,000 - 100,000",
			"100,000 - 150,000",
			"Above 150,000",
		],
	},

	// ----- OTHER REQUIREMENTS -----
	{
		label: "License",
		name: "license",
		type: "select",
		required: false,
		options: ["None", "Two-wheeler", "Four-wheeler"],
	},
	{
		label: "Vehicle",
		name: "vehicle",
		type: "select",
		required: false,
		options: ["Not Required", "Required"],
	},
	{
		label: "Skills",
		name: "skills",
		type: "select",
		required: true,
		multiple: true,
		// size:4,
		options: [
			"Communication",
			"Leadership",
			"Teamwork",
			"React",
			"Node.js",
			"UI/UX Design",
			"MS Excel",
			"Customer Service",
			"Time Management",
			"Project Management"
		],
	},

	// ----- TEXTAREAS -----
	{
		label: "Job Description",
		name: "jobDescription",
		type: "textarea",
		required: true,
	},
	{
		label: "Job Specification",
		name: "jobSpecification",
		type: "textarea",
		required: true,
	},
];
