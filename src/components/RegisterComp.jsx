import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import register from "../assets/image/EResgister.png";
import { Link, useLocation } from 'react-router-dom';
import ButtonComp from './ButtonComp';
import NavbarComp from './NavbarComp';
import { FooterComp } from './FooterComp';

function RegisterComp() {
	const { state } = useLocation();
	const role = state?.role;

	const [showPassword, setShowPassword] = useState(false);

	const [form, setForm] = useState({
		email: "",
		pass: "",
		cPass: "",
		company: ""
	});
	const [error, setError] = useState({
		email: "",
		pass: ""
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const validate = () => {
		let valid = true;
		const newError = {
			email: "",
			pass: "",
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!form.email) {
			newError.email = "Email is Required";
			valid = false
		}
		else if (!emailRegex.test(form.email)) {
			newError.email = "Invalide Email Format";
			valid = false
		}
		if (!form.pass) {
			newError.pass = "Password is Required";
			valid = false
		}
		setError(newError)
		return valid
	}
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validate()) {
			setForm({
				email: "",
				pass: "",
				cPass: "",
				company: ""
			});
		}


	};

	const RegisterData = [
		{
			title: "Password",
			placeHolder: "Enter Your Password",
			name: "pass"
		},
		{
			title: "Confirm Password",
			placeHolder: "Confirm Your Password",
			name: "cPass"
		}
	];

	return (
		<>
			<NavbarComp />

			<div className="flex items-center justify-center w-full h-full gap-6 p-6">

				<div className="hidden md:block">
					<img
						src={register}
						alt="login"
						className="h-[90vh] rounded-full w-auto object-contain"
					/>
				</div>

				<div className="flex flex-col items-center bg-white/10  md:bg-[#C2E6FF] backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-lg">

					{/* Title */}
					<p className="text-4xl font-extrabold text-gray-900 text-center mb-6">
						Welcome to Hamro Jobs
					</p>

					<form onSubmit={handleSubmit} className="w-full">

						{/* Company Name (Employer only) */}
						{role === 'employers' && (
							<>
								<label className="text-lg font-semibold mb-1" htmlFor="company">
									Company Name
								</label>
								<input
									type="text"
									placeholder="Your Company Name"
									onChange={handleChange}
									value={form.company}
									name="company"
									className="w-full text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
								/>
							</>
						)}

						{/* Email */}
						<label className="text-lg font-semibold mb-1" htmlFor="email">
							Email
						</label>
						<input
							type="text"
							name="email"
							placeholder="Your Email"
							className="w-full text-base p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
							onChange={handleChange}
							value={form.email}
						/>
						{error.email && <p className="text-red-600 text-[20px] ">*{error.email}</p>}

						{/* Password Inputs */}
						{RegisterData.map((item, i) => (
							<div key={i} className="mb-4">
								<label
									className="text-lg font-semibold mb-1 block"
									htmlFor={item.name}
								>
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
									{error.pass && <p className="text-red-600 text-[20px] ">*{error.pass}</p>}

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

						<ButtonComp name="Register" />

					</form>

					<p className="text-lg mt-5">
						Already have an account?{" "}
						<Link to="/jobseeker" className="text-blue-900 underline font-semibold">
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
