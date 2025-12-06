import React from 'react'
import { DashboardCardData } from '../../data/employers/DashboardCardData'
import DasCard from './DasCard'

function DashBoxCard() {
	return (
		<div className='shadow-lg backdrop-blur-4xl bg-white grid grid-cols-2 mx-10 p-3 rounded-2xl w-[700px] min-h-5'>
			{DashboardCardData.map((data, i) =>
			(
				<DasCard data={data} key={i} />
			)
			)}
		</div>
	)
}

export default DashBoxCard