
import { EmployerProfile } from "../../models/employer/EmployerProfile.js";
import { PostJob } from "../../models/employer/PostJob.js";
import { JobseekerProfile } from "../../models/jobseeker/JobseekerProfile.js";
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
			isApproved: false
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
		const jobs = await PostJob.find({ isApproved: true }).populate('userId', 'email role').sort({ approvalDate: -1 }).limit(12).lean() //using the useid i will get the email and role
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
		const jobs = await PostJob.find({ isApproved: false }).populate('userId', 'email role').sort({ approvalDate: -1 }).lean() //using the useid i will get the email and role and show in the reverse order
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
				isApproved: true,
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
		const job = await PostJob.findByIdAndDelete(
			req.params.id,
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
		console.error(error);

		return res.status(500).json({
			status: 0,
			message: "Failed to  reject jobs"
		})
	}
}


// Jobs post from the employers

export const EMyJobs = async (req, res) => {
	const id = req.user.id;

	try {
		const jobs = await PostJob.find({ userId: id });
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

	try {
		const user = await JobseekerProfile.findById(id);

		if (!user.length) {
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
			skills: { $in: formattedSkills }
		});

		if (!result.length) {
			return res.status(404).json({
				status: 0,
				message: "No Jobs found according to your skills"
			});
		}

		return res.status(200).json({
			status: 1,
			message: "Jobs fetched successfully",
			jobs: result
		});

	} catch (error) {
		return res.status(500).json({
			status: 0,
			message: "Failed to fetch jobs"
		});
	}
};