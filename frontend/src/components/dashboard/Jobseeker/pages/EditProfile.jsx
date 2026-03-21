import React, { useContext } from 'react'
import JobseekersProfile from '../../../profile/JobseekersProfile'
import { ProfileContext } from '../../../../context/ProfileContext'
import Loading from '../../../common/Loading';


function EditProfile() {
	const { profile, loading } = useContext(ProfileContext);
	console.log(profile);

	if (loading) return <Loading message='Loading Profile ...' minHeight='min-h-[400px]' />
	return (
		<div>
			<JobseekersProfile mode='edit' existingProfile={profile} />
		</div>
	)
}

export default EditProfile