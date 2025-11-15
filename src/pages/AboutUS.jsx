import React from 'react'

import BackgroundSection from '../components/BackgroundSection'
import AboutSection from '../sections/AboutSection';
import Explainaton from '../components/Explainaton';
import { FooterComp } from '../components/FooterComp';

function AboutUS() {
	const title = "Trusted Job Provider for Nepali People - ";
	const explain = "Helping Nepali jobseekers find the right opportunities."

	return (
		<div>

			<BackgroundSection title={title} explain={explain} />
			<AboutSection />
			<Explainaton />
			<FooterComp />
		</div>
	)
}

export default AboutUS