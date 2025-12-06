import React from "react";

function DasCard({ number, Content }) {
	return (
		<div className="w-[300px] p-3 m-2 rounded-2xl overflow-hidden bg-linear-to-r from-indigo-500 to-purple-500 text-white">
			<h1 className="text-2xl font-bold">{number}</h1>
			<h2 className="text-2xl font-semibold">{Content}</h2>
		</div>
	);
}

export default DasCard;