import React from 'react'
import logo from "../../../../assets/image/logo.png";
import { CVSections } from '../../../../data/jobseekers/DashboardData';
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

			{CVSections.map((sec, i) => (
				<div className='justify-center p-1' key={i}>
					<h1 className='text-[20px] font-mono text-start font-semibold'>{sec.section}</h1>
					<hr />
					{sec.type === "text" && (
						<p>{sec.data}</p>

					)

					}

					{sec.type === "table" && (

						<>
							{sec.data.map((Object, j) => (
								<div key={j} className='p-1'>
									<h2 className='text-[16px] font-semibold font-sans text-start'>{Object.startYear + "-" + Object.endYear}</h2>
									<p className='text-[18px] font-semibold'>
										{
											Object.degree
												? `${Object.degree}-${Object.field}-CGPA ${Object.cgpa}`

												:
												`${Object.position}-${Object.company}`
										}
									</p>
									<p>
										{
											Object.institution
												? `${Object.institution}, ${Object.boardOrUniversity} , ${Object.location}`
												: `${Object.employmentType}`
										}
									</p>
								</div>
							))}
						</>

					)}
				</div>
			))}


		</div>
	)
}

export default DownloadResume