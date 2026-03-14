import { useState } from 'react'
import { toast } from 'react-toastify'
import { rejectApplicant, shortlistApplicant } from '../services/jobService'
import useConfirm from './useConfirm'


function useViewApplicants(onStatusUpdate) {
	const [viewApplicant, setViewApplicant] = useState(null)
	const [actionLoading, setActionLoading] = useState(false)
	const { showConfirm, confirmProps } = useConfirm()

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

		const applicantName = row?.["Applicant Name"] || "this applicant"

	
		showConfirm({
			title: "Shortlist Applicant",
			message: `Are you sure you want to shortlist ${applicantName}?`,
			confirmText: "Yes, Shortlist",
			cancelText: "Cancel",
			type: "success",
			onConfirm: () => processShortlist(row)
		})
	}

	const processShortlist = async (row) => {
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

	const handleReject = (row) => {
		if (!row?.applicationId) {
			toast.error("Application ID missing")
			return
		}

		const applicantName = row?.["Applicant Name"] || "this applicant"

		showConfirm({
			title: "Reject Applicant",
			message: `Are you sure you want to reject ${applicantName}? This action cannot be undone.`,
			confirmText: "Yes, Reject",
			cancelText: "No, Cancel",
			type: "danger",
			onConfirm: () => processReject(row)
		})
	}

	const processReject = async (row) => {
		try {
			setActionLoading(true)
			const res = await rejectApplicant(row.applicationId)

			if (res.success) {
				toast.success(res.message)
				if (typeof onStatusUpdate === "function") {
					onStatusUpdate(row.applicationId, "rejected")
				}
			} else {
				toast.error(res.message || "Rejection failed")
			}
		} catch (err) {
			toast.error("Something went wrong")
		} finally {
			setActionLoading(false)
		}
	}

	return {
		handleView,
		viewApplicant,
		closeView,
		handleShortList,
		handleReject,
		actionLoading,
		confirmProps      
	}
}

export default useViewApplicants