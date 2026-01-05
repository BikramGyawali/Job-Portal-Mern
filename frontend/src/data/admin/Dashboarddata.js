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
	}, {
		number: "20",
		content: "Register Request"
	}
]


export const DashboardTableHeadData = ["S.N", "Name", "Email", "Role", "Actions"];

export const DashboardBodyData = [
	{
		"S.N": "1",
		"Name": "Bikram Gyawali",
		"Email": "gyawalibikram7@gamil.com",
		"Role": "Jobseeker",
		// "Details": ["view"],
		"Actions": ["approve", "reject", "view"]
	}
]

export const JobHeads = ["S.N", "Company Name", "Job Title", "Experience", "Actions"];
export const JobData = [
	{
		"S.N": "1",
		"Company Name": "Hehe",
		"Post": "Frontend Developer",
		"Experience": "Fresher",
		// "Details": ["view"],
		"Actions": ["approve", "reject", "view"]
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
		link: "/"
	}
]