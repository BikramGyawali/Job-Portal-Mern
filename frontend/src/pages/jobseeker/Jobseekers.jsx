import React from 'react'
import LoginComp from '../auth/LoginComp'
import NavbarComp from '../../layout/NavbarComp'
import { FooterComp } from '../../layout/FooterComp'
import login from "../../assets/image/login.png";
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