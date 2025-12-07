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
												<button onClick={() => handleEdit(row)} className="p-1 cursor-pointer hover:bg-green-500  rounded-full">
													<MdModeEdit size={25} className="text-green-400 hover:text-white" />
												</button>
												<button onClick={() => handleDelete(row)} className="p-1  cursor-pointer hover:bg-red-500 rounded-full">
													<MdDeleteForever size={25} className="text-red-400 hover:text-white" />
												</button>

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
