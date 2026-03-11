import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';

function useViewApplicants() {
	const [viewApplicant, setViewApplicant] = useState(null);
	const handleView = (row) => {
		if (!row) {
			toast.error("Something went wrong")
			return;
		}
		const applicantData = row?.fullData?.applicantId;
		if (!applicantData) {
			toast.error("Not Data Found");
			return;
		}
		setViewApplicant(applicantData)
	}
	const closeView = () => {
		setViewApplicant(null)
	}
	return {
		handleView,
		viewApplicant,
		closeView

	}
}

export default useViewApplicants