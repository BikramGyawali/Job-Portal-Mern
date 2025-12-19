import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


const roleLoginMap = {
	employer: "/employers",
	jobseeker: "/jobseekers",
	admin: "/admin-login"
}
function ProtectedRoute({ allowedRole }) {
	const { state } = useContext(AuthContext)
	const { isAuth, role } = state;
	if (!isAuth) {
		return <Navigate to={roleLoginMap[allowedRole]} replace />
	}
	if (allowedRole && role !== allowedRole) {
		return <Navigate to={roleLoginMap[role]} replace />
	}
	return (

		<Outlet />

	)
}

export default ProtectedRoute