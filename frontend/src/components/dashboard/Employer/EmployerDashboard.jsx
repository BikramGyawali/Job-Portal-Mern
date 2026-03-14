import React from 'react'
import DasCard from '../../common/DasCard'
import DashBoxCard from '../../common/DashBoxCard'
import DashTable from '../../common/DashTable'
import { DashboardCardData, DashboardTableBody, DashboardTableHeadData } from '../../../data/employers/DashboardData'
import ViewApplicant from '../../common/ViewApplicant'
import Applicants from './pages/Applicants'

function EmployerDashboard() {

	return (
		<div>
			<div className='flex flex-col gap-5'>
				<DashBoxCard cardData={DashboardCardData} />
				<Applicants />
			</div>
		</div>
	)
}

export default EmployerDashboard