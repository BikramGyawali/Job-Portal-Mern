import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useContext } from 'react';
import { ProfileContext } from '../../../../context/ProfileContext';
import { ProfileToCV } from '../../../../utils/ProfileToCV';

const DownloadResume = () => {
	const { profile } = useContext(ProfileContext)
	const resumeRef = useRef();
	const sections = ProfileToCV(profile);

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

			pdf.save('HamroJobresume.pdf');
		} catch (err) {
			console.error('Error generating PDF:', err);
		}
	};

	return (
		<div className="p-3 mt-3 mx-3">
			{/* Resume Container */}
			<div
				ref={resumeRef}
				style={{   // style for the pdf page 
					backgroundColor: '#ffffff',
					color: '#111111',
					fontFamily: 'Arial, sans-serif',
					fontSize: '13px',
					lineHeight: '1.4',
				}}
				className="grid grid-cols-1 gap-5"
			>
				{sections.map((sec, i) => {
					if (!sec.data || (Array.isArray(sec.data) && sec.data.length === 0)) return null;

					return (
						<div className="justify-center p-1" key={i}>

							{sec.section !== 'Personal Header' && (
								<>
									<h1 className='text-[18px] font-semibold'>{sec.section}</h1>
									<hr className='mb-2 border-black' />
								</>
							)}


							{sec.type === 'text' && <p className='text-[16px] text-justify'>{sec.data}</p>}


							{sec.type === 'header' && sec.data && (
								<div className="flex flex-col md:flex-row gap-5">
									{sec.data.profileImage && (
										<img
											src={sec.data.profileImage}
											alt={sec.data.name}
											className="max-h-[200px] max-w-[150px]
											
											border-2 border-black p-1.5 rounded"
										/>
									)}
									<div className="flex flex-col gap-1 justify-center text-[17px] text-justify">
										{sec.data.name && <h1 className='text-[22px] font-bold'>{sec.data.name}</h1>}
										{sec.data.address && <h2>Address: {JSON.stringify(sec.data.address)}</h2>}
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
												<h2 className='text-[16px] font-semibold'>
													{obj.startYear ? obj.startYear : ''} {obj.endYear ? '-' + obj.endYear : ''}
												</h2>
											)}
											<p className='text-[16px] font-semibold'>
												{obj.degree
													? `${obj.degree}${obj.field ? ' - ' + obj.field : ''}${obj.cgpa ? ' (CGPA ' + obj.cgpa + ')' : ''
													}`
													: obj.position
														? `${obj.position}${obj.company ? ' - ' + obj.company : ''}`
														: ''}
											</p>
											<p className='text-[14px]'>
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
										<p key={j} className='text-[16px] ml-[16px] list-disc'>
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
								<div className="flex flex-col gap-1 text-[15px]">
									{sec.data.map((obj, j) => (
										<p key={j}>
											<strong>{obj.label}:</strong> {obj.value}
										</p>
									))}
								</div>
							)}

							{/* Tags */}
							{sec.type === 'tags' && (
								<div className="flex flex-wrap gap-2 mt-1 ">
									{sec.data.map((tag, j) => (
										<span
											key={j}
											className='text-[14px] bg-[#e2e8f0] border-black rounded px-3 py-2 '
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
					className='bg-[#2563eb] px-5 py-2 text-[23px] cursor-pointer rounded-2xl text-white hover:scale-105'
				>
					Download Resume
				</button>
			</div>
		</div>
	);
};

export default DownloadResume;
