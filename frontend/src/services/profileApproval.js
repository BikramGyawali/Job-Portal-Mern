
import api from "../utils/axiosInstance"

export const getPendingProfilesService = async () => {
	try {
		const res = await api.get("/admin/pending-profile");

		if (res.data?.status === 1) {
			// console.log(res.data?.profiles);
			return {
				success: true,
				profiles: res.data?.profiles
			}
		} else {
			return {
				success: false,
				error: res.data?.message
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}


//update profile status

export const updateProfileApporvalService = async (profileId, status) => {
	try {
		const res = await api.patch(`/admin/profile/${profileId}`, { status })

		if (res.data?.status === 1) {
			return {
				status: true,
				user: res.data?.user
			}
		}
		else {
			return {
				status: false,
				error: res.error?.message
			}
		}
	} catch (error) {
		return {
			status: false,
			error: error?.message
		}
	}
}
