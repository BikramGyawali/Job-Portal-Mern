import DashTable from "../../common/DashTable";
import {
	DashboardTableHeadData,
	DashboardTableBody,
} from "../../data/employers/DashboardData";

function EmployerDashboard() {
	return (
		<div className="flex flex-col gap-5">
			<DashTable
				title="Recent Applications"
				headData={DashboardTableHeadData}
				bodyData={DashboardTableBody}
			/>
		</div>
	);
}

export default EmployerDashboard;
