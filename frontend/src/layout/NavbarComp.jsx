import React from "react";

import newLogo from "../assets/image/fornav.jpeg"
// import newLogo from "../assets/image/hehe.jpg"
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

function NavbarComp() {
	const location = useLocation(); // tells which page you're on

	const links = [
		{ name: "Home", path: "/" },
		{ name: "About Us", path: "/about" },
		{ name: "Services", path: "/services" },
		{ name: "Contact Us", path: "/contact" },
		{ name: "JobSeekers", path: "/jobseekers" },
		{ name: "Employers", path: "/employers" },
	];

	return (
		<div className="sticky top-0 z-50 shadow-md">
			<Navbar fluid rounded className="!bg-white ">
				<NavbarBrand as={Link} to="/">
					<img
						// src={logo}
						src={newLogo}
						className="mr-2 h-15 w-full sm:h-12 sm:w-12  "

						alt="Company Logo"
					/>
					<span className="self-center whitespace-nowrap text-2xl font-bold text-gray-800">
						Hamro Job
					</span>
				</NavbarBrand>

				<NavbarToggle />

				<NavbarCollapse>
					{links.map((link) => (
						<Link
							key={link.name}
							to={link.path}
							className={`
                text-[18px] px-4 py-1 rounded-md 
                transition duration-300
                hover:bg-gray-100 hover:text-blue-600
                ${location.pathname === link.path
									? "text-blue-600 font-semibold"
									: "text-gray-800"
								}
              `}
						>
							{link.name}
						</Link>
					))}
				</NavbarCollapse>
			</Navbar>
		</div>
	);
}

export default NavbarComp;