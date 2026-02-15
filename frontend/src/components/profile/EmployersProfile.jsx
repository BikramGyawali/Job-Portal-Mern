import React, { useState } from 'react'
import { employerProfile } from '../../data/employers/employerProfile';
import ReusableForm from '../form/ReusableForm';
import { ValidateUtil } from '../../utils/ValidationUtil';
import { Profile } from '../../utils/profileapi';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';
import api from '../../utils/axiosInstance';

function EmployersProfile() {
	const { state, dispatch } = useContext(AuthContext);
	const { setProfile: setGlobalProfile } = useContext(ProfileContext);
	const navigate = useNavigate();
	const createEmptyEntry = (fields) =>
		fields.reduce((acc, f) => {
			if (f.type === "checkbox") acc[f.name] = false;
			else if (f.type === "file") acc[f.name] = null;
			else acc[f.name] = "";
			return acc;
		}, {});
	const [profile, setProfile] = useState(createEmptyEntry(employerProfile))
	const [error, setError] = useState({})
	const handleChange = (e) => {
		const { name, value, files, type } = e.target;
		if (type === 'file') {
			const file = files?.[0] ?? null;
			if (file && !['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
				setError({ image: 'Only JPG/JPEG/PNG images are accepted' });
				alert('Only JPG/JPEG/PNG images are accepted');
				return;
			}
		}
		setProfile((old) => ({
			...old,
			[name]: type === "file" ? files?.[0] ?? null :
				value

		}))

	}
	const handleSubmit = async (e) => {
		if (e) e.preventDefault()
		const { valid, error } = ValidateUtil(profile, employerProfile);
		setError(error);

		if (!valid) {
			return
		}
		const formData = new FormData();  //use to send the binary file

		Object.entries(profile).forEach(([key, value]) => {
			if (value !== null && value !== "") {
				formData.append(key, value);
			}
		});


		const response = await Profile(formData, "employer");
		console.log(response.message);

	// 	if (response?.status === 1) {

	// 		setGlobalProfile(response.profile);
	// 		try {
	// 			// const me = await api.get('/auth/me');
	// 			// if (me.data?.status === 1) {
	// 			// 	dispatch({
	// 			// 		type: "LOGIN", payload: {
	// 			// 			role: me.data.role || me.data.user?.role,
	// 			// 			user: me.data.user || me.data.user,
	// 			// 			isProfileCompleted: me.data.isProfileCompleted || true
	// 			// 		}
	// 			// 	})
	// 			// }
	// 			dispatch({
	// 				type: "LOGIN",
	// 				payload: {
	// 					role: response.user.role,
	// 					user: response.user,
	// 					isProfileCompleted: true
	// 				}
	// 			});
	// 		} catch (e) {
	// 			console.log(e);

	// 		}

	// 		alert("Profile created successfully.");
	// 		navigate("/employers", { replace: true });

	// 	} else {
	// 		alert(response?.message || "Failed to create profile");
	// 	}
	if (response?.status === 1) {

  setGlobalProfile(response.profile);

  dispatch({
    type: "LOGIN",
    payload: {
      role: response.user.role,
      user: response.user,
      isProfileCompleted: true
    }
  });

  alert("Profile created successfully.");
  navigate("/employers", { replace: true });
}
	}

	//for the usercontext

	return (
		<div className="p-6 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold mb-4 text-center ">Company Profile</h2>
			<ReusableForm
				form={profile}
				errors={error}
				onChange={handleChange}
				onSubmit={handleSubmit}
				fields={employerProfile}
				step={1}
				setStep={() => { }}
				totalSteps={1}
				addSection={undefined}
				entriesCount={1}
				setCurrentEntryIndex={() => { }}
				currentEntryIndex={0}


			/>
		</div>
	)
}

export default EmployersProfile