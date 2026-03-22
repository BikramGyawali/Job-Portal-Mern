import React from 'react'
import { ProfileToCV } from '../../services/ProfileToCV'

import ResumeRender from '../dashboard/Jobseeker/ResumeRender';

import DownloadButton from './DownloadButton';
import { useRef } from 'react';
import { downloadResume } from '../../utils/downloadresume.js';

export function ViewProfileModal({ profile, role, onClose }) {
	const resumeRef = useRef()
	if (!profile) return null;
	console.log(profile, role);

	const sections = role === 'jobseeker' ? ProfileToCV(profile?.profileData || profile) : null;
	console.log(sections[0].data);


	const handleDownload = () => {
		downloadResume(resumeRef)
	}
	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-end pr-5 z-50">
			<div className="bg-white rounded-xl w-[75%] max-h-[80vh] overflow-y-auto p-6 shadow-lg">
				<h2 className="text-xl font-semibold mb-4 text-center">{role === 'employer' ? (profile.profileData?.companyName || profile.companyName || profile.email) : null}</h2>

				{role === 'employer' ? (
					<div className="grid grid-cols-2 gap-3 text-sm">
						<p><strong>Company Name:</strong> {profile.profileData?.companyName || profile.companyName}</p>
						<p><strong>PAN:</strong> {profile.profileData?.panCard}</p>
						<p><strong>Email:</strong> {profile.profileData?.email || profile.email}</p>
						<p><strong>Phone:</strong> {profile.profileData?.phone || profile.phone}</p>
						<p className="col-span-2"><strong>Intro:</strong> {profile.profileData?.companyIntro}</p>
					</div>
				) : (
					<div ref={resumeRef} style={{   // style for the pdf page 
						backgroundColor: '#ffffff',
						color: '#111111',
						fontFamily: 'Arial, sans-serif',
						fontSize: '13px',
						lineHeight: '1.4',
					}}>
						<ResumeRender sections={sections} />

					</div>
				)}

				{role === 'jobseeker' ? <DownloadButton onDownload={handleDownload} /> : null}
				<div className="mt-6 flex justify-end">
					<button className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-pointer" onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	)
}