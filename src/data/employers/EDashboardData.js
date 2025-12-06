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
			{ name: "All Application", link: "/employer/applications" },
		],
	},

	{
		type: "item",
		name: "Setting",
		icon: HiCog,
		link: "/employer/settings",
	},

	{
		type: "item",
		name: "Sign In",
		icon: HiArrowSmRight,
		link: "/login",
	},

	{
		type: "item",
		name: "Sign Up",
		icon: HiTable,
		link: "/register",
	},
];
