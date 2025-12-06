
"use client";

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems, TabItem } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiFlag, HiTable } from "react-icons/hi";
import { DashboardNav } from "./DashboardNav";
import { HiCog } from "react-icons/hi2";
import { use } from "react";
import { useLocation } from "react-router-dom";
import { JDashboardData } from "../data/jobseekers/JDashboardData";
import { EDashboardData } from "../data/employers/edashboardData";

export function SideDashboard({ role = "employer" }) {
	const { pathname } = useLocation();
	const menuData = role === "jobseeker" ? JDashboardData : EDashboardData;

	return (
		<>
			{/* <DashboardNav /> */}
			<Sidebar aria-label="Dashboard sidebar" className="!rounded-none" >
				<SidebarItems>
					<SidebarItemGroup>
						{
							menuData.map((item, i) => {
								const { name, type, link, icon, children } = item
								const isActive = pathname.startsWith(link);

								if (type === "item") {
									return (
										<SidebarItem
											key={i}
											href={link}
											icon={icon}
											className={`rounded-md ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
										>
											{name}
										</SidebarItem>
									)
								}
								if (type === "collapse") {
									const collapseActive = children.some((child) =>
										pathname.startsWith(child.link)
									)
									return (
										<SidebarCollapse icon={icon} label={name}
											key={i}
											className={`rounded-md ${collapseActive ? "bg-blue-600 text-white" : ""
												}`}
										>
											{children.map((child, i) => {
												const { name, link } = child;
												const childActive = pathname.startsWith(link);
												return (
													<SidebarItem href={link} key={i}
														className={`rounded-md ml-4 ${childActive
															? "bg-blue-500 text-white"
															: "hover:bg-gray-200"
															}`}
													>
														{name}
													</SidebarItem>
												)
											})}
										</SidebarCollapse>

									)
								}
							})
						}


					</SidebarItemGroup>
				</SidebarItems>
			</Sidebar></>
	);
}
