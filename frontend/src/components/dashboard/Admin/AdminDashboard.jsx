import React from 'react'
import DashBoxCard from '../../common/DashBoxCard'
import { DashboardBodyData, DashboardCardData, DashboardTableHeadData } from '../../../data/admin/Dashboarddata'
import DashTable from '../../common/DashTable'
import ApproveAccounts from './pages/ApproveAccounts'

function AdminDashboard() {
	return (
		<div>
			<div className='flex flex-col gap-5'>
				<DashBoxCard cardData={DashboardCardData} />
				{/* <DashTable
					title="Recent Applications"
					headData={DashboardTableHeadData}
					bodyData={DashboardBodyData}
				/> */}
				<ApproveAccounts />
			</div>
		</div>
	)
}

export default AdminDashboard