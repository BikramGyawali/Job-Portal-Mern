

import React from 'react'
import { useReducer, useEffect } from 'react'
import { createContext } from 'react'
import api from '../utils/axiosInstance'

import Loading from '../components/common/Loading'

export const AuthContext = createContext()

const initialState = {
	isAuth: false,
	role: null,
	user: null,
	isProfileCompleted: false,
	isLoading: true,
}

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				isAuth: true,
				role: action.payload.role,
				email:action.payload.email,
				user: action.payload.user,
				isProfileCompleted: action.payload.isProfileCompleted,
				isLoading: false,
			}
		case "LOGOUT":
			return {
				...initialState,
				isLoading: false,
			}
		case "STOP_LOADING":
			return {
				...state,
				isLoading: false,
			}
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
					const user = res.data.user ?? null;
					dispatch({
						type: "LOGIN",
						payload: {
							role: user?.role || res.data.role,
							user: user || null,
							isProfileCompleted: res.data.isProfileCompleted ?? user?.isProfileCompleted ?? false,
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
			await api.post('/auth/logout');
		} catch (e) {
			// ignore
		}
		dispatch({ type: 'LOGOUT' });
	}

	return (
		<AuthContext.Provider value={{ state, dispatch, logout }}>

			{state.isLoading
				? <Loading message='Loading....' />
				: children
			}
		</AuthContext.Provider>
	)
}