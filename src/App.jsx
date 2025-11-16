

import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import Home from "./pages/Home";
import AboutUS from "./pages/AboutUS";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Jobseekers from "./pages/Jobseekers";
import Employers from "./pages/Employers";
import RegisterComp from "./components/RegisterComp";

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
				</Routes>
			</BrowserRouter>
		</div>


	);
}



