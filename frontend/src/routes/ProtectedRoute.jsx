import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


const roleLoginMap = {
	employer: "/employers",
	jobseeker: "/jobseekers",
	admin: "/admins"
}
function ProtectedRoute({ allowedRole }) {
	const { state } = useContext(AuthContext);

	if (!state.isAuth) {
		return <Navigate to={`/${roleLoginMap[allowedRole]}`} replace />;
	}
	// if (!state.isProfileCompleted) {
	// 	return <Navigate to={`/${state.role}-profile`} replace />;
	// }
	// if (state.isProfileCompleted) {
	// 	return <Navigate to={`/${allowedRole}s`} replace />;
	// }
	if (allowedRole && state.role !== allowedRole) {
		return <Navigate to={`/${state.role}`} replace />;
	}

	return <Outlet />;
}


export default ProtectedRoute