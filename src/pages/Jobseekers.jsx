import React from 'react'
import LoginComp from '../components/LoginComp'
import NavbarComp from '../components/NavbarComp'
import { FooterComp } from '../components/FooterComp'
import login from "../assets/image/login.png";
function Jobseekers() {
	const LoginData = {
		title: "Welcome to Jobseekers Dashboard",
		explain: "Get started with latest job vacancies in Nepal for free.",
		image: login,
		role: "jobseeker"
	}
	return (
		<div>
			<NavbarComp />
			<LoginComp LoginData={LoginData} />
			<FooterComp />
		</div>
	)
}

export default Jobseekers