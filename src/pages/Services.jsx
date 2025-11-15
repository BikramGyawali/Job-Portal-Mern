import React from 'react'
import NavbarComp from '../components/NavbarComp'
import ServiceSection from '../sections/ServiceSection'
import { FooterComp } from '../components/FooterComp'

function Services() {
	return (
		<div>
			<NavbarComp />
			<ServiceSection />
			<FooterComp />
		</div>
	)
}

export default Services