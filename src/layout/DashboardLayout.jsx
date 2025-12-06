import { DashboardNav } from "./DashboardNav"
import { SideDashboard } from "./SideDashboard"

const DashboardLayout = () => {
	retutrn(
		<div className="min-h-screen bg-gradient-to-br form-slate-5- via-blue-50 to-indigo-50 transition-all duration-500 ">
			<div className="flex h-screen overflow-hidden">
				<SideDashboard />
				<div className="flex-1 flex flex-col overflow-hidden">
		<DashboardNav/>
				</div>
			</div>

		</div>
	)
}

export default DashboardLayout