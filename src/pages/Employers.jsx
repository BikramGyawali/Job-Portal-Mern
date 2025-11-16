import React from 'react'
import LoginComp from '../components/LoginComp'
import login from "../assets/image/EmployeLogin.png";
function Employers() {
	const LoginData = {
		title: "Welcome to Employer Dashboard",
		explain: "Get started with finding the right talent from Hamro Job.",
		image: login
	}
	return (
		<div>
			<LoginComp LoginData={LoginData} />
		</div>
	)
}

export default Employers