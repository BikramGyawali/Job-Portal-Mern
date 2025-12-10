import React, { useRef } from 'react';
import { CVSections } from '../../../../data/jobseekers/DashboardData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadResume = () => {
	const resumeRef = useRef();

	const handleDownload = async () => {
		if (!resumeRef.current) return;

		const element = resumeRef.current;

		try {
			const canvas = await html2canvas(element, {
				scale: 2,
				useCORS: true,
				allowTaint: true,
				backgroundColor: '#ffffff', // important
			});
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgProps = pdf.getImageProperties(imgData);
			const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

			let heightLeft = imgHeight;
			let position = 0;

			pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
			heightLeft -= pdfHeight;

			while (heightLeft > 0) {
				position = heightLeft - imgHeight;
				pdf.addPage();
				pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
				heightLeft -= pdfHeight;
			}

			pdf.save('resume.pdf');
		} catch (err) {
			console.error('Error generating PDF:', err);
		}
	};

	return (
		<div className="p-3 mt-3 mx-3">
			{/* Resume Container */}
			<div
				ref={resumeRef}
				style={{
					backgroundColor: '#ffffff',
					color: '#111111',
					fontFamily: 'Arial, sans-serif',
					fontSize: '13px',
					lineHeight: '1.4',
				}}
				className="grid grid-cols-1 gap-5"
			>
				{CVSections.map((sec, i) => {
					if (!sec.data || (Array.isArray(sec.data) && sec.data.length === 0)) return null;

					return (
						<div className="justify-center p-1" key={i}>
							{/* Hide title for Personal Header */}
							{sec.section !== 'Personal Header' && (
								<>
									<h1 style={{ fontSize: '18px', fontWeight: 600 }}>{sec.section}</h1>
									<hr style={{ marginBottom: '6px', borderColor: '#999999' }} />
								</>
							)}

							{/* Text */}
							{sec.type === 'text' && <p>{sec.data}</p>}

							{/* Header */}
							{sec.type === 'header' && sec.data && (
								<div className="flex flex-col md:flex-row gap-5">
									{sec.data.profileImage && (
										<img
											src={sec.data.profileImage}
											alt={sec.data.name}
											style={{ height: '120px', width: 'auto', border: '2px solid #111', padding: '6px', borderRadius: '4px' }}
										/>
									)}
									<div className="flex flex-col gap-1 justify-center">
										{sec.data.name && <h1 style={{ fontSize: '22px', fontWeight: 700 }}>{sec.data.name}</h1>}
										{sec.data.address && <h2>Address: {sec.data.address}</h2>}
										{sec.data.contact && <h2>Contact No: {sec.data.contact}</h2>}
										{sec.data.email && <h2>Email: {sec.data.email}</h2>}
										{sec.data.dateOfBirth && <h2>Date of Birth: {sec.data.dateOfBirth}</h2>}
										{sec.data.experience && <h2>Experience: {sec.data.experience}</h2>}
									</div>
								</div>
							)}

							{/* Table */}
							{sec.type === 'table' && (
								<>
									{sec.data.map((obj, j) => (
										<div key={j} className="p-1">
											{(obj.startYear || obj.endYear) && (
												<h2 style={{ fontSize: '16px', fontWeight: 600 }}>
													{obj.startYear ? obj.startYear : ''} {obj.endYear ? '-' + obj.endYear : ''}
												</h2>
											)}
											<p style={{ fontSize: '15px', fontWeight: 600 }}>
												{obj.degree
													? `${obj.degree}${obj.field ? ' - ' + obj.field : ''}${obj.cgpa ? ' (CGPA ' + obj.cgpa + ')' : ''
													}`
													: obj.position
														? `${obj.position}${obj.company ? ' - ' + obj.company : ''}`
														: ''}
											</p>
											<p style={{ fontSize: '14px' }}>
												{obj.institution
													? `${obj.institution}${obj.boardOrUniversity ? ', ' + obj.boardOrUniversity : ''}${obj.location ? ', ' + obj.location : ''
													}`
													: obj.employmentType
														? `${obj.employmentType}${obj.location ? ' - ' + obj.location : ''}`
														: obj.language
															? `Reading: ${obj.reading}, Writing: ${obj.writing}, Speaking: ${obj.speaking}`
															: obj.contact
																? `${obj.designation ? obj.designation + ', ' : ''}${obj.company}, Contact: ${obj.contact}`
																: ''}
											</p>
										</div>
									))}
								</>
							)}

							{/* List */}
							{sec.type === 'list' && (
								<>
									{sec.data.map((obj, j) => (
										<p key={j} style={{ marginLeft: '15px', listStyleType: 'disc' }}>
											{obj.year ? obj.year + ' - ' : ''}
											{obj.title ? obj.title + ' ' : ''}
											{obj.provider ? '(' + obj.provider + ')' : ''}
											{obj.type ? ' [' + obj.type + ']' : ''}
											{obj.platform ? obj.platform + ' - ' + obj.handle : ''}
										</p>
									))}
								</>
							)}

							{/* KeyValue */}
							{sec.type === 'keyValue' && (
								<div className="flex flex-col gap-1">
									{sec.data.map((obj, j) => (
										<p key={j}>
											<strong>{obj.label}:</strong> {obj.value}
										</p>
									))}
								</div>
							)}

							{/* Tags */}
							{sec.type === 'tags' && (
								<div className="flex flex-wrap gap-2 mt-1">
									{sec.data.map((tag, j) => (
										<span
											key={j}
											style={{
												backgroundColor: '#e2e8f0',
												padding: '2px 6px',
												borderRadius: '4px',
												fontSize: '13px',
											}}
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Download Button */}
			<div className="mt-5 flex justify-center">
				<button
					onClick={handleDownload}
					style={{
						backgroundColor: '#2563eb',
						color: '#fff',
						padding: '8px 20px',
						borderRadius: '5px',
						fontWeight: 600,
					}}
				>
					Download Resume
				</button>
			</div>
		</div>
	);
};

export default DownloadResume;
