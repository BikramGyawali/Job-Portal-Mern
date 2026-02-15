import React from 'react'
import { useReducer, useEffect } from 'react'
import { createContext } from 'react'
import api from '../utils/axiosInstance'

export const AuthContext = createContext()
const initialState = {
	isAuth: false,
	role: null,
	user: null,
	isProfileCompleted: false
}
const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				isAuth: true,
				role: action.payload.role,
				user: action.payload.user,
				isProfileCompleted: action.payload.isProfileCompleted
			}
		case "LOGOUT":
			return initialState;
		default:
			return state
	}
}
export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialState)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await api.get("/auth/me");
				if (res.data?.status === 1) {

					// normalize payload similar to login response
					// dispatch({
					// 	type: "LOGIN",
					// 	payload: {
					// 		role: res.data.role || res.data.user?.role,
					// 		user: res.data.user || (res.data.user ? res.data.user : { _id: res.data.user?.id, email: res.data.user?.email }),
					// 		isProfileCompleted: res.data.isProfileCompleted ?? res.data.user?.isProfileCompleted ?? false,
					// 	},
					const user = res.data.user ?? null;
					dispatch({
						type: "LOGIN",
						payload: {
							role: user?.role || res.data.role,
							user: user || null,
							isProfileCompleted: res.data.isProfileCompleted ?? user?.isProfileCompleted ?? false
						}
					});
				} else {
					dispatch({ type: "LOGOUT" });
				}
			} catch {
				dispatch({ type: "LOGOUT" });
			}
		};
		checkAuth();
	}, []);

	const logout = async () => {
		try {
			await api.post('/auth/logout');  //this api will clear the cookies 
		} catch (e) {
			// ignore
		}
		dispatch({ type: 'LOGOUT' });
	}

	return (

		<AuthContext.Provider value={{ state, dispatch, logout }}>
			{children}
		</AuthContext.Provider>


	)
}

