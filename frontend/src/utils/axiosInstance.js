


import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000",
	withCredentials: true,  // sends cookies with every request
	headers: {
		"Content-Type": "application/json"
	}
})

const loginUrls = [
	'/jobseeker/login',
	'/employer/login',
	'/admin/login'
]

const signupUrls = [
	'/jobseeker/signup',
	'/employer/signup',
]

const loginPaths = ['/jobseekers', '/employers', '/admin-login']

api.interceptors.response.use(
	res => res,
	err => {
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
			!isAlreadyOnLoginPage
		) {
			window.location.replace('/jobseekers')
		}

		return Promise.reject(err)
	}
);

export default api