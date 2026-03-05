import React, { useState } from 'react'

function useViewJob() {
	const [viewJob, setViewJob] = useState(null)
	const handleView = (row) => {
		setViewJob(row.fullData || row)
		console.log(row.fullData);
		
	}
	const closeView = () => {
		setViewJob(null)
	}
	return {
		handleView,
		closeView,
		viewJob
	}
}

export default useViewJob