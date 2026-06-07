// import React, { useEffect, useState } from 'react';
// import { FaPaperPlane } from 'react-icons/fa';
// import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
// import { ValidateUtil } from '../utils/ValidationUtil';

// function ContactSection() {

// 	const [contactError, setContactError] = useState({})
// 	const [form, setForm] = useState({
// 		fname: "",
// 		sname: "",
// 		email: "",
// 		phone: "",
// 		message: "",
// 	});
// 	const [error, setError] = useState({});


// 	const ContactData = [
// 		{ name: "fname", label: "First Name", placeHolder: "Your First Name", type: "text", required: true },
// 		{ name: "sname", label: "Second Name", placeHolder: "Your Second Name", type: "text", required: true },
// 		{ name: "email", label: "Email", placeHolder: "Your Email", type: "email", required: true },
// 		{ name: "phone", label: "Contact", placeHolder: "Your Phone Number", type: "number", required: true },
// 		{ name: "message", label: "Message", placeHolder: "Your Message", type: "textarea", required: true },
// 	];

// 	const handleChange = (e) => {
// 		setForm({
// 			...form,
// 			[e.target.name]: e.target.value
// 		});

// 	};

// 	useEffect(() => {
// 		const { error } = ValidateUtil(form, ContactData);
// 		setContactError(error)
// 	}, [form])



// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const { error, valid } = ValidateUtil(form, ContactData);
// 		setError(error);
// 		if (valid) {
// 			setForm({
// 				fname: "",
// 				sname: "",
// 				email: "",
// 				phone: "",
// 				message: ""
// 			});
// 		}
// 	};

// 	return (
// 		<div className='flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-8'>
// 			<div className='w-full md:w-1/2 backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-6'>
// 				<p className='text-3xl font-semibold mb-4'>Contact Our Team</p>
// 				<form onSubmit={handleSubmit} className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
// 					{ContactData.map((item, i) => (
// 						<div key={i} className={`flex flex-col gap-1 ${item.name == "message" ? "col-span-2" : ""}`}>
// 							<label htmlFor={item.name} className='text-[18px] font-medium'>{item.label}*</label>
// 							{
// 								item.type == "textarea" ? (
// 									<textarea
// 										type={item.type}
// 										id={item.name}
// 										name={item.name}
// 										placeholder={item.placeHolder}
// 										value={form[item.name]}
// 										onChange={handleChange}
// 										className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black'
// 										rows={5}

// 									></textarea>


// 								) : (
// 									<input
// 										type={item.type}
// 										id={item.name}
// 										name={item.name}
// 										placeholder={item.placeHolder}
// 										value={form[item.name]}
// 										onChange={handleChange}
// 										className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black'

// 									/>)}
// 							{contactError[item.name] && (<p className="text-red-600 text-[14px]">{contactError[item.name]}</p>)}

// 						</div>
// 					))}

// 					<button
// 						type="submit"
// 						className="sm:col-span-2 bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition"
// 					>
// 						Send Message
// 					</button>
// 				</form>
// 			</div>
// 			<div className='w-full md:w-1/2 backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-6'>
// 				<p className='text-3xl font-semibold mb-2'>Contact Information</p>
// 				<p className='text-lg mb-4'>Call, email, send us a post card—whatever works for you, we will be here.</p>
// 				<div className="flex flex-col gap-4 text-gray-800 text-lg">
// 					<div className="flex items-center gap-2"><HiMail className="text-blue-600 text-xl" /> <span className='font-medium'>Mail:</span> contact@example.com</div>
// 					<div className="flex items-center gap-2"><HiPhone className="text-green-600 text-xl" /> <span className='font-medium'>Contact:</span> +977 9876543210</div>
// 					<div className="flex items-center gap-2"><HiLocationMarker className="text-red-600 text-xl" /> <span className='font-medium'>Location:</span> Kathmandu, Nepal</div>
// 					<div className="flex items-center gap-2"><FaPaperPlane className="text-purple-600 text-xl" /> <span className='font-medium'>Postman:</span> Kathmandu Office</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default ContactSection;


import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPaperPlane } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { ValidateUtil } from '../utils/ValidationUtil';

function ContactSection() {
	const [contactError, setContactError] = useState({});
	const [form, setForm] = useState({ fname: "", sname: "", email: "", phone: "", message: "" });
	const [error, setError] = useState({});

	const ContactData = [
		{ name: "fname", label: "First Name", placeHolder: "Your First Name", type: "text", required: true },
		{ name: "sname", label: "Second Name", placeHolder: "Your Second Name", type: "text", required: true },
		{ name: "email", label: "Email", placeHolder: "Your Email", type: "email", required: true },
		{ name: "phone", label: "Contact", placeHolder: "Your Phone Number", type: "number", required: true },
		{ name: "message", label: "Message", placeHolder: "Your Message", type: "textarea", required: true },
	];

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	useEffect(() => {
		const { error } = ValidateUtil(form, ContactData);
		setContactError(error);
	}, [form]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const { error, valid } = ValidateUtil(form, ContactData);
		setError(error);
		if (valid) setForm({ fname: "", sname: "", email: "", phone: "", message: "" });
	};

	return (
		<>
			<Helmet>
				<title>Contact Us – Hamro Job | Get in Touch</title>
				<meta name="description" content="Contact the Hamro Job team in Kathmandu, Nepal. Reach us by email, phone, or our contact form. We're here to help job seekers and employers." />
				<meta name="keywords" content="contact Hamro Job, Hamro Job support, job portal Nepal contact" />
				<link rel="canonical" href="https://hamrojob.bikramgyawali.com.np/contact" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hamrojob.bikramgyawali.com.np/contact" />
				<meta property="og:title" content="Contact Us – Hamro Job" />
				<meta property="og:description" content="Get in touch with the Hamro Job team based in Kathmandu, Nepal." />
				<meta property="og:image" content="https://hamrojob.bikramgyawali.com.np/logo.png" />
			</Helmet>

			<div className='flex flex-col md:flex-row items-stretch gap-4 p-4 md:p-8'>
				<div className='w-full md:w-1/2 backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-6'>
					<p className='text-3xl font-semibold mb-4'>Contact Our Team</p>
					<form onSubmit={handleSubmit} className='grid gap-3 grid-cols-1 sm:grid-cols-2'>
						{ContactData.map((item, i) => (
							<div key={i} className={`flex flex-col gap-1 ${item.name === "message" ? "col-span-2" : ""}`}>
								<label htmlFor={item.name} className='text-[18px] font-medium'>{item.label}*</label>
								{item.type === "textarea" ? (
									<textarea
										id={item.name} name={item.name}
										placeholder={item.placeHolder} value={form[item.name]}
										onChange={handleChange} rows={5}
										className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black'
									/>
								) : (
									<input
										type={item.type} id={item.name} name={item.name}
										placeholder={item.placeHolder} value={form[item.name]}
										onChange={handleChange}
										className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black'
									/>
								)}
								{contactError[item.name] && <p className="text-red-600 text-[14px]">{contactError[item.name]}</p>}
							</div>
						))}
						<button type="submit" className="sm:col-span-2 bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition">
							Send Message
						</button>
					</form>
				</div>

				<div className='w-full md:w-1/2 backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-6'>
					<p className='text-3xl font-semibold mb-2'>Contact Information</p>
					<p className='text-lg mb-4'>Call, email, send us a post card — whatever works for you, we will be here.</p>
					<div className="flex flex-col gap-4 text-gray-800 text-lg">
						<div className="flex items-center gap-2"><HiMail className="text-blue-600 text-xl" /><span className='font-medium'>Mail:</span> contact@example.com</div>
						<div className="flex items-center gap-2"><HiPhone className="text-green-600 text-xl" /><span className='font-medium'>Contact:</span> +977 9876543210</div>
						<div className="flex items-center gap-2"><HiLocationMarker className="text-red-600 text-xl" /><span className='font-medium'>Location:</span> Kathmandu, Nepal</div>
						<div className="flex items-center gap-2"><FaPaperPlane className="text-purple-600 text-xl" /><span className='font-medium'>Postman:</span> Kathmandu Office</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ContactSection;