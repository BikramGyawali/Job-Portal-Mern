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


	if (!state.isAuth || !state.isProfileCompleted) {
		return <Navigate to={roleLoginMap[allowedRole]} replace />;
	}




	if (allowedRole && state.role !== allowedRole) {
		return <Navigate to={`/${state.role}`} replace />;
	}


	return <Outlet />;
}

export default ProtectedRoute