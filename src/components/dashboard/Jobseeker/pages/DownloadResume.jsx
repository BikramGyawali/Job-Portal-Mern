import React, { useRef } from 'react';
import { CVSections } from '../../../../data/jobseekers/DashboardData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadResume = () => {
	const resumeRef = useRef();

	const handleDownload = async () => {
		if (!resumeRef.current) return;

		const element = resumeRef.current;
		const canvas = await html2canvas(element, { scale: 2 });
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
	};

	return (
		<div className="p-3 mt-3 mx-3">
			<div ref={resumeRef} className="grid grid-cols-1 gap-5">
				{CVSections.map((sec, i) => {
					if (!sec.data || (Array.isArray(sec.data) && sec.data.length === 0)) return null;

					return (
						<div className="justify-center p-1" key={i}>
							{/* Hide the title for Personal Header */}
							{sec.section !== 'Personal Header' && (
								<>
									<h1 className="text-[20px] font-mono text-start font-semibold">{sec.section}</h1>
									<hr className="mb-2" />
								</>
							)}

							{sec.type === 'text' && <p>{sec.data}</p>}

							{sec.type === 'header' && sec.data && (
								<div className="flex flex-row gap-7">
									{sec.data.profileImage && (
										<img
											src={sec.data.profileImage}
											alt={sec.data.name}
											className="h-50 w-auto border-2 border-black p-3 rounded-sm"
										/>
									)}
									<div className="justify-center m-1 p-1 flex flex-col gap-1">
										{sec.data.name && <h1 className="text-2xl font-bold text-center">{sec.data.name}</h1>}
										{sec.data.address && <h2>Address: {sec.data.address}</h2>}
										{sec.data.contact && <h2>Contact No: {sec.data.contact}</h2>}
										{sec.data.email && <h2>Email: {sec.data.email}</h2>}
										{sec.data.dateOfBirth && <h2>Date of Birth: {sec.data.dateOfBirth}</h2>}
										{sec.data.experience && <h2>Experience: {sec.data.experience}</h2>}
									</div>
								</div>
							)}

							{sec.type === 'table' && (
								<>
									{sec.data.map((obj, j) => (
										<div key={j} className="p-1">
											{(obj.startYear || obj.endYear) && (
												<h2 className="text-[16px] font-semibold font-sans text-start">
													{obj.startYear ? obj.startYear : ''} {obj.endYear ? '-' + obj.endYear : ''}
												</h2>
											)}
											<p className="text-[18px] font-semibold">
												{obj.degree
													? `${obj.degree}${obj.field ? ' - ' + obj.field : ''}${obj.cgpa ? ' (CGPA ' + obj.cgpa + ')' : ''
													}`
													: obj.position
														? `${obj.position}${obj.company ? ' - ' + obj.company : ''}`
														: ''}
											</p>
											<p>
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

							{sec.type === 'list' && (
								<>
									{sec.data.map((obj, j) => (
										<p key={j} className="list-disc">
											{obj.year ? obj.year + ' - ' : ''}
											{obj.title ? obj.title + ' ' : ''}
											{obj.provider ? '(' + obj.provider + ')' : ''}
											{obj.type ? ' [' + obj.type + ']' : ''}
											{obj.platform ? obj.platform + ' - ' + obj.handle : ''}
										</p>
									))}
								</>
							)}

							{sec.type === 'keyValue' && (
								<div className="flex flex-col gap-1">
									{sec.data.map((obj, j) => (
										<p key={j}>
											<strong>{obj.label}:</strong> {obj.value}
										</p>
									))}
								</div>
							)}

							{sec.type === 'tags' && (
								<div className="flex flex-wrap gap-2 mt-1">
									{sec.data.map((tag, j) => (
										<span key={j} className="bg-gray-200 px-2 py-1 rounded-md">
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-5 flex justify-center">
				<button
					onClick={handleDownload}
					className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
				>
					Download Resume
				</button>
			</div>
		</div>
	);
};

export default DownloadResume;
