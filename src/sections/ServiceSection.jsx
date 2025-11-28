import React from 'react'
import jobPost from "../assets/image/jobs.jpeg";
import resume from "../assets/image/resume.webp";
import jobAlert from "../assets/image/jobsAlert.jpg";
import InfoSection from '../components/common/InfoSection';
import BackgroundSection from '../components/common/BackgroundSection';
function ServiceSection() {
	const section = [
		{
			title: "Job Posting",
			description: "We offer a platform for employers to post job vacancies and reach a wide audience of potential candidates across Nepal. Jobs are categorized by industry and experience level, ensuring the right match for every role.",
			image: jobPost

		},
		{
			title: "Resume Database Access",
			description: "Employers can access our extensive resume database to find the best candidates for their job openings. Advanced filters help them search by skills, education, experience, and location to quickly identify top talent.",
			image: resume
		},
		{
			title: "Jobs Alert",
			description: "Jobseekers can sign up for job alerts to receive notifications about new job postings that match their preferences. Alerts can be customized by job title, location, industry, and experience level, ensuring timely updates.",
			image: jobAlert
		}

	]
	const title = "Our Services at";
	const explain = "We provide a range of services to help jobseekers and employers connect easily and effectively"
	return (
		<>

			<BackgroundSection title={title} explain={explain} />

			<p className='text-3xl font-bold text-fuchsia-600 text-center'>Our Services</p>
			<InfoSection section={section} />

		</>
	)
}

export default ServiceSection