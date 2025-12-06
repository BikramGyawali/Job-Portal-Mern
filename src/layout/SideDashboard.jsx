import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarCollapse } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { JDashboardData } from "../data/jobseekers/JDashboardData";
import { EDashboardData } from "../data/employers/edashboardData";
import { HiX } from "react-icons/hi";

export function SideDashboard({ role = "Employer", isOpen, onClose }) {
	const { pathname } = useLocation();
	const menuData = role === "Jobseeker" ? JDashboardData : EDashboardData;

	const renderMenu = (closeOnClick = false) => (
		<SidebarItems>
			<p className="text-center text-[15px] sm:text-2xl md:text-3xl font-extrabold tracking-wide   ">
				{role} Dashboard
			</p>

			<SidebarItemGroup>
				{menuData.map((item, i) => {
					const { name, type, link, icon, children } = item;
					const isActive = pathname === link;


					if (type === "item") {
						return (
							<SidebarItem
								key={i}
								as={Link}
								to={link}
								icon={icon}
								className={`rounded-md ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`}
								onClick={closeOnClick ? onClose : undefined}
							>
								{name}
							</SidebarItem>
						);
					}

					if (type === "collapse") {
						const collapseActive = children.some((child) => pathname.startsWith(child.link));

						return (
							<SidebarCollapse
								key={i}
								// 	as={Link}
								// to="/link"
								icon={icon}
								label={name}
								className={`rounded-md ${collapseActive ? "bg-blue-600 text-white" : ""}`}
							>
								{children.map((child, j) => {
									const childActive = pathname === child.link;
									return (
										<SidebarItem
											key={j}
											href={child.link}
											as={Link}
											to={child.link}
											className={`rounded-md ml-4 ${childActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
											onClick={closeOnClick ? onClose : undefined}
										>
											{child.name}
										</SidebarItem>
									);
								})}
							</SidebarCollapse>
						);
					}

					return null;
				})}
			</SidebarItemGroup>
		</SidebarItems>
	);

	return (
		<>

			<div className="hidden lg:block w-64">
				<Sidebar aria-label="Dashboard sidebar" className="bg-[#1E2939] text-white h-screen">
					{renderMenu(false)}
				</Sidebar>
			</div>


			<div className="lg:hidden">
				<Sidebar
					aria-label="Dashboard sidebar (mobile)"
					className={`bg-[#1E2939] text-white h-screen fixed top-0 left-0 z-50 w-64 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
				>

					<div className="flex justify-end p-2">
						<button
							onClick={onClose}
							className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800"
							aria-label="Close sidebar"
						>
							<HiX size={20} />
						</button>
					</div>

					{renderMenu(true)}
				</Sidebar>


				{isOpen && (
					<div
						className="fixed inset-0 bg-black/40 z-40"
						onClick={onClose}
						aria-hidden="true"
					/>
				)}
			</div>
		</>
	);
}