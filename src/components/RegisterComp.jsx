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
	console.log(state);



	const [showPassword, setShowPassword] = useState(false);

	// ✅ FIX: Correct initial state
	const [form, setForm] = useState({
		email: "",
		pass: "",
		cPass: "",
		company: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(form);

		// Reset properly
		setForm({
			email: "",
			pass: "",
			cPass: "",
			company: ""
		});
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
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
			<div className="flex items-center justify-center w-screen h-full gap-4 m-5">

				<div>
					<img
						src={register}
						alt="login image"
						className='h-[70vh] rounded-2xl w-auto object-contain p-3 hidden md:block'
					/>
				</div>

				<div className="flex flex-col items-center bg-white/10 md:!bg-gradient-to-r from-blue-100 to-blue-200 backdrop-blur-md p-6 rounded-2xl shadow-lg">

					<p className="text-3xl font-bold text-center text-gray-900 tracking-tight mb-4">
  Welcome to Hamro Jobs
</p>
					<form onSubmit={handleSubmit} className="w-full max-w-md">


						<div className="w-full flex flex-col mb-1">
							{role === 'employers' && (
								<>
									<label className="text-2xl font-semibold mb-2 " htmlFor='company'>Company Name</label>
									<input
										type="text"
										placeholder="Your Company Name "
										onChange={handleChange}
										value={form.company}
										name='company'
										className="w-full text-xl p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
									/>
								</>
							)}
							<label className="text-2xl font-semibold mb-2">Email</label>
							<input
								type="text"
								name='email'
								placeholder="Your Email"
								className="w-full text-xl p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
								onChange={handleChange}
								value={form.email}
							/>
						</div>

						{/* Passwords */}
						{RegisterData.map((item, i) => (
							<div key={i} className="w-full flex flex-col mb-3">
								<label className="text-2xl font-semibold mb-2" htmlFor={item.name}>
									{item.title}
								</label>

								<div className="relative w-full">
									<input
										type={showPassword ? "text" : "password"}
										placeholder={item.placeHolder}
										id={item.name}
										name={item.name}
										className="w-full text-xl p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
										onChange={handleChange}
										value={form[item.name]}
									/>

									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
									>
										<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
									</button>
								</div>
							</div>
						))}

						<ButtonComp name="Register" />
					</form>

					<p className='text-2xl p-3 m-3'>
						Already have Account?{" "}
						<Link to="/jobseeker" className='text-blue-900 underline'>
							Create Account
						</Link>
					</p>
				</div>
			</div>
			<FooterComp />
		</>
	);
}

export default RegisterComp;
