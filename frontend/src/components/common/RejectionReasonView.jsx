import { useState } from "react";

export function RejectionReasonView({ reason }) {

	const [open, setOpen] = useState(false);

	if (!reason) return null;

	return (
		<>
			<button
				className="text-red-600 underline text-sm cursor-pointer"
				onClick={() => setOpen(true)}
			>
				View Reason
			</button>

			{open && (
				<div className="fixed inset-0  flex items-center justify-center bg-black/40">
					<div className="bg-white p-6 rounded-lg w-96">
						<h2 className="font-bold mb-3">Rejection Reason</h2>

						<p className="text-gray-700 whitespace-pre-wrap">
							{reason}
						</p>

						<div className="text-right mt-4">
							<button
								className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
								onClick={() => setOpen(false)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default RejectionReasonView;