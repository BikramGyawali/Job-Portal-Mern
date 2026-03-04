

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

import AppliedJobs from "./components/dashboard/Jobseeker/pages/AppliedJobs";
import SavedJobs from "./components/dashboard/Jobseeker/pages/SavedJobs";
import DownloadResume from "./components/dashboard/Jobseeker/pages/DownloadResume";


// Employer dashboard components
import EmployerDashboard from "./components/dashboard/Employer/EmployerDashboard";
import JobBoard from "./components/dashboard/Employer/pages/JobBoard";
import MyJobs from "./components/dashboard/Employer/pages/MyJobs";
import PostJob from "./components/dashboard/Employer/pages/PostJob";


import Applicants from "./components/dashboard/Employer/pages/Applicants";
import JobListing from "./components/dashboard/Jobseeker/pages/JobListing";
import AdminDashboard from "./components/dashboard/Admin/AdminDashboard";
import ApproveAccounts from "./components/dashboard/Admin/pages/ApproveAccounts";
import ApprovePostJobs from "./components/dashboard/Admin/pages/ApprovePostJobs";
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { JobPostProvider } from "./context/JobPostContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
	return (

		<div>
			<ToastContainer />
			<AuthProvider>
				<ProfileProvider>
					<JobPostProvider>

						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/about" element={<AboutUS />} />
								<Route path="/services" element={<Services />} />
								<Route path="/contact" element={<Contact />} />
								<Route path="/jobseekers" element={<Jobseekers />} />
								<Route path="/employers" element={<Employers />} />
								<Route path="/register" element={<RegisterComp />} />
								<Route path="/admins" element={<AdminLogin />} />
								<Route path="/jobseeker-profile" element={<JobseekersProfile />} />
								<Route path="/employer-profile" element={<EmployersProfile />} />



								{/* for jobseeker dashboard routes (nested under /jobseeker) */}
								<Route element={<ProtectedRoute allowedRole="jobseeker" />} >

									<Route path="jobseeker/*" element={<DashboardLayout role="Jobseeker" />} >
										<Route index element={<JobseekerDashboard />} />
										<Route path="edit-profile" element={<EditProfile />} />
										<Route path="applied-jobs" element={<AppliedJobs />} />
										<Route path="saved-jobs" element={<SavedJobs />} />
										<Route path="download-resume" element={<DownloadResume />} />
										<Route path="jobseekers" element={<Jobseekers />} />
										<Route path="job-listing" element={<JobListing />} />
									</Route>
								</Route>


								{/* employer dashboard routes (nested under /employer) */}
								<Route element={<ProtectedRoute allowedRole="employer" />} >

									<Route path="employer/*" element={<DashboardLayout role="Employer" />} >
										<Route index element={<EmployerDashboard />} />
										<Route path="job-board" element={<JobBoard />} />
										<Route path="my-jobs" element={<MyJobs />} />
										<Route path="post-job" element={<PostJob />} />
										<Route path="applicants" element={<Applicants />} />
									</Route>
								</Route>



								<Route element={<ProtectedRoute allowedRole="admin" />} >


									<Route path="admin/*" element={<DashboardLayout role="Admin" />} >
										<Route index element={<AdminDashboard />} />
										<Route path="approve-account" element={<ApproveAccounts />} />
										<Route path="approve-jobs" element={<ApprovePostJobs />} />
										<Route path="admins" element={<AdminLogin />} />
									</Route>
								</Route>




								{/* legacy /dashboard route -> redirect to jobseeker dashboard layout (silence unmatched warning) */}
								<Route path="/dashboard" element={<DashboardLayout role="Jobseeker" />} />
								{/* <Route path="/employers" element={<Employers />} /> */}
							</Routes>
						</BrowserRouter>
					</JobPostProvider>
				</ProfileProvider>
			</AuthProvider>
		</div>


	);
}



