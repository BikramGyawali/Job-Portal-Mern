import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentSuccess() {
	const navigate = useNavigate()
	const [count, setCount] = useState(5)

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(prev => {
				if (prev === 1) {
					clearInterval(interval)
					navigate('/employer/recruitment')
				}
				return prev - 1
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
			<div className="bg-white rounded-2xl  p-10 max-w-md w-full text-center shadow-md hover:shadow-xl   transition-transform duration-500   hover:scale-101">
				{/* <div className="text-7xl mb-4">🎉</div> */}
				<h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
				<p className="text-gray-600 mb-6">
					Your premium plan is now active for <strong>30 days</strong>.
				</p>
				<div className="bg-green-50 rounded-xl p-4 text-left mb-6 space-y-2">
					{[
						"AI Recruitment tools unlocked",
						"Featured badge on your job posts",
						"Priority support activated",
					].map((f, i) => (
						<div key={i} className="flex items-center gap-2 text-green-700 text-sm">
							<span className="font-bold">✓</span> {f}
						</div>
					))}
				</div>
				<p className="text-gray-400 text-sm mb-4">
					Redirecting in <strong>{count}</strong> seconds...
				</p>
				<button
					onClick={() => navigate('/employer/recruitment')}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
				>
					Go to AI Recruitment Now
				</button>
			</div>
		</div>
	)
}

export default PaymentSuccess