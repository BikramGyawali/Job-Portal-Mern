import { useContext } from "react";

import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import api from "../utils/axiosInstance";
import { ProfileToCV } from "../utils/ProfileToCV";


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
				const res = api.get(`${authState.role}/profile`);
				setProfile(ProfileToCV(res.data.profile));
			} catch (error) {
				setProfile(null)
			} finally {
				setLoading(false)
			}

		}
		fetchData();
	}, [authState.isAuth, authState.role])
	return (
		<ProfileContext.Provider value={{ profile, setProfile, loading }}>
			{children}
		</ProfileContext.Provider>
	)
}

