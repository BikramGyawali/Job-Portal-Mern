import React from 'react';

function Description({ section }) {

	return (
		<div className="flex justify-center items-center py-5 px-5 bg-gradient-to-b from-gray-100 to-gray-200">
			<div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl p-8 w-full border border-white/10">
				<DesTitle />
				{section.map((data, index) => (
					<DesTitle title={data.title} description={data.description} key={index} />
				))}
			</div>
		</div>
	);
}

export default Description;

export function DesTitle({ title, description }) {
	return (
		<div className=' grid grid-row-2 items-center justify-center gap-2 mt-2 '>
			<p className='text-2xl font-semibold text-center p-3 tracking-wide'>  {title}</p>
			<p className='text-xl tracking-tight text-justify px-4 transition-all font-sans duration-500 hover:scale-x-101 overflow-hidden gap-y-3'> {description} </p> </div>)
}
