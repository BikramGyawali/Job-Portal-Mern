export function normalizeApplicant(applicant) {
	if (!applicant) return null

	const flattenArray = (arr, fields) => {
		if (!Array.isArray(arr)) return []
		return arr.map(item =>
			fields.map(f => item[f]).filter(Boolean).join(" | ")
		)
	}

	return {
		...applicant,

		// Already flat — keep as-is
		skills: applicant.skills || [],

		// Normalize arrays-of-objects → arrays-of-strings
		education: flattenArray(applicant.education, [
			"degree", "fieldOfStudy", "institution", "university"
		]),

		experience: flattenArray(applicant.experience, [
			"jobTitle", "company", "startDate", "endDate"
		]),

		awards: flattenArray(applicant.awards, [
			"title", "institution"
		]),

		languages: flattenArray(applicant.languages, [
			"name", "speaking", "reading", "writing"
		]),

		trainings: flattenArray(applicant.trainings, [
			"title", "institution"
		]),

		references: flattenArray(applicant.references, [
			"name", "position", "contact"
		]),

		socials: flattenArray(applicant.socials, [
			"platform", "url"
		]),
	}
}