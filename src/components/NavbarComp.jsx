import React from "react";
import logo from "../assets/image/logo.png";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

function NavbarComp() {
	const location = useLocation(); // tells which page you're on

	const links = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Services", path: "/services" },
		{ name: "Contact", path: "/contact" },
		{ name: "JobSeeker", path: "#" },
		{ name: "Employers", path: "#" },
	];

	return (
		<div className="sticky top-0 z-50 shadow-md">
			<Navbar fluid rounded className="!bg-white">
				<NavbarBrand as={Link} to="/">
					<img
						src={logo}
						className="mr-2 h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
						alt="Company Logo"
					/>
					<span className="self-center whitespace-nowrap text-2xl font-bold text-gray-800">
						MyCompany
					</span>
				</NavbarBrand>

				<NavbarToggle />

				<NavbarCollapse>
					{links.map((link) => (
						<Link
							key={link.name}
							to={link.path}
							className={`
                text-lg px-3 py-2 rounded-md 
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
