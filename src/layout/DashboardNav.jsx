
import {
	Avatar,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarBrand,

	NavbarToggle,
} from "flowbite-react";
import logo from "../assets/image/logo.png";

export function DashboardNav() {
	return (
		<Navbar fluid rounded>
			<NavbarBrand href="https://flowbite-react.com">
				<img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Hamro Job</span>
			</NavbarBrand>
			<div className="flex md:order-2">
				<Dropdown
					arrowIcon={false}

					label={
						<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
					}
				>
					<DropdownHeader>
						<span className="bold text-sm ">Bikram Gyawali</span>
						<span className="block truncate text-sm font-medium">gyawalibikra7@gamil.com</span>
					</DropdownHeader>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>

					<DropdownDivider />
					<DropdownItem>Sign out</DropdownItem>
				</Dropdown>

			</div>

		</Navbar>
	);
}
