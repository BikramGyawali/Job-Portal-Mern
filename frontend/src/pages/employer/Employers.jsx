import React, { useContext, useEffect, useRef } from 'react'
import LoginComp from '../auth/LoginComp'
import login from "../../assets/image/EmployeLogin.png";

import NavbarComp from '../../layout/NavbarComp';
import { FooterComp } from '../../layout/FooterComp';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Employers() {
	const { logout, state } = useContext(AuthContext)
	const navigate = useNavigate()
	const hasLoggedOut = useRef(false)
	useEffect(() => {

		if (state.isAuth && !hasLoggedOut.current) {
			hasLoggedOut.current = true
			logout()
		}
	}, [])
	const LoginData = {
		title: "Welcome to Employer Dashboard",
		explain: "Get started with finding the right talent from Hamro Job.",
		image: login,
		role: "employer"

	}

	return (
		<div className='overflow-x-hidden'>
			<NavbarComp />
			<LoginComp LoginData={LoginData} />
			<FooterComp />
		</div>
	)
}

export default Employers