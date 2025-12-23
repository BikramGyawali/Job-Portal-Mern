import React from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'
import { loginUser } from '../utils/userapi'
import { useEffect } from 'react'

export const AuthContext = createContext()
const initialState = {
	isAuth: false,
	role: null,
	user: null
}

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				isAuth: true,
				role: action.payload.role,
				user: action.payload.user
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
				const res = await axios.get("/auth/me", { withCredentials: true });
				dispatch({
					type: "LOGIN",
					payload: {
						role: res.data.role,
						user: res.data.user
					}
				});
			} catch {
				dispatch({ type: "LOGOUT" });
			}
		};
		checkAuth();
	}, []);
	return (

		<AuthContext.Provider value={{ state }}>
			{children}
		</AuthContext.Provider>


	)
}

