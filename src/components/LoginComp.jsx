import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonComp from './ButtonComp';

function LoginComp({ LoginData }) {
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		email: "",
		pass: ""
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
	//for Validation
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
				pass: ""
			});
		}
	};

	const { title, explain, image, role } = LoginData;

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
					{error.email && <p className="text-red-600 text-[20px] ">*{error.email}</p>}

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
						{error.pass && <p className="text-red-600 text-[20px] ">*{error.pass}</p>}

						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
						>
							<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
						</button>
					</div>

					<div className='mt-5'>
						<ButtonComp name="Login" />
					</div>
				</form>

				<p className="text-lg mt-5">
					New to Hamro Job?{" "}
					<Link
						to="/register"
						state={{ role: role }}
						className="text-blue-900 underline font-semibold"
					>
						Create Account
					</Link>
				</p>
			</div>

		</div>
	);
}

export default LoginComp;
