import { DashboardNav } from "./DashboardNav"
import { SideDashboard } from "./SideDashboard"

const DashboardLayout = () => {
	return (
		<div className="min-h-screen bg-[#F3F4F6] transition-all duration-500 ">
			<div className="flex flex-col h-screen overflow-hidden">
				<DashboardNav />
				<div className="flex-1 flex flex-row overflow-hidden">
					<SideDashboard role="jobseeker" />
				</div>
			</div>

		</div>
	)
}

export default DashboardLayout