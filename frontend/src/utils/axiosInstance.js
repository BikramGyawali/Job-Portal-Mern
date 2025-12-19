import axios from "axios";


const api = axios.create({
	baseURL: "http://localhos:300",
	withCredentials: true
})

api.interceptors.response.use(
	res => res,
	err => {
		if (err.response?.status === 401) {
			window.location.replace('/jobseekers')
		}
		return Promise.reject(err);
	}
);

export default api