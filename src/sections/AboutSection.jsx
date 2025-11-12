import React from 'react'
import Description from '../components/Description'

function AboutSection() {
	const section = [{
		title: "Discover Top Online Jobs in Nepal with Hamro Job",
		description: "At Hamro Job, we make your job search smarter and easier. Whether you're in Kathmandu, Pokhara, Lalitpur, or anywhere in Nepal, our platform connects you to thousands of verified online job listings from leading employers. With a sleek, user-friendly interface and real-time updates, finding your next opportunity has never been more seamless."
	}]
	return (
		<div>
			<Description section={section} />
		</div>
	)
}

export default AboutSection