import React from 'react'
import LoginComp from '../components/LoginComp'
import login from "../assets/image/EmployeLogin.png";
import register from "../assets/image/EResgister.png";
import NavbarComp from '../components/NavbarComp';
import { FooterComp } from '../components/FooterComp';
function Employers() {
	const LoginData = {
		title: "Welcome to Employer Dashboard",
		explain: "Get started with finding the right talent from Hamro Job.",
		image: login,
		registerImg: register
	}

	return (
		<div>
			<NavbarComp />
			<LoginComp LoginData={LoginData} />
			<FooterComp />
		</div>
	)
}

export default Employers