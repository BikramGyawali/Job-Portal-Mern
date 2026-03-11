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
	const [applicants, setApplicants] = useState([])
	const { handleView, viewApplicant, closeView } = useViewApplicants();
	if (!jobId) return null;
	const actionHandler = {
		view: handleView,
		shortlist: "hehe",
		reject: "handleReject"
	}

	useEffect(() => {
		if (!open) return;

		const fetchApplicants = async () => {
			try {
				const res = await getApplicants(jobId);
				// console.log(res);


				if (res?.success) {
					const applicants = res.applicants.data.applicants;
					const formatted = applicants.map((app, idx) => {
						const {
							jobId: { jobTitle } = {},
							applicantId,
							appliedAt
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
						};
					});
					console.log(formatted);

					setApplicants(formatted);
				}

			} catch (error) {
				console.log(error);
			}
		};

		fetchApplicants();

	}, [open, jobId]);
	return (
		<>
			<button
				className="text-blue-600 underline text-sm cursor-pointer"
				onClick={() => setOpen(true)}
			>
				View Applicants
			</button>

			{open && (
				<div className="fixed inset-0 flex items-center justify-end pr-6 bg-black/40">

					<div className="bg-white p-6 rounded-lg w-[970px]">

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
						{viewApplicant && (
							<ViewProfileModal profile={viewApplicant} role="jobseeker" onClose={closeView} />
						)}
					</div>

				</div>
			)}
		</>
	);
}

export default ViewApplicant