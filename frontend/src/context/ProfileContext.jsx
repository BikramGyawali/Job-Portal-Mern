import { useContext } from "react";

import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import api from "../utils/axiosInstance";
import { getPendingProfilesService } from "../services/profileApproval";

// import { getPendingProfile } from "../../../backend/src/controllers/Profile/ProfileApproval.js";



export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const { state: authState } = useContext(AuthContext)
	const [profile, setProfile] = useState(null)
	const [pendingProfile, setPendingProfile] = useState([])
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			if (!authState.isAuth) {
				setProfile(null)
				setLoading(false)
				return
			}
			if (authState.role === "admin") {
				setProfile(null);
				setLoading(false);
				return;
			}
			setLoading(true)
			try {
				const res = await api.get(`/${authState.role}/profile`);
				console.log(res);

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

	//for the pending profiles
	const fetchPendingProfile = async () => {
		setLoading(true)
		try {
			const result = await getPendingProfilesService();
			if (result.success) {	
				setPendingProfile(result.profiles)
			}

		} catch (error) {
			console.log("failed to fetched data" + error);

		} finally {
			setLoading(false)

		}
	}
	return (
		<ProfileContext.Provider value={{ profile, setProfile, loading, fetchPendingProfile, pendingProfile }}>
			{children}
		</ProfileContext.Provider>
	)
}

