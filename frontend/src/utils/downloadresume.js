import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export const downloadResume = async (resumeRef) => {
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