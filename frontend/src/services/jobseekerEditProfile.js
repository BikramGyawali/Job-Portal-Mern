import api from "../utils/axiosInstance"

export const jobseekerEditProfile = async (formData) => {
	try {
		const res = await api.patch(`/jobseeker/editprofile`, formData, {
			headers: { "Content-Type": "multipart/form-data" }
		});
		if (res.data?.status === 1) {
			return {
				success: true,
				message: "Profile update successfully",
				updatedProfle: res.data?.profileData
			}
			
		}
		return {
			success: false,
			message: res.data?.message
		}
	} catch (error) {
		return {
			success: false,
			message: error?.response?.data?.message || "Failed to update job"
		}
	}
}