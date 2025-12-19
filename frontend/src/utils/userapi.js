import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const signupUser = async (formData, role) => {
	let url = "";

	if (role === "jobseeker") url = `${BASE_URL}/jobseeker/signup`;
	else if (role === "employer") url = `${BASE_URL}/employer/signup`;
	else throw new Error("Invalid role");

	const response = await axios.post(url, formData, {
		withCredentials: true,
	});

	return response.data;
};

export const loginUser = async (formData, role) => {
	let url = "";

	if (role === "jobseeker") url = `${BASE_URL}/jobseeker/login`;
	else if (role === "employer") url = `${BASE_URL}/employer/login`;
	else if (role === "admin") url = `${BASE_URL}/admin/login`;
	else throw new Error("Invalid role");

	const response = await axios.post(url, formData, {
		withCredentials: true,
	});

	return response.data;
};
