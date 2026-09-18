

// import React, { useContext, useEffect, useState } from "react";
// import DashBoxCard from "../../common/DashBoxCard";
// import ApproveAccounts from "./pages/ApproveAccounts";
// import Loading from "../../common/Loading";
// import { JobPostContext } from "../../../context/JobPostContext";
// import { ProfileContext } from "../../../context/ProfileContext";

// function AdminDashboard() {
// 	const { fetchPendingJobs, pendingJobs } = useContext(JobPostContext);
// 	const { fetchPendingProfile, pendingProfile } =
// 		useContext(ProfileContext);

// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const loadDashboardData = async () => {
// 			setLoading(true);

// 			await Promise.all([
// 				fetchPendingJobs(),
// 				fetchPendingProfile()
// 			]);

// 			setLoading(false);
// 		};

// 		loadDashboardData();
// 	}, []);


// 	const DashboardCardData = [
// 		{
// 			number:
// 				pendingProfile?.filter(
// 					(profile) => profile.approvalStatus !== "approve"
// 				).length || 0,
// 			content: "Pending Profiles",
// 			link: "/approve-account"
// 		},
// 		{
// 			number: pendingJobs?.filter((job) => !job.isApproved).length || 0,
// 			content: "Pending Jobs",
// 			link: "/approve-jobs"
// 		},
// 		// {
// 		// 	number: `NPR ${totalRevenue.toLocaleString()}`,
// 		// 	content: "Total Revenue",
// 		// 	link: "/subscription-payments"
// 		// }

// 	];

// 	if (loading) {
// 		return (
// 			<Loading
// 				message="Loading Dashboard"
// 				minHeight="min-h-[400px]"
// 			/>
// 		);
// 	}

// 	return (
// 		<div>
// 			<div className="flex flex-col gap-5">
// 				<DashBoxCard
// 					cardData={DashboardCardData}
// 					role="admin"
// 				/>

// 				<ApproveAccounts />
// 			</div>
// 		</div>
// 	);
// }

// export default AdminDashboard;

import React, { useContext, useEffect, useState } from "react";
import DashBoxCard from "../../common/DashBoxCard";
import ApproveAccounts from "./pages/ApproveAccounts";
import Loading from "../../common/Loading";
import { JobPostContext } from "../../../context/JobPostContext";
import { ProfileContext } from "../../../context/ProfileContext";
import api from "../../../utils/axiosInstance";

function AdminDashboard() {
	const { fetchPendingJobs, pendingJobs } = useContext(JobPostContext);
	const { fetchPendingProfile, pendingProfile } = useContext(ProfileContext);
	const [loading, setLoading] = useState(true);
	const [totalRevenue, setTotalRevenue] = useState(0);
	const [premiumCount, setPremiumCount] = useState(0);
	const [freeCount, setFreeCount] = useState(0);

	useEffect(() => {
		const loadDashboardData = async () => {
			setLoading(true);
			await Promise.all([fetchPendingJobs(), fetchPendingProfile()]);

			try {
				const { data } = await api.get("/payment/all");
				setTotalRevenue(data.totalRevenue);
				setPremiumCount(data.premiumCount);
				setFreeCount(data.freeCount);
			} catch (err) {
				console.error("Revenue fetch failed:", err);
			}

			setLoading(false);
		};
		loadDashboardData();
	}, []);

	const DashboardCardData = [
		{
			number: pendingProfile?.filter(
				(profile) => profile.approvalStatus !== "approve"
			).length || 0,
			content: "Pending Profiles",
			link: "/approve-account"
		},
		{
			number: pendingJobs?.filter((job) => !job.isApproved).length || 0,
			content: "Pending Jobs",
			link: "/approve-jobs"
		},
		{
			number: `NPR ${totalRevenue.toLocaleString()}`,
			content: "Total Revenue",
			link: "/subscription-payments"
		},
		{
			number: premiumCount,
			content: "Premium Employers",
			link: "/subscription-payments"
		},
		{
			number: freeCount,
			content: "Free Employers",
			link: "/subscription-payments"
		},
	];

	if (loading) {
		return <Loading message="Loading Dashboard" minHeight="min-h-[400px]" />;
	}

	return (
		<div>
			<div className="flex flex-col gap-5">
				<DashBoxCard cardData={DashboardCardData} role="admin" />
				<ApproveAccounts />
			</div>
		</div>
	);
}

export default AdminDashboard;