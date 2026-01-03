import React from "react";
import {
	Table,
	TableHead,
	TableHeadCell,
	TableBody,
	TableRow,
	TableCell,
} from "flowbite-react";
import { BsPen, BsPenFill, BsTrash2 } from "react-icons/bs";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

function DashTable({ title, headData, bodyData, actionHandler }) {

	// console.log(headData);




	const isActive = title === "Recent Applications";
	return (
		<div className=" p-4 rounded-2xl shadow-md min-w-full overflow-x-scroll">

			<div className="flex justify-between mb-4">
				< p className="text-[20px] font-semibold" > {title}</p >
				<p className={isActive ? "text-[20px] font-semibold cursor-pointer hover:underline" : "hidden"}>
					View All
				</p>
			</div >


			<Table >
				<TableHead >
					<TableRow >
						{headData.map((head, i) => (
							<TableHeadCell key={i} className="!text-black !font-bold !bg-gray-100">
								{head}
							</TableHeadCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{bodyData.length === 0 ? (
						<TableRow className="!bg-white">
							<TableCell
								colSpan={headData.length}
								className="!text-black text-center py-4"
							>
								No data available
							</TableCell>
						</TableRow>
					) : (
						bodyData.map((row, i) => (
							<TableRow key={i} className=" hover:!bg-gray-50">
								{headData.map((key, j) => (
									<TableCell key={j} className="!text-black">

										{key === "S.N" ? (
											i + 1
										) :

											key === "Actions" ? (
												<div className="flex items-center gap-3">
													{Array.isArray(row[key]) && row[key]?.map((action, idx) => {
														// Choose icon & color based on action type
														let Icon, colorClass;
														switch (action.toLowerCase()) {
															case "edit":
																Icon = MdModeEdit;
																colorClass = "text-green-400 hover:bg-green-500  hover:text-white";
																break;
															case "delete":
																Icon = MdDeleteForever;
																colorClass = "text-red-400 hover:bg-red-500 hover:text-white";
																break;
															case "view":
																Icon = null; // use a view icon if you like
																colorClass = "text-blue-400 hover:text-blue-700";
																break;
															case "shortlist":
																Icon = null;
																colorClass = "text-green-400 hover:text-green-700 ";
																break;
															case "approve":
																Icon = null;
																colorClass = "text-green-400 hover:text-green-700 ";
																break;
															case "reject":
																Icon = null;
																colorClass = "text-red-400 hover:text-red-700 ";
																break;
															default:
																Icon = BsPen;
																colorClass = "text-gray-400";
														}

														return (
															<button
																key={idx}
																className={`p-1 cursor-pointer rounded-full ${colorClass}`}
																onClick={() => actionHandler[action]?.(row)}
															>
																{Icon === null ? action : <Icon size={25} />}
															</button>

														);

													})}
												</div>
											) : (
												row[key]
											)}

									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

		</div >
	);
}

export default DashTable;
