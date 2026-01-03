import { InfoRow } from "./InfoRow";

export function ViewJobModal({ job, onClose }) {
	if (!job) return null;

	const formatDate = (date) =>
		new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white rounded-xl w-auto max-h-[80vh] overflow-y-auto p-6 shadow-lg">
				<h2 className="text-xl font-semibold mb-4 text-center">
					Job Posted By {job.companyName || "N/A"}
				</h2>

				<div className="grid grid-cols-2 gap-3 text-sm">

					<InfoRow label="Job Title" value={job.jobTitle} />
					<InfoRow label="Openings" value={job.openings} />

					<InfoRow label="Main Category" value={job.mainCategory} />
					<InfoRow label="Sub Category" value={job.subCategory} />

					<InfoRow label="Job Level" value={job.jobLevel} />
					<InfoRow label="Experience" value={job.experience} />

					<InfoRow label="Education" value={job.educationLevel} />
					<InfoRow label="Desired Candidate" value={job.desiredCandidate} />

					<InfoRow label="District" value={job.district} />
					<InfoRow label="Municipality" value={job.municipality} />

					<InfoRow label="Location" value={job.location} />
					<InfoRow label="Posting Period" value={job.postingPeriod} />

					<InfoRow
						label="Salary"
						value={job.salaryRange}
					/>
					<InfoRow
						label="Salary Type"
						value={
							job.salaryCurrency && job.salaryPeriod
								? `${job.salaryCurrency} / ${job.salaryPeriod}`
								: null
						}
					/>

					<InfoRow label="License" value={job.license} />
					<InfoRow label="Vehicle" value={job.vehicle} />

					<InfoRow
						label="Skills"
						value={job.skills?.length ? job.skills.join(", ") : null}
						full
					/>

					{job.jobDescription && (
						<p className="col-span-2">
							<strong>Job Description:</strong><br />
							<span className="text-gray-700">{job.jobDescription}</span>
						</p>
					)}

					{job.jobSpecification && (
						<p className="col-span-2">
							<strong>Job Specification:</strong><br />
							<span className="text-gray-700">{job.jobSpecification}</span>
						</p>
					)}

					{job.createdAt && (
						<p className="col-span-2">
							<strong>Created At:</strong> {formatDate(job.createdAt)}
						</p>
					)}
				</div>

				<div className="mt-6 flex justify-end">
					<button
						className="px-4 py-2 bg-gray-500 text-white rounded-lg"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
