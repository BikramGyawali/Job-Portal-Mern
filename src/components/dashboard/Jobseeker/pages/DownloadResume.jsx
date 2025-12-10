import React from 'react'
import logo from "../../../../assets/image/logo.png";
function DownloadResume() {
	return (
		<div className='grid grid-cols-1 gap-5 p-3 mt-3 mx-3'>
			<div className="flex flex-row gap-7">
				<img src={logo} alt="company logo" className='h-50 w-auto border-2 border-black p-3 rounded-sm' />
				<div className=' justify-center m-1 p-1 '>
					<h1 className='text-2xl font-bold text-center '>Bikram Gyawali</h1>
					<h2>Address: Dhungedhara</h2>
					<h2>Contact No: 9745923376</h2>
					<h2>Email: gyawalibikram7@gmail.com</h2>
					<h2>Date of Birth:May 29, 2006</h2>
					<h1>Experience:Fresher</h1>

				</div>

			</div>


			<div className='justify-center p-1'>
				<h1 className='text-[20px] font-mono text-start font-semibold'>Objective</h1>
				<hr />
				<p className='p-2 text-justify '>I am a software developer and a students so i want a part time job. For now i am building a job portal so i am
					studying your system.</p>
			</div>

		</div>
	)
}

export default DownloadResume