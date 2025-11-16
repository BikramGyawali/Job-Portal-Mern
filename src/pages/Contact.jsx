import React from 'react'
import BackgroundSection from '../components/BackgroundSection'
import { FooterComp } from '../components/FooterComp'

function Contact() {
	const title = "Get in Touch With"
	const explain = "Get in Touch With Hamro Job"
	return (
		<>
			<BackgroundSection title={title} explain={explain} />
			<FooterComp />
		</>
	)
}

export default Contact