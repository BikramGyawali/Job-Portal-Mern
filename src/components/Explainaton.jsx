import React from "react";
import logo from "../assets/image/logo.png";

function Explanation() {
	return (
		<div className="w-full  flex justify-center items-center py-5 px-5   sm:p-10 rounded-xl shadow-md">
			<div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-2xl p-8 w-full border border-white/10">

				<div className="flex flex-col md:flex-row items-center gap-8">


					<div className="flex justify-center items-center md:w-1/3">
						<img
							src={logo}
							alt="Hamro Jobs Logo"
							className="h-36 w-36   object-cover  drop-shadow-md rounded-full"
						/>
					</div>


					<div className="md:w-2/3">
						<h1 className="text-3xl font-bold text-center md:text-left mb-4">
							Our Founding Story
						</h1>

						<p className="text-lg leading-relaxed text-justify">
							Hamro Job was established with a clear mission — to bridge the gap
							between talented Nepali jobseekers and meaningful employment
							opportunities. What began as a small initiative has grown into a
							trusted platform serving thousands across Nepal, driven by a
							commitment to empower individuals through accessible, reliable, and
							verified online job listings.
						</p>
					</div>

				</div>
			</div>

		</div>
	);
}

export default Explanation;
