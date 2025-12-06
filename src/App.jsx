

import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/public/Home";
import AboutUS from "./pages/public/AboutUS";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import Jobseekers from "./pages/jobseeker/Jobseekers";
import Employers from "./pages/employer/Employers";
import RegisterComp from "./pages/auth/RegisterComp";

import JobseekersProfile from "./components/profile/JobseekersProfile";
import EmployersProfile from "./components/profile/EmployersProfile";
// import { SideDashboard } from "./layout/SideDashboard";
import DashboardLayout from "./layout/DashboardLayout";
import JobseekerDashboard from "./components/dashboard/Jobseeker/JobseekerDashboard";
import EditProfile from "./components/dashboard/Jobseeker/pages/EditProfile";
import MyDocument from "./components/dashboard/Jobseeker/pages/MyDocument";
import AppliedJobs from "./components/dashboard/Jobseeker/pages/AppliedJobs";
import SavedJobs from "./components/dashboard/Jobseeker/pages/SavedJobs";
import DownloadResume from "./components/dashboard/Jobseeker/pages/DownloadResume";
import Setting from "./components/dashboard/Jobseeker/pages/Setting";
import Logout from "./components/dashboard/Jobseeker/pages/Logout";

// Employer dashboard components
import EmployerDashboard from "./components/dashboard/Employer/EmployerDashboard";
import JobBoard from "./components/dashboard/Employer/pages/JobBoard";
import MyJobs from "./components/dashboard/Employer/pages/MyJobs";
import PostJob from "./components/dashboard/Employer/pages/PostJob";
import Application from "./components/dashboard/Employer/pages/Application";
import EmployerSetting from "./components/dashboard/Employer/pages/Setting";


export default function App() {
	return (

		<div>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<AboutUS />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/jobseekers" element={<Jobseekers />} />
					<Route path="/employers" element={<Employers />} />
					<Route path="/register" element={<RegisterComp />} />
					
					<Route path="/jobseekers-profile" element={<JobseekersProfile />} />
					<Route path="/employers-profile" element={<EmployersProfile />} />


					{/* for jobseeker dashboard routes (nested under /jobseeker) */}
					<Route path="jobseeker/*" element={<DashboardLayout role="Jobseeker" />}>
						<Route index element={<JobseekerDashboard />} />
						<Route path="edit-profile" element={<EditProfile />} />
						<Route path="documents" element={<MyDocument />} />
						<Route path="applied-jobs" element={<AppliedJobs />} />
						<Route path="saved-jobs" element={<SavedJobs />} />
						<Route path="download-resume" element={<DownloadResume />} />
						<Route path="settings" element={<Setting />} />
						<Route path="jobseekers" element={<Jobseekers />} />
					</Route>

					{/* employer dashboard routes (nested under /employer) */}
					<Route path="employer/*" element={<DashboardLayout role="Employer" />}>
						<Route index element={<EmployerDashboard />} />
						<Route path="job-board" element={<JobBoard />} />
						<Route path="my-jobs" element={<MyJobs />} />
						<Route path="post-job" element={<PostJob />} />
						<Route path="applications" element={<Application />} />
						<Route path="settings" element={<EmployerSetting />} />
						<Route path="" />
					</Route>

					{/* legacy /dashboard route -> redirect to jobseeker dashboard layout (silence unmatched warning) */}
					<Route path="/dashboard" element={<DashboardLayout role="Jobseeker" />} />
					{/* <Route path="/employers" element={<Employers />} /> */}
				</Routes>
			</BrowserRouter>
		</div>


	);
}



