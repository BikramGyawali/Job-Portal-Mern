import {
	HiChartPie,
	HiUser,
	HiBriefcase,

	HiDownload,


	HiLogout,
	HiOutlineViewList,

} from "react-icons/hi";

export const JDashboardData = [
	{
		type: "item",
		name: "Dashboard",
		icon: HiChartPie,
		link: "/jobseeker",
	},

	{
		type: "item",
		name: "Edit Profile",
		icon: HiUser,
		link: "/jobseeker/edit-profile",
	},

	// {
	// 	type: "item",
	// 	name: "My Documents",
	// 	icon: HiDocumentText,
	// 	link: "/jobseeker/documents",
	// },

	{
		type: "item",
		name: "Applied Jobs",
		icon: HiBriefcase,
		link: "/jobseeker/applied-jobs",
	},

	{
		type: "item",
		name: "Job Listing",
		icon: HiOutlineViewList,
		link: "/jobseeker/job-listing",
	},

	{
		type: "item",
		name: "Download Resume",
		icon: HiDownload,
		link: "/jobseeker/download-resume",
	},



	{
		type: "item",
		name: "Logout",
		icon: HiLogout,
		link: "/",
	},
];


export const JNavbarData = [
	{
		name: "Bikram Gyawali",
		email: "gyawalibikram7@gmail.com"
	}
]
