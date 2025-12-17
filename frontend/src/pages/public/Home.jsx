import React from 'react';
import BackgroundSection from '../../components/common/BackgroundSection';
import { CardComp } from '../../components/common/CardComp';

import HomeSection from '../../sections/HomeSection';
import { FooterComp } from '../../layout/FooterComp';


function Home() {
	const title = "Find Your Dream Job in Nepal With";
	const explain = "Your gateway to career opportunities"
	return (
		<>
			<BackgroundSection title={title} explain={explain} />
			<div className=' grid grid-row-2 items-center justify-center mt-2'>
				<p className='text-3xl font-bold text-fuchsia-600 text-center'>Featured Jobs</p>
				<div className=' grid gap-7 p-6 md:grid-cols-4 sm:grid-cols-2'>
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
			<HomeSection />

			<FooterComp />
		</>
	);
}

export default Home;
