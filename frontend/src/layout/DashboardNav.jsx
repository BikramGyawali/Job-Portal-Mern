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
import { Link, Links, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { NavbarData } from "../data/employers/edashboardData";
import { JNavbarData } from "../data/jobseekers/JDashboardData";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function DashboardNav({ onMenuClick, role = 'Employer' }) {
	const { state, logout } = useContext(AuthContext);
	const navigate = useNavigate()
	const handleLogout = () => {
		logout()
		navigate(
			role === "Jobseeker" ? "/jobseekers" : role === "Employer" ? "/employers" : "/admin-login"
			, { replace: true }
		)
	}
	const { pathname } = useLocation();
	const myData = role === 'Jobseeker' ? JNavbarData : NavbarData;
	return (
		<Navbar className="bg-[#1E2939] text-white shadow px-4 py-2 flex items-center justify-between">

			<button
				onClick={onMenuClick}
				className="lg:hidden mr-2 px-4 py-2 rounded hover:bg-gray-200 text-gray-900  bg-gray-50"
			>
				☰
			</button>

			{/* Brand */}
			<NavbarBrand as={Link} to="/" className="flex items-center">
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
					{/* <DropdownHeader>
						{myData.map((item, i) => {
							const { name, email } = item;
							return (
								<div key={i}>
									<span className="font-bold text-sm">{name}</span>
									<span className="block truncate text-sm font-medium">
										{email}
									</span>
								</div>
							)
						})}
					</DropdownHeader> */}
 <DropdownHeader>
	<span className="font-bold text-sm">Logged in as</span>
					<span className="block text-sm">{role}</span>
 </DropdownHeader>

					<DropdownItem as={Link} to={`/${role.toLowerCase()}`}>Dashboard</DropdownItem>

					<DropdownDivider />
					<DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
				</Dropdown>
			</div>
		</Navbar>
	);
}
