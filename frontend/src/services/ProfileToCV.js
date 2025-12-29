export const ProfileToCV = (profile) => {
	if (!profile) return [];
	const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
	const getFullName = (p) => [p?.fname, p?.mname, p?.sname].filter(Boolean).join(' ');

	return [
		{
			section: "Personal Header",
			type: "header",
			data: {
				name: getFullName(profile) || profile?.cname || '',
				profileImage: profile?.image ? `${apiUrl}/uploads/images/${profile.image}` : null,
				address: profile?.currentAddress || {},
				contact: profile?.phone || '',
				email: profile?.email || '',
				dateOfBirth: profile?.dob ? new Date(profile.dob).toDateString() : '',
				experience: profile?.experience?.length ? `${profile.experience.length} Year(s)` : 'Fresher'
			}
		},
		{
			section: "Objective",
			type: "text",
			data: profile?.about || "",
		},
		{
			section: "Education",
			type: "table",
			data: profile?.education?.map((edu) => ({
				startYear: edu?.sdate ? new Date(edu.sdate).getFullYear() : '',
				endYear: edu?.edate ? new Date(edu.edate).getFullYear() : 'Running',
				degree: edu?.degree || '',
				field: edu?.fieldOfStudy || '',
				cgpa: edu?.score || '',
				institution: edu?.institution || '',
				boardOrUniversity: edu?.university || '',
				location: ''
			})) || [],

		},
		{
			section: "Work Experience",
			type: "table",
			data: profile?.experience?.map((exp) => ({
				company: exp?.orgname || '',
				position: exp?.position || '',
				employmentType: exp?.jlevel || '',
				startYear: exp?.sdate ? new Date(exp.sdate).getFullYear() : '',
				endYear: exp?.edate ? new Date(exp.edate).getFullYear() : 'Running',
				role: exp?.role || '',
				location: ''
			})) || [],
		},
		{
			section: "Training / Certificates",
			type: "list",
			data: profile?.trainings?.map((t) => ({
				year: t?.year,
				title: t?.title,
				provider: t?.institution
			})) || []
		},
		{
			section: "Skills",
			type: "tags",
			data: profile?.skills || []
		},
		{
			section: "Languages",
			type: "table",
			data: profile?.languages?.map((l) => ({
				language: l?.name,
				reading: l?.reading,
				writing: l?.writing,
				speaking: l?.speaking
			})) || [],
		},
		{
			section: "Awards",
			type: "list",
			data: profile?.awards?.map((a) => ({
				title: a?.title,
				provider: a?.institution,
			})) || [],
		},

		{
			section: "Job Preference",
			type: "keyValue",
			data: [
				{ label: "Looking for", value: profile?.lookingFor },
				{ label: "Job Type", value: profile?.jobType },
				{ label: "License", value: profile?.license },
				{ label: "Vehicle", value: profile?.vehicle },
			],
		},

		{
			section: "References",
			type: "table",
			data: profile?.references?.map((ref) => ({
				name: ref?.name,
				designation: ref?.position,
				company: ref?.company,
				contact: ref?.email,
			})) || [],
		},

	]
}
