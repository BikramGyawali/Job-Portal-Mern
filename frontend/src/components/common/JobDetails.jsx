import React from "react";

import { CreateJobsData } from "../../data/employers/DashboardData";
import ButtonComp from "./ButtonComp";
function JobDetails({
	job,
	showApply = false,
	showClose = false,
	onApply,
	onClose,
	loading,

}) {




	if (!job) return null;

	const formatDate = (date) =>
		new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	return (
		< div className="fixed inset-0  flex items-center justify-end z-50 p-4">
			<div className="bg-white rounded-2xl max-h-[90vh] overflow-y-auto w-full max-w-[60rem] ">

				<div className="bg-white shadow-xl rounded-2xl p-8 max-w-6xl mx-auto flex flex-col gap-6">

					{/* Company Header */}

					<div className="border-b pb-4">
						<h2 className="text-3xl font-bold text-gray-900">
							Company Name:		{job.companyName || "Company Name"}
						</h2>
						<h3 className="text-gray-600 mt-1">
							Hiring Now
						</h3>
					</div>


					<h1 className="text-4xl font-bold tracking-wide text-gray-900">
						{job.jobTitle}
					</h1>

					<div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
						{CreateJobsData.map((field, i) => {
							const value = job[field.name];
							let displayValue = value;



							if (value === undefined || value === null || value === "") return null;
							if (field.label == "Job Specification" || field.label == "Job Description") return null;
							if (field.type === "date") {
								displayValue = formatDate(value)
							}
							if (Array.isArray(value)) {
								displayValue = value.join(',')
							}
							return (
								<React.Fragment key={i}>
									<p className="font-semibold text-gray-700">
										{field.label}
									</p>
									<p className="text-gray-900">
										{displayValue}
									</p>
								</React.Fragment>
							);
						})}
					</div>

					{job.jobDescription && (
						<div className="border-t pt-6">
							<h3 className="text-2xl font-semibold mb-3">
								Job Description
							</h3>
							<p className="text-gray-700 leading-relaxed text-justify">
								{job.jobDescription}
							</p>
						</div>
					)}

					{job.jobSpecification && (
						<div className="border-t pt-6">
							<h3 className="text-2xl font-semibold mb-3">
								Job Specification
							</h3>
							<p className="text-gray-700 leading-relaxed text-justify">
								{job.jobSpecification}
							</p>
						</div>
					)}


					<div className="pt-4 w-fit flex   gap-8 justify-items-center">
						{showApply && (

							<ButtonComp
								name={loading ? "Applying..." : "Apply"}
								click={onApply}
								disable={loading || job.alreadyApplied}
							/>

						)}

						{showClose && (
							<button
								onClick={onClose}
								className="px-5 py-2 bg-gray-600 text-white rounded-xl cursor-pointer"
							>
								Close
							</button>
						)}
					</div>
				</div>
			</div>
		// </div>
	);
}

export default JobDetails;
