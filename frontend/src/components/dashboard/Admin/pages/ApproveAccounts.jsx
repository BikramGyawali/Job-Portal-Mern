import React, { useContext, useEffect, useState } from 'react'
import DashTable from '../../../common/DashTable'
import { DashboardBodyData, DashboardTableHeadData } from '../../../../data/admin/Dashboarddata'
import { ProfileContext } from '../../../../context/ProfileContext'
import { updateProfileApporvalService } from '../../../../services/profileApproval'
import { ViewProfileModal } from '../../../common/ViewProfileModal'

function ApproveAccounts() {

	const { fetchPendingProfile, pendingProfile } = useContext(ProfileContext)
	const [transformedProfile, setTransformedProfile] = useState([])

	useEffect(() => {
		fetchPendingProfile()
	}, [])

	useEffect(() => {
		const storedData = async () => {
			const transform = pendingProfile
				.filter(profile => profile.approvalStatus !== 'approve')
				.map((profile, i) => ({
					"Name": profile.name || profile.email,
					"Email": profile.email,
					"Role": profile.role,
					Actions: ["view", "approve", "reject"],
					_id: profile._id,
					fullData: profile

				}))
			setTransformedProfile(transform);

		}
		storedData()
	}, [pendingProfile])


	const [message, setMessage] = useState("")

	const handleApprove = async (row) => {
		if (!window.confirm(`Approve : ${row['Name']}?`)) return
		try {
			const result = await updateProfileApporvalService(row._id, 'approve')
			if (result.status) {
				setMessage("Profile approved successfully")
				fetchPendingProfile()
			} else {
				setMessage("Failed to approve profile")
			}
		} catch (error) {
			setMessage("Error approving profile")
		}
	}
	const handleReject = async (row) => {
		if (!window.confirm(`Reject : ${row['Name']}?`)) return
		try {
			const result = await updateProfileApporvalService(row._id, 'reject')
			if (result.status) {
				setMessage("Profile rejected")
				fetchPendingProfile()
			} else {
				setMessage("Failed to reject profile")
			}
		} catch (error) {
			setMessage("Error rejecting profile")
		}
	}
	const [viewData, setViewData] = useState(null)
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
			{
				message && 
				(
				<div className={`mb-4 p-4 rounded-lg text-center font-semibold ${message.toLowerCase().includes('failed') || message.toLowerCase().includes('error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{message}
				</div>
			)}

			<DashTable headData={DashboardTableHeadData} bodyData={transformedProfile} title={`Pending Profile( ${transformedProfile.length})`} actionHandler={actionHandler} />


			{viewData && <ViewProfileModal profile={viewData} role={viewData.role} onClose={closeView} />}
		</div>
	)
}


export default ApproveAccounts