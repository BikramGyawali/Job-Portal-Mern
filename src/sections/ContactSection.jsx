import React from 'react'

function ContactSection() {
	const ContactData = [
		{
			name: "fname",
			label: " First Name",

			placeHolder: " Your First Name",
			type: "text"
		},
		{
			name: "sname",
			label: "second Name",
			placeHolder: " Your Second Name",
			type: "text"
		},
		{
			name: "email",
			label: " Email ",
			placeHolder: " Your Email ",
			type: "email"
		},
		{
			name: "phone",
			label: "Contact",
			placeHolder: "Your Phone Number ",
			type: "text"
		},
		{
			name: "message",
			label: "",
			placeHolder: "Enter Your Message",
			type: "text"
		}
	]
	return (
		<div className='w-full items-center p-2 flex flex-cols gap-4 '>
			<div className='w-[50%] backdrop-blur-lg bg-gray-300 drop-shadow-lg rounded-2xl p-4'>
				<p className='text-3xl font-semibold p-2'>Contact Our Team</p>
				<form action="" className='grid  gap-3 grid-cols-2'>
					{ContactData.map((items, i) => {
						return (
							<div className='flex gap-1 flex-col '>
								<label htmlFor={items.name} className='text-[20px] font-medium'>{items.label} :</label>
								<input type={items.type} id={items.name}
									placeholder={items.placeHolder} className='p-2 text-[15px] bg-white border rounded-2xl focus:text-black ' />
							</div>

						)
						
					})}
				</form>
			</div>
			<div>
				another
			</div>

		</div>
	)
}

export default ContactSection