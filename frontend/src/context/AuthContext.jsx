import React from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()
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
			break;
		case "LOGOUT":
			return initialState;
		default:
			return state
	}
}

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialState)
	return (

		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>


	)
}

