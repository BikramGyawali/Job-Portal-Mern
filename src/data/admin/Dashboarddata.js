import { HiLogout, HiUser } from "react-icons/hi";
import { HiChartPie } from "react-icons/hi2";

export const DashboardCardData = [

	{
		number: "20",
		content: "Register Approved"
	},
	{
		number: "30",
		content: "Job Approved"
	}
]


export const DashboardTableHeadData = ["S.N", "Name", "Email", "Details", "Actoins"];

export const DashboardBodyData = [
	{
		"S.N": "1",
		"Name": "Bikam",
		"Email": "gyawalibikram7@gamil.com",
		"Details": ["view"],
		"Actions": ["approve", "delete"]
	}
]

export const ADashboardSideData = [
	{
		type: "item",
		icons: HiChartPie,
		name: "Dashboard",
		link: "/admin"
	},
	{
		type: "item",
		icons: HiUser,
		name: "Register Approve",
		link: "/admin/approve-account"
	},
	{
		type: "item",
		icons: HiUser,
		name: "Jobs Post",
		link: "/admin/approve-jobs"
	},
	{
		type: "item",
		icons: HiLogout,
		name: "Logout",
		link: "/adminLogin"
	}
]