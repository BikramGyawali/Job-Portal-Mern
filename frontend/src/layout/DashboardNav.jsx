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
import { ProfileContext } from "../context/ProfileContext";

export function DashboardNav({ onMenuClick, role = 'Employer' }) {
	const { state, logout } = useContext(AuthContext);
	const { profile } = useContext(ProfileContext)

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
	const apiUrl = import.meta.env.VITE_API_URL || '';
	const avatarSrc = profile?.image ? `${apiUrl}/uploads/images/${profile.image}` : null;
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
							img={avatarSrc}
							rounded
						/>
					}
				>
					<DropdownHeader>
						<span className="font-bold text-sm">Logged in as {role}</span>
						<br />
						<span className="font-bold text-sm ">{profile ? `${profile.fname || profile.cname || ''} ${profile.mname ?? ''} ${profile.sname ?? ''}`.trim() : ''}</span>
						<span className="block text-sm">{profile?.email || ''}</span>
						<DropdownItem onClick={handleLogout} className="bg-linear-to-r from-indigo-500 to-purple-500 mt-1 rounded-2xl !text-white text-center  text-bold w-[60%] ">Sign out</DropdownItem>
					</DropdownHeader>
				</Dropdown>
			</div>
		</Navbar>
	);
}
