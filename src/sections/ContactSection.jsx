import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

function ContactSection() {
	const [form, setForm] = useState({
		fname: "",
		sname: "",
		email: "",
		phone: "",
		message: "",
	});

	const [error, setError] = useState({
		fname: "",
		sname: "",
		email: "",
		phone: "",
		message: ""
	});

	const ContactData = [
		{ name: "fname", label: "First Name", placeHolder: "Your First Name", type: "text" },
		{ name: "sname", label: "Second Name", placeHolder: "Your Second Name", type: "text" },
		{ name: "email", label: "Email", placeHolder: "Your Email", type: "text" },
		{ name: "phone", label: "Contact", placeHolder: "Your Phone Number", type: "text" },
	];

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
		setError({
			...error,
			[e.target.name]: ""
		});
	};

	const validate = () => {
		let valid = true;
		const newError = { fname: "", sname: "", email: "", phone: "", message: "" };

		const nameRegex = /^[A-Za-z]+$/;
		if (!form.fname) {
			newError.fname = "First name is required";
			valid = false;
		} else if (!nameRegex.test(form.fname)) {
			newError.fname = "First name must contain only letters";
			valid = false;
		}

		if (!form.sname) {
			newError.sname = "Second name is required";
			valid = false;
		} else if (!nameRegex.test(form.sname)) {
			newError.sname = "Second name must contain only letters";
			valid = false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!form.email) {
			newError.email = "Email is required";
			valid = false;
		} else if (!emailRegex.test(form.email)) {
			newError.email = "Invalid email format";
			valid = false;
		}

		const phoneRegex = /^[0-9]{10}$/;
		if (!form.phone) {
			newError.phone = "Phone number is required";
			valid = false;
		} else if (!phoneRegex.test(form.phone)) {
			newError.phone = "Phone number must be 10 digits";
			valid = false;
		}

		if (!form.message) {
			newError.message = "Message is required";
			valid = false;
		}

		setError(newError);
		return valid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			console.log("Form submitted:", form);
			setForm({ fname: "", sname: "", email: "", phone: "", message: "" });
		}
	};

	return (
		<div className='flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-8'>
			<div className='w-full md:w-1/2 backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-6'>
				<p className='text-3xl font-semibold mb-4'>Contact Our Team</p>
				<form onSubmit={handleSubmit} className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
					{ContactData.map((item, i) => (
						<div key={i} className='flex flex-col gap-1'>
							<label htmlFor={item.name} className='text-[18px] font-medium'>{item.label}</label>
							<input
								type={item.type}
								id={item.name}
								name={item.name}
								placeholder={item.placeHolder}
								value={form[item.name]}
								onChange={handleChange}
								className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black'
							/>
							{error[item.name] && <p className="text-red-600 text-[14px]">{error[item.name]}</p>}
						</div>
					))}
					<div className="col-span-2 flex flex-col gap-1">
						<label htmlFor="message" className="text-[18px] font-medium">Message</label>
						<textarea
							id="message"
							name="message"
							placeholder="Enter your message..."
							value={form.message}
							onChange={handleChange}
							rows="4"
							className="p-3 text-[15px] bg-white border rounded-2xl focus:text-black resize-none"
						></textarea>
						{error.message && <p className="text-red-600 text-[14px]">{error.message}</p>}
					</div>
					<button
						type="submit"
						className="sm:col-span-2 bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition"
					>
						Send Message
					</button>
				</form>
			</div>
			<div className='w-full md:w-1/2 backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-6'>
				<p className='text-3xl font-semibold mb-2'>Contact Information</p>
				<p className='text-lg mb-4'>Call, email, send us a post card—whatever works for you, we will be here.</p>
				<div className="flex flex-col gap-4 text-gray-800 text-lg">
					<div className="flex items-center gap-2"><HiMail className="text-blue-600 text-xl" /> <span className='font-medium'>Mail:</span> contact@example.com</div>
					<div className="flex items-center gap-2"><HiPhone className="text-green-600 text-xl" /> <span className='font-medium'>Contact:</span> +977 9876543210</div>
					<div className="flex items-center gap-2"><HiLocationMarker className="text-red-600 text-xl" /> <span className='font-medium'>Location:</span> Kathmandu, Nepal</div>
					<div className="flex items-center gap-2"><FaPaperPlane className="text-purple-600 text-xl" /> <span className='font-medium'>Postman:</span> Kathmandu Office</div>
				</div>
			</div>
		</div>
	);
}

export default ContactSection;
