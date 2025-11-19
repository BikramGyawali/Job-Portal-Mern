import React, { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { ProfileFields } from "../../data/ProfileFields";

function UserProfile() {

	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// validation example
		let temp = {};
		ProfileFields.forEach(f => {
			if (f.required && !form[f.name]) {
				temp[f.name] = `${f.label} is required`;
			}
		});
		setErrors(temp);

		if (Object.keys(temp).length === 0) {
			console.log("SAVE PROFILE:", form);
		}
	};

	return (
		<div className="p-6 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold mb-4">User Profile</h2>

			<ReusableForm
				form={form}
				errors={errors}
				onChange={handleChange}
				onSubmit={handleSubmit}
				fields={ProfileFields}
			/>
		</div>
	);
}

export default UserProfile;
