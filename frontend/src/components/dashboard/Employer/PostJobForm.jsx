

import React, { useEffect, useState, useRef } from 'react'
import { useContext } from 'react';
import { editJobs, postJobService } from '../../../services/jobService';
import { toast } from 'react-toastify';
import { CreateJobsData } from '../../../data/employers/DashboardData';
import { ValidateUtil } from '../../../utils/ValidationUtil';
import ReusableForm from '../../form/ReusableForm';
import { JobPostContext } from '../../../context/JobPostContext';
import Loading from '../../common/Loading';

const getTodayDate = () => new Date().toISOString().split("T")[0]

const createEmptyEntry = (fields) =>
	fields.reduce((acc, f) => {
		if (f.type === "checkbox") acc[f.name] = false;
		else if (f.type === "file") acc[f.name] = null;
		else if (f.type === "select" && f.multiple) acc[f.name] = [];
		else acc[f.name] = "";
		return acc;
	}, {});

const stripPostingDateError = (error) => {
	const { postingDate, ...rest } = error
	return rest
}

function PostJobForm({ mode = "create", initialData = {}, onSuccess, close }) {
	const { addJob } = useContext(JobPostContext)
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const initialized = useRef(false)  // prevent infinite loop

	const [job, setJob] = useState(() => {
		const base = mode === "edit" ? { ...initialData } : createEmptyEntry(CreateJobsData)
		return { ...base, postingDate: getTodayDate() }
	})

	const [error, setError] = useState({})

	//  Only runs once on mount — ref prevents re-running
	useEffect(() => {
		if (initialized.current) return
		initialized.current = true

		const base = mode === "edit" && initialData
			? { ...initialData }
			: createEmptyEntry(CreateJobsData)

		setJob({ ...base, postingDate: getTodayDate() })
	}, [])

	// Validate on mount only — not on every job change
	useEffect(() => {
		const { error } = ValidateUtil(job, CreateJobsData)
		setError(stripPostingDateError(error))
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		const updatedJob = { ...job, [name]: value }
		setJob(updatedJob)
		const { error } = ValidateUtil(updatedJob, CreateJobsData)
		setError(stripPostingDateError(error))
	}

	const handleSubmit = async (e) => {
		if (e) e.preventDefault()

		const { valid, error } = ValidateUtil(job, CreateJobsData)
		setError(stripPostingDateError(error))
		if (!valid) return

		try {
			setLoading(true)
			let result

			if (mode === "edit") {
				result = await editJobs(job._id, job)
			} else {
				result = await postJobService(job)
			}

			if (result.success) {
				if (mode === "create") {
					addJob(result.job)
					setJob({ ...createEmptyEntry(CreateJobsData), postingDate: getTodayDate() })
					toast.success(result.message)
					setMessage("Job posted successfully")
				} else {
					onSuccess && onSuccess(result.job)
					toast.success(result.message)
					setMessage("Job updated successfully")
				}
				setTimeout(() => setMessage(''), 10000)
			} else {
				toast.error(result.message)
			}
		} catch (error) {
			toast.error("Something went wrong")
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<Loading
				message={mode === "edit" ? "Updating job..." : "Posting job..."}
				minHeight="min-h-[400px]"
			/>
		)
	}

	return (
		<div className="p-6 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold mb-4 text-center">
				{mode === "edit" ? "Update Job" : "Create Job"}
			</h2>

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
				readonlyFields={['postingDate']}
				submitButtonText={mode === "edit" ? "Update Job" : "Post Job"}
				onClose={close}
			/>
		</div>
	)
}

export default PostJobForm