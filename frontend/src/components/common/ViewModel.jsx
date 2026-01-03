export function ViewJobModal({ job, onClose }) {
	if (!job) return null;

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white rounded-xl w-[500px] p-6 shadow-lg">
				<h2 className="text-xl font-semibold mb-4">Job Details</h2>

				<div className="space-y-2 text-sm">
					<p><strong>Company:</strong> {job.companyName}</p>
					<p><strong>Title:</strong> {job.jobTitle}</p>
					<p><strong>Experience:</strong> {job.experience}</p>
					<p><strong>Description:</strong> {job.description}</p>
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
