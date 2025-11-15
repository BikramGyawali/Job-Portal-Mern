import React from 'react'
import logo from "../assets/image/logo.png";
import InfoSection from '../components/InfoSection';
function ServiceSection() {
	const section = [
		{
			title: "Job Posting",
			description: "We offer a platform for employers to post job vacancies and reach a wide audience of potential candidates across Nepal. Jobs are categorized by industry and experience level, ensuring the right match for every role.",
			image: logo

		},
		{
			title: "Resume Database Access",
			description: "Employers can access our extensive resume database to find the best candidates for their job openings. Advanced filters help them search by skills, education, experience, and location to quickly identify top talent."
		},
		{
			title: "Jobs Alert",
			description: "Jobseekers can sign up for job alerts to receive notifications about new job postings that match their preferences. Alerts can be customized by job title, location, industry, and experience level, ensuring timely updates."
		}

	]
	return <InfoSection section={section} />
}

export default ServiceSection