import { useState } from "react";
import { DashboardNav } from "./DashboardNav";
import { SideDashboard } from "./SideDashboard";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children, role = "employer" }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex flex-col bg-[#F3F4F6]">

			<DashboardNav onMenuClick={() => setSidebarOpen(true)} />

			<div className="flex flex-1 overflow-hidden">

				<SideDashboard
					role={role}
					isOpen={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				<main className="flex-1 overflow-auto p-6 bg-white">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;