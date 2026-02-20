import React from 'react'
import { ProfileToCV } from '../../services/ProfileToCV'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import ResumeRender from '../dashboard/Jobseeker/ResumeRender';

export function ViewProfileModal({ profile, role, onClose }) {
	if (!profile) return null;
	console.log(profile, role);

	const sections = role === 'jobseeker' ? ProfileToCV(profile?.profileData || profile) : null;

	const handleDownload = async () => {
		// create a temporary element and render the resume sections similar to DownloadResume
		const div = document.createElement('div');
		div.style.padding = '16px';
		div.style.background = '#fff';
		div.style.color = '#111';
		div.style.fontFamily = 'Arial, sans-serif';
		sections.forEach((sec) => {
			const h = document.createElement('h3');
			h.textContent = sec.section;
			div.appendChild(h);
			if (sec.type === 'header') {
				const p = document.createElement('div');
				p.innerHTML = `<strong>${sec.data.name || ''}</strong><br/>${sec.data.email || ''}<br/>${sec.data.contact || ''}`;
				div.appendChild(p);
			} else if (sec.type === 'text') {
				const p = document.createElement('p'); p.textContent = sec.data; div.appendChild(p);
			} else if (sec.type === 'table' || sec.type === 'list') {
				sec.data.forEach(d => {
					const p = document.createElement('p'); p.textContent = JSON.stringify(d); div.appendChild(p);
				})
			}
		})

		document.body.appendChild(div);
		try {
			const canvas = await html2canvas(div, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const imgProps = pdf.getImageProperties(imgData);
			const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
			pdf.save('resume.pdf');
		} catch (err) {
			console.error(err);
		} finally {
			div.remove();
		}
	}

	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="bg-white rounded-xl w-auto max-h-[80vh] overflow-y-auto p-6 shadow-lg">
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
					<div>
						<ResumeRender sections={sections} />
						<button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleDownload}>Download Resume</button>
					</div>
				)}

				<div className="mt-6 flex justify-end">
					<button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={onClose}>Close</button>
				</div>
			</div>
		</div>
	)
}