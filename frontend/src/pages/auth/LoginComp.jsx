import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ButtonComp from '../../components/common/ButtonComp';
import { contactLoginValidate } from '../../utils/contactLoginValidate';
import { loginUser } from '../../utils/userapi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

// import { ValidateUtil } from '../utils/ValidationUtil';

function LoginComp({ LoginData }) {
	const { dispatch } = useContext(AuthContext)
	const { title, explain, image, role } = LoginData;
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		email: "",
		pass: ""
	});
	const [loginError, setLoginError] = useState({});
	const handleChange = (e) => {
		// console.log(e);

		const { name, value } = e.target
		setForm((prev) => ({
			...prev,
			[name]: value
		}))

	};
	useEffect(() => {
		const { error } = contactLoginValidate(form);
		setLoginError(error)


	}, [form])
	//for Validation


	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const { error, valid } = contactLoginValidate(form);

	// 	setLoginError(error)

	// 	// console.log(error.email);


	// 	if (!valid) return;
	// 	const res = await loginUser(form, role)
	// 	console.log(res);


	// 	if (res.status === 1) {
	// 		dispatch({
	// 			type: "LOGIN",
	// 			payload: {
	// 				role: res.role,
	// 				user: res.user,
	// 				email: res.email,
	// 				isProfileCompleted: res.isProfileCompleted,
	// 			},
	// 		});
	// 		toast.success("Login Successfully", {
	// 			onClose: () => navigate(`/${res.role}`, { replace: true })
	// 		})


	// 		setForm({
	// 			email: "",
	// 			pass: ""
	// 		});
	// 	}
	// 	else {
	// 		console.log("eror");

	// 		toast.error(res.message || "Login Failed")
	// 	}







	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { error, valid } = contactLoginValidate(form);
		setLoginError(error);

		if (!valid) return;

		try {
			const res = await loginUser(form, role);
			console.log(res);

			if (res?.status === 1) {
				dispatch({
					type: "LOGIN",
					payload: {
						role: res.role,
						user: res.user,
						email: res.email,
						isProfileCompleted: res.isProfileCompleted,
					},
				});

				toast.success("Login Successfully", {
					onClose: () => navigate(`/${res.role}`, { replace: true })
				});

				setForm({
					email: "",
					pass: ""
				});
			} else {
				toast.error(res?.message || "Login Failed");
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen gap-6 px-4">


			<div className="hidden md:block">
				<img
					src={image}
					alt="login"
					className="h-[70vh] rounded-2xl w-auto object-contain"
				/>
			</div>


			<div className="flex flex-col items-center bg-white/10 md:bg-[#CBE4FF] backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-lg">


				<p className="text-4xl font-extrabold text-gray-900 text-center tracking- mb-2.5">
					{title}
				</p>


				<p className="text-lg text-gray-700 text-center mt-2 leading-snug">
					{explain}
				</p>


				<form className="w-full mt-4" onSubmit={handleSubmit}>


					<label className="text-lg font-semibold mb-1 block">Email</label>
					<input
						type="text"
						placeholder="Your Email"
						onChange={handleChange}
						value={form.email}
						name="email"
						className="w-full text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
					/>
					{loginError.email && <p className="text-red-600 text-[14px] ">*{loginError.email}</p>}

					<label className="text-lg font-semibold mb-1 block">Password</label>
					<div className="relative w-full">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Your Password"
							onChange={handleChange}
							value={form.pass}
							name="pass"
							className="w-full text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						{loginError.pass && <p className="text-red-600 text-[14px] ">*{loginError.pass}</p>}

						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
						>
							<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
						</button>
					</div>

					<div className='mt-5'>



						<ButtonComp name="Login" type='submit' />

					</div>
				</form>

				{role !== "admin" ?
					<p className="text-lg mt-5">
						New to Hamro Job?{" "}
						<Link
							to="/register"
							state={{ role: role }}
							className="text-blue-900 underline font-semibold"
						>
							Create Account
						</Link>
					</p> :
					""}
			</div>

		</div>
	);
}

export default LoginComp;
