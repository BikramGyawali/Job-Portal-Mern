import React from "react";
import {
	Table,
	TableHead,
	TableHeadCell,
	TableBody,
	TableRow,
	TableCell,
} from "flowbite-react";

function DashTable({ title, headData, bodyData }) {
	return (
		<div className=" p-4 rounded-2xl shadow-md min-w-full overflow-x-scroll">

			<div className="flex justify-between mb-4">
		< p className = "text-[20px] font-semibold" > { title }</p >
			<p className="text-[20px] font-semibold cursor-pointer hover:underline">
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
									{row[key]}
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
