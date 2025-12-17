import React from "react";
import DynamicBlock from "./DynamicBlock";

function InfoSection({ section }) {
	return (
		<div className="w-full px-5 py-10 bg-gradient-to-b from-gray-100 to-gray-200">
			<div className="max-w-5xl mx-auto space-y-6">
				{section.map((item, index) => (
					<DynamicBlock key={index} item={item} />
				))}
			</div>
		</div>
	);
}

export default InfoSection;
