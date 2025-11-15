import React from 'react'
import logo from "../assets/image/logo.png";
import InfoSection from '../components/InfoSection'
import BackgroundSection from '../components/BackgroundSection';

function AboutSection() {
	const section = [
		{
			title: "Discover Top Online Jobs in Nepal with Hamro Job",
			description: "At Hamro Job, we make your job search smarter and easier. Whether you're in Kathmandu, Pokhara, Lalitpur, or anywhere in Nepal, our platform connects you to thousands of verified online job listings from leading employers. With a sleek, user-friendly interface and real-time updates, finding your next opportunity has never been more seamless."
		},
		{
			title: "Early Growth and Funding",
			description: "After launching, Hamro Job quickly gained traction among Nepali jobseekers and employers alike. Within the first year, we saw rapid user growth through word-of-mouth and community engagement. Our commitment to trust and transparency helped us build a loyal user base."
		},
		{
			title: "Our Founding Story",
			description: "Hamro Job was established with a clear mission — to bridge the gap between talented Nepali jobseekers and meaningful employment opportunities. What began as a small initiative has grown into a trusted platform serving thousands across Nepal, driven by a commitment to empower individuals through accessible, reliable, and verified online job listings.",
			image: logo
		}
	];
	const title = "Trusted Job Provider for Nepali People"
	const explain = "Helping Nepali jobseekers find the right opportunities."

	return (
		<>
			<BackgroundSection title={title} explain={explain} />
			<InfoSection section={section} />
		</>
	)
}

export default AboutSection;
