// import React from 'react'
// import logo from "../assets/image/another.jpeg";
// import InfoSection from '../components/common/InfoSection'
// import BackgroundSection from '../components/common/BackgroundSection';

// function AboutSection() {
// 	const section = [
// 		{
// 			title: "Discover Top Online Jobs in Nepal with Hamro Job",
// 			description: "At Hamro Job, we make your job search smarter and easier. Whether you're in Kathmandu, Pokhara, Lalitpur, or anywhere in Nepal, our platform connects you to thousands of verified online job listings from leading employers. With a sleek, user-friendly interface and real-time updates, finding your next opportunity has never been more seamless."
// 		},
// 		{
// 			title: "Early Growth and Funding",
// 			description: "After launching, Hamro Job quickly gained traction among Nepali jobseekers and employers alike. Within the first year, we saw rapid user growth through word-of-mouth and community engagement. Our commitment to trust and transparency helped us build a loyal user base."
// 		},
// 		{
// 			title: "Our Founding Story",
// 			description: "Hamro Job was established with a clear mission — to bridge the gap between talented Nepali jobseekers and meaningful employment opportunities. What began as a small initiative has grown into a trusted platform serving thousands across Nepal, driven by a commitment to empower individuals through accessible, reliable, and verified online job listings.",
// 			image: logo
// 		}
// 	];
// 	const title = "Trusted Job Provider for Nepali People"
// 	const explain = "Helping Nepali jobseekers find the right opportunities."

// 	return (
// 		<>
// 			<BackgroundSection title={title} explain={explain} />
// 			<InfoSection section={section} />
// 		</>
// 	)
// }

// export default AboutSection;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import logo from "../assets/image/another.jpeg";
import InfoSection from '../components/common/InfoSection';
import BackgroundSection from '../components/common/BackgroundSection';

function AboutSection() {
	const section = [
		{
			title: "Discover Top Online Jobs in Nepal with Hamro Job",
			description: "At Hamro Job, we make your job search smarter and easier. Whether you're in Kathmandu, Pokhara, Lalitpur, or anywhere in Nepal, our platform connects you to thousands of verified online job listings from leading employers."
		},
		{
			title: "Early Growth and Funding",
			description: "After launching, Hamro Job quickly gained traction among Nepali jobseekers and employers alike. Our commitment to trust and transparency helped us build a loyal user base."
		},
		{
			title: "Our Founding Story",
			description: "Hamro Job was established with a clear mission — to bridge the gap between talented Nepali jobseekers and meaningful employment opportunities.",
			image: logo
		}
	];

	return (
		<>
			<Helmet>
				<title>About Us – Hamro Job | Nepal's Trusted Job Portal</title>
				<meta name="description" content="Learn about Hamro Job — Nepal's trusted job portal since 2014. We connect Nepali job seekers with verified employers across Kathmandu, Pokhara, and all of Nepal." />
				<meta name="keywords" content="about Hamro Job, Nepal job portal, Nepali jobs platform, HR consulting Nepal" />
				<link rel="canonical" href="https://hamrojob.bikramgyawali.com.np/about" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hamrojob.bikramgyawali.com.np/about" />
				<meta property="og:title" content="About Us – Hamro Job | Nepal's Trusted Job Portal" />
				<meta property="og:description" content="Hamro Job connects Nepali job seekers with verified employers across Nepal." />
				<meta property="og:image" content="https://hamrojob.bikramgyawali.com.np/logo.png" />
			</Helmet>

			<BackgroundSection title="Trusted Job Provider for Nepali People" explain="Helping Nepali jobseekers find the right opportunities." />
			<InfoSection section={section} />
		</>
	);
}

export default AboutSection;