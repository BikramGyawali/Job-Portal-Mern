
import api from "../utils/axiosInstance"

export const getPendingProfiles = async () => {
	try {
		const res = await api.get("/admin//pending-profile");

		if (res.data?.status === 1) {
			return {
				status: true,
				profiles: res.data?.profile
			}
		} else {
			return {
				status: false,
				error: res.data?.message
			}
		}
	} catch (error) {
		return {
			status: false,
			error: error.message
		}
	}
}

//update profile status

export const updateProfileApporval=async(profileId)=>{
 try {
	 const res= await api.patch(`/admin/profile/${profileId}`)

	 if(res.data?.status===1){
		return{
			status:true,
			profiles:res.data?.profile
		}
	 }
 } catch (error) {
	
 }
}
