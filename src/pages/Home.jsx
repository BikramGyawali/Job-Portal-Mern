import React from 'react';
import BackgroundSection from '../components/BackgroundSection';
import { CardComp } from '../components/CardComp';


function Home() {
	return (
		<>
			<BackgroundSection />
			<div className=' grid grid-row-2 items-center justify-center mt-2'>
				<p className='text-3xl text-black text-center'>Featured Jobs</p>
				<div className=' grid gap-7 p-3 md:grid-cols-4 sm:grid-cols-2'>
					<CardComp />
					<CardComp />
					<CardComp />
					<CardComp />
					<CardComp />
					<CardComp />
					<CardComp />
					<CardComp />
				</div>
			</div>
		</>
	);
}

export default Home;
