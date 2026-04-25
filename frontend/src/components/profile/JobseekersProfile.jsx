
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
import { jobseekerEditProfile } from "../../services/jobseekerEditProfile";

const createEmptyEntry = (fields) =>
	fields.reduce((acc, f) => {
		if (f.type === "checkbox") acc[f.name] = false;
		else if (f.type === "file") acc[f.name] = null;
		else acc[f.name] = "";
		return acc;
	}, {});
//convert existing prorfile in form
const mapProfileToForm = (profile, fields) => {
	if (!profile) return createEmptyEntry(fields);
	return fields.reduce((acc, f) => {
		acc[f.name] = profile[f.name] ?? (f.type === "checkbox" ? false : f.type === "file" ? null : "");
		return acc;  // as the .reduce use to add the data with field in the emmpty object {}
	}, {});
};
//add other enteries like education and profile
const mapArrayToEntries = (arr, fields) => {
	if (!arr || arr.length === 0) return [createEmptyEntry(fields)];
	return arr.map((item) =>
		fields.reduce((acc, f) => {
			acc[f.name] = item[f.name] ?? (f.type === "checkbox" ? false : "");  //?? means it there is no value in left side use right side value
			return acc;
		}, {})
	);
};

//for add sections
const mapAddDetailsFromProfile = (profile, fields) => {
	if (!profile) return [createEmptyEntry(fields)];

	const trainings = profile.trainings || [];
	const awards = profile.awards || [];
	const socials = profile.socials || [];
	const references = profile.references || [];
	const skills = profile.skills || [];
	const languages = profile.languages || [];

	// Use the max length to create entries
	const maxLen = Math.max(
		trainings.length, awards.length, socials.length,
		references.length, 1
	);  // for creating the entry as this give the number of object or entries 


	//array from to create an array
	return Array.from({ length: maxLen }, (_, i) => ({  // - means undefined and i means index
		trainingTitle: trainings[i]?.title || "",
		trainingYear: trainings[i]?.year || "",
		trainingInstitution: trainings[i]?.institution || "",
		awardTitle: awards[i]?.title || "",
		awardInstitution: awards[i]?.institution || "",
		socialName: socials[i]?.name || "",
		referenceName: references[i]?.name || "",
		referencePosition: references[i]?.position || "",
		referenceEmail: references[i]?.email || "",
		referenceCompany: references[i]?.company || "",
		skills: i === 0 ? skills.join(", ") : "",
		language: languages[i]?.name || "",
		languageReading: languages[i]?.reading || "",
		languageWriting: languages[i]?.writing || "",
		languageSpeaking: languages[i]?.speaking || "",
	}));
};

function JobseekersProfile({ mode = 'create', existingProfile = null }) {
	const { dispatch, state, logout } = useContext(AuthContext);
	const { setProfile: setGlobalProfile, fetchProfile } = useContext(ProfileContext);
	const navigate = useNavigate();
	// console.log(state);

	const [profile, setProfile] = useState(() => {  //lazy use state so it run only one when mount
		if (mode === 'edit') {
			return mapProfileToForm(existingProfile, ProfileFields)
		}

		return createEmptyEntry(ProfileFields)

	})
	useEffect(() => {
		if (mode === "edit") {
			setProfile(mapProfileToForm(existingProfile, ProfileFields));
			return
		}
		if (state?.isLoading) return
		if (state?.user?.email) {
			const freshProfile = createEmptyEntry(ProfileFields);
			setProfile({
				...freshProfile,
				email: state?.user?.email ?? ""
			})
		}
	}, [state?.user?.email, state?.isLoading, existingProfile])


	const [experiences, setExperiences] = useState(() =>
		mode === "edit"
			? mapArrayToEntries(existingProfile?.experience, Experience)
			: [createEmptyEntry(Experience)]
	);

	const [educationList, setEducationList] = useState(() =>
		mode === "edit"
			? mapArrayToEntries(existingProfile?.education, Education)
			: [createEmptyEntry(Education)]
	);

	const [addDetailsList, setAddDetailsList] = useState(() =>
		mode === "edit"
			? mapAddDetailsFromProfile(existingProfile, JAddDetails)
			: [createEmptyEntry(JAddDetails)]
	);

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
	//  Real-time single field validation using ValidateUtil
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


		Object.entries(profile).forEach(([key, value]) => {  //convert to array of key,value
			if (value instanceof File) {
				formData.append(key, value);               //  file object
			} else if (value !== null && value !== undefined) {
				formData.append(key, String(value ?? "")); //  include empty strings
			}
		});
		formData.append("experience", JSON.stringify(experiences));    //convert into string
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


		//for different service call
		let response;
		if (mode === "edit") {
			response = await jobseekerEditProfile(formData);
			// console.log(response.updatedProfile);

			if (response?.success) {
				setGlobalProfile(response.updatedProfile);
				await fetchProfile()
				toast.success("Profile updated successfully.");
				navigate("/jobseeker", { replace: true })
			} else {
				toast.error(response?.message || "Failed to update profile");
			}
		} else {
			response = await Profile(formData, "jobseeker");
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
				toast.success("Profile created successfully.");
				await logout();
				navigate("/jobseekers", { replace: true })
			} else {
				toast.error(response?.message || "Failed to create profile");
			}
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
				readonlyFields={['email']}
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
				submitButtonText={mode === 'edit' ? "Update Profile" : undefined}
			/>
		</div>
	);
}

export default JobseekersProfile;