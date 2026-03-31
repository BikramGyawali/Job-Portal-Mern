import React from 'react'

function DownloadButton({ onDownload }) {
	return (
		<div>
			<button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer" onClick={onDownload}>Download Resume</button>
		</div>
	)
}

export default DownloadButton