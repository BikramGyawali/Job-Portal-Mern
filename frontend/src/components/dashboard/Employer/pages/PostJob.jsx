import React, { useState } from 'react'
import { CreateJobsData } from '../../../../data/employers/DashboardData';
import { ValidateUtil } from '../../../../utils/ValidationUtil';
import ReusableForm from '../../../form/ReusableForm';
import { useContext } from 'react';
import { JobPostContext } from '../../../../context/JobPostContext';
import { postJobService } from '../../../../services/jobService';
import PostJobForm from '../PostJobForm';

function PostJob() {

	return (

		<PostJobForm mode='create' />
	)
}

export default PostJob