import React, { useState } from 'react'
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

	const ContactData = [
		{ name: "fname", label: "First Name", placeHolder: "Your First Name", type: "text" },
		{ name: "sname", label: "Second Name", placeHolder: "Your Second Name", type: "text" },
		{ name: "email", label: "Email", placeHolder: "Your Email", type: "email" },
		{ name: "phone", label: "Contact", placeHolder: "Your Phone Number", type: "text" },
	];


	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

	};


	return (
		<div className=' items-center p-2 flex flex-rows  gap-4 sm:flex flex-cols '>
			<div className='w-[50%] backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-4'>

				<p className='text-3xl font-semibold p-2'>Contact Our Team</p>

				<form onSubmit={handleSubmit} className='grid gap-3 grid-cols-2'>


					{ContactData.map((items, i) => (
						<div key={i} className='flex flex-col gap-1'>
							<label htmlFor={items.name} className='text-[20px] font-medium'>
								{items.label}
							</label>

							<input
								type={items.type}
								id={items.name}
								name={items.name}
								placeholder={items.placeHolder}
								value={form[items.name]}
								onChange={handleChange}
								className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black'
							/>
						</div>
					))}


					<div className="col-span-2 flex flex-col gap-1">
						<label htmlFor="message" className="text-[20px] font-medium">
							Message
						</label>

						<textarea
							id="message"
							name="message"
							placeholder="Enter your message..."
							value={form.message}
							onChange={handleChange}
							rows="4"
							className="p-3 text-[15px] bg-white border rounded-2xl focus:text-black "
						></textarea>
					</div>


					<button
						type="submit"
						className="col-span-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
					>
						Send Message
					</button>

				</form>

			</div>

			<div className='w-[50%] backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-4 ' >
				<p className='text-3xl font-semibold p-2'>Contact Our Team</p>
				<p className='text-2xl  p-2'>call,email,send us a post card-whatever work for you we will be here</p>
				<div className="flex flex-col gap-4 text-gray-800 text-2xl">
					<div className="flex items-center gap-2 text-2xl"><HiMail className="text-blue-600" /> <span className='text-2xl p-2'>Mail:</span> contact@example.com</div>
					<div className="flex items-center gap-2"><HiPhone className="text-green-600" /> <span className='text-2xl p-2'>Contact:</span> +977 9876543210</div>
					<div className="flex items-center gap-2"><HiLocationMarker className="text-red-600" /> <span className='text-2xl p-2'>Location:</span> Kathmandu, Nepal</div>
					<div className="flex items-center gap-2"><FaPaperPlane className="text-purple-600" /> <span className='text-2xl p-2'>PostMan:</span> Kathmandu Office</div>
				</div>
			</div>
		</div>
	);
}

export default ContactSection;
