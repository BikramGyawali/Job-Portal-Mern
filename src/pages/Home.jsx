import React from 'react';
import NavbarComp from '../components/NavbarComp';
import bgImg from '../assets/image/home3.png';

function Home() {
	return (
		<>
			<NavbarComp />

			<div
				className="relative h-[50vh] bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${bgImg})` }}
			>
				{/* Overlay with your RGBA color */}
				<div
					className="absolute inset-0"
					style={{
						background: 'rgba(22, 0, 0, 0.769)',
						backdropFilter: 'blur(2px)',
					}}
				></div>


				<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5">
					<h1 className="text-4xl md:text-5xl font-bold text-white">
						Find Your Dream Job in Nepal With{' '}
						<span className="text-fuchsia-600">Hamro Job</span>
					</h1>
					<p className="mt-4 text-lg md:text-xl text-gray-200">
						Your gateway to career opportunities
					</p>
				</div>
			</div>
		</>
	);
}

export default Home;
