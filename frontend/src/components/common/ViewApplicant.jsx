import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DashTable from './DashTable';
import { ApplicantHead } from '../../data/employers/DashboardData';
import useViewApplicants from '../../hooks/useViewApplicants';
import { ViewProfileModal } from './ViewProfileModal';
import { getApplicants } from '../../services/jobService';

function ViewApplicant({ jobId, onClose }) {
	const [open, setOpen] = useState(false)
	if (!jobId) return null;
	const [applicants, setApplicants] = useState([])
	const { handleView, viewApplicant, closeView } = useViewApplicants();
	const actionHandler = {
		view: handleView,
		shortlist: "hehe",
		reject: "handleReject"
	}
	useEffect(() => {
		const fetchApplicants = async () => {
			try {
				const res = await getApplicants(jobId);
				if (res?.success) {
					const formatted = res.applicants.map((app, idx) => {
						const {
							jobId: { jobTitle } = {},
							applicantId,
							appliedAt,

						} = app;
						const { fname, sname, email, phone } = applicantId || {};
						return {
							"Job Title": jobTitle || "N/A",

							"Applicant Name": fname ? `${fname} ${sname}` : "Deleted User",
							"Phone": phone || "N/A",
							"Email": email || "N/A",
							"Applied At": new Date(appliedAt).toLocaleDateString(),
							"Actions": ["view", "shortlist", "reject"],
							fullData: app
						}



					})
					setApplicants(formatted)
				}
console.log(applicants);

			} catch (error) {
				console.log(error);

			}
		}
		fetchApplicants()
	}, [jobId])
	return (
		<>
			<button
				className="text-blue-600 underline text-sm cursor-pointer"
				onClick={() => setOpen(true)}
			>
				View Applicants
			</button>

			{open && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/40">

					<div className="bg-white p-6 rounded-lg w-[900px]">

						<div className="flex justify-between mb-4">
							<h2 className="font-bold">Applicants</h2>

							<button
								onClick={() => setOpen(false)}
								className="px-3 py-1 bg-gray-300 rounded"
							>
								Close
							</button>
						</div>

						<DashTable
							headData={ApplicantHead}
							bodyData={applicants}
							actionHandler={actionHandler}
						/>

					</div>

				</div>
			)}
		</>
	);
}

export default ViewApplicant