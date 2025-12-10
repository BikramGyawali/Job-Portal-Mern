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

export const DashboardHeadData = ["Job Title", "Job Level", "Remainig Days", "Actions"];

export const DashboardBodyData = [{
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

export const CVTitle = ['Objective', 'Education', 'Work Experience', 'Training/Certification', 'Jobs Perference', 'Skills', 'Award', ' Language', 'Personal Information', 'Socail Information', 'Other Information', 'References']

export const Education = [
	{
		section: "Education",
		data: [
			{
				startYear: 2024,
				endYear: "Running",
				degree: "Intermediate (10+2)",
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
	}
];


export const WorkExperience = [
	{
		section: "Work Experience",
		data: [
			{
				company: "Coding Journey",
				position: "Manager",
				employmentType: "Full Time",
				startDate: "2025-12",
				endDate: "2026-01",
				currentlyWorking: false,
				role: "Management",
				location: "Nepal"
			},
			{
				company: "Hamro Jobs",
				position: "Frontend Developer",
				employmentType: "Full Time",
				startDate: "2025-12",
				endDate: null,
				currentlyWorking: true,
				role: "Developer",
				location: "Nepal"
			}
		]
	}
];


export const TrainingCertificates = [
	{
		section: "Training / Certificates",
		data: [
			{
				year: "2025",
				title: "Figma",
				provider: "Unibytes",
				type: "Training",
				credentialId: null,
				credentialUrl: null
			}
		]
	}
];


export const JobPreference = {
	section: "Job Preference",
	lookingFor: "Part Time",
	jobCategories: ["Admin"],
	availableFor: "Part Time"
};

export const Skills = {
	section: "Skills",
	items: ["Figma", "Canva", "Livewire"]
};
export const Awards = {
	section: "Awards",
	data: [
		{
			title: "Code For Change Hackathon",
			achievement: "Participant",
			year: 2025
		}
	]
};

export const Languages = {
	section: "Languages",
	data: [
		{
			language: "Nepali",
			proficiency: {
				reading: "Good",
				writing: "Good",
				speaking: "Good"
			}
		}
	]
};


export const PersonalInformation = {
	section: "Personal Information",
	details: {
		gender: "Male",
		currentAddress: "Dhugedhara, Nagarjun, Kathmandu",
		permanentAddress: "Tansingal, Rainadevi Chhahara, Palpa",
		maritalStatus: "Unmarried"
	}
};

export const SocialAccounts = {
	section: "Social Accounts",
	accounts: [
		{
			platform: "Bikram Gyawali",
			handle: "BikraGyawali"
		}
	]
};

export const OtherInformation = {
	section: "Other Information",
	details: [
		{ label: "License", value: "Yes" },
		{ label: "Vehicle", value: "No" }
	]
};

export const References = {
	section: "References",
	details: [
		{
			name: "Bikram",
			designation: "Developer",
			company: "Change",
			contact: "hamrojobs@gmail.com"
		}
	]
};
