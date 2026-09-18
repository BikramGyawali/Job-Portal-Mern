// import React, { useEffect, useState, useCallback } from 'react'
// import DashTable from '../../../common/DashTable'
// import { PaymentTableHeadData } from '../../../../data/admin/Dashboarddata'
// import Loading from '../../../common/Loading'
// import { toast } from 'react-toastify'
// import api from '../../../../utils/axiosInstance'

// function Payments() {
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [payments, setPayments] = useState([])
// 	const [stats, setStats] = useState({
// 		totalRevenue: 0,
// 		premiumCount: 0,
// 		freeCount: 0
// 	})

// 	const fetchPayments = useCallback(async () => {
// 		setIsLoading(true)
// 		try {
// 			const { data } = await api.get("/payment/all")
// 			setStats({
// 				totalRevenue: data.totalRevenue,
// 				premiumCount: data.premiumCount,
// 				freeCount: data.freeCount
// 			})

// 			// Transform to match DashTable format
// 			const transformed = data.payments.map((payment) => ({
// 				"Employer": payment.employer?.name || "N/A",
// 				"Email": payment.employer?.email || "N/A",
// 				"Amount": payment.amount === 0 ? "Admin Grant" : `NPR ${payment.amount}`,
// 				"Status": payment.status,
// 				"Transaction ID": payment.transactionCode || "-",
// 				"Date": payment.paidAt
// 					? new Date(payment.paidAt).toLocaleDateString()
// 					: "-",

// 				_id: payment.employer?._id,
// 				isPremium: payment.employer?.isPremium,
// 				fullData: payment
// 			}))

// 			setPayments(transformed)
// 		} catch (error) {
// 			toast.error("Failed to fetch payments")
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}, [])

// 	useEffect(() => {
// 		fetchPayments()
// 	}, [])

// 	const handleToggle = useCallback(async (row) => {
// 		try {
// 			const res = await api.patch(`/payment/toggle-premium/${row._id}`)
// 			toast.success(res.data.message)
// 			fetchPayments()
// 		} catch (error) {
// 			toast.error("Failed to toggle premium")
// 		}
// 	}, [fetchPayments])

// 	const actionHandler = {
// 		toggle: handleToggle
// 	}

// 	if (isLoading) return <Loading />

// 	return (
// 		<div className='flex flex-col gap-5'>

// 			{/* Stats Row */}
// 			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
// 				<div className='bg-green-50 border border-green-200 rounded-xl p-5 text-center'>
// 					<p className='text-3xl font-bold text-green-700'>
// 						NPR {stats.totalRevenue.toLocaleString()}
// 					</p>
// 					<p className='text-gray-500 mt-1 text-sm'>Total Revenue</p>
// 				</div>
// 				<div className='bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center'>
// 					<p className='text-3xl font-bold text-yellow-600'>{stats.premiumCount}</p>
// 					<p className='text-gray-500 mt-1 text-sm'>Premium Employers</p>
// 				</div>
// 				<div className='bg-gray-50 border border-gray-200 rounded-xl p-5 text-center'>
// 					<p className='text-3xl font-bold text-gray-600'>{stats.freeCount}</p>
// 					<p className='text-gray-500 mt-1 text-sm'>Free Employers</p>
// 				</div>
// 			</div>

// 			{/* Payment History Table */}
// 			<DashTable
// 				headData={PaymentTableHeadData}
// 				bodyData={payments}
// 				title={`Payment History (${payments.length})`}
// 				actionHandler={actionHandler}
// 				message="No payment records found"
// 			/>
// 		</div>
// 	)
// }

// export default Payments


import React, { useEffect, useState, useCallback } from 'react'
import Loading from '../../../common/Loading'
import { toast } from 'react-toastify'
import api from '../../../../utils/axiosInstance'

const headData = ["Employer", "Email", "Amount", "Status", "Transaction ID", "Date"]

function Payments() {
	const [isLoading, setIsLoading] = useState(true)
	const [payments, setPayments] = useState([])
	const [stats, setStats] = useState({
		totalRevenue: 0,
		premiumCount: 0,
		freeCount: 0
	})

	const fetchPayments = useCallback(async () => {
		setIsLoading(true)
		try {
			const { data } = await api.get("/payment/all")
			setStats({
				totalRevenue: data.totalRevenue,
				premiumCount: data.premiumCount,
				freeCount: data.freeCount
			})
			setPayments(data.payments)
		} catch (error) {
			toast.error("Failed to fetch payments")
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchPayments()
	}, [])

	if (isLoading) return <Loading />

	return (
		<div className='flex flex-col gap-5'>

			{/* Stats */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<div className='bg-green-50 border border-green-200 rounded-xl p-5 text-center'>
					<p className='text-3xl font-bold text-green-700'>
						NPR {stats.totalRevenue.toLocaleString()}
					</p>
					<p className='text-gray-500 mt-1 text-sm'>Total Revenue</p>
				</div>
				<div className='bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center'>
					<p className='text-3xl font-bold text-yellow-600'>{stats.premiumCount}</p>
					<p className='text-gray-500 mt-1 text-sm'>Premium Employers</p>
				</div>
				<div className='bg-gray-50 border border-gray-200 rounded-xl p-5 text-center'>
					<p className='text-3xl font-bold text-gray-600'>{stats.freeCount}</p>
					<p className='text-gray-500 mt-1 text-sm'>Free Employers</p>
				</div>
			</div>

			{/* Table */}
			<div className='bg-white rounded-2xl shadow overflow-hidden'>
				<div className='px-6 py-4 border-b'>
					<p className='font-bold text-gray-800'>
						Payment History ({payments.length})
					</p>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full text-sm text-left'>
						<thead className='bg-gray-800 text-white'>
							<tr>
								{headData.map((h, i) => (
									<th key={i} className='px-4 py-3'>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{payments.length === 0 && (
								<tr>
									<td colSpan={6} className='text-center py-6 text-gray-400'>
										No payment records found
									</td>
								</tr>
							)}
							{payments.map((payment) => (
								<tr key={payment._id} className='border-b hover:bg-gray-50'>
									<td className='px-4 py-3 font-medium'>
										{payment.employer?.name || "N/A"}
									</td>
									<td className='px-4 py-3'>{payment.employer?.email || "N/A"}</td>
									<td className='px-4 py-3'>NPR {payment.amount}</td>
									<td className='px-4 py-3'>
										<span className={`px-2 py-1 rounded-full text-xs font-semibold ${payment.status === "success"
												? "bg-green-100 text-green-700"
												: payment.status === "pending"
													? "bg-yellow-100 text-yellow-700"
													: "bg-red-100 text-red-700"
											}`}>
											{payment.status}
										</span>
									</td>
									<td className='px-4 py-3 text-xs text-gray-500'>
										{payment.transactionCode || "-"}
									</td>
									<td className='px-4 py-3 text-xs text-gray-500'>
										{payment.paidAt
											? new Date(payment.paidAt).toLocaleDateString()
											: "-"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

		</div>
	)
}

export default Payments