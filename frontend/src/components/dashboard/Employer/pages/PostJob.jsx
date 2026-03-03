import React, { useState } from 'react'
import { CreateJobsData } from '../../../../data/employers/DashboardData';
import { ValidateUtil } from '../../../../utils/ValidationUtil';
import ReusableForm from '../../../form/ReusableForm';
import { useContext } from 'react';
import { JobPostContext } from '../../../../context/JobPostContext';
import { postJobService } from '../../../../services/jobService';

function PostJob() {
	const { addJob } = useContext(JobPostContext)
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const createEmptyEntry = (fields) =>
		fields.reduce((acc, f) => {
			if (f.type === "checkbox") acc[f.name] = false;
			else if (f.type === "file") acc[f.name] = null;
			else if (f.type === "select" && f.multiple) acc[f.name] = [];
			else acc[f.name] = "";
			return acc;
		}, {});
	const [job, setJob] = useState(createEmptyEntry(CreateJobsData))
	const [error, setError] = useState({});
	// const handleChange = (e) => {
	// 	const { name, value, multiple, options } = e.target;
	// 	if (multiple) {
	// 		const selectedValue = Array.from(options).filter(opt => opt.selected).map(opt => opt.value)

	// 		setJob((old) => ({
	// 			...old,
	// 			[name]: selectedValue
	// 		}))
	// 	}
	// 	else {

	// 		setJob((old) => ({
	// 			...old,
	// 			[name]: value
	// 		}))
	// 	}
	// }
	const handleChange = (e) => {
		const { name, value } = e.target;


		setJob(prev => ({
			...prev,
			[name]: value
		}));
	}


	const handleSubmit = async (e) => {
		if (e) e.preventDefault()
		const { error, valid } = ValidateUtil(job, CreateJobsData);
		setError(error);
		if (!valid)
			return
		setLoading(true);
		const result = await postJobService(job);
		if (result.success) {
			setMessage("Job is post successfully");
			addJob(result.job);
			setJob(createEmptyEntry(CreateJobsData))
			setLoading(false)
			setTimeout(() => setMessage(''), 10000);  //this decide how long the message will be vissible 
		} else {
			// setMessage(`${result.error}`)
		}
	}
	return (
		<div className="p-6 bg-white rounded-xl shadow ">
			<h2 className="text-2xl font-bold mb-4 text-center ">Create Job</h2>
			{message && (
				<div className={`mb-4 p-4 rounded-lg text-center font-semibold ${message.startsWith('Job')
					? 'bg-green-100 text-green-800'
					: 'bg-red-100 text-red-800'
					}`}>
					{message}
				</div>
			)}

			<ReusableForm
				form={job}
				errors={error}
				onChange={handleChange}
				onSubmit={handleSubmit}
				fields={CreateJobsData}
				step={1}
				setStep={() => { }}
				totalSteps={1}
				addSection={undefined}
				entriesCount={1}
				setCurrentEntryIndex={() => { }}
				currentEntryIndex={0}
				isLoading={loading}
				submitButtonText={loading ? "Posting..." : "Post Job"}


			/>
		</div>
	)
}

export default PostJob