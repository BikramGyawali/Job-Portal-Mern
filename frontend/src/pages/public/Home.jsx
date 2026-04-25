import React, { useContext, useEffect } from 'react';
import BackgroundSection from '../../components/common/BackgroundSection';
import { CardComp } from '../../components/common/CardComp';

import HomeSection from '../../sections/HomeSection';
import { FooterComp } from '../../layout/FooterComp';
import JobList from '../../sections/JobList';
import { AuthContext } from '../../context/AuthContext';


function Home() {
	const { logout, state } = useContext(AuthContext)
	useEffect(() => {
		if (state.isAuth) {
			logout()
		}
	}, [])
	const title = "Find Your Dream Job in Nepal With";
	const explain = "Your gateway to career opportunities"
	return (
		<>
			<BackgroundSection title={title} explain={explain} />
			<div className=' grid grid-row-2 items-center justify-center mt-2 bg-[#F8FAFC] '>
				<p className='text-3xl font-bold text-fuchsia-600 text-center'>Featured Jobs</p>
				{/*  */}
				<JobList />
			</div>
			<HomeSection />

			<FooterComp />
		</>
	);
}

export default Home;
