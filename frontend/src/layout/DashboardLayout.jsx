

import { useCallback, useContext, useEffect, useState } from "react";
import { DashboardNav } from "./DashboardNav"
import { SideDashboard } from "./SideDashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = ({ children, role = "Employer" }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const handleMenu = useCallback(() => { setSidebarOpen(true) }, [])
	const { state, logout } = useContext(AuthContext)
	const navigate = useNavigate()
	const location = useLocation()

	const mainDashboardPaths = [
		'/jobseeker',
		'/employer',
		'/admin'
	]



	const isMainDashboard = mainDashboardPaths.includes(location.pathname)


	useEffect(() => {
		if (!state.isAuth) {
			navigate("/", { replace: true })
		}
	}, [state.isAuth])


	useEffect(() => {
		if (!isMainDashboard) return

		const handleBackButton = async () => {

			await logout()

			navigate("/", { replace: true })
		}
		window.addEventListener('popstate', handleBackButton)

		return () => {
			window.removeEventListener('popstate', handleBackButton)
		}

	}, [isMainDashboard, location.pathname])

	return (
		<div className="h-screen flex flex-col bg-[#F3F4F6] mb-10">
			<DashboardNav role={role} onMenuClick={handleMenu} />
			<div className="flex flex-1 overflow-hidden">
				<SideDashboard
					role={role}
					isOpen={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>
				<main className="flex-1 overflow-y-auto p-6 bg-white">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;