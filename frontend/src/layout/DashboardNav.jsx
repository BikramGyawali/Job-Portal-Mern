

import {
	Avatar,
	Dropdown,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarBrand,
} from "flowbite-react";
import logo from "../assets/image/newLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavbarData } from "../data/employers/edashboardData";
import { JNavbarData } from "../data/jobseekers/JDashboardData";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";

export function DashboardNav({ onMenuClick, role = "Employer" }) {
	const { state, logout } = useContext(AuthContext);
	const { profile } = useContext(ProfileContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/", { replace: true });
	};

	const dashLink =
		role === "Jobseeker"
			? "/jobseeker"
			: role === "Employer"
				? "/employer"
				: "/admin";

	const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;

	const avatarSrc = profile?.image
		? `${apiUrl}/uploads/images/${profile.image}`
		: `https://cdn-icons-png.flaticon.com/512/17003/17003310.png`;

	const userName =
		profile
			? `${profile.fname || profile.cname || ""} ${profile.mname ?? ""} ${profile.sname ?? ""}`.trim()
			: state.user?.name || "User";

	return (
		<Navbar className="!bg-gray-200 !dark:bg-black text-black shadow px-4 py-2 flex items-center justify-between">

			<button
				onClick={onMenuClick}
				className="lg:hidden mr-2 px-4 py-2 rounded bg-white text-black hover:bg-gray-200"
			>
				☰
			</button>


			<NavbarBrand as={Link} to={dashLink} className="flex items-center" replace>
				<img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
				<span className="self-center whitespace-nowrap text-xl font-semibold">
					Hamro Job
				</span>
			</NavbarBrand>


			<div className="hidden lg:block flex-1 mx-6 overflow-hidden">
				<marquee
					behavior="scroll"
					direction="left"
					className="font-semibold text-sm md:text-lg"
				>
					Welcome {userName} to Hamro Job.  You are logged in as {role} .
				</marquee>
			</div>


			<div className="flex md:order-2">
				<Dropdown
					arrowIcon={false}
					label={
						<Avatar
							alt="User settings"
							img={avatarSrc}
							rounded
							className="cursor-pointer"
						/>
					}
				>
					<DropdownHeader>
						<span className="font-bold text-sm">
							Logged in as {role}
						</span>
						<br />

						<span className="font-bold text-sm">
							{userName}
						</span>

						<span className="block text-sm">
							{profile?.email || state.user?.email || ""}
						</span>

						{profile?.currentAddress && (
							<span className="block text-sm">
								{profile.currentAddress.district
									? `${profile.currentAddress.district}${profile.currentAddress.city
										? ", " + profile.currentAddress.city
										: ""
									}`
									: profile.currentAddress}
							</span>
						)}

						<DropdownItem onClick={handleLogout} className="bg-linear-to-r from-indigo-500 to-purple-500 mt-1 rounded-2xl !text-white text-center justify-center  text-bold w-[70%] ">Sign out</DropdownItem>
					</DropdownHeader>
				</Dropdown>
			</div>
		</Navbar>
	);
}
