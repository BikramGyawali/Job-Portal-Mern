import {
	Avatar,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarBrand,
} from "flowbite-react";
import logo from "../assets/image/newLogo.png";

export function DashboardNav({ onMenuClick }) {
	return (
		<Navbar className="bg-[#1E2939] text-white shadow px-4 py-2 flex items-center justify-between">

			<button
				onClick={onMenuClick}
				className="lg:hidden mr-2 px-4 py-2 rounded hover:bg-gray-200 text-gray-900  bg-gray-50"
			>
				☰
			</button>

			{/* Brand */}
			<NavbarBrand href="/" className="flex items-center">
				<img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
				<span className="self-center whitespace-nowrap text-xl font-semibold">
					Hamro Job
				</span>
			</NavbarBrand>

			{/* User Dropdown */}
			<div className="flex md:order-2">
				<Dropdown
					arrowIcon={false}
					label={
						<Avatar
							alt="User settings"
							img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							rounded
						/>
					}
				>
					<DropdownHeader>
						<span className="font-bold text-sm">Bikram Gyawali</span>
						<span className="block truncate text-sm font-medium">
							gyawalibikra7@gamil.com
						</span>
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
