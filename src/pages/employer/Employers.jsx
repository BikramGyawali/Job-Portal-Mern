import React from 'react'
import LoginComp from '../auth/LoginComp'
import login from "../../assets/image/EmployeLogin.png";

import NavbarComp from '../../layout/NavbarComp';
import { FooterComp } from '../../layout/FooterComp';
function Employers() {
	const LoginData = {
		title: "Welcome to Employer Dashboard",
		explain: "Get started with finding the right talent from Hamro Job.",
		image: login,
		role: "employers"

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