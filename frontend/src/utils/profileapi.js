import axios from "axios";

const BASE_URL = "https://hamrojob-backend.onrender.com"


export const Profile = async (formData, role) => {
	let url = "";

	if (role === "jobseeker") url = `${BASE_URL}/jobseeker/profile`;
	else if (role === "employer") url = `${BASE_URL}/employer/profile`;
	else throw new Error("Invalid role");

	try {
		const response = await axios.post(url, formData, {
			headers: { "Content-Type": "multipart/form-data" },
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		if (error.response?.data) {
			return error.response.data;
		}
		return { status: 0, message: error.message || "Failed to create profile" };
	}
};
