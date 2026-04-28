import React, { useRef } from 'react';

import { useContext } from 'react';
import { ProfileContext } from '../../../../context/ProfileContext';
import { ProfileToCV } from '../../../../services/ProfileToCV';
import ResumeRender from '../ResumeRender';
import DownloadButton from '../../../common/DownloadButton';
import { downloadResume } from '../../../../utils/downloadresume';


const DownloadResume = () => {
	const { profile } = useContext(ProfileContext)
	const resumeRef = useRef();
	const sections = ProfileToCV(profile);


	const handleDownload = () => {
		downloadResume(resumeRef)
	}
	return (
		<div className="p-3 mt-3 mx-3">

			<div
				ref={resumeRef}
				style={{
					width: '794px',
					minHeight: '1123px',

					backgroundColor: '#ffffff',
					fontFamily: 'Arial, sans-serif',
					boxSizing: 'border-box',

				}}
			>
				<ResumeRender sections={sections} />
			</div>


			<div className="mt-5 flex justify-center">
				<DownloadButton onDownload={handleDownload} />
			</div>
		</div>
	);
};

export default DownloadResume;
