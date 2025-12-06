import { useState } from "react";
import { DashboardNav } from "./DashboardNav";
import { SideDashboard } from "./SideDashboard";

const DashboardLayout = ({ children, role = "employer" }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex flex-col bg-[#F3F4F6]">
			{/* Navbar always visible */}
			<DashboardNav onMenuClick={() => setSidebarOpen(true)} />

			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<SideDashboard
					role={role}
					isOpen={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				{/* Main content */}
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;