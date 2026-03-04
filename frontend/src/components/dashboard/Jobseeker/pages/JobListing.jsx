import React, { useContext, useEffect, useState } from "react";
import logo from "../../../../assets/image/logo.png";
import { jobData, JobListingData, ListingTitle } from "../../../../data/jobseekers/DashboardData";
import ButtonComp from "../../../common/ButtonComp";
import { useLocation } from "react-router-dom";
import { ProfileContext } from "../../../../context/ProfileContext";
import { JMyJobs } from "../../../../services/jobService";

function JobListing() {
	const { profile } = useContext(ProfileContext)
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		const fetchJob = async () => {
			if (!profile?._id) return;
			const response = await JMyJobs();
			if (response.success) {
				setJobs(response?.jobs)
				console.log(response);

			}
		}
		fetchJob()
	}, [profile])
	const { state } = useLocation();
	const formApplied = state?.formApplied;
	const handleClick = () => {
		console.log("click");
	};


	return (
		<div className="bg-white shadow-xl rounded-2xl p-8 max-w-6xl mx-auto flex flex-col gap-6">
			<div className="flex items-center gap-5">
				<img src={logo} alt="company logo" className="h-[70px] rounded-xl" />
				<div>
					<h2 className="text-3xl font-bold">My Company</h2>
					<p className="text-gray-600">Hiring Now</p>
				</div>
			</div>

			<h1 className="text-4xl font-bold tracking-wide text-gray-900">
				Front-End Developer
			</h1>

			<div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
				{ListingTitle.map((title, i) => (
					<React.Fragment key={i}>
						<p className="font-semibold text-gray-700">{title}</p>
						<p className="text-gray-900">
							{JobListingData[0]?.[title]}
						</p>
					</React.Fragment>
				))}
			</div>

			<div className="border-t pt-6 flex flex-col gap-8">
				{jobData.map((section, i) => (
					<div key={i}>
						<h3 className="text-2xl font-semibold mb-3">
							{section.title}
						</h3>
						<p className="text-gray-700 leading-relaxed text-justify">
							{section.content}
						</p>
					</div>
				))}
			</div>

			{!formApplied && (<div className="pt-4 w-fit ">
				<ButtonComp name="Apply Job" click={handleClick} />
			</div>)}
		</div>
	);
}

export default JobListing;
