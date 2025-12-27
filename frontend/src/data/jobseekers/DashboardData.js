export const JDashboardCardData = [
	{
		number: "1",
		content: "Job Applied"
	},
	{
		number: "20",
		content: "Profile"
	},
	{
		number: "30",
		content: "Pending"
	},
	{
		number: "69",
		content: "Short Listed "
	}
]

export const DashboardHeadData = ["S.N","Job Title", "Job Level", "Remainig Days", "Actions"];

export const DashboardBodyData = [{
	"S.N":"1",
	"Job Title": "Front-End Developer",
	"Job Level": "Middle",
	"Remainig Days": "16",
	"Actions": ["view"]
}]
export const ListingTitle = ["No. of Openings",
	"Industry",
	"Category",
	"Location",
	"Job Level",
	"Salary",
	"Education Level",
	"Desired Candidate",
	"Experience",
	"Expiry Date",
	"Skills"]

export const JobListingData = [
	{
		"No. of Openings": "2",
		"Industry": "IT & Software",
		"Category": "Web Development / Frontend",
		"Location": "Kathmandu District",
		"Job Level": "Mid Level",
		"Salary": "Nrs. 60,000 – 80,000 (Negotiable)",
		"Education Level": "Bachelors in Computer Science / IT",
		"Desired Candidate": "Male / Female",
		"Experience": "2 + years",
		"Expiry Date": "Dec 25, 2025 (17 days left)",
		"Skills":
			"HTML, CSS, JavaScript, React, Tailwind CSS, Git, Responsive Design"
	}
];

//for description 
export const jobData = [
	{
		title: "Job Description",
		content:
			"We are seeking a skilled Front-End Developer to design and implement modern user interfaces. The ideal candidate should have strong knowledge of HTML, CSS, JavaScript, and React, and be passionate about building responsive and user-friendly web applications."
	},
	{
		title: "Job Specification",
		content:
			"Strong understanding of React, Tailwind CSS, REST APIs, and version control systems. Ability to translate UI/UX designs into clean, efficient code. Experience working in Agile teams is a plus."
	}
];

//for cv 
import logo from "../../assets/image/logo.png";
export const 	CVSections = [
	{
		section: "Personal Header",
		type: "header",
		data: {
			name: "Bikram Gyawali",
			profileImage: logo,
			address: "Dhungedhara",
			contact: "9745923376",
			email: "gyawalibikram7@gmail.com",
			dateOfBirth: "May 29, 2006",
			experience: "Fresher"
		}
	},
	{
		section: "Objective",
		type: "text",
		data: "I am a software developer and a student, so I want a part-time job. For now, I am building a job portal, so I am studying your system."
	},
	{
		section: "Education",
		type: "table",
		data: [
			{
				startYear: 2024,
				endYear: "Running",
				degree: "Intermediate (+2)",
				field: "Management",
				cgpa: 3.6,
				institution: "Ramapur Secondary School",
				boardOrUniversity: "NEB",
				location: "Ramapur"
			},
			{
				startYear: 2020,
				endYear: 2025,
				degree: "Bachelor",
				field: "Computer Application",
				cgpa: 3.6,
				institution: "Saraswati Multiple Campus",
				boardOrUniversity: "Tribhuwan University",
				location: "Kathmandu"
			}
		]
	},
	{
		section: "Work Experience",
		type: "table",
		data: [
			{
				company: "Coding Journey",
				position: "Manager",
				employmentType: "Full Time",
				startYear: "Dec, 2025",
				endYear: "Jan, 2026",
				currentlyWorking: false,
				role: "Management",
				location: "Nepal"
			},
			{
				company: "Hamro Jobs",
				position: "Frontend Developer",
				employmentType: "Full Time",
				startYear: "Dec, 2025",
				endYear: "Running",
				currentlyWorking: true,
				role: "Developer",
				location: "Nepal"
			}
		]
	},
	{
		section: "Training / Certificates",
		type: "list",
		data: [
			{
				year: "2025",
				title: "Figma",
				provider: "Unibytes",
				type: "Training"
			}
		]
	},
	{
		section: "Job Preference",
		type: "keyValue",
		data: [
			{ label: "Looking for", value: "Part Time" },
			{ label: "Job Categories", value: "Admin" },
			{ label: "Available for", value: "Part Time" }
		]
	},
	{
		section: "Skills",
		type: "tags",
		data: ["Figma", "Canva", "Livewire"]
	},
	{
		section: "Awards",
		type: "list",
		data: [
			{ title: "Code For Change Hackathon", achievement: "Participant", year: 2025 }
		]
	},
	{
		section: "Languages",
		type: "table",
		data: [
			{
				language: "Nepali",
				reading: "Good",
				writing: "Good",
				speaking: "Good"
			}
		]
	},
	{
		section: "Personal Information",
		type: "keyValue",
		data: [
			{ label: "Gender", value: "Male" },
			{ label: "Current Address", value: "Dhugedhara, Nagarjun, Kathmandu" },
			{ label: "Permanent Address", value: "Tansingal, Rainadevi Chhahara, Palpa" },
			{ label: "Marital Status", value: "Unmarried" }
		]
	},
	{
		section: "Social Accounts",
		type: "list",
		data: [
			{ platform: "Bikram Gyawali", handle: "BikraGyawali" }
		]
	},
	{
		section: "Other Information",
		type: "keyValue",
		data: [
			{ label: "License", value: "Yes" },
			{ label: "Vehicle", value: "No" }
		]
	},
	{
		section: "References",
		type: "table",
		data: [
			{
				name: "Bikram",
				designation: "Developer",
				company: "Hamro Job",
				contact: "hamrojobs@gmail.com"
			}
		]
	}
];

