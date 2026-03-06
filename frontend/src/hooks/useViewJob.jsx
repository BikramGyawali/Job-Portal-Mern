import React, { useState } from 'react'
import { applyJob } from '../services/jobService';
import { toast } from 'react-toastify';

function useViewJob() {
	const [viewJob, setViewJob] = useState(null)
	const handleView = (row) => {
		setViewJob(row.fullData || row)
		console.log(row.fullData);

	}
	const closeView = () => {
		setViewJob(null)
	}
	const handleApply = async (row) => {
		try {

			const jobId = row.fullData._id;
			console.log(jobId);
			const result = await applyJob(jobId);
			if (result.success) {
				toast.success(result.message)
				// alert("hello")
			}
			else {

				toast.error(result.message);


			}


		} catch (error) {
			toast.error("Something went wrong")
		}
	}
	return {
		handleView,
		closeView,
		viewJob,
		handleApply
	}
}

export default useViewJob