import axios from "axios";


const api = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true
})

api.interceptors.response.use(
	res => res,
	err => {
		
		const loginPaths = ['/jobseekers', '/employers', '/admin-login'];
		if (err.response?.status === 401) {
			if (err.config?.url !== '/auth/me' && !loginPaths.includes(window.location.pathname)) {
				window.location.replace('/jobseekers');
			}
		}
		return Promise.reject(err);
	}
);

export default api