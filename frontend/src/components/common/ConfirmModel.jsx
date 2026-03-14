
import React from 'react'

function ConfirmModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, type }) {
	if (!isOpen) return null

	// Color changes based on type — danger for reject/delete, warning for others
	const confirmStyles = {
		danger: "bg-red-500 hover:bg-red-600 text-white",
		warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
		success: "bg-green-500 hover:bg-green-600 text-white"
	}

	const confirmClass = confirmStyles[type] || confirmStyles.danger

	return (
		// dark overlay to cover whole screen
		<div
			className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
			onClick={onCancel}
		>
			{/* text in the center with  white bg  */}
			<div
				className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 flex flex-col gap-4"
				onClick={(e) => e.stopPropagation()}  // stopPropagation stop the event at child level so no parent event occur
			>
				{/* for icons */}
				<div className="flex items-center gap-3">
					{type === "danger" && (
						<div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
							<span className="text-red-500 text-xl font-bold">!</span>
						</div>
					)}
					{type === "warning" && (
						<div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
							<span className="text-yellow-500 text-xl font-bold">?</span>
						</div>
					)}
					<h2 className="text-lg font-semibold text-gray-800">
						{title || "Are you sure?"}
					</h2>
				</div>

				{/* Message */}
				<p className="text-gray-600 text-sm leading-relaxed">
					{message || "This action cannot be undone."}
				</p>

				{/* Buttons */}
				<div className="flex gap-3 justify-end mt-2">
					<button
						onClick={onCancel}
						className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition cursor-pointer"
					>
						{cancelText || "Cancel"}
					</button>
					<button
						onClick={onConfirm}
						className={`px-5 py-2 rounded-xl text-sm font-medium transition  cursor-pointer ${confirmClass}`}
					>
						{confirmText || "Confirm"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal