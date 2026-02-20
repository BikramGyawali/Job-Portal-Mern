import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useContext } from 'react';
import { ProfileContext } from '../../../../context/ProfileContext';
import { ProfileToCV } from '../../../../services/ProfileToCV';
import ResumeRender from '../ResumeRender';


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
				
			>
				<ResumeRender sections={sections} />
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
