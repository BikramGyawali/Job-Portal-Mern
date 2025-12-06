
"use client";

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiFlag, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { DashboardNav } from "./DashboardNav";
import { HiCog } from "react-icons/hi2";

export function SideDashboard() {
	return (
		<>
			{/* <DashboardNav /> */}
			<Sidebar aria-label="Sidebar with multi-level dropdown example" >
				<SidebarItems>
					<SidebarItemGroup>
						<SidebarItem href="#" icon={HiChartPie}>
							Dashboard
						</SidebarItem>
						<SidebarCollapse icon={HiFlag} label="Job Board">
							<SidebarItem href="#">Dashboard</SidebarItem>
							<SidebarItem href="#">My Jobs</SidebarItem>
							<SidebarItem href="#">Post a Job</SidebarItem>
							<SidebarItem href="#">All Application</SidebarItem>
						</SidebarCollapse>

						<SidebarItem href="#" icon={HiCog}>
							Setting
						</SidebarItem>

						<SidebarItem href="#" icon={HiArrowSmRight}>
							Sign In
						</SidebarItem>
						<SidebarItem href="#" icon={HiTable}>
							Sign Up
						</SidebarItem>
					</SidebarItemGroup>
				</SidebarItems>
			</Sidebar></>
	);
}
