import React from "react";

function DasCard({ data }) {
	const { number, content } = data
	return (
		<div className="min-w-[320px] min-h-5 p-3 m-2 rounded-2xl overflow-hidden bg-linear-to-r from-indigo-500 to-purple-500 text-white cursor-pointer transition-all duration-700 hover:scale-105">
			<h1 className="text-2xl font-bold">{number}</h1>
			<h2 className="text-2xl font-semibold">{content}</h2>
		</div>
	);
}

export default DasCard;