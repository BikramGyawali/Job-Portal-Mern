import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const signupUser = async (formData, role) => {
	let url = "";

	if (role === "jobseeker") url = `${BASE_URL}/jobseeker/signup`;
	else if (role === "employer") url = `${BASE_URL}/employer/signup`;
	else throw new Error("Invalid role");

	try {
		const response = await axios.post(url, formData, { withCredentials: true });
		return response.data;
	} catch (error) {
		// Handle network errors or backend errors
		if (error.response && error.response.data) {
			return error.response.data; // Backend returned JSON
		} else {
			return { status: 0, message: error.message || "Signup failed" };
		}
	}
};


export const loginUser = async (formData, role) => {
	let url = "";

	if (role === "jobseeker") url = `${BASE_URL}/jobseeker/login`;
	else if (role === "employer") url = `${BASE_URL}/employer/login`;
	else if (role === "admin") url = `${BASE_URL}/admin/login`;
	else throw new Error("Invalid role");

	try {

		const response = await axios.post(url, formData, {
			withCredentials: true,
		});
		return response.data
	} catch (error) {
		if (error.message) {
			return error.response.data
		}
		throw error
	}
};
