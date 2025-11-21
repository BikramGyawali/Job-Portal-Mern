import React, { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { ProfileFields } from "../../data/jobseekers/ProfileFields";
import { Experience } from "../../data/jobseekers/Experience";
import { Education } from "../../data/jobseekers/Education";
import { JAddDetails } from "../../data/jobseekers/JAddDetails";
import { ValidateUtil } from "../../utils/ValidationUtil";

function UserProfile() {
	const [profile, setProfile] = useState({});
	const [experiences, setExperiences] = useState([{}]);
	const [educationList, setEducationList] = useState([{}]);
	const [addDetailsList, setAddDetailsList] = useState([{}]);
	const [errors, setErrors] = useState({});
	const [step, setStep] = useState(1);
	const [expIndex, setExpIndex] = useState(0);
	const [eduIndex, setEduIndex] = useState(0);
	const [addIndex, setAddIndex] = useState(0);

	const steps = [
		{ id: 1, name: "User Profile", fields: ProfileFields },
		{ id: 2, name: "Experience", fields: Experience },
		{ id: 3, name: "Education", fields: Education },
		{ id: 4, name: "Additional Details", fields: JAddDetails }
	];

	const currentStep = steps.find(s => s.id === step);
	const totalSteps = steps.length;

	const handleProfileChange = (e) => {
		const { name, value, files } = e.target;
		setProfile(prev => ({ ...prev, [name]: files ? files[0] : value }));
	};

	const handleExperienceChange = (e) => {
		const { name, value, type, checked } = e.target;
		setExperiences(prev => {
			const copy = [...prev];
			copy[expIndex] = { ...copy[expIndex], [name]: type === "checkbox" ? checked : value };
			return copy;
		});
	};

	const addExperience = () => {
		setExperiences(prev => [...prev, {}]);
		setExpIndex(prev => prev + 1);
	};

	const handleEducationChange = (e) => {
		const { name, value } = e.target;
		setEducationList(prev => {
			const copy = [...prev];
			copy[eduIndex] = { ...copy[eduIndex], [name]: value };
			return copy;
		});
	};

	const addEducation = () => {
		setEducationList(prev => [...prev, {}]);
		setEduIndex(prev => prev + 1);
	};

	const handleAddDetailsChange = (e) => {
		const { name, value } = e.target;
		setAddDetailsList(prev => {
			const copy = [...prev];
			copy[addIndex] = { ...copy[addIndex], [name]: value };
			return copy;
		});
	};

	const addDetailSection = () => {
		setAddDetailsList(prev => [...prev, {}]);
		setAddIndex(prev => prev + 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let targetForm;
		let targetFields;
		if (step === 1) {
			targetForm = profile;
			targetFields = ProfileFields;
		} else if (step === 2) {
			targetForm = experiences[expIndex] || {};
			targetFields = Experience;
		} else if (step === 3) {
			targetForm = educationList[eduIndex] || {};
			targetFields = Education;
		} else {
			targetForm = addDetailsList[addIndex] || {};
			targetFields = JAddDetails;
		}
		const { valid, error } = ValidateUtil(targetForm, targetFields);
		setErrors(error);
		if (!valid) return;
		if (step < totalSteps) {
			setStep(step + 1);
		} else {
			const payload = { profile, experiences, educationList, addDetailsList };
			console.log(payload);
		}
	};

	const currentForm = step === 1 ? profile : step === 2 ? experiences[expIndex] || {} : step === 3 ? educationList[eduIndex] || {} : addDetailsList[addIndex] || {};

	return (
		<div className="p-6 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold mb-4">{steps[step - 1].name}</h2>
			<ReusableForm
				form={currentForm}
				errors={errors}
				onChange={step === 1 ? handleProfileChange : step === 2 ? handleExperienceChange : step === 3 ? handleEducationChange : handleAddDetailsChange}
				onSubmit={handleSubmit}
				fields={currentStep.fields}
				step={step}
				setStep={setStep}
				totalSteps={totalSteps}
				addSection={step === 2 ? addExperience : step === 3 ? addEducation : step === 4 ? addDetailSection : undefined}
				entriesCount={step === 2 ? experiences.length : step === 3 ? educationList.length : step === 4 ? addDetailsList.length : 1}
				setCurrentEntryIndex={step === 2 ? setExpIndex : step === 3 ? setEduIndex : step === 4 ? setAddIndex : () => { }}
				currentEntryIndex={step === 2 ? expIndex : step === 3 ? eduIndex : step === 4 ? addIndex : 0}
			/>
		</div>
	);
}

export default UserProfile;
