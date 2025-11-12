import React from 'react';

function Description() {
	const title1 = "Find Top Jobs in Nepal with Hamro Job";
	const description = "Looking for the best job opportunities in Nepal? Hamro Job offers over 10,000+ jobs across a wide range of industries, connecting job seekers to leading employers nationwide. Whether you are based in Kathmandu, Pokhara, Bhaktapur, Lalitpur, or anywhere across Nepal, Hamro Job is your trusted platform to find the right career opportunities. With a modern, user-friendly interface, starting your career journey has never been easier.";

	return (
		<div className="flex justify-center items-center  bg-gradient-to-b from-gray-100 to-gray-200">
			<div className="backdrop-blur-lg bg-white/40 shadow-lg rounded-2xl p-8 w-fullborder border-white/20">
				<DesTitle title={title1} description={description} />
				<DesTitle />
			</div>
		</div>
	);
}

export default Description;

export function DesTitle({ title, description }) {
	return (
		<div className=' grid grid-row-2 items-center justify-center gap-2 mt-2 '>
			<p className='text-2xl font-semibold text-center p-3'>  {title}</p>
			<p className='text-xl tracking-tight text-justify px-4 transition-all duration-500 hover:scale-x-101 overflow-hidden gap-y-3'> {description} </p> </div>)
}
