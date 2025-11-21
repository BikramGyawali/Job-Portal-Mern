export const Education = [
	{ label: "Degree", name: "degree", type: "select", required: true, options: ["Bachelors", "Masters", "Diploma", "Plus Two", "SEE"] },
	{ label: "Field of Study", name: "fieldOfStudy", type: "select", required: true, options: ["Computer Science", "IT & Software", "Management", "Humanities", "Engineering", "Education", "Medical", "Law"] },
	{ label: "Institution", name: "institution", type: "text", required: true, placeholder: "Sarswati Multiple Campus" },
	{ label: "University / Board", name: "university", type: "select", required: true, options: ["Tribhuwan University", "Pokhara University", "Kathmandu University", "Purwanchal University", "NEB (for +2)"] },
	{ label: "Grading Type", name: "gradingType", type: "select", required: true, options: ["GPA", "CGPA", "Percentage"] },
	{ label: "Grade / Score", name: "score", type: "number", required: true, placeholder: "3.6" },
	{ label: "CGPA Scale", name: "cgpaScale", type: "select", required: false, options: ["4.0 Points", "10 Points"] },
	{ label: "Joined Year", name: "joinedYear", type: "number", required: true, placeholder: "2020" },
	{ label: "Passed Year", name: "passedYear", type: "number", required: true, placeholder: "2024" }
];
