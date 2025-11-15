import React from "react";

function DynamicBlock({ item }) {
	if (!item) return null; // prevent undefined crash

	// If image exists → Explanation layout
	if (item.image) {
		return (
			<div className="w-full flex justify-center items-center rounded-xl py-5">
				<div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl p-8 w-full border border-white/10">

					<div className="flex flex-col md:flex-row items-center gap-8">

						<div className="flex justify-center items-center md:w-1/3">
							<img
								src={item.image}
								alt={item.title}
								className="h-36 w-36 drop-shadow-lg rounded-full object-cover"
							/>
						</div>

						<div className="md:w-2/3">
							<h1 className="text-3xl font-bold text-center md:text-left mb-4">
								{item.title}
							</h1>

							<p className="text-xl tracking-tight text-justify px-4 transition-all font-sans duration-500 hover:scale-x-105">
								{item.description}
							</p>
						</div>

					</div>

				</div>
			</div>
		);
	}

	// If no image → Description layout
	return (
		<div className="w-full flex justify-center items-center py-5">
			<div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl p-6 w-full border border-white/10">

				<p className="text-2xl font-semibold text-center tracking-wide mb-2">
					{item.title}
				</p>

				<p className="text-xl tracking-tight text-justify px-4 transition-all font-sans duration-500 hover:scale-x-105">
					{item.description}
				</p>

			</div>
		</div>
	);
}

export default DynamicBlock;
