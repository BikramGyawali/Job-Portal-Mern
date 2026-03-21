
import React, { useState, useEffect } from 'react'
import DashBoxCard from '../../common/DashBoxCard'
import Applicants from './pages/Applicants'
import Loading from '../../common/Loading'
import { DashboardCardData } from '../../../data/employers/DashboardData'

function EmployerDashboard() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 500)
		return () => clearTimeout(timer)
	}, [])

	if (isLoading) return <Loading message="Loading dashboard..." minHeight="min-h-screen" />

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