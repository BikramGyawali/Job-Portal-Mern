import React from 'react'
import NavbarComp from '../../layout/NavbarComp';
import bgImg from '../../assets/image/home3.png';
function BackgroundSection({ title, explain }) {
	return (
		<>
			<NavbarComp />

			<div className='bg-cover h-[50vh] bg-center bg-no-repeat relative'
				style={{ backgroundImage: `url(${bgImg})` }}>
				<div className=' absolute inset-0 '
					style={{ background: 'rgba(22, 0, 0, 0.769)', backdropFilter: 'blur(2px)' }}
				></div>
				<div className='z-10 relative flex flex-col items-center text-center justify-center h-full px-5'>
					<h1 className="text-5xl md:text-4xl font-bold text-white ">
						{title}{'   '}
						<span className="text-fuchsia-600 ">Hamro Job</span>
					</h1>
					<p className="mt-4 text-2xl font-bold md:text-3xl text-gray-200 ">
						{explain}
					</p>
				</div>
			</div>
		</>
	)
}

export default BackgroundSection