


import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const downloadResume = async (resumeRef) => {
	if (!resumeRef.current) return;

	const element = resumeRef.current;

	try {

		const canvas = await html2canvas(element, {
			scale: 3,  //fpr dpi
			useCORS: true,
			allowTaint: true,
			backgroundColor: '#ffffff',
			logging: false,
			windowWidth: element.scrollWidth,
			windowHeight: element.scrollHeight,
		});

		const imgData = canvas.toDataURL('image/png');

		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'mm',
			format: 'a4',
			compress: true
		});

		const pdfWidth = pdf.internal.pageSize.getWidth()
		const pdfHeight = pdf.internal.pageSize.getHeight()
		const imgWidth = pdfWidth
		const imgHeight = (canvas.height * pdfWidth) / canvas.width
		const pageCount = Math.ceil(imgHeight / pdfHeight)

		for (let page = 0; page < pageCount; page++) {
			if (page > 0) pdf.addPage()
			pdf.addImage(imgData, 'PNG', 4, -(page * pdfHeight), imgWidth, imgHeight, '', 'FAST')
		}

		pdf.save('HamroJob_Resume.pdf')

	} catch (err) {
		console.error('Error generating PDF:', err)
	}
}