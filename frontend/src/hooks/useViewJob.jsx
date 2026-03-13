import React, { useState } from 'react'
import { applyJob } from '../services/jobService';
import { toast } from 'react-toastify';

function useViewJob() {
	const [viewJob, setViewJob] = useState(null)
	const [loading, setLoading] = useState(null)
	const [selectedJob, setSelectedJob] = useState(null)



	const handleView = (row) => {
		if (!row) {
			toast.error("Something went wrong");
			return;
		}

		const jobData = row?.fullData ?? row;
		if (!jobData || !jobData._id) {
			toast.error("Job data not found");
			return;
		}
		console.log(jobData);

		setSelectedJob(jobData)
		setViewJob(jobData);
	};
	const closeView = () => {
		setViewJob(null)

		setSelectedJob(null)
	}
	const handleApply = async (row) => {
		try {
			setLoading(true);
			const jobData = row?.fullData ?? row;
			const job = (jobData?._id ? jobData : null) || viewJob || selectedJob

			if (!job || !job._id) {
				toast.error("Job data missing");
				return;
			}

			const result = await applyJob(job._id);

			if (result.success) {
				toast.success(result.message);


				setViewJob(prev =>
					prev?._id === job._id ? { ...prev, alreadyApplied: true } : prev
				)
				setSelectedJob(prev =>
					prev?._id === job._id ? { ...prev, alreadyApplied: true } : prev
				)

			} else {
				toast.error(result.message || "Apply failed");
			}

		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	


	return {
		handleView,
		closeView,
		viewJob,
		handleApply,
		loading
	}
}

export default useViewJob