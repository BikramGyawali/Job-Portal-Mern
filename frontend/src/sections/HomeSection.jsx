// import React from 'react'
// import InfoSection from '../components/common/InfoSection'


// function HomeSection() {
// 	const section = [{
// 		title: "Find Top Jobs in Nepal with Hamro Job",
// 		description: "Looking for the best job opportunities in Nepal? Hamro Job offers over 10,000+ jobs across a wide range of industries, connecting job seekers to leading employers nationwide. Whether you are based in Kathmandu, Pokhara, Bhaktapur, Lalitpur, or anywhere across Nepal, Hamro Job is your trusted platform to find the right career opportunities. With a modern, user-friendly interface, starting your career journey has never been easier."
// 	},
// 	{
// 		title: "Job Vacancies in Kathmandu",
// 		description: "Hamro Job is the leading platform for job seekers in Kathmandu, offering thousands of job openings across various sectors. Whether you are seeking full-time, part-time, freelance, or internship roles, Hamro Job caters to your needs. We support both fresh graduates and experienced professionals, offering opportunities that align with diverse skill sets, ambitions, and career goals."
// 	},
// 	{
// 		title: "Ready to Find Your Next Job in Nepal?",
// 		description: "Start your career journey today with Hamro Job! Create a free account, upload your resume, and begin applying to thousands of job opportunities with just a few clicks. Whether you’re seeking jobs in Kathmandu, Pokhara, Lalitpur, Bhaktapur, or any other region across Nepal, Hamro Job is here to help you connect with the right career path. Your dream job is just a click away — register with Hamro Job and take the first step toward a brighter future."
// 	}
// 	]

// 	return (
// 		<>
// 			<InfoSection section={section} />
// 		</>
// 	)
// }

// export default HomeSection

import React from 'react';
import { Helmet } from 'react-helmet-async';
import InfoSection from '../components/common/InfoSection';

function HomeSection() {
	const section = [
		{
			title: "Find Top Jobs in Nepal with Hamro Job",
			description: "Looking for the best job opportunities in Nepal? Hamro Job offers over 10,000+ jobs across a wide range of industries, connecting job seekers to leading employers nationwide. Whether you are based in Kathmandu, Pokhara, Bhaktapur, Lalitpur, or anywhere across Nepal, Hamro Job is your trusted platform to find the right career opportunities."
		},
		{
			title: "Job Vacancies in Kathmandu",
			description: "Hamro Job is the leading platform for job seekers in Kathmandu, offering thousands of job openings across various sectors. Whether you are seeking full-time, part-time, freelance, or internship roles, Hamro Job caters to your needs."
		},
		{
			title: "Ready to Find Your Next Job in Nepal?",
			description: "Start your career journey today with Hamro Job! Create a free account, upload your resume, and begin applying to thousands of job opportunities with just a few clicks."
		}
	];

	// JSON-LD — makes Google show a search box directly in your search result
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Hamro Job",
		"url": "https://hamrojob.bikramgyawali.com.np",
		"description": "Nepal's trusted online job portal connecting job seekers and employers.",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://hamrojob.bikramgyawali.com.np/jobs?q={search_term_string}"
			},
			"query-input": "required name=search_term_string"
		}
	};

	return (
		<>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Helmet>
			<InfoSection section={section} />
		</>
	);
}

export default HomeSection;