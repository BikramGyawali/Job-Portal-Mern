
import mongoose from "mongoose";
import { EmployerProfile } from "../../models/employer/EmployerProfile.js";
import { PostJob } from "../../models/employer/PostJob.js";
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js";
import { JobApplication } from "../../models/employer/JobApplicationSchema.js";
//helper fucntion for the company name
const addCompanyName = async (jobs) => {
	const jobArray = Array.isArray(jobs) ? jobs : [jobs];

	const result = await Promise.all(
		jobArray.map(async (job) => {
			const profile = await EmployerProfile.findOne({
				userId: job.userId._id
			}).lean();

			return {
				...job,
				companyName: profile?.cname || profile?.companyName || job.userId?.email || "N/A"
			};
		})
	);

	return Array.isArray(jobs) ? result : result[0];
};


export const PostJobController = async (req, res) => {
	try {
		const userId = req.user.id;

		const jobCreate = await PostJob.create({
			...req.body,
			userId,
			// isApproved: false
		})

		return res.status(200).json({
			status: 1,
			message: "Job Created successfully",

			job: {
				_id: jobCreate._id,
				jobTitle: jobCreate.jobTitle,
				createdAt: jobCreate.createdAt
			},
			user: {
				userId: userId,
				email: req.user.email
			}
		})
	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to create Job",
			errorMessage: error?.message
		})
	}
}


//for getting all approved job for home page 

export const approvedJob = async (req, res) => {
	try {
		const jobs = await PostJob.find({ status: "approved" }).populate('userId', 'email role').sort({ approvalDate: -1 }).limit(12).lean() //using the useid i will get the email and role
		if (jobs.length === 0) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs are avaiable to fetch"
			})
		}
		const jobWithCompany = await addCompanyName(jobs)
		return res.status(200).json({
			status: 1,
			message: "Fetached all jobs",
			jobs: jobWithCompany

		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to fetch approved jobs"
		})
	}


}

//for getting pending jobs for the admin

export const pendingJob = async (req, res) => {
	try {
		const jobs = await PostJob.find({ status: "pending" }).populate('userId', 'email role').sort({ approvalDate: -1 }).lean() //using the useid i will get the email and role and show in the reverse order
		if (jobs.length === 0) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs area avaiable to fetch"
			})
		}
		const jobWithCompany = await addCompanyName(jobs)

		return res.status(200).json({
			status: 1,
			message: "Fetached all jobs",
			jobs: jobWithCompany
		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to fetch approved jobs"
		})
	}


}

//get approved jobs for admin 

export const approve = async (req, res) => {
	try {
		const job = await PostJob.findByIdAndUpdate(
			req.params.id,
			{
				// isApproved: true,
				status: "approved",
				approvalDate: Date.now()
			},
			{ new: true }
		)
		if (!job) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs are avaiable "
			})
		}
		const jobWithCompany = await addCompanyName([job])



		return res.status(200).json({
			status: 1,
			message: "Approved Jobs Successfully",
			jobs: jobWithCompany
		})

	} catch (error) {
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to  approved jobs"
		})
	}
}


//reject jobs for admin 
export const rejectJob = async (req, res) => {
	try {
		const { rejectionReason } = req.body;
		const job = await PostJob.findByIdAndUpdate(
			req.params.id,
			{
				status: "rejected",
				rejectionReason: rejectionReason || null
			}, { new: true }

		)
		if (!job) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs area avaiable "
			})
		}
		const jobWithCompany = await addCompanyName([job])

		return res.status(200).json({
			status: 1,
			message: "Rejected Jobs Successfully",
			job
		})

	} catch (error) {


		return res.status(500).json({
			status: 0,
			message: "Failed to  reject jobs"
		})
	}
}



//joblist for employers
export const EMyJobs = async (req, res) => {
	const id = req.user.id;
	console.log(id);

	try {
		const jobs = await PostJob.aggregate([
			{
				$match: { userId: new mongoose.Types.ObjectId(id) }
			},
			{
				$lookup: {
					from: "jobapplications",
					localField: "_id",
					foreignField: "jobId",
					as: "applications"

				}
			},
			{
				$addFields: {
					applicationCount: {
						$size:
						{
							$filter: {
								input: "$applications",
								as: "app",
								cond: { $ne: ["$$app.status", "rejected"] }
							}
						}
					}
				}
			},
			{
				$project: {
					applications: 0
				}
			}
		])
		// console.log(jobs.applicat);

		if (!jobs.length) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs Post By You"
			});

		}
		return res.status(200).json({
			status: 1,
			message: "All jobs are fetched",
			jobs
		})
	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to  fetched jobs"
		})
	}
}



//job list controller for jobseeker

export const JJobList = async (req, res) => {
	const id = req.user.id;
	console.log("Logged in user id:", id);
	try {
		const user = await JobseekerProfile.findOne({
			// userId: new mongoose.Types.ObjectId(id)
			userId: id
		});


		if (!user) {
			return res.status(404).json({
				status: 0,
				message: "No user details found"
			});
		}


		const formattedSkills = user.skills.map(skill => {
			const cleaned = skill
				.toLowerCase()
				.replace(/[-_/]/g, " ");

			return new RegExp(cleaned, "i");
		});

		const result = await PostJob.find({
			skills: { $in: formattedSkills },
			status: "approved"
		}).lean();

		if (!result.length) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs found according to your skills"
			});
		}
		const applications = await JobApplication.find({
			applicantId: id
		})
		const appliedJob = applications.map(app => app.jobId.toString()); //toString to conver the object id into string
		const jobWithAppliedStatus = result.map(job => ({
			...job,
			alreadyApplied: appliedJob.includes(job._id.toString())
		}))
		const jobWithCompany = await addCompanyName(jobWithAppliedStatus)

		return res.status(200).json({
			status: 1,
			message: "Jobs fetched successfully",
			jobs: jobWithCompany
		});

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to fetch jobs"
		});
	}
};



//api for job apply by the jobseeker

export const applyJob = async (req, res) => {
	try {
		const jobId = req.params.id;
		const profile = await JobseekerProfile.findOne({
			userId: req.user.id
		})
		if (!profile) {
			return res.status(400).json({
				status: 0,
				message: "No Profile Found "
			})
		}
		const alreadyApplied = await JobApplication.findOne({
			jobId, applicantId: profile._id
		})

		if (alreadyApplied) {
			return res.status(400).json({
				status: 0,
				message: "Already Apllied"
			})
		}

		const application = await JobApplication.create({
			jobId, applicantId: profile._id
		})
		return res.status(200).json({
			status: 1,
			message: "Job Applied Successfully"
		}
		)
	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: " Failed to Apply Job",
			// error: error
		}
		)
	}

}



// controller for get applicant

export const getApplicant = async (req, res) => {
	const id = req.params.id
	try {
		const applicants = await JobApplication.find({
			jobId: id,
			status: { $ne: "rejected" }    // filter out rejected
		})
			.populate("applicantId")
			.populate("jobId", "jobTitle")  //populate helps us to get the actual data by the reference id 
			.lean()

		if (!applicants.length) {
			return res.status(404).json({
				status: 0,
				message: "There are no applicants for this job"
			})
		}

		return res.status(200).json({
			status: 1,
			message: "All jobs applicant are fetched",
			applicants
		})

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to fetch applicants list",
			error
		})
	}
}


// get all applicants

export const getAllApplicant = async (req, res) => {
	try {
		const id = req.user.id

		const jobs = await PostJob.aggregate([
			{
				$match: {
					userId: new mongoose.Types.ObjectId(id)
				}
			},
			{
				$lookup: {
					from: "jobapplications",
					let: { jobId: "$_id" },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$jobId", "$$jobId"] },
							}
						},
						{
							// FILTER OUT rejected applications at DB level
							$match: {
								status: { $ne: "rejected" }
							}
						}
					],
					as: "applications"
				}
			},
			{
				$match: {
					"applications.0": { $exists: true }
				}
			},
			{
				$unwind: {
					path: "$applications",
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$lookup: {
					from: "jobseekerprofiles",
					let: { applicantId: "$applications.applicantId" },
					pipeline: [
						{
							$match: {
								$expr: { $eq: ["$_id", "$$applicantId"] }
							}
						}
					],
					as: "applications.applicantProfile"
				}
			},
			{
				$unwind: {
					path: "$applications.applicantProfile",
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$group: {
					_id: "$_id",
					jobTitle: { $first: "$jobTitle" },
					applications: { $push: "$applications" },
					applicantsPerJob: { $sum: 1 }
				}
			},
			{
				$group: {
					_id: null,
					jobs: {
						$push: {
							jobId: "$_id",
							jobTitle: "$jobTitle",
							applications: "$applications",
							applicantsPerJob: "$applicantsPerJob"
						}
					},
					totalApplicants: { $sum: "$applicantsPerJob" }
				}
			}
		])

		if (!jobs.length) {
			return res.status(400).json({
				status: 0,
				message: "No applicants found"
			})
		}

		return res.status(200).json({
			status: 1,
			message: "Fetched all applicants",
			totalApplicants: jobs[0].totalApplicants,
			jobs: jobs[0].jobs
		})

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Error in fetching",
			error: error.message
		})
	}
}

//shortlisted

export const ShortlistApplicant = async (req, res) => {
	try {
		const applicationId = req.params.id

		const application = await JobApplication.findOneAndUpdate(
			{
				_id: new mongoose.Types.ObjectId(applicationId),
				status: "pending"
			},
			{
				$set: { status: "shortlisted" }
			},
			{ new: true }
		)

		if (!application) {
			return res.status(404).json({
				status: 0,
				message: "Application not found or already processed"
			})
		}

		return res.status(200).json({
			status: 1,
			message: "Applicant shortlisted successfully",
			application
		})

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to shortlist",
			error: error.message
		})
	}
}

// reject applicant

export const rejectApplicant = async (req, res) => {
	try {
		const applicationId = req.params.id;
		const application = await JobApplication.findOneAndUpdate({   // the findoneandupdate allow to use the arbitarty value like status
			_id: new mongoose.Types.ObjectId(applicationId),
			status: "pending"
		},
			{
				$set: { status: "rejected" }
			},
			{ new: true }


		)
		if (!application) {
			return res.status(404).json({
				status: 0,
				message: "Application not found or already processed"
			})
		}

		return res.status(200).json({
			status: 1,
			message: "Applicant Rejeccted successfully",
			application
		})

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to reject",
			error: error.message
		})
	}
}

// jobapplied for the jobseeker

export const appliedJob = async (req, res) => {
	try {
		const userId = req.user.id

		const jobs = await JobseekerProfile.aggregate([
			{
				$match: {
					userId: new mongoose.Types.ObjectId(userId)
				}
			},
			{
				$lookup: {
					from: "jobapplications",
					localField: "_id",
					foreignField: "applicantId",
					as: "applications"
				}
			},
			{
				$unwind: {
					path: "$applications",
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$lookup: {
					from: "postjobs",
					localField: "applications.jobId",
					foreignField: "_id",
					as: "applications.jobDetails"
				}
			},
			{
				$unwind: {
					path: "$applications.jobDetails",
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$group: {
					_id: "$_id",
					applications: { $push: "$applications" },
					totalApplied: { $sum: 1 }
				}
			}
		])

		if (!jobs.length || !jobs[0]?.applications?.length) {
			return res.status(404).json({
				status: 0,
				message: "No jobs found"
			})
		}

		return res.status(200).json({
			status: 1,
			message: "All jobs fetched",
			totalApplied: jobs[0].totalApplied,
			jobs: jobs[0].applications
		})

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to fetch",
			error: error.message
		})
	}
}