import React, { useState, useEffect, useContext } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import register from "../../assets/image/EResgister.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonComp from '../../components/common/ButtonComp';
import NavbarComp from '../../layout/NavbarComp';
import { FooterComp } from '../../layout/FooterComp';
import { ValidateUtil } from '../../utils/ValidationUtil';
import { contactLoginValidate } from '../../utils/contactLoginValidate';
// import axios from 'axios';
import { signupUser } from '../../utils/userapi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

function RegisterComp() {
	const { state } = useLocation();
	const roleFromState = state?.role;
	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext)

	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		email: "",
		pass: "",
		cPass: "",

	});
	const [signupError, setSignupError] = useState({});

	// Determine role (fallback to jobseeker if missing)
	const role = roleFromState || "jobseeker";



	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value
		}))
	};
	useEffect(() => {
		const { error } = contactLoginValidate(form)
		setSignupError(error)
	}, [form])

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGOUT" })
		const { error: validateError, valid } = contactLoginValidate(form, role)
		setSignupError(validateError);

		// Only navigate if valid
		if (!valid) return;

		try {
			dispatch({ type: "LOGOUT" })
			const data = {
				email: form.email,
				pass: form.pass,
				...(role === "employer" && { company: form.company })
			}
			const res = await signupUser(data, role)


			if (res.status === 1) {

				dispatch({
					type: "LOGIN",
					payload: {
						role: res.user?.role || role,
						user: res?.user || user,
						isProfileCompeleted: false
					}
				})

				// Reset form
				setForm({
					email: "",
					pass: "",
					cPass: "",
					company: ""
				});
				const redirectPath = role === "employer" ? "/employer-profile" : "/jobseeker-profile"
				toast.success(res.message || "Register Successfully")
				navigate(redirectPath, { replace: true })



			}
			else {
				// console.log(res);
				toast.error(res.message || "Registration failed")

			}
		} catch (error) {

			toast.error(error.response?.data?.message || "Signup failed");

		}


	};

	const RegisterData = [
		{ title: "Password", placeHolder: "Enter Your Password", name: "pass" },
		{ title: "Confirm Password", placeHolder: "Confirm Your Password", name: "cPass" }
	];

	return (
		<>
			<NavbarComp />

			<div className="flex items-center justify-center w-full h-full gap-6 p-6">
				<div className="hidden md:block">
					<img
						src={register}
						alt="register"
						className="h-[90vh] rounded-full w-auto object-contain"
					/>
				</div>

				<div className="flex flex-col items-center bg-white/10 md:bg-[#C2E6FF] backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-lg">
					<p className="text-4xl font-extrabold text-gray-900 text-center mb-6">
						Welcome to Hamro Jobs
					</p>

					<form onSubmit={handleSubmit} className="w-full">

						{/* Email */}
						<label className="text-lg font-semibold mb-1" htmlFor="email">
							Email
						</label>
						<input
							type="text"
							name="email"
							placeholder="Your Email"
							onChange={handleChange}
							value={form.email}
							className="w-full text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
						/>
						{signupError.email && <p className="text-red-600 text-[14px] ">*{signupError.email}</p>}

						{/* Password & Confirm Password */}
						{RegisterData.map((item, i) => (
							<div key={i} className="mb-4">
								<label className="text-lg font-semibold mb-1 block" htmlFor={item.name}>
									{item.title}
								</label>
								<div className="relative w-full">
									<input
										type={showPassword ? "text" : "password"}
										placeholder={item.placeHolder}
										id={item.name}
										name={item.name}
										className="w-full text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
										onChange={handleChange}
										value={form[item.name]}
									/>
									{signupError[item.name] && (
										<p className="text-red-600 text-[14px] ">*{signupError[item.name]}</p>
									)}

									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
									>
										<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
									</button>
								</div>
							</div>
						))}

						{/* Register Button */}
						<ButtonComp name="Register" type="submit" className="w-full" />
					</form>

					<p className="text-lg mt-5">
						Already have an account?{" "}
						<Link
							to={role === "employer" ? "/employers" : "/jobseekers"}
							className="text-blue-900 underline font-semibold"
						>
							Login Here
						</Link>
					</p>
				</div>
			</div>

			<FooterComp />
		</>
	);
}

export default RegisterComp;