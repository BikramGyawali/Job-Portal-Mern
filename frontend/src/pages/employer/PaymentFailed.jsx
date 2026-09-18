import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentFailed() {
	const navigate = useNavigate()

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
			<div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
				<div className="text-7xl mb-4">❌</div>
				<h1 className="text-3xl font-bold text-red-500 mb-2">Payment Failed</h1>
				<p className="text-gray-600 mb-6">
					Something went wrong. No amount has been deducted. Please try again.
				</p>
				<div className="bg-red-50 rounded-xl p-4 text-left mb-6 text-sm text-red-700 space-y-1">
					<p className="font-semibold mb-2">Possible reasons:</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Insufficient eSewa balance</li>
						<li>Transaction cancelled</li>
						<li>Session expired (5 min limit)</li>
						<li>Network error</li>
					</ul>
				</div>
				<div className="flex flex-col gap-3">
					<button
						onClick={() => navigate('/employer/recruitment')}
						className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
					>
						Try Again
					</button>
					<button
						onClick={() => navigate('/employer')}
						className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
					>
						Back to Dashboard
					</button>
				</div>
			</div>
		</div>
	)
}

export default PaymentFailed