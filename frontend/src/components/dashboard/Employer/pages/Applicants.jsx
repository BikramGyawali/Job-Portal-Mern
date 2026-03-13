import React, { useState, useEffect } from 'react'
import DashTable from '../../../common/DashTable'
import { ApplicantHead } from '../../../../data/employers/DashboardData'
import { getAllApplicants } from '../../../../services/jobService'
import useViewApplicants from '../../../../hooks/useViewApplicants'
import { ViewProfileModal } from '../../../common/ViewProfileModal'

function Applicants() {
	const [applicants, setApplicants] = useState([])
	const [totalApplicants, setTotalApplicants] = useState(0)
	const [loading, setLoading] = useState(true)
	const { viewApplicant, handleView, closeView } = useViewApplicants()

	useEffect(() => {
		const fetchAllApplicants = async () => {
			try {
				setLoading(true)

				const res = await getAllApplicants()

				if (!res?.success) return

				setTotalApplicants(res.totalApplicants || 0)

				const allJobs = res.jobs || []
				const formatted = []

				allJobs.forEach((job) => {
					const { jobTitle, applications, jobId } = job

					const safeApplications = Array.isArray(applications) ? applications : []

					safeApplications.forEach((application) => {
						const { applicantProfile, appliedAt, status } = application
						const { fname, mname, sname, email, phone, _id } = applicantProfile || {}

						formatted.push({
							"S.N": "",
							"jobId": jobId,
							"applicantId": _id,
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
							fullData: applicantProfile
						})
					})
				})

				setApplicants(formatted)

			} catch (err) {
				console.error("Failed to load applicants:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchAllApplicants()
	}, [])

	const handleShortList = (row) => console.log("shortlisted", row)
	const handleReject = (row) => console.log("rejected", row)

	const actionHandler = {
		view: handleView,
		shortlist: handleShortList,
		reject: handleReject
	}

	if (loading) {
		return <div className="p-6 text-gray-500">Loading applicants...</div>
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between px-2">
				<h2 className="text-xl font-semibold text-gray-800">All Applicants</h2>
				<h3 className="bg-blue-100 text-blue-700  p-1 rounded-full ">
					Total Applicants: {totalApplicants}
				</h3>
			</div>

			<DashTable
				headData={ApplicantHead}
				bodyData={applicants}
				// title="All Applicants"
				actionHandler={actionHandler}
			/>

			{viewApplicant && (
				<ViewProfileModal
					profile={viewApplicant}
					role="jobseeker"
					onClose={closeView}
				/>
			)}
		</div>
	)
}

export default Applicants