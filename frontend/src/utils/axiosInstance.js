import axios from "axios";

const isProduction = process.env.NODE_ENV;
const api = axios.create({
<<<<<<< HEAD

	baseURL: isProduction ? "https://hamrojob-backend.onrender.com" : "http://localhost:3000",
	// baseURL: "https://hamrojob-backend.onrender.com/",
	withCredentials: true,  // sends cookies with every request
=======
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	withCredentials: true,
>>>>>>> feature
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
<<<<<<< HEAD
		const isLoginRequest = loginUrls.some(url => err.config?.url?.includes(url))
		const isSignupRequest = signupUrls.some(url =>
			err.config?.url?.includes(url))
		const isAuthMe = err.config?.url === '/auth/me'
		const isAlreadyOnLoginPage = loginPaths.includes(window.location.pathname)

		if (
			err.response?.status === 401 &&
			!isAuthMe &&
			!isLoginRequest &&
			!isSignupRequest &&
=======
		const shouldSkip = skipAuthRedirectUrls.some(url =>
			err.config?.url?.includes(url)
		)
		const isAlreadyOnLoginPage = loginPaths.includes(
			window.location.pathname
		)

		if (
			err.response?.status === 401 &&
			!shouldSkip &&
>>>>>>> feature
			!isAlreadyOnLoginPage
		) {
			window.location.replace('/jobseekers')
		}

		return Promise.reject(err)
	}
);

export default api