import { createContext, useEffect, useState } from "react";
import api from '../utils/axiosInstance'
export const JobPostContext = createContext();

export const JobPostProvider = ({ children }) => {
	const [job, setJob] = useState(null)
	useEffect(() => {
		const fechdata = async () => {
			try {
				const response = await api.post("/job/create");
				if (response.status === 200 || response.status === 201) {
					alert("Job created successfully")
				}
			} catch (error) {
				console.log(error);

				alert(response.data.message)
			}
		}
		fechdata()
	}, [])

	return (
		<JobPostProvider.Provider value={{ job, setJob }}>
			{children}
		</JobPostProvider.Provider>
	)
}

