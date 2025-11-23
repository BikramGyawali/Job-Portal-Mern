import React, { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { ProfileFields } from "../../data/jobseekers/ProfileFields";
import { Experience } from "../../data/jobseekers/Experience";
import { Education } from "../../data/jobseekers/Education";
import { JAddDetails } from "../../data/jobseekers/JAddDetails";
import { ValidateUtil } from "../../utils/ValidationUtil";

/**
 * Helper: create an empty entry object for given fields array.
 * - text/select/number/date => ""
 * - checkbox => false
 * - file => null
 */
const createEmptyEntry = (fields) =>
	fields.reduce((acc, f) => {
		if (f.type === "checkbox") acc[f.name] = false;
		else if (f.type === "file") acc[f.name] = null;
		else acc[f.name] = "";
		return acc;
	}, {});

function UserProfile() {
	// initialize each form piece with an object that has all fields (prevents controlled <-> uncontrolled)
	const [profile, setProfile] = useState(createEmptyEntry(ProfileFields));  // help to make intially empty object of data 
	const [experiences, setExperiences] = useState([createEmptyEntry(Experience)]);
	const [educationList, setEducationList] = useState([createEmptyEntry(Education)]);
	const [addDetailsList, setAddDetailsList] = useState([createEmptyEntry(JAddDetails)]);

	const [errors, setErrors] = useState({});
	const [step, setStep] = useState(1);

	// indices for multi-entry steps
	const [expIndex, setExpIndex] = useState(0);
	const [eduIndex, setEduIndex] = useState(0);
	const [addIndex, setAddIndex] = useState(0);

	const steps = [
		{ id: 1, name: "User Profile", fields: ProfileFields },
		{ id: 2, name: "Experience", fields: Experience },
		{ id: 3, name: "Education", fields: Education },
		{ id: 4, name: "Additional Details", fields: JAddDetails },
	];
	const currentStep = steps.find((s) => s.id === step);
	const totalSteps = steps.length;

	// --- change handlers ---
	const handleProfileChange = (e) => {
		const { name, value, files, type, checked } = e.target;

		setProfile((prev) => ({
			...prev,
			[name]:
				type === "file"
					? files?.[0] ?? null
					: type === "checkbox"
						? checked
						: value   // if it is not file nor checkbox then we are sending the value for other such as name phone etc 
		}));
	};


	const handleExperienceChange = (e) => {
		const { name, value, type, checked } = e.target;
		setExperiences((prev) => {
			const copy = [...prev];
			copy[expIndex] = {
				...copy[expIndex],
				[name]: type === "checkbox" ? checked
					: value
			};
			return copy;
		});
	};

	const handleEducationChange = (e) => {
		const { name, value, type, checked } = e.target;
		setEducationList((prev) => {
			const copy = [...prev];
			copy[eduIndex] = { ...copy[eduIndex], [name]: type === "checkbox" ? checked : value };
			return copy;
		});
	};

	const handleAddDetailsChange = (e) => {
		const { name, value } = e.target;
		setAddDetailsList((prev) => {
			const copy = [...prev];
			copy[addIndex] = { ...copy[addIndex], [name]: value };
			return copy;
		});
	};

	// --- add another entry functions ---
	const addExperience = () => {
		setExperiences((prev) => {
			const next = [...prev, createEmptyEntry(Experience)];
			setExpIndex(next.length - 1);
			return next;
		});
	};

	const addEducation = () => {
		setEducationList((prev) => {
			const next = [...prev, createEmptyEntry(Education)];
			setEduIndex(next.length - 1);
			return next;
		});
	};

	const addDetailSection = () => {
		setAddDetailsList((prev) => {
			const next = [...prev, createEmptyEntry(JAddDetails)];
			setAddIndex(next.length - 1);
			return next;
		});
	};

	// --- submit / next logic ---
	const handleSubmit = (e) => {
		e.preventDefault();

		let targetForm;
		let targetFields;
		if (step === 1) {
			targetForm = profile;
			targetFields = ProfileFields;
		} else if (step === 2) {
			targetForm = experiences[expIndex] || createEmptyEntry(Experience);
			targetFields = Experience;
		} else if (step === 3) {
			targetForm = educationList[eduIndex] || createEmptyEntry(Education);
			targetFields = Education;
		} else {
			targetForm = addDetailsList[addIndex] || createEmptyEntry(JAddDetails);
			targetFields = JAddDetails;
		}

		// validate
		const { valid, error } = ValidateUtil(targetForm, targetFields);
		setErrors(error);

		if (!valid) {
			// show errors, do not progress
			return;
		}

		// go to next or finalize
		if (step < totalSteps) {
			setStep((s) => s + 1);
		} else {
			// final payload (send to API or console)
			const payload = {
				profile,
				experiences,
				educationList,
				addDetailsList,
			};
			console.log("FINAL PAYLOAD", payload);
			// TODO: send payload to backend
		}
	};

	// current form data and handlers for the active step
	const currentForm =
		step === 1
			? profile
			: step === 2
				? experiences[expIndex] || createEmptyEntry(Experience)
				: step === 3
					? educationList[eduIndex] || createEmptyEntry(Education)
					: addDetailsList[addIndex] || createEmptyEntry(JAddDetails);

	const changeHandler = step === 1 ? handleProfileChange : step === 2 ? handleExperienceChange : step === 3 ? handleEducationChange : handleAddDetailsChange;

	return (
		<div className="p-6 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold mb-4 text-center ">{steps[step - 1].name}</h2>

			<ReusableForm
				form={currentForm}
				errors={errors}
				onChange={changeHandler}
				onSubmit={handleSubmit}
				fields={currentStep.fields}
				step={step}
				setStep={setStep}
				totalSteps={totalSteps}
				addSection={step === 2 ? addExperience : step === 3 ? addEducation : step === 4 ? addDetailSection : undefined}
				entriesCount={step === 2 ? experiences.length : step === 3 ? educationList.length : step === 4 ? addDetailsList.length : 1}
				setCurrentEntryIndex={step === 2 ? setExpIndex : step === 3 ? setEduIndex : step === 4 ? setAddIndex : () => { }}
				currentEntryIndex={step === 2 ? expIndex : step === 3 ? eduIndex : step === 4 ? addIndex : 0}
				multipleEntries={true}
			/>
		</div>
	);
}

export default UserProfile;
