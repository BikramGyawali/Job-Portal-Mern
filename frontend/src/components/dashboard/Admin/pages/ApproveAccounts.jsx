import React, { useContext, useEffect, useState, useCallback } from 'react'
import DashTable from '../../../common/DashTable'
import { DashboardTableHeadData } from '../../../../data/admin/Dashboarddata'
import { ProfileContext } from '../../../../context/ProfileContext'
import { updateProfileApporvalService } from '../../../../services/profileApproval'
import { ViewProfileModal } from '../../../common/ViewProfileModal'
import ConfirmModal from '../../../common/ConfirmModel'
import useConfirm from '../../../../hooks/useConfirm'
import { toast } from 'react-toastify'

import Loading from '../../../common/Loading'

function ApproveAccounts() {
	const { fetchPendingProfile, pendingProfile } = useContext(ProfileContext)
	const [transformedProfile, setTransformedProfile] = useState([])
	const [viewData, setViewData] = useState(null)
	const { showConfirm, confirmProps } = useConfirm()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const load = async () => {
			await fetchPendingProfile()
			setIsLoading(false)
		}
		load();
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
	if (isLoading) {
		return <Loading />
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


// import React, { useContext, useEffect, useState, useCallback } from 'react'
// import DashTable from '../../../common/DashTable'
// import { DashboardTableHeadData } from '../../../../data/admin/Dashboarddata'
// import { ProfileContext } from '../../../../context/ProfileContext'
// import { updateProfileApporvalService } from '../../../../services/profileApproval'
// import { ViewProfileModal } from '../../../common/ViewProfileModal'
// import ConfirmModal from '../../../common/ConfirmModel'
// import useConfirm from '../../../../hooks/useConfirm'
// import { toast } from 'react-toastify'

// function ApproveAccounts() {
// 	const { fetchPendingProfile, pendingProfile } = useContext(ProfileContext)
// 	const [transformedProfile, setTransformedProfile] = useState([])
// 	const [viewData, setViewData] = useState(null)
// 	const [isLoading, setIsLoading] = useState(true)  // ✅ loading state
// 	const { showConfirm, confirmProps } = useConfirm()

// 	useEffect(() => {
// 		const load = async () => {
// 			setIsLoading(true)
// 			await fetchPendingProfile()
// 			setIsLoading(false)
// 		}
// 		load()
// 	}, [])

// 	useEffect(() => {
// 		const transform = pendingProfile
// 			.filter(profile => profile.approvalStatus !== 'approve')
// 			.map((profile) => ({
// 				"Name": profile.name || profile.email,
// 				"Email": profile.email,
// 				"Role": profile.role,
// 				"Actions": ["view", "approve", "reject"],
// 				_id: profile._id,
// 				fullData: profile
// 			}))
// 		setTransformedProfile(transform)
// 	}, [pendingProfile])

// 	const processApprove = useCallback(async (row) => {
// 		try {
// 			const result = await updateProfileApporvalService(row._id, 'approve')
// 			if (result.status) {
// 				toast.success("Profile approved successfully")
// 				fetchPendingProfile()
// 			} else {
// 				toast.error("Failed to approve profile")
// 			}
// 		} catch (error) {
// 			toast.error("Error approving profile")
// 		}
// 	}, [fetchPendingProfile])

// 	const processReject = useCallback(async (row) => {
// 		try {
// 			const result = await updateProfileApporvalService(row._id, 'reject')
// 			if (result.status) {
// 				toast.success("Profile rejected successfully")
// 				fetchPendingProfile()
// 			} else {
// 				toast.error("Failed to reject profile")
// 			}
// 		} catch (error) {
// 			toast.error("Error rejecting profile")
// 		}
// 	}, [fetchPendingProfile])

// 	const handleApprove = (row) => {
// 		showConfirm({
// 			title: "Approve Account",
// 			message: `Are you sure you want to approve ${row["Name"]}?`,
// 			confirmText: "Yes, Approve",
// 			cancelText: "Cancel",
// 			type: "success",
// 			onConfirm: () => processApprove(row)
// 		})
// 	}

// 	const handleReject = (row) => {
// 		showConfirm({
// 			title: "Reject Account",
// 			message: `Are you sure you want to reject ${row["Name"]}? This action cannot be undone.`,
// 			confirmText: "Yes, Reject",
// 			cancelText: "No, Cancel",
// 			type: "danger",
// 			onConfirm: () => processReject(row)
// 		})
// 	}

// 	const handleView = (row) => {
// 		setViewData(row.fullData)
// 	}

// 	const closeView = () => setViewData(null)

// 	const actionHandler = {
// 		approve: handleApprove,
// 		reject: handleReject,
// 		view: handleView
// 	}

// 	// ✅ Loading UI
// 	if (isLoading) {
// 		return (
// 			<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
// 				<div className="relative w-14 h-14">
// 					<div className="absolute inset-0 rounded-full border-4 border-blue-100" />
// 					<div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
// 				</div>
// 				<p className="text-blue-600 font-medium text-base">Loading pending profiles...</p>
// 			</div>
// 		)
// 	}

// 	// ✅ Empty state
// 	if (!isLoading && transformedProfile.length === 0) {
// 		return (
// 			<div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-gray-400">
// 				<svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// 					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
// 				</svg>
// 				<p className="text-lg font-semibold">No Pending Profiles</p>
// 				<p className="text-sm">All accounts have been reviewed.</p>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div>
// 			<DashTable
// 				headData={DashboardTableHeadData}
// 				bodyData={transformedProfile}
// 				title={`Pending Profiles (${transformedProfile.length})`}
// 				actionHandler={actionHandler}
// 			/>

// 			<ConfirmModal {...confirmProps} />

// 			{viewData && (
// 				<ViewProfileModal
// 					profile={viewData}
// 					role={viewData.role}
// 					onClose={closeView}
// 				/>
// 			)}
// 		</div>
// 	)
// }

// export default ApproveAccounts