import React, { useState } from 'react'
import { employerProfile } from '../../data/employers/employerProfile';
import ReusableForm from '../form/ReusableForm';
import { ValidateUtil } from '../../utils/ValidationUtil';
import { contactLoginValidate } from '../../utils/contactLoginValidate';

function EmployersProfile() {
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
		setProfile((old) => ({
			...old,
			[name]: type === "file" ? files?.[0] ?? null :
				value

		}))

	}
	const handleSubmit = (e) => {
		e.preventDefault();
		const { valid, error } = ValidateUtil(profile, employerProfile);
		setError(error);
		if (!valid) {
			return
		}
	}

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