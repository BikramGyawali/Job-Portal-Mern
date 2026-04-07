
import { Card } from "flowbite-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export const CardComp = ({ job }) => {

	const { state: authSate } = useContext(AuthContext);
	const navigate = useNavigate();
	// console.log(authSate);

	const handleApply = () => {
		if (authSate.isAuth) {
			navigate('/jobseekers', { state: { from: `/jobs/${job.id}` } })
			return

		}
	}

	return (
		<Card className="max-w-md !bg-white transition-transform duration-300 hover:scale-105  ">
			<h5 className="text-2xl font-bold tracking-wide text-gray-900">
				{job.jobTitle}
			</h5>
			<div className="flex flex-wrap items-center gap-2 text-gray-800">
				<FontAwesomeIcon icon={faLocationDot} className="text-red-500 text-xl" />
				<span>{job.district}</span>
			</div>
			<div className="flex flex-wrap items-center gap-2 text-gray-800">
				<FontAwesomeIcon icon={faHourglassEnd} className="text-red-500" title="Deadline Passed" />
				<span>{job.postingPeriod}</span>
			</div>
			<div className="flex flex-wrap gap-2">
				<p className="text-lg bg-blue-400 p-2 text-white rounded-xl hover:bg-blue-500"> {job.desiredCandidate}</p>
				<p className="text-lg bg-blue-400 p-2 text-white rounded-xl hover:bg-blue-500">{job.experience} </p>
				<button className="text-lg bg-blue-400 p-2 text-white rounded-xl hover:bg-blue-500 hover:cursor-pointer" onClick={handleApply}>Apply</button>
			</div>

		</Card>
	);
}
