import React from 'react'
import logo from "../../../../assets/image/logo.png";
function JobListing() {
	return (
		<div className='shadow-lg bg-white h-screen flex flex-col gap-2.5'>
			{/* for logo */}
			<div className='flex flex-row gap-6 '>
				<img src={logo} alt="company logo" className='h-[70px] w-auto  rounded-2xl' />
				<p className='text-3xl font-semibold tracking-wide pt-4'>My Company</p>
			</div>
			<h3 className='text-3xl font-bold tracking-wide '>Front-End Developer</h3>
			<hr />
			<div className='flex flex-col'>

			</div>
		</div>
	)
}

export default JobListing