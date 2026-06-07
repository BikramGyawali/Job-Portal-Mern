// import React, { useContext, useEffect } from 'react';
// import BackgroundSection from '../../components/common/BackgroundSection';
// import { CardComp } from '../../components/common/CardComp';

// import HomeSection from '../../sections/HomeSection';
// import { FooterComp } from '../../layout/FooterComp';
// import JobList from '../../sections/JobList';
// import { AuthContext } from '../../context/AuthContext';


// function Home() {
// 	const { logout, state } = useContext(AuthContext)
// 	useEffect(() => {
// 		if (state.isAuth) {
// 			logout()
// 		}
// 	}, [])
// 	const title = "Find Your Dream Job in Nepal With";
// 	const explain = "Your gateway to career opportunities"
// 	return (
// 		<>
// 			<BackgroundSection title={title} explain={explain} />
// 			<div className=' grid grid-row-2 items-center justify-center mt-2 bg-[#F8FAFC] '>
// 				<p className='text-3xl font-bold text-fuchsia-600 text-center'>Featured Jobs</p>
// 				{/*  */}
// 				<JobList />
// 			</div>
// 			<HomeSection />

// 			<FooterComp />
// 		</>
// 	);
// }

// export default Home;

import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BackgroundSection from '../../components/common/BackgroundSection';
import { CardComp } from '../../components/common/CardComp';
import HomeSection from '../../sections/HomeSection';
import { FooterComp } from '../../layout/FooterComp';
import JobList from '../../sections/JobList';
import { AuthContext } from '../../context/AuthContext';

function Home() {
	const { logout, state } = useContext(AuthContext);
	useEffect(() => {
		if (state.isAuth) logout();
	}, []);

	return (
		<>
			<Helmet>
				<title>Hamro Job – Find Jobs in Nepal | #1 Job Portal</title>
				<meta name="description" content="Find thousands of verified jobs in Nepal on Hamro Job. Browse job vacancies in Kathmandu, Pokhara, Lalitpur and across Nepal. Apply online today." />
				<meta name="keywords" content="jobs in Nepal, job vacancies Nepal, Kathmandu jobs, find job Nepal, online jobs Nepal, Hamro Job" />
				<link rel="canonical" href="https://hamrojob.bikramgyawali.com.np/" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hamrojob.bikramgyawali.com.np/" />
				<meta property="og:title" content="Hamro Job – Find Jobs in Nepal | #1 Job Portal" />
				<meta property="og:description" content="Find thousands of verified jobs in Nepal. Browse and apply online with Hamro Job." />
				<meta property="og:image" content="https://hamrojob.bikramgyawali.com.np/logo.png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Hamro Job – Find Jobs in Nepal" />
				<meta name="twitter:description" content="Browse thousands of job vacancies across Nepal." />
				<meta name="twitter:image" content="https://hamrojob.bikramgyawali.com.np/logo.png" />
			</Helmet>

			<BackgroundSection title="Find Your Dream Job in Nepal With" explain="Your gateway to career opportunities" />
			<div className='grid grid-row-2 items-center justify-center mt-2 bg-[#F8FAFC]'>
				<p className='text-3xl font-bold text-fuchsia-600 text-center'>Featured Jobs</p>
				<JobList />
			</div>
			<HomeSection />
			<FooterComp />
		</>
	);
}

export default Home;