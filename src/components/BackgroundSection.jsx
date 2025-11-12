import React from 'react'
import NavbarComp from '../components/NavbarComp';
import bgImg from '../assets/image/home3.png';
function BackgroundSection() {
	return (
		<>
			<NavbarComp />

			<div className='bg-cover h-[50vh] bg-center bg-no-repeat relative'
				style={{ backgroundImage: `url(${bgImg})` }}>
				<div className=' absolute inset-0 '
					style={{ background: 'rgba(22, 0, 0, 0.769)', backdropFilter: 'blur(2px)' }}
				></div>
				<div className='z-10 relative flex flex-col items-center text-center justify-center h-full px-5'>
					<h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
						Find Your Dream Job in Nepal With{' '}
						<span className="text-fuchsia-600 tracking-wide">Hamro Job</span>
					</h1>
					<p className="mt-4 text-2xl md:text-3xl text-gray-200 tracking-wide">
						Your gateway to career opportunities
					</p>
				</div>
			</div>
		</>
	)
}

export default BackgroundSection