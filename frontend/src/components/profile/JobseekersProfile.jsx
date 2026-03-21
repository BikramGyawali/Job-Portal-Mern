
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

const createEmptyEntry = (fields) =>
	fields.reduce((acc, f) => {
		if (f.type === "checkbox") acc[f.name] = false;
		else if (f.type === "file") acc[f.name] = null;
		else acc[f.name] = "";
		return acc;
	}, {});

function JobseekersProfile() {
	const { dispatch } = useContext(AuthContext);
	const { setProfile: setGlobalProfile } = useContext(ProfileContext);
	const navigate = useNavigate();

	const [profile, setProfile] = useState(createEmptyEntry(ProfileFields));
	const [experiences, setExperiences] = useState([createEmptyEntry(Experience)]);
	const [educationList, setEducationList] = useState([createEmptyEntry(Education)]);
	const [addDetailsList, setAddDetailsList] = useState([createEmptyEntry(JAddDetails)]);
	const [profileError, setProfileError] = useState({});

	const [step, setStep] = useState(1);
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

	// Current active form and fields
	const targetForm =
		step === 1 ? profile
			: step === 2 ? experiences[expIndex] ?? createEmptyEntry(Experience)
				: step === 3 ? educationList[eduIndex] ?? createEmptyEntry(Education)
					: addDetailsList[addIndex] ?? createEmptyEntry(JAddDetails);

	const targetFields =
		step === 1 ? ProfileFields
			: step === 2 ? Experience
				: step === 3 ? Education
					: JAddDetails;
	useEffect(() => {
		const { error } = ValidateUtil(targetForm, targetFields);
		setProfileError(error);
	}, [step, expIndex, eduIndex, addIndex]);
	// ✅ Real-time single field validation using ValidateUtil
	const validateField = (name, value, fields) => {
		const partialForm = { ...targetForm, [name]: value };
		const { error } = ValidateUtil(partialForm, fields);

		setProfileError((prev) => {
			const copy = { ...prev };
			if (error[name]) {
				copy[name] = error[name];  // set this field's error
			} else {
				delete copy[name];          // clear this field's error
			}
			return copy;
		});
	};

	// Clear errors when navigating between entries
	const handleEntryNavigation = (setIndex, index) => {
		setProfileError({});
		setIndex(index);
	};

	// Change handlers
	const handleProfileChange = (e) => {
		const { name, value, files, type, checked } = e.target;

		if (type === "file") {
			const file = files?.[0] ?? null;
			if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
				setProfileError((prev) => ({ ...prev, [name]: "Only JPG/JPEG/PNG images are accepted" }));
				return;
			}
			// Valid file — clear only this field's error
			setProfileError((prev) => {
				const copy = { ...prev };
				delete copy[name];
				return copy;
			});
		}

		const newValue =
			type === "file" ? files?.[0] ?? null
				: type === "checkbox" ? checked
					: value;

		setProfile((prev) => ({ ...prev, [name]: newValue }));

		// Real-time validation for non-file, non-checkbox fields
		if (type !== "file" && type !== "checkbox") {
			validateField(name, value, ProfileFields);
		}
	};

	const handleExperienceChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === "checkbox" ? checked : value;

		setExperiences((prev) => {
			const copy = [...prev];
			copy[expIndex] = { ...copy[expIndex], [name]: newValue };
			return copy;
		});

		if (type !== "checkbox") validateField(name, value, Experience);
	};

	const handleEducationChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === "checkbox" ? checked : value;

		setEducationList((prev) => {
			const copy = [...prev];
			copy[eduIndex] = { ...copy[eduIndex], [name]: newValue };
			return copy;
		});

		if (type !== "checkbox") validateField(name, value, Education);
	};

	const handleAddDetailsChange = (e) => {
		const { name, value } = e.target;

		setAddDetailsList((prev) => {
			const copy = [...prev];
			copy[addIndex] = { ...copy[addIndex], [name]: value };
			return copy;
		});

		validateField(name, value, JAddDetails);
	};

	// Add section handlers — validate current entry before adding new
	const addExperience = () => {
		const { valid, error } = ValidateUtil(experiences[expIndex], Experience);
		setProfileError(error);
		if (!valid) return;
		setExperiences((prev) => {
			const next = [...prev, createEmptyEntry(Experience)];
			setExpIndex(next.length - 1);
			return next;
		});
		setProfileError({});
	};

	const addEducation = () => {
		const { valid, error } = ValidateUtil(educationList[eduIndex], Education);
		setProfileError(error);
		if (!valid) return;
		setEducationList((prev) => {
			const next = [...prev, createEmptyEntry(Education)];
			setEduIndex(next.length - 1);
			return next;
		});
		setProfileError({});
	};

	const addDetailSection = () => {
		const { valid, error } = ValidateUtil(addDetailsList[addIndex], JAddDetails);
		setProfileError(error);
		if (!valid) return;
		setAddDetailsList((prev) => {
			const next = [...prev, createEmptyEntry(JAddDetails)];
			setAddIndex(next.length - 1);
			return next;
		});
		setProfileError({});
	};

	// Delete handlers
	const deleteExperience = () => {
		if (experiences.length <= 1) return;
		setExperiences((prev) => {
			const copy = [...prev];
			copy.splice(expIndex, 1);
			setExpIndex(Math.max(0, expIndex - 1));
			return copy;
		});
		setProfileError({});
	};

	const deleteEducation = () => {
		if (educationList.length <= 1) return;
		setEducationList((prev) => {
			const copy = [...prev];
			copy.splice(eduIndex, 1);
			setEduIndex(Math.max(0, eduIndex - 1));
			return copy;
		});
		setProfileError({});
	};

	const deleteAddDetails = () => {
		if (addDetailsList.length <= 1) return;
		setAddDetailsList((prev) => {
			const copy = [...prev];
			copy.splice(addIndex, 1);
			setAddIndex(Math.max(0, addIndex - 1));
			return copy;
		});
		setProfileError({});
	};

	// Submit logic
	const handleSubmit = async (e) => {
		if (e) e.preventDefault();

		const { valid, error } = ValidateUtil(targetForm, targetFields);
		setProfileError(error);
		if (!valid) return;

		if (step < totalSteps) {
			setStep((s) => s + 1);
			setProfileError({});
			return;
		}

		const formData = new FormData();

		Object.entries(profile).forEach(([key, value]) => {
			if (value !== null && value !== "") formData.append(key, value);
		});

		formData.append("experience", JSON.stringify(experiences));
		formData.append("education", JSON.stringify(educationList));
		formData.append("trainings", JSON.stringify(
			addDetailsList
				.filter((d) => d.trainingTitle || d.trainingYear || d.trainingInstitution)
				.map((d) => ({
					title: d.trainingTitle,
					year: d.trainingYear,
					institution: d.trainingInstitution,
				}))
		));
		formData.append("awards", JSON.stringify(
			addDetailsList
				.filter((d) => d.awardTitle || d.awardInstitution)
				.map((d) => ({ title: d.awardTitle, institution: d.awardInstitution }))
		));
		formData.append("socials", JSON.stringify(
			addDetailsList
				.filter((d) => d.socialName)
				.map((d) => ({ name: d.socialName }))
		));
		formData.append("references", JSON.stringify(
			addDetailsList
				.filter((d) => d.referenceName || d.referenceEmail)
				.map((d) => ({
					name: d.referenceName,
					position: d.referencePosition,
					email: d.referenceEmail,
					company: d.referenceCompany,
				}))
		));

		const skill = addDetailsList.flatMap((d) =>
			typeof d.skills === "string"
				? d.skills.split(",").map((s) => s.trim()).filter(Boolean)
				: []
		);
		formData.append("skills", JSON.stringify(skill));

		const languages = addDetailsList
			.filter((d) => d.language)
			.map((d) => ({
				name: d.language,
				reading: d.languageReading,
				writing: d.languageWriting,
				speaking: d.languageSpeaking,
			}));
		formData.append("languages", JSON.stringify(languages));

		const response = await Profile(formData, "jobseeker");

		if (response?.status === 1) {
			setGlobalProfile(response.profile);
			dispatch({
				type: "LOGIN",
				payload: {
					role: response.user.role,
					user: response.user,
					isProfileCompleted: true,
				},
			});
			toast.success("Profile created successfully.", {
				onClose: () => navigate("/jobseekers", { replace: true }),
			});
		} else {
			toast.error(response?.message || "Failed to create profile");
		}
	};

	const currentForm =
		step === 1 ? profile
			: step === 2 ? experiences[expIndex] || createEmptyEntry(Experience)
				: step === 3 ? educationList[eduIndex] || createEmptyEntry(Education)
					: addDetailsList[addIndex] || createEmptyEntry(JAddDetails);

	const changeHandler =
		step === 1 ? handleProfileChange
			: step === 2 ? handleExperienceChange
				: step === 3 ? handleEducationChange
					: handleAddDetailsChange;

	return (
		<div className="p-6 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold mb-4 text-center">
				{steps[step - 1].name}
			</h2>

			<ReusableForm
				form={currentForm}
				errors={profileError}
				onChange={changeHandler}
				onSubmit={handleSubmit}
				fields={currentStep.fields}
				step={step}
				setStep={setStep}
				totalSteps={totalSteps}
				addSection={
					step === 2 ? addExperience
						: step === 3 ? addEducation
							: step === 4 ? addDetailSection
								: undefined
				}
				deleteSection={
					step === 2 ? deleteExperience
						: step === 3 ? deleteEducation
							: step === 4 ? deleteAddDetails
								: undefined
				}
				entriesCount={
					step === 2 ? experiences.length
						: step === 3 ? educationList.length
							: step === 4 ? addDetailsList.length
								: 1
				}
				setCurrentEntryIndex={
					step === 2 ? (i) => handleEntryNavigation(setExpIndex, i)
						: step === 3 ? (i) => handleEntryNavigation(setEduIndex, i)
							: step === 4 ? (i) => handleEntryNavigation(setAddIndex, i)
								: () => { }
				}
				currentEntryIndex={
					step === 2 ? expIndex
						: step === 3 ? eduIndex
							: step === 4 ? addIndex
								: 0
				}
				multipleEntries={true}
			/>
		</div>
	);
}

export default JobseekersProfile;