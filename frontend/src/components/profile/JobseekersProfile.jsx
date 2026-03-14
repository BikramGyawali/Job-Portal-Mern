import React, { useState } from "react";
import ReusableForm from "../form/ReusableForm";
import { ProfileFields } from "../../data/jobseekers/ProfileFields";
import { Experience } from "../../data/jobseekers/Experience";
import { Education } from "../../data/jobseekers/Education";
import { JAddDetails } from "../../data/jobseekers/JAddDetails";
import { ValidateUtil } from "../../utils/ValidationUtil";
import { Profile } from "../../utils/profileapi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import api from '../../utils/axiosInstance';
import { toast } from "react-toastify";


const createEmptyEntry = (fields) =>
	fields.reduce((acc, f) => {
		if (f.type === "checkbox") acc[f.name] = false;
		else if (f.type === "file") acc[f.name] = null;
		else acc[f.name] = "";
		return acc;
	}, {});

function JobseekersProfile() {
	const { state, dispatch } = useContext(AuthContext);
	const { setProfile: setGlobalProfile } = useContext(ProfileContext);
	const navigate = useNavigate();
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

		// validate image file types on client before setting
		if (type === 'file') {
			const file = files?.[0] ?? null;
			if (file && !['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
				setErrors((prev) => ({ ...prev, image: 'Only JPG/JPEG/PNG images are accepted' }));
				return;
			}
		}

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

	// add another entry functions 
	const addExperience = () => {
		const lastExperience = experiences[experiences.length - 1];
		const { valid, error } = ValidateUtil(lastExperience, Experience);
		setErrors(error);
		if (!valid) return;
		setExperiences((prev) => {
			const next = [...prev, createEmptyEntry(Experience)];
			setExpIndex(next.length - 1);  //this help to create a new entry
			return next;
		});
	};

	const addEducation = () => {
		const lastEducation = educationList[educationList.length - 1];
		const { valid, error } = ValidateUtil(lastEducation, Education)
		setErrors(error);
		if (!valid) return;
		setEducationList((prev) => {
			const next = [...prev, createEmptyEntry(Education)];
			setEduIndex(next.length - 1);
			return next;
		});
	};

	const addDetailSection = () => {
		const lastAddDetail = addDetailsList[addDetailsList.length - 1];
		const { valid, error } = ValidateUtil(lastAddDetail, JAddDetails);
		setErrors(error);
		if (!valid) return;
		setAddDetailsList((prev) => {
			const next = [...prev, createEmptyEntry(JAddDetails)];
			setAddIndex(next.length - 1);
			return next;
		});
	};
	// Delete current experience
	const deleteExperience = () => {
		if (experiences.length <= 1) return; // prevent deleting the last one
		setExperiences((prev) => {
			const copy = [...prev];
			copy.splice(expIndex, 1); // remove current
			setExpIndex(Math.max(0, expIndex - 1)); // adjust index
			return copy;
		});
	};

	// Delete current education
	const deleteEducation = () => {
		if (educationList.length <= 1) return;
		setEducationList((prev) => {
			const copy = [...prev];
			copy.splice(eduIndex, 1);
			setEduIndex(Math.max(0, eduIndex - 1));
			return copy;
		});
	};

	// Delete current additional details
	const deleteAddDetails = () => {
		if (addDetailsList.length <= 1) return;
		setAddDetailsList((prev) => {
			const copy = [...prev];
			copy.splice(addIndex, 1);
			setAddIndex(Math.max(0, addIndex - 1));
			return copy;
		});
	};

	//  submit  logic
	const handleSubmit = async (e) => {
		if (e) e.preventDefault()
		let targetForm;
		let targetFields;
		if (step === 1) {
			targetForm = profile;
			targetFields = ProfileFields;
		} else if (step === 2) {
			targetForm = experiences[expIndex] ?? createEmptyEntry(Experience);
			targetFields = Experience;
		} else if (step === 3) {
			targetForm = educationList[eduIndex] ?? createEmptyEntry(Education);
			targetFields = Education;
		} else {
			targetForm = addDetailsList[addIndex] ?? createEmptyEntry(JAddDetails);
			targetFields = JAddDetails;
		}
		// validate
		const { valid, error } = ValidateUtil(targetForm, targetFields);
		setErrors(error);

		if (!valid) {
			return;
		}
		if (step < totalSteps) {
			setStep((s) => s + 1);
			return;
		}
		const formData = new FormData();

		// top-level profile fields
		Object.entries(profile).forEach(([key, value]) => {
			if (value !== null && value !== "") formData.append(key, value);
		});

		// multi-entry arrays
		formData.append("experience", JSON.stringify(experiences)); //json.stringify convert the array or object into the string
		formData.append("education", JSON.stringify(educationList));
		formData.append("trainings", JSON.stringify(
			addDetailsList.filter(d => d.trainingTitle || d.trainingYear || d.trainingInstitution)
				.map(d => ({ title: d.trainingTitle, year: d.trainingYear, institution: d.trainingInstitution }))
		));
		formData.append("awards", JSON.stringify(
			addDetailsList.filter(d => d.awardTitle || d.awardInstitution)
				.map(d => ({ title: d.awardTitle, institution: d.awardInstitution }))
		));
		formData.append("socials", JSON.stringify(
			addDetailsList.filter(d => d.socialName)
				.map(d => ({ name: d.socialName }))
		));
		formData.append("references", JSON.stringify(
			addDetailsList.filter(d => d.referenceName || d.referenceEmail)
				.map(d => ({
					name: d.referenceName,
					position: d.referencePosition,
					email: d.referenceEmail,
					company: d.referenceCompany
				}))
		));
		const skill = addDetailsList.flatMap(d => typeof d.skills === "string" ? //flatmap make a single array by removing nested arry the skill returns the array of object
			d.skills.split(",").map(s => s.trim()).filter(Boolean) : [] //the filter will help to remove the "",undefined and null
		)
		formData.append("skills", JSON.stringify(skill));
		const languages = addDetailsList.filter(d => d.language).map(
			(d) => ({
				name: d.language,
				reading: d.languageReading,
				writing: d.languageWriting,
				speaking: d.languageSpeaking
			}) // in language this return an object 
		)
		formData.append("languages", JSON.stringify(languages));

		const response = await Profile(formData, "jobseeker");



		if (response?.status === 1) {

			// update profile context
			setGlobalProfile(response.profile);

			// update auth context directly from response
			dispatch({
				type: "LOGIN",
				payload: {
					role: response.user.role,
					user: response.user,
					isProfileCompleted: true
				}
			});

			toast.success("Profile created successfully.",
				{
					onClose: () => navigate("/jobseekers", { replace: true })
				}
			);

		} else {
			toast.error(response?.message || "Failed to create profile");
		}


	}

	const currentForm =
		step === 1
			? profile
			: step === 2
				? experiences[expIndex] || createEmptyEntry(Experience)
				: step === 3
					? educationList[eduIndex] || createEmptyEntry(Education)
					: addDetailsList[addIndex] || createEmptyEntry(JAddDetails);

	const changeHandler =
		step === 1
			? handleProfileChange
			: step === 2
				? handleExperienceChange
				: step === 3
					? handleEducationChange
					: handleAddDetailsChange;

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
				deleteSection={
					step === 2
						? deleteExperience
						: step === 3
							? deleteEducation
							: step === 4
								? deleteAddDetails
								: undefined
				}
				entriesCount={step === 2 ? experiences.length : step === 3 ? educationList.length : step === 4 ? addDetailsList.length : 1}
				setCurrentEntryIndex={step === 2 ? setExpIndex : step === 3 ? setEduIndex : step === 4 ? setAddIndex : () => { }}  // the callback function is just for profile because it doesnt have multiple entries 
				currentEntryIndex={step === 2 ? expIndex : step === 3 ? eduIndex : step === 4 ? addIndex : 0}  //for profile there is 0
				multipleEntries={true}
			/>
		</div>
	);

}
export default JobseekersProfile;
