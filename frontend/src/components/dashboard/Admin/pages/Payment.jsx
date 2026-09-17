import React, { useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { PaymentTableHeadData } from '../../../../data/admin/Dashboarddata'
import Loading from '../../../common/Loading'
import { toast } from 'react-toastify'
import api from '../../../../utils/axiosInstance'

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
			const { data } = await api.get("/api/payment/all")
			setStats({
				totalRevenue: data.totalRevenue,
				premiumCount: data.premiumCount,
				freeCount: data.freeCount
			})

			// Transform to match DashTable format
			const transformed = data.payments.map((payment) => ({
				"Employer": payment.employer?.name || "N/A",
				"Email": payment.employer?.email || "N/A",
				"Amount": payment.amount === 0 ? "Admin Grant" : `NPR ${payment.amount}`,
				"Status": payment.status,
				"Transaction ID": payment.transactionCode || "-",
				"Date": payment.paidAt
					? new Date(payment.paidAt).toLocaleDateString()
					: "-",
				"Actions": ["toggle"],
				_id: payment.employer?._id,
				isPremium: payment.employer?.isPremium,
				fullData: payment
			}))

			setPayments(transformed)
		} catch (error) {
			toast.error("Failed to fetch payments")
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchPayments()
	}, [])

	const handleToggle = useCallback(async (row) => {
		try {
			const res = await api.patch(`/api/payment/toggle-premium/${row._id}`)
			toast.success(res.data.message)
			fetchPayments()
		} catch (error) {
			toast.error("Failed to toggle premium")
		}
	}, [fetchPayments])

	const actionHandler = {
		toggle: handleToggle
	}

	if (isLoading) return <Loading />

	return (
		<div className='flex flex-col gap-5'>

			{/* Stats Row */}
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

			{/* Payment History Table */}
			<DashTable
				headData={PaymentTableHeadData}
				bodyData={payments}
				title={`Payment History (${payments.length})`}
				actionHandler={actionHandler}
				message="No payment records found"
			/>
		</div>
	)
}

export default Payments