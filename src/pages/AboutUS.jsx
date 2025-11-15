import React from 'react'
import BackgroundSection from '../components/BackgroundSection'
import { FooterComp } from '../components/FooterComp'
import AboutSection from '../sections/AboutSection'

function AboutUS() {
	return (
		<div>
			<BackgroundSection
				title="Trusted Job Provider for Nepali People"
				explain="Helping Nepali jobseekers find the right opportunities."
			/>

			{/* Reuse AboutSection from sections folder */}
			<AboutSection />

			<FooterComp />
		</div>
	)
}

export default AboutUS
