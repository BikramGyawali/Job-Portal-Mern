import React from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'
import { loginUser } from '../utils/userapi'
import { useEffect } from 'react'

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
				const res = await axios.get("http://localhost:3000/auth/me", { withCredentials: true });
				dispatch({
					type: "LOGIN",
					payload: res.data

				});
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

