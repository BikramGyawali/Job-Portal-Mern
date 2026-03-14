

import React, { useCallback, useEffect, useState } from 'react'
import DashTable from './DashTable'
import { ApplicantHead } from '../../data/employers/DashboardData'
import useViewApplicants from '../../hooks/useViewApplicants'
import { ViewProfileModal } from './ViewProfileModal'
import { getApplicants } from '../../services/jobService'
import ConfirmModal from './ConfirmModel'

function ViewApplicant({ jobId }) {
	const [open, setOpen] = useState(false)
	const [applicants, setApplicants] = useState([]);


	const fetchApplicants = useCallback(async () => {
		try {
			const res = await getApplicants(jobId)

			if (res?.success) {
				const raw = res.applicants.data.applicants

				const formatted = raw.map((app) => {
					const { jobId: jobDetails, applicantId, appliedAt, status, _id } = app
					const { fname, sname, email, phone } = applicantId || {}

					return {
						"Job Title": jobDetails?.jobTitle || "N/A",
						"Applicant Name": fname ? `${fname} ${sname}` : "Deleted User",
						// "Phone": phone || "N/A",
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
						fullData: applicantId,
						applicationId: _id         // ← JobApplication._id for shortlist/reject
					}
				})

				setApplicants(formatted)
			}
		} catch (error) {
			console.error("Failed to fetch applicants", error)
		}
	}, [jobId])

	useEffect(() => {
		if (!open || !jobId) return
		fetchApplicants()
	}, [open, jobId, fetchApplicants])

	const handleStatusUpdate = useCallback((applicationId, newStatus) => {
		if (newStatus === "rejected") {
			setApplicants(prev =>
				prev.filter(row => row.applicationId !== applicationId)
			)
		}
		else {
			setApplicants(prev =>
				prev.map(row =>
					row.applicationId == applicationId ?
						{
							...row, "Status": newStatus
						} : row
				)

			)
		}
	}, [])

	const { handleView, viewApplicant, closeView, handleShortList, handleReject, confirmProps } =
		useViewApplicants(handleStatusUpdate)

	const actionHandler = {
		view: handleView,
		shortlist: handleShortList,
		reject: handleReject
	}

	if (!jobId) return null

	return (
		<>
			<button
				className="text-blue-600 underline text-sm cursor-pointer"
				onClick={() => setOpen(true)}
			>
				View Applicants
			</button>

			{open && (
				<div className="fixed inset-0 flex items-center justify-end pr-6 bg-black/40 z-50">
					<div className="bg-white p-6 rounded-lg w-[970px] max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between mb-4">
							<h2 className="font-bold text-lg">Applicants</h2>
							<button
								onClick={() => setOpen(false)}
								className="px-3 py-1 bg-gray-300 rounded cursor-pointer"
							>
								Close
							</button>
						</div>

						<DashTable
							headData={ApplicantHead}
							bodyData={applicants}
							actionHandler={actionHandler}
						/>

						{viewApplicant && (
							<ViewProfileModal
								profile={viewApplicant}
								role="jobseeker"
								onClose={closeView}
							/>

						)}
						<ConfirmModal {...confirmProps} />
					</div>
				</div>
			)}
		</>
	)
}

export default ViewApplicant
