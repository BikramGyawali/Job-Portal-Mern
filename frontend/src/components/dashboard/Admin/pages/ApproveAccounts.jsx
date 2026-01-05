import React, { useContext, useEffect, useState } from 'react'
import DashTable from '../../../common/DashTable'
import { DashboardBodyData, DashboardTableHeadData } from '../../../../data/admin/Dashboarddata'
import { ProfileContext } from '../../../../context/ProfileContext'

function ApproveAccounts() {

	const { fetchPendingProfile, pendingProfile } = useContext(ProfileContext)
	const [transformedProfile, setTransformedProfile] = useState([])

	useEffect(() => {
		fetchPendingProfile()
	}, [])

	useEffect(() => {
		const storedData = async () => {
			const transform = await pendingProfile.filter(profile => !profile.isApproved).map((profile, i) => ({
				"Name": profile.name,
				"Email": profile.email,
				"Role": profile.role,
				Actions: ["view", "approve", "reject"],
				_id: profile._id,
				fullData: profile



			}))
			setTransformedProfile(transform);

		}
		storedData()
	}, pendingProfile)


	const handleApprove = (row) => {
		console.log(row);

	}
	const handleReject = (row) => {
		console.log(row);

	}
	const handleView = (row) => {
		console.log(row);

	}
	const actionHandler = {
		approve: handleApprove,
		reject: handleReject,
		view: handleView

	}
	return (
		<div>
			<DashTable headData={DashboardTableHeadData} bodyData={transformedProfile} title={`Pending Profile( ${transformedProfile.length})`} actionHandler={actionHandler} />
		</div>
	)
}


export default ApproveAccounts