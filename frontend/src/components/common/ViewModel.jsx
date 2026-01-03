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
				<h2 className="text-xl font-semibold mb-4 text-center">Job Posted By {job.companyName}</h2>

				<div className="grid grid-cols-2 gap-3 text-sm">
					<p><strong>Job Title:</strong> {job.jobTitle}</p>
					<p><strong>Openings:</strong> {job.openings}</p>

					<p><strong>Main Category:</strong> {job.mainCategory}</p>
					<p><strong>Sub Category:</strong> {job.subCategory}</p>

					<p><strong>Job Level:</strong> {job.jobLevel}</p>
					<p><strong>Experience:</strong> {job.experience}</p>

					<p><strong>Education:</strong> {job.educationLevel}</p>
					<p><strong>Desired Candidate:</strong> {job.desiredCandidate}</p>

					<p><strong>District:</strong> {job.district}</p>
					<p><strong>Municipality:</strong> {job.municipality}</p>

					<p><strong>Location:</strong> {job.location}</p>
					<p><strong>Posting Period:</strong> {job.postingPeriod}</p>

					<p><strong>Salary:</strong> {job.salaryRange}</p>
					<p><strong>Salary Type:</strong> {job.salaryCurrency} / {job.salaryPeriod}</p>

					<p><strong>License:</strong> {job.license}</p>
					<p><strong>Vehicle:</strong> {job.vehicle}</p>

					<p className="col-span-2">
						<strong>Skills:</strong> {job.skills?.join(", ")}
					</p>

					<p className="col-span-2">
						<strong>Job Description:</strong><br />
						<span className="text-gray-700">{job.jobDescription}</span>
					</p>

					<p className="col-span-2">
						<strong>Job Specification:</strong><br />
						<span className="text-gray-700">{job.jobSpecification}</span>
					</p>

					<p className="col-span-2">
						<strong>Created At:</strong> {formatDate(job.createdAt)}
					</p>
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
