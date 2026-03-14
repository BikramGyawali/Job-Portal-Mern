import React, { useContext, useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { DashboardTableHeadData } from '../../../../data/admin/Dashboarddata'
import { ProfileContext } from '../../../../context/ProfileContext'
import { updateProfileApporvalService } from '../../../../services/profileApproval'
import { ViewProfileModal } from '../../../common/ViewProfileModal'
import ConfirmModal from '../../../common/ConfirmModel'
import useConfirm from '../../../../hooks/useConfirm'
import { toast } from 'react-toastify'

function ApproveAccounts() {
	const { fetchPendingProfile, pendingProfile } = useContext(ProfileContext)
	const [transformedProfile, setTransformedProfile] = useState([])
	const [viewData, setViewData] = useState(null)
	const { showConfirm, confirmProps } = useConfirm()

	useEffect(() => {
		fetchPendingProfile()
	}, [])

	useEffect(() => {
		const transform = pendingProfile
			.filter(profile => profile.approvalStatus !== 'approve')
			.map((profile) => ({
				"Name": profile.name || profile.email,
				"Email": profile.email,
				"Role": profile.role,
				"Actions": ["view", "approve", "reject"],
				_id: profile._id,
				fullData: profile
			}))
		setTransformedProfile(transform)
	}, [pendingProfile])

	const processApprove = useCallback(async (row) => {
		try {
			const result = await updateProfileApporvalService(row._id, 'approve')
			if (result.status) {
				toast.success("Profile approved successfully")
				fetchPendingProfile()
			} else {
				toast.error("Failed to approve profile")
			}
		} catch (error) {
			toast.error("Error approving profile")
		}
	}, [fetchPendingProfile])

	const processReject = useCallback(async (row) => {
		try {
			const result = await updateProfileApporvalService(row._id, 'reject')
			if (result.status) {
				toast.success("Profile rejected successfully")
				fetchPendingProfile()
			} else {
				toast.error("Failed to reject profile")
			}
		} catch (error) {
			toast.error("Error rejecting profile")
		}
	}, [fetchPendingProfile])

	const handleApprove = (row) => {
		showConfirm({
			title: "Approve Account",
			message: `Are you sure you want to approve ${row["Name"]}?`,
			confirmText: "Yes, Approve",
			cancelText: "Cancel",
			type: "success",
			onConfirm: () => processApprove(row)
		})
	}

	const handleReject = (row) => {
		showConfirm({
			title: "Reject Account",
			message: `Are you sure you want to reject ${row["Name"]}? This action cannot be undone.`,
			confirmText: "Yes, Reject",
			cancelText: "No, Cancel",
			type: "danger",
			onConfirm: () => processReject(row)
		})
	}

	const handleView = (row) => {
		setViewData(row.fullData)
	}

	const closeView = () => setViewData(null)

	const actionHandler = {
		approve: handleApprove,
		reject: handleReject,
		view: handleView
	}

	return (
		<div>
			<DashTable
				headData={DashboardTableHeadData}
				bodyData={transformedProfile}
				title={`Pending Profiles (${transformedProfile.length})`}
				actionHandler={actionHandler}
			/>

			<ConfirmModal {...confirmProps} />

			{viewData && (
				<ViewProfileModal
					profile={viewData}
					role={viewData.role}
					onClose={closeView}
				/>
			)}
		</div>
	)
}

export default ApproveAccounts