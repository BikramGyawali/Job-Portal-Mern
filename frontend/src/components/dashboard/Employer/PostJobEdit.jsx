// import { useState } from "react";
// import { ValidateUtil } from "../../../utils/ValidationUtil";
// import ReusableForm from "../../form/ReusableForm";

// function PostJobEdit({ jobData, onClose, onSuccess }) {
// 	// const [job, setJob] = useState(jobData);
// 	// const [error, setError] = useState({});
// 	// const [loading, setLoading] = useState(false);

// 	// const handleChange = (e) => {
// 	// 	const { name, value } = e.target;

// 	// 	setJob(prev => ({
// 	// 		...prev,
// 	// 		[name]: value
// 	// 	}));
// 	// };

// 	// const handleSubmit = async (e) => {
// 	// 	e.preventDefault();

// 	// 	const { error, valid } = ValidateUtil(job, CreateJobsData);
// 	// 	setError(error);

// 	// 	if (!valid) return;

// 	// 	setLoading(true);

// 	// 	const result = await editJobs(job._id, job);

// 	// 	if (result.success) {
// 	// 		onSuccess(result.job);
// 	// 	} else {
// 	// 		alert(result.message);
// 	// 	}

// 	// 	setLoading(false);
// 	// };

// 	return (
// 		// <div>
// 		// 	<h2 className="text-xl font-bold mb-4">Edit Job</h2>

// 		// 	<ReusableForm
// 		// 		form={job}
// 		// 		errors={error}
// 		// 		onChange={handleChange}
// 		// 		onSubmit={handleSubmit}
// 		// 		fields={CreateJobsData}
// 		// 		step={1}
// 		// 		setStep={() => { }}
// 		// 		totalSteps={1}
// 		// 		currentEntryIndex={0}
// 		// 		isLoading={loading}
// 		// 		submitButtonText={loading ? "Updating..." : "Update Job"}
// 		// 	/>

// 		// 	<button
// 		// 		onClick={onClose}
// 		// 		className="mt-3 bg-gray-500 text-white px-4 py-2 rounded"
// 		// 	>
// 		// 		Close
// 		// 	</button>
// 		// </div>
// 	);
// }

// export default PostJobEdit