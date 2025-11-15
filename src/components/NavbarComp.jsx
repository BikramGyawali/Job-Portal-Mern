import React from "react";
import logo from "../assets/image/logo.png";
import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";

function NavbarComp() {
	return (
		<div className="sticky top-0 z-50 shadow-md">
			<Navbar fluid rounded className="!bg-white">
				<NavbarBrand href="/">
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
					<NavbarLink
						href="#"
						active
						className="text-lg !text-gray-800 hover:!text-blue-600 transition duration-300"
					>
						Home
					</NavbarLink>

					<NavbarLink
						href="#"
						className="text-lg !text-gray-800 hover:!text-blue-600 transition duration-300"
					>
						About
					</NavbarLink>

					<NavbarLink
						href="#"
						className="text-lg !text-gray-800 hover:!text-blue-600 transition duration-300"
					>
						Services
					</NavbarLink>

					<NavbarLink
						href="#"
						className="text-lg !text-gray-800 hover:!text-blue-600 transition duration-300"
					>
						Contact
					</NavbarLink>

					<NavbarLink
						href="#"
						className="text-lg !text-gray-800 hover:!text-blue-600 transition duration-300"
					>
						JobSeeker
					</NavbarLink>

					<NavbarLink
						href="#"
						className="text-lg !text-gray-800 hover:!text-blue-600 transition duration-300"
					>
						Employers
					</NavbarLink>
				</NavbarCollapse>
			</Navbar>
		</div>
	);
}

export default NavbarComp;
