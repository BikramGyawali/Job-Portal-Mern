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



// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import jobPost from "../assets/image/jobs.jpeg";
// import resume from "../assets/image/resume.webp";
// import jobAlert from "../assets/image/jobsAlert.jpg";
// import InfoSection from '../components/common/InfoSection';
// import BackgroundSection from '../components/common/BackgroundSection';

// function ServiceSection() {
// 	const section = [
// 		{
// 			title: "Job Posting",
// 			description: "We offer a platform for employers to post job vacancies and reach a wide audience of potential candidates across Nepal. Jobs are categorized by industry and experience level, ensuring the right match for every role.",
// 			image: jobPost
// 		},
// 		{
// 			title: "Resume Database Access",
// 			description: "Employers can access our extensive resume database to find the best candidates for their job openings. Advanced filters help them search by skills, education, experience, and location to quickly identify top talent.",
// 			image: resume
// 		},
// 		{
// 			title: "Jobs Alert",
// 			description: "Jobseekers can sign up for job alerts to receive notifications about new job postings that match their preferences. Alerts can be customized by job title, location, industry, and experience level.",
// 			image: jobAlert
// 		}
// 	];

// 	return (
// 		<>
// 			<Helmet>
// 				<title>Our Services – Hamro Job | Job Portal Nepal</title>
// 				<meta name="description" content="Hamro Job offers job posting, resume database access, and job alerts for employers and job seekers across Nepal. Find the right talent or the right job today." />
// 				<meta name="keywords" content="job posting Nepal, resume database Nepal, job alerts Nepal, hire in Nepal, HR services Nepal" />
// 				<link rel="canonical" href="https://hamrojob.bikramgyawali.com.np/services" />
// 				<meta property="og:type" content="website" />
// 				<meta property="og:url" content="https://hamrojob.bikramgyawali.com.np/services" />
// 				<meta property="og:title" content="Our Services – Hamro Job | Job Portal Nepal" />
// 				<meta property="og:description" content="Job posting, resume access, and job alerts — all in one Nepal job portal." />
// 				<meta property="og:image" content="https://hamrojob.bikramgyawali.com.np/logo.png" />
// 			</Helmet>

// 			<BackgroundSection title="Our Services at" explain="We provide a range of services to help jobseekers and employers connect easily and effectively" />
// 			<p className='text-3xl font-bold text-fuchsia-600 text-center'>Our Services</p>
// 			<InfoSection section={section} />
// 		</>
// 	);
// }

// export default ServiceSection;