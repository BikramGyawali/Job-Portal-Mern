import React from 'react'
import logo from "../../../../assets/image/logo.png";
import { JobListingData, ListingTitle } from '../../../../data/jobseekers/DashboardData';
import ButtonComp from '../../../common/ButtonComp';
function JobListing() {
	const handleClick = () => {
		console.log("clickj");

	}
	const jobData = [
		{
			title: "Job Description",
			content: "We are seeking a highly organized and proactive Admin Officer to join our team. The Admin Officer will serve as the primary point of contact for all inquiries, calls, and documentation related to parents, admissions, staff, and students. This role requires excellent communication skills, attention to detail, and the ability to multitask effectively in a fast-paced environment.We are seeking a highly organized and proactive Admin Officer to join our team. The Admin Officer will serve as the primary point of contact for all inquiries, calls, and documentation related to parents, admissions, staff, and students. This role requires excellent communication skills, attention to detail, and the ability to multitask effectively in a fast-paced environment.Make cold calls to parents of interested kids and follow up on inquiries. 	"
		},
		{
			title: "Job Specification",
			content: "We are seeking a highly organized and proactive Admin Officer to join our team. The Admin Officer will serve as the primary point of contact for all inquiries, calls, and documentation related to parents, admissions, staff, and students. This role requires excellent communication skills, attention to detail, and the ability to multitask effectively in a fast-paced environment.We are seeking a highly organized and proactive Admin Officer to join our team. The Admin Officer will serve as the primary point of contact for all inquiries, calls, and documentation related to parents, admissions, staff, and students. This role requires excellent communication skills, attention to detail, and the ability to multitask effectively in a fast-paced environment.Make cold calls to parents of interested kids and follow up on inquiries. 	"
		},
	]
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
				{ListingTitle.map((data, i) =>
				(
					<p key={i} className='ml-2 p-1 font-bold text-[18px]'>{data}:</p>
				)
					// console.log(data);

				)}

				{/* for data */}

			</div>
			<div>
				{JobListingData.map((row, i) => {
					{
						ListingTitle.map((key, j) => (
							<h1 key={j}>{key}</h1>
						))
					}
				})}
			</div>
			<hr />

			{jobData.map((data, i) => {
				const { title, content } = data;
				return (


					<div key={i}>
						<p className='text-2xl font-bold tracking-wide '>
							{title}
						</p>
						<p className='text-justify text-[18px] p-6 font-serif '>{content} </p>
						<hr />
					</div>

				)
			})}
			<div className='w-[200px]'>
				<ButtonComp name="Apply Job" click={handleClick} />
			</div>
		</div>
	)
}

export default JobListing