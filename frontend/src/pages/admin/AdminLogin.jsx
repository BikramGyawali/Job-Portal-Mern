import React from 'react'
import login from "../../assets/image/EmployeLogin.png";
import NavbarComp from '../../layout/NavbarComp';
import LoginComp from '../auth/LoginComp';
import { FooterComp } from '../../layout/FooterComp';

function AdminLogin() {
	const LoginData = {
		title: "Welcome to Admin Dashboard",
		explain: "Get started with Controlling all functionality.",
		image: login,
		role: "admin"

	}
	return (
		<div>
			<NavbarComp />
			<LoginComp LoginData={LoginData} />
			<FooterComp />
		</div>
	)
}

export default AdminLogin