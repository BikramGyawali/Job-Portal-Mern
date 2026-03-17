import React, { useEffect, useState } from 'react'



import { useContext } from 'react';

import { editJobs, postJobService } from '../../../services/jobService';
import { toast } from 'react-toastify';
import { CreateJobsData } from '../../../data/employers/DashboardData';
import { ValidateUtil } from '../../../utils/ValidationUtil';
import ReusableForm from '../../form/ReusableForm';
import { JobPostContext } from '../../../context/JobPostContext';

function PostJobForm({ mode = "create", initialData = {}, onSuccess, close }) {
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
	const [job, setJob] = useState(() =>
		mode === "edit" ? initialData : createEmptyEntry(CreateJobsData)
	)
	const [error, setError] = useState({});
	useEffect(() => {
		if (mode === "edit" && initialData) {
			setJob(initialData)
		}
	}, [initialData, mode])

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedJob = {
			...job,
			[name]: value
		}
		setJob(updatedJob)

		const { error } = ValidateUtil(updatedJob, CreateJobsData);
		

		setError(error);
	}

	useEffect(() => {
		const { error } = ValidateUtil(job, CreateJobsData)
		setError(error)
	}, [job])
	const handleSubmit = async (e) => {
		if (e) e.preventDefault()
		try {
			// if (!valid)
			// 	return
			setLoading(true);
			let result;
			if (mode === "edit") {
				result = await editJobs(job._id, job)
			} else {

				result = await postJobService(job);
			}
			if (result.success) {
				if (mode === "create") {

					addJob(result.job);
					setJob(createEmptyEntry(CreateJobsData))
					toast.success(result.message)
					setMessage("Job is post successfully");

				}
				else {
					onSuccess && onSuccess(result.job)
					toast.success(result.message)
					setMessage("Job Edit Successfully")
				}
				setLoading(false)
				setTimeout(() => setMessage(''), 10000);  //this decide how long the message will be vissible 
			} else {

				// setMessage(`${result.error}`)
				toast.error(result.message)
			}
		} catch (error) {
			toast.error("Something went wrong")
		}
	}
	return (
		<div className="p-6 bg-white rounded-xl shadow ">
			<h2 className="text-2xl font-bold mb-4 text-center ">{
				mode === "edit" ? "Update Job" : "Create Job"
			}</h2>
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
				submitButtonText={loading ? mode === "edit" ? "Updating..." : "Posting" : mode === "edit" ? "Update Job" : "Post Job"}
				onClose={close}

			/>
		</div>
	)
}

export default PostJobForm