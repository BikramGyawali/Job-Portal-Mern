import React from "react";
import {
	Table,
	TableHead,
	TableHeadCell,
	TableBody,
	TableRow,
	TableCell,
} from "flowbite-react";
import { BsPen, BsTrash2 } from "react-icons/bs";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

function DashTable({ title, headData, bodyData }) {
	const handleEdit = (row) => {
		console.log("Edit");

	}
	const handleDelete = (row) => {
		console.log("Delete");

	}
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

										{key === "Actions" ? (
											<div className="flex items-center gap-3">

											{row.actions?.map((action,idx)=>{
                                       let colorClass,Icon;
									   switch(action.toLowerCase()){
                                            case "edit":
												Icon=MdModeEdit ;
												colorClass="text-green-400 hover:bg-grenn-500";
												break;
												case "delete":
													Icon
									   }
											})}

											</div>
										)

											: (row[key])
										}
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
