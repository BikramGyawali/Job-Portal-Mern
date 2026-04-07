import React, { useState } from 'react'
import { applyJob } from '../services/jobService';
import { toast } from 'react-toastify';

function useViewJob(onApplySuccess) {
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
		// console.log(jobData);

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
			console.log("hello");

			const result = await applyJob(job._id);

			if (result.success) {
				toast.success(result.message);
				// const jobs = result?.jobs
				// console.log();

				// const newdata = job.filter(prev => prev._id !== jobs._id)
				// setViewJob(prev =>
				// 	prev?._id === job._id ? { ...prev, alreadyApplied: true } : prev
				// )
				// setViewJob(newdata)
				// setSelectedJob(prev =>
				// 	prev?._id === job._id ? { ...prev, alreadyApplied: true } : prev
				// )
				closeView()
				if (typeof onApplySuccess === "function") {
					onApplySuccess(job._id)
				}

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