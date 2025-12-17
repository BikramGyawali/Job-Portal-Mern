import React from "react";

function DasCard({ data }) {
	const { number, content } = data;

	return (
		<div
			className=" w-full p-5 sm:p-6  rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500  text-white cursor-pointer  shadow-md hover:shadow-xl   transition-transform duration-500   hover:scale-105
      "
		>
			<h1 className="text-xl sm:text-2xl font-bold">{number}</h1>
			<h2 className="text-lg sm:text-xl font-semibold mt-1">{content}</h2>
		</div>
	);
}

export default DasCard;
