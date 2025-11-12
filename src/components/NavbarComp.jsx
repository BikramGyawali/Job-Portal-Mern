import React from 'react';
import logo from '../assets/image/logo.png';
import {
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from 'flowbite-react';

function NavbarComp() {
	return (
		<div>
			<Navbar fluid rounded className="!bg-white shadow-md">
				<NavbarBrand href="/">
					<img src={logo} className="mr-3 p-0 h-18  sm:h-20 rounded-full" alt="Company Logo" />
					<span className="self-center whitespace-nowrap text-xl font-semibold !text-black">
						MyCompany
					</span>
				</NavbarBrand>
				<NavbarToggle />
				<NavbarCollapse className=''>
					<NavbarLink
						href="#"
						active
						className="!text-black text-[20px] hover:!text-blue-500 transition-colors duration-300  "
					>
						Home
					</NavbarLink>
					<NavbarLink
						href="#"
						className="!text-black text-[20px] hover:!text-blue-500 transition-colors duration-300 "
					>
						About
					</NavbarLink>
					<NavbarLink
						href="#"
						className="!text-black text-[20px] hover:!text-blue-500 transition-colors duration-300 "
					>
						Services
					</NavbarLink>
					<NavbarLink
						href="#"
						className="!text-black text-[20px] hover:!text-blue-500 transition-colors duration-300 "
					>
						Contact
					</NavbarLink>
					<NavbarLink
						href="#"
						className="!text-black text-[20px] hover:!text-blue-500 transition-colors duration-300 "
					>
						JobSeeker
					</NavbarLink>
					<NavbarLink
						href="#"
						className="!text-black text-[20px] hover:!text-blue-500 transition-colors duration-300 "
					>
						Employers
					</NavbarLink>
				</NavbarCollapse>
			</Navbar>
		</div>
	);
}

export default NavbarComp;
