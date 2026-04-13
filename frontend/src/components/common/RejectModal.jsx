import { useState } from "react";
import { toast } from "react-toastify";
import { rejectJobsService } from "../../services/jobService";


function RejectJobModal({ job, onClose, onSuccess }) {

	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const submitReject = async () => {
		if (!reason.trim()) {
			toast.error("Rejection reason is required");
			return;
		}

		setLoading(true);

		const result = await rejectJobsService(
			job._id,
			reason
		);

		if (result.success) {
			toast.success("Job rejected successfully");

			await onSuccess() // remove job from table

			onClose();
		} else {
			toast.error(result.error);
		}

		setLoading(false);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/40">
			<div className="bg-white p-6 rounded-lg w-96">
				<h2 className="text-lg font-bold mb-4">
					Reject Job
				</h2>

				<textarea
					className="w-full border p-2 rounded"
					placeholder="Enter rejection reason"
					value={reason}
					onChange={e => setReason(e.target.value)}
				/>

				<div className="flex justify-end gap-3 mt-4">
					<button
						className="px-4 py-2 bg-gray-400 rounded cursor-pointer"
						onClick={onClose}
					>
						Cancel
					</button>

					<button
						className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
						onClick={submitReject}
						disabled={loading}
					>
						{loading ? "Rejecting..." : "Reject"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default RejectJobModal;