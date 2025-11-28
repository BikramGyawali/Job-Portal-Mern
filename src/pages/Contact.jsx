import React from 'react'
import BackgroundSection from '../components/BackgroundSection'
import { FooterComp } from '../layout/FooterComp'
import ContactSection from '../sections/ContactSection'

function Contact() {
	const title = "Get in Touch With"
	const explain = "Get in Touch With Hamro Job"
	return (
		<>
			<BackgroundSection title={title} explain={explain} />
			<ContactSection />
			<FooterComp />
		</>
	)
}

export default Contact