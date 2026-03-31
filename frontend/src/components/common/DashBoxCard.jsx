import React from 'react';
import { DashboardCardData } from '../../data/employers/DashboardData';
import DasCard from './DasCard';

function DashBoxCard({ cardData, role }) {
	return (
		<div className="
      grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-20 shadow-lg   bg-white   backdrop-blur-4xl    mx-2 md:mx-10 p-4 md:p-6 rounded-2xl w-full ">
			{cardData.map((data, i) => (
				<DasCard data={data} role={role} key={i} />


			))}
		</div>
	);
}

export default DashBoxCard;
