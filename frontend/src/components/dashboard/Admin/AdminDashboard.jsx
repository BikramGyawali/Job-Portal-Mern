import React, { useEffect, useState } from 'react'
import DashBoxCard from '../../common/DashBoxCard'
import { DashboardBodyData, DashboardCardData, DashboardTableHeadData } from '../../../data/admin/Dashboarddata'
import DashTable from '../../common/DashTable'
import ApproveAccounts from './pages/ApproveAccounts'
import Loading from '../../common/Loading'

function AdminDashboard() {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 500)
		return () => clearTimeout(timer)
	}, [])
	if (loading) {
		return <Loading message='Lading Dashboard' minHeight='min-h-[400px]' />
	}
	return (
		<div>
			<div className='flex flex-col gap-5'>
				<DashBoxCard cardData={DashboardCardData} />

				<ApproveAccounts />
			</div>
		</div>
	)
}

export default AdminDashboard