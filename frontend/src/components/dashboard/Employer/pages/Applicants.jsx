


import React, { useState, useEffect, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { ApplicantHead } from '../../../../data/employers/DashboardData'
import { getAllApplicants } from '../../../../services/jobService'
import useViewApplicants from '../../../../hooks/useViewApplicants'
import { ViewProfileModal } from '../../../common/ViewProfileModal'
import ConfirmModal from '../../../common/ConfirmModel'

import Loading from '../../../common/Loading'


function Applicants() {
	const [applicants, setApplicants] = useState([])
	const [totalApplicants, setTotalApplicants] = useState(0)
	const [loading, setLoading] = useState(true)

	const fetchAllApplicants = useCallback(async () => {
		try {
			setLoading(true)
			const res = await getAllApplicants()
			if (!res?.success) return

			setTotalApplicants(res.totalApplicants || 0)

			const allJobs = res.jobs || []
			const formatted = []

			allJobs.forEach((job) => {
				const { jobTitle, applications } = job
				const safeApplications = Array.isArray(applications) ? applications : []

				safeApplications.forEach((application) => {
					const { applicantProfile, appliedAt, status, _id } = application
					const { fname, sname, email, phone } = applicantProfile || {}

					formatted.push({
						"S.N": "",
						"Job Title": jobTitle || "N/A",
						"Applicant Name": fname ? `${fname} ${sname}` : "N/A",
						"Phone": phone || "N/A",
						"Email": email || "N/A",
						"Applied At": appliedAt
							? new Date(appliedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric"
							})
							: "N/A",
						"Status": status || "pending",
						"Actions": ["view", "shortlist", "reject"],
						fullData: applicantProfile,
						applicationId: _id
					})
				})
			})

			setApplicants(formatted)
		} catch (err) {
			console.error("Failed to load applicants:", err)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchAllApplicants()
	}, [fetchAllApplicants])

	const handleStatusUpdate = useCallback((applicationId, newStatus) => {
		if (newStatus === "rejected") {
			// Remove row completely from table
			setApplicants(prev => prev.filter(row => row.applicationId !== applicationId))
			setTotalApplicants(prev => prev - 1)
		} else {
			// Update status cell only
			setApplicants(prev =>
				prev.map(row =>
					row.applicationId === applicationId
						? { ...row, "Status": newStatus }
						: row
				)
			)
		}
	}, [])

	const {
		viewApplicant,
		handleView,
		closeView,
		handleShortList,
		handleReject,
		actionLoading,
		confirmProps        // ← comes from useViewApplicants → useConfirm
	} = useViewApplicants(handleStatusUpdate)

	const actionHandler = {
		view: handleView,
		shortlist: handleShortList,
		reject: handleReject
	}

	if (loading) {
		return <Loading message='Loading Applicants...' minHeight='min-h-[400px]' />
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between px-2">
				<h2 className="text-xl font-semibold text-gray-800">All Applicants</h2>
				<h3 className="bg-blue-100 text-blue-700 p-1 rounded-full">
					Total Applicants: {totalApplicants}
				</h3>
			</div>

			<DashTable
				headData={ApplicantHead}
				bodyData={applicants}
				actionHandler={actionHandler}
			/>

			{/* Confirm modal — controlled by useConfirm inside useViewApplicants */}
			<ConfirmModal {...confirmProps} />

			{viewApplicant && (
				<ViewProfileModal
					profile={viewApplicant}
					role="jobseeker"
					onClose={closeView}
					showButton={true}
				/>
			)}
		</div>
	)
}

export default Applicants