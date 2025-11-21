import React, { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { ProfileFields } from "../../data/jobseekers/ProfileFields";
import { ValidateUtil } from "../../utils/ValidationUtil";
import Experience from "../../data/jobseekers/Experience";
import Education from "../../data/jobseekers/Education";
import JAddDetails from "../../data/jobseekers/JAddDetails";

function UserProfile() {

	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const [elist, setElist] = useState({});
	const [step, setStep] = useState(1);
	const steps = [
		{ id: 1, fields: ProfileFields },
		{ id: 2, fields: Experience },
		{ id: 3, fields: Education },
		{ id: 4, fields: JAddDetails }
	];
	const currentFields = steps.find(s => s.id === step)?.fields;
	const addExperience = () => {
		setElist([...elist, {}])
	}
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
		if (!valid) return;
		if (step < steps.length) {
			setStep(step + 1);

		}
		else {
			console.log("Form submit");

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
				fields={currentFields}
				step={step}
				setStep={setStep}
				totalSteps={step.length}
				addSection={addExperience}
				mutipleEntries={true}

			/>

		</div>
	);
}

export default UserProfile;
