import axios from "axios";
import api from "./axiosInstance";

// const BASE_URL = "http://localhost:3000";

export const signupUser = async (formData, role) => {
	let url = "";

	if (role === "jobseeker") url = `/jobseeker/signup`;
	else if (role === "employer") url = `/employer/signup`;
	else throw new Error("Invalid role");

	try {
		const response = await api.post(url, formData, { withCredentials: true });


		return response.data;
	} catch (error) {
		// Handle network errors or backend errors
		// if (error.response && error.response.data) {
		// 	return error.response.data; // Backend returned JSON
		// } else {
		// 	return { status: 0, message: error.message || "Signup failed" };
		// }
		return error?.response?.data ?? { status: 0, message: error.message || "Signup failed" };
	}
};


export const loginUser = async (formData, role) => {
	let url = "";
	console.log(role);

	if (role === "jobseeker") url = `/jobseeker/login`;
	else if (role === "employer") url = `/employer/login`;
	else if (role === "admin") url = `/admin/login`;
	else throw new Error("Invalid role");

	try {
		const response = await api.post(url, formData, {
			withCredentials: true, // used to send cookies and http auth with cors.
		});
		console.log(response);
		return response.data;

	} catch (error) {
		// if (error.message) {
		// 	return error.response.data
		// }
		// throw error
		return error?.response?.data ?? { status: 0, message: error.message || "Login failed" };
	}
};
