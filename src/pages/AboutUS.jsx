import React from 'react'
import NavbarComp from '../components/NavbarComp'
import BackgroundSection from '../components/BackgroundSection'
import AboutSection from '../sections/AboutSection';

function AboutUS() {
	const title = "Trusted Job Provider for Nepali People - ";
	const explain = "Helping Nepali jobseekers find the right opportunities."

	return (
		<div>

			<BackgroundSection title={title} explain={explain} />
			<AboutSection />
		</div>
	)
}

export default AboutUS