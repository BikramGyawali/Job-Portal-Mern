import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import register from "../assets/image/EResgister.png";
import { Link } from 'react-router-dom';

function RegisterComp({ LoginData }) {

	const [showPassword, setShowPassword] = useState(false);

	const RegisterData = [
		{
			title: "Password",
			placeHolder: "Enter Your Password",
			name: "password"
		},
		{
			title: "Confirm Password",
			placeHolder: "Confirm Your Password",
			name: "cPass"
		},
	];

	return (
		<div className="flex items-center justify-center w-screen h-screen gap-4">

			<div>
				<img
					src={register}
					alt="login image"
					className='h-[70vh] rounded-2xl w-auto object-contain p-3 hidden md:block'
				/>
			</div>

			<div className="flex flex-col items-center bg-white/10 md:!bg-gradient-to-r from-blue-100 to-blue-200 backdrop-blur-md p-6 rounded-2xl shadow-lg">

				<p className='text-2xl text-center font-bold text-black tracking-tight'>
					Welcome to Hamro Jobs
				</p>
				<div className="w-full flex flex-col mb-1">

					<label className="text-2xl font-semibold mb-2">Email</label>
					<input
						type="text"
						placeholder="Your Email"
						className="w-full text-xl p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
					/>
				</div>

				{/* PASSWORD INPUTS */}
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
								className="w-full text-xl p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

				<p className='text-2xl p-3 m-3'>
					Already have Account?{" "}
					<Link to="/jobseeker" className='text-blue-900 underline'>
						Create Account
					</Link>
				</p>

			</div>
		</div>
	);
}

export default RegisterComp;
