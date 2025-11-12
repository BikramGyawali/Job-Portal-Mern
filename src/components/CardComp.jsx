
import { Card } from "flowbite-react";
import cardImg from '../assets/image/translator.webp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
export function CardComp() {
	return (
		<Card href="#" className="max-w-sm !bg-white">
			<h5 className="text-2xl font-bold tracking-tight text-gray-900">
				MERN Stack Developer
			</h5>
			<div className="flex items-center gap-2 text-gray-800">
				<FontAwesomeIcon icon={faLocationDot} className="text-red-500 text-xl" />
				<span>Kathmandu, Nepal</span>
			</div>
			<div className="flex items-center gap-2 text-gray-800">
				<FontAwesomeIcon icon={faHourglassEnd} className="text-red-500" title="Deadline Passed" />
				<span>5 days</span>
			</div>
			<div className="flex gap-5">
				<p className="text-lg bg-blue-400 p-2 text-white rounded-xl hover:bg-blue-500">Full Time</p>
				<p className="text-lg bg-blue-400 p-2 text-white rounded-xl hover:bg-blue-500">Senior </p>
			</div>

		</Card>
	);
}
