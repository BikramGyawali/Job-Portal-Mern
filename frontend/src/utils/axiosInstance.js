import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

//  These are BACKEND API urls not frontend paths
const skipAuthRedirectUrls = [
	'/jobseeker/login',
	'/employer/login',
	'/admin/login',
	'/jobseeker/signup',
	'/employer/signup',
	'/auth/me',
	'/auth/logout'
]

const loginPaths = ['/jobseekers', '/employers', '/admins', '/']

api.interceptors.response.use(
	res => res,
	err => {
		const shouldSkip = skipAuthRedirectUrls.some(url =>
			err.config?.url?.includes(url)
		)
		const isAlreadyOnLoginPage = loginPaths.includes(
			window.location.pathname
		)

		if (
			err.response?.status === 401 &&
			!shouldSkip &&
			!isAlreadyOnLoginPage
		) {
			window.location.replace('/jobseekers')
		}

		return Promise.reject(err)
	}
);

export default api