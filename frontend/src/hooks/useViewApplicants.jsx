
import { useState } from 'react'
import { toast } from 'react-toastify'
import { rejectApplicant, shortlistApplicant } from '../services/jobService'

function useViewApplicants(onStatusUpdate) {
	const [viewApplicant, setViewApplicant] = useState(null)
	const [actionLoading, setActionLoading] = useState(false)

	const handleView = (row) => {
		if (!row) { toast.error("Something went wrong"); return }
		const applicantData = row?.fullData?.applicantId || row?.fullData
		if (!applicantData) { toast.error("No Data Found"); return }
		setViewApplicant(applicantData)
	}

	const closeView = () => setViewApplicant(null)

	const handleShortList = async (row) => {
		if (!row?.applicationId) {
			toast.error("Application ID missing")
			return
		}

		try {
			setActionLoading(true)
			const res = await shortlistApplicant(row.applicationId)

			if (res.success) {
				toast.success(res.message)


				if (typeof onStatusUpdate === "function") {
					onStatusUpdate(row.applicationId, "shortlisted")
				}
			} else {
				toast.error(res.message || "Shortlist failed")
			}
		} catch (err) {
			toast.error("Something went wrong")
		} finally {
			setActionLoading(false)
		}
	}

	const handleReject = async (row) => {
		console.log(row?.applicationId);

		if (!row?.applicationId) {
			toast.error("Application ID missing")
			return
		}
		try {
			setActionLoading(true);
			const res = await rejectApplicant(row?.applicationId);
			if (res.success) {
				toast.success(res.message)
				if (typeof onStatusUpdate === "function") {
					onStatusUpdate(row?.applicationId, "rejected")
				}
			}
			else {
				toast.error(res.message)
			}
		} catch (error) {
			toast.error("Something went wrong")
		}
		finally {
			setActionLoading(false)
		}
	}

	return {
		handleView,
		viewApplicant,
		closeView,
		handleShortList,
		handleReject,
		actionLoading
	}
}

export default useViewApplicants