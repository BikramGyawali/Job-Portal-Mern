import React, { useContext, useEffect, useRef } from 'react'
import LoginComp from '../auth/LoginComp'
import NavbarComp from '../../layout/NavbarComp'
import { FooterComp } from '../../layout/FooterComp'
import login from "../../assets/image/login.png";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Jobseekers() {
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
		title: "Welcome to Jobseekers Dashboard",
		explain: "Get started with latest job vacancies in Nepal for free.",
		image: login,
		role: "jobseeker"
	}
	return (
		<div className='overflow-x-hidden'>
			<NavbarComp />
			<LoginComp LoginData={LoginData} />
			<FooterComp />
		</div>
	)
}

export default Jobseekers