import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import login from "../assets/image/login.png";
import { Link } from 'react-router-dom';

function LoginComp({ LoginData }) {
	const [showPassword, setShowPassword] = useState(false)
	// console.log(loginData);

	const { title, explain, image } = LoginData;

	return (
		<div
			className="flex items-center justify-center w-screen h-screen  gap-4"

		>
			<div className="">
				<img src={image} alt="login image" className='h-full rounded-2xl w-auto object-cover p-3 hidden md:block' />
			</div>
			<div className="flex flex-col items-center bg-white/10 md:!bg-gradient-to-r from-blue-100 to-blue-200 backdrop-blur-md p-6 rounded-2xl shadow-lg">
				<p className='text-2xl text-center font-bold text-black tracking-tight'>{title}</p>
				<p className='text-[20px] text-center  text-black mt-2'>{explain}</p>
				<label className="text-2xl font-semibold mb-2 ">Email</label>
				<input
					type="text"
					placeholder="Your Email"
					className="w-80 text-xl p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
				/>

				<label className="text-2xl font-semibold mb-2">Password</label>
				<div className="relative w-80">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="Your Password"
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
				<p className='text-2xl p-3 m-3 '>New to Hamro Job  {' '}
					<Link to="/register" className='text-blue-900 underline'>
						Create Account
					</Link>
				</p>
			</div>


		</div>
	)
}

export default LoginComp