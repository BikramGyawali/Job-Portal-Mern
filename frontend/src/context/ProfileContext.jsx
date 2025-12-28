import { useContext } from "react";

import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import api from "../utils/axiosInstance";



export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const { state: authState } = useContext(AuthContext)
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			if (!authState.isAuth) {
				setProfile(null)
				setLoading(false)
				return
			}

			try {
				const res = await api.get(`/${authState.role}/profile`);
				// console.log(res);

				// API returns { status: 1, profile }
				setProfile(res.data?.profile || null);
			} catch (error) {
				setProfile(null)
			} finally {
				setLoading(false)
			}

		}
		fetchData();
	}, [authState.isAuth, authState.role])  //run if the user role is change and the state as login or logout chnages 
	return (
		<ProfileContext.Provider value={{ profile, setProfile, loading }}>
			{children}
		</ProfileContext.Provider>
	)
}

