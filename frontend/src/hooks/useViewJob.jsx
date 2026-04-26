import React, { useState } from 'react'
import { applyJob } from '../services/jobService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function useViewJob(onApplySuccess) {
	const [viewJob, setViewJob] = useState(null)
	const [loading, setLoading] = useState(null)
	const [selectedJob, setSelectedJob] = useState(null)

	const navigate = useNavigate()

	const handleView = (row) => {
		if (!row) {
			toast.error("Something went wrong");
			return;
		}

		const jobData = row?.fullData ?? row;
		console.log(row);

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
			// console.log("hello");

			const result = await applyJob(job._id);

			if (result.success) {
				toast.success(result.message);
				navigate("/jobseeker/applied-jobs", { replace: true })
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