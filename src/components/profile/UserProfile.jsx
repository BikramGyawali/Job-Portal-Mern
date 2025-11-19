import React, { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { ProfileFields } from "../../data/ProfileFields";
import { ValidateUtil } from "../../utils/ValidationUtil";

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
		const { error, valid } = ValidateUtil(form, ProfileFields)



		setErrors(
			error
		);
		if (valid) {
			console.log(form);

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
