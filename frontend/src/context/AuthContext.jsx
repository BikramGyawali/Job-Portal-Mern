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
				if (res.data?.status === 1 && res.data.user) {
					dispatch({
						type: "LOGIN",
						payload: {
							role: res.data.user.role,
							user: res.data.user.user,
							isProfileCompleted: res.data.user.isProfileCompleted,
						},
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
	return (

		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>


	)
}

