

import React, { useContext, useEffect, useState } from "react";
import DashBoxCard from "../../common/DashBoxCard";
import ApproveAccounts from "./pages/ApproveAccounts";
import Loading from "../../common/Loading";
import { JobPostContext } from "../../../context/JobPostContext";
import { ProfileContext } from "../../../context/ProfileContext";

function AdminDashboard() {
	const { fetchPendingJobs, pendingJobs } = useContext(JobPostContext);
	const { fetchPendingProfile, pendingProfile } =
		useContext(ProfileContext);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadDashboardData = async () => {
			setLoading(true);

			await Promise.all([
				fetchPendingJobs(),
				fetchPendingProfile()
			]);

			setLoading(false);
		};

		loadDashboardData();
	}, []);


	const DashboardCardData = [
		{
			number:
				pendingProfile?.filter(
					(profile) => profile.approvalStatus !== "approve"
				).length || 0,
			content: "Pending Profiles",
			link: "/approve-account"
		},
		{
			number: pendingJobs?.filter((job) => !job.isApproved).length || 0,
			content: "Pending Jobs",
			link: "/approve-jobs"
		}

	];

	if (loading) {
		return (
			<Loading
				message="Loading Dashboard"
				minHeight="min-h-[400px]"
			/>
		);
	}

	return (
		<div>
			<div className="flex flex-col gap-5">
				<DashBoxCard
					cardData={DashboardCardData}
					role="admin"
				/>

				<ApproveAccounts />
			</div>
		</div>
	);
}

export default AdminDashboard;