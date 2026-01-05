import { HiChartPie, HiFlag, HiCog, HiArrowSmRight, HiTable } from "react-icons/hi";



export const EDashboardData = [
	{
		type: "item",
		name: "Dashboard",
		icon: HiChartPie,
		link: "/employer",
	},

	{
		type: "collapse",
		name: "Job Board",
		icon: HiFlag,
		children: [
			{ name: "Dashboard", link: "/employer/job-board" },
			{ name: "My Jobs", link: "/employer/my-jobs" },
			{ name: "Post a Job", link: "/employer/post-job" },
			{ name: "All Applicants", link: "/employer/applicants" },
		],
	},

	// {
	// 	type: "item",
	// 	name: "Setting",
	// 	icon: HiCog,
	// 	link: "/employer/settings",
	// },

	{
		type: "item",
		name: "Logout",
		icon: HiArrowSmRight,
		link: "/",
	},

];

export const NavbarData = [
	{
		name: "Coding journey",
		email: "cj7@gmail.com"
	}
]