import React from 'react';
import { DashboardCardData } from '../../data/employers/DashboardCardData';
import DasCard from './DasCard';

function DashBoxCard() {
	return (
		<div className="
      grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5 shadow-lg   bg-white   backdrop-blur-4xl    mx-5 md:mx-10 p-4 md:p-6 rounded-2xl w-full ">
			{DashboardCardData.map((data, i) => (
				<DasCard data={data} key={i} />
			))}
		</div>
	);
}

export default DashBoxCard;
