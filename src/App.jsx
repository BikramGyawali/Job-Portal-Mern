

import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/public/Home";
import AboutUS from "./pages/public/AboutUS";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import Jobseekers from "./pages/jobseeker/Jobseekers";
import Employers from "./pages/employer/Employers";
import RegisterComp from "./pages/auth/RegisterComp";

import JobseekersProfile from "./components/profile/JobseekersProfile";
import EmployersProfile from "./components/profile/EmployersProfile";
import { SideDashboard } from "./layout/SideDashboard";


export default function App() {
	return (

		<div>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<AboutUS />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/jobseeker" element={<Jobseekers />} />
					<Route path="/employers" element={<Employers />} />
					<Route path="/register" element={<RegisterComp />} />
					{/* <Route path="/profile" element={<UserProfile />} /> */}
					<Route path="/jobseekers-profile" element={<JobseekersProfile />} />
					<Route path="/employers-profile" element={<EmployersProfile />} />
					<Route path="/dashboard" element={<SideDashboard />} />
				</Routes>
			</BrowserRouter>
		</div>


	);
}



